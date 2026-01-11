import { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { convertHypergraphToGraph } from "../utils/hypergraphConverter";
import type { HypergraphData, GraphData } from "../types/hypergraph";

interface HypergraphVisualizationProps {
  data: HypergraphData;
  graphData?: GraphData;
}

export function HypergraphVisualization({
  data,
  graphData: providedGraphData,
}: HypergraphVisualizationProps) {
  const graphData = providedGraphData || convertHypergraphToGraph(data);
  const fgRef = useRef<any>();

  // Convert to format expected by react-force-graph
  const graphDataFormatted = {
    nodes: graphData.nodes.map((node) => ({
      id: node.id,
      name: node.label,
      val: node.size || 10,
      color: node.fill || "#60a5fa",
    })),
    links: graphData.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      label: edge.label,
    })),
  };

  useEffect(() => {
    // Center and zoom to fit graph once on initial load
    const timer = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 100);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [graphData]);

  const handleRecenter = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400, 100);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#0a0a0a",
        position: "relative",
      }}
    >
      <button
        onClick={handleRecenter}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(96, 165, 250, 0.9)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(96, 165, 250, 1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(96, 165, 250, 0.9)")
        }
      >
        ⊙ Re-center Graph
      </button>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphDataFormatted}
        nodeLabel="name"
        nodeAutoColorBy="color"
        nodeCanvasObject={(
          node: any,
          ctx: CanvasRenderingContext2D,
          globalScale: number,
        ) => {
          const label = node.name;
          const fontSize = 10 / globalScale;
          const isEClass = node.id && node.id.startsWith("eclass-");

          if (isEClass) {
            // Draw rectangular node for e-classes
            const width = node.val * 3;
            const height = node.val * 2;

            ctx.fillStyle = node.color || "#60a5fa";
            ctx.fillRect(
              node.x - width / 2,
              node.y - height / 2,
              width,
              height,
            );
            ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
            ctx.lineWidth = 2 / globalScale;
            ctx.strokeRect(
              node.x - width / 2,
              node.y - height / 2,
              width,
              height,
            );
          } else {
            // Draw circular node for e-nodes
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || "#60a5fa";
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();
          }

          // Draw label text inside the node
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";
          ctx.font = `bold ${fontSize}px Sans-Serif`;
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={() => "#666"}
        linkWidth={2}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={0}
        linkLabel="label"
        linkCanvasObjectMode={() => "after" as const}
        linkCanvasObject={(
          link: any,
          ctx: CanvasRenderingContext2D,
          globalScale: number,
        ) => {
          if (link.label) {
            const fontSize = 8 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#aaa";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Position label at midpoint of link
            const midX = (link.source.x + link.target.x) / 2;
            const midY = (link.source.y + link.target.y) / 2;

            // Draw background for label
            const textWidth = ctx.measureText(link.label).width;
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(
              midX - textWidth / 2 - 2,
              midY - fontSize / 2 - 1,
              textWidth + 4,
              fontSize + 2,
            );

            // Draw label text
            ctx.fillStyle = "#ddd";
            ctx.fillText(link.label, midX, midY);
          }
        }}
        backgroundColor="#0a0a0a"
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        cooldownTime={2000}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        nodeRelSize={8}
        d3Force={{
          charge: { strength: -200 },
          center: { strength: 0.3 },
          collide: { radius: 50, strength: 0.5 },
          link: { distance: 100 },
        }}
      />
    </div>
  );
}
