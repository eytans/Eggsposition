import { useState, useRef } from "react";
import { HypergraphVisualization } from "./components/HypergraphVisualization";
import { Stats } from "./components/Stats";
import { ErrorBoundary } from "./components/ErrorBoundary";
import type { GraphData } from "./types/hypergraph";
import { parseEGraphJSON, convertEGraphToGraph } from "./utils/egraphConverter";
import "./App.css";

// Empty initial data for hypergraph
const emptyHypergraphData = {
  nodes: [],
  hyperedges: [],
};

function App() {
  const [showStats, setShowStats] = useState(true);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [fullGraphData, setFullGraphData] = useState<GraphData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [kNearest, setKNearest] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const egraph = parseEGraphJSON(content);
        const graph = convertEGraphToGraph(egraph);
        setGraphData(graph);
        setLoadError(null);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : "Failed to load file",
        );
        setGraphData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith(".json")) {
      loadFile(file);
    } else {
      setLoadError("Please drop a JSON file");
    }
  };

  const handleReset = () => {
    setGraphData(null);
    setLoadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        position: "relative",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          background: "rgba(30,30,30,0.95)",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          border: "2px solid #60a5fa",
          fontFamily: "system-ui, sans-serif",
          maxWidth: "320px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>Eggsposition</h2>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontSize: "12px",
              color: "#aaa",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Load E-graph JSON:
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            style={{
              width: "100%",
              padding: "6px",
              background: "#1a1a1a",
              color: "white",
              border: "1px solid #333",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          />
          {graphData && (
            <button
              onClick={handleReset}
              style={{
                marginTop: "5px",
                padding: "6px 12px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Clear Graph
            </button>
          )}
          {loadError && (
            <p
              style={{
                margin: "5px 0 0 0",
                fontSize: "11px",
                color: "#ef4444",
              }}
            >
              Error: {loadError}
            </p>
          )}
        </div>

        {graphData && (
          <>
            <p style={{ margin: "5px 0", fontSize: "13px" }}>
              <strong>Nodes:</strong> {graphData.nodes.length}
            </p>
            <p style={{ margin: "5px 0", fontSize: "13px" }}>
              <strong>Edges:</strong> {graphData.edges.length}
            </p>
          </>
        )}

        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showStats}
              onChange={(e) => setShowStats(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Show FPS Counter
          </label>
        </div>

        <p style={{ margin: "10px 0 5px 0", fontSize: "12px", color: "#aaa" }}>
          {graphData
            ? "Drag nodes to rearrange, scroll to zoom, drag background to pan."
            : "Load an e-graph JSON file to visualize."}
        </p>
      </div>

      {showStats && <Stats />}

      {graphData && (
        <ErrorBoundary>
          <HypergraphVisualization
            data={emptyHypergraphData}
            graphData={graphData}
          />
        </ErrorBoundary>
      )}

      {!graphData && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#666",
            fontSize: "18px",
          }}
        >
          <p style={{ marginBottom: "10px", fontSize: "48px" }}>📊</p>
          <p>Load an e-graph JSON file to get started</p>
        </div>
      )}

      {isDragging && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(96, 165, 250, 0.2)",
            border: "4px dashed #60a5fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(96, 165, 250, 0.95)",
              color: "white",
              padding: "30px 50px",
              borderRadius: "12px",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            📁 Drop JSON file here
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
