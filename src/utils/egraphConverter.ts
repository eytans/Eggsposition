/**
 * Converts egraph-serialize format to Reagraph visualization format
 * Uses WASM-compiled egraph-serialize library
 */

import type { SerializedEGraph } from "../types/egraph-serialize";
import type { GraphData, GraphNode, GraphEdge } from "../types/hypergraph";

/**
 * Convert egraph-serialize format to graph visualization format
 *
 * In an e-graph:
 * - Nodes represent terms/expressions with an operation (op) and children
 * - E-classes group equivalent nodes together
 * - We visualize both nodes and e-classes
 */
export function convertEGraphToGraph(egraph: SerializedEGraph): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const eclassColors = new Map<string, string>();

  // Generate colors for e-classes
  const uniqueEClasses = new Set(
    Object.values(egraph.nodes).map((node) => node.eclass),
  );

  const colors = [
    "#60a5fa", // blue
    "#f59e0b", // amber
    "#10b981", // green
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
  ];

  let colorIndex = 0;
  for (const eclass of uniqueEClasses) {
    eclassColors.set(eclass, colors[colorIndex % colors.length]);
    colorIndex++;
  }

  // Create nodes for each e-node
  for (const [nodeId, node] of Object.entries(egraph.nodes)) {
    const color = eclassColors.get(node.eclass) || "#64748b";

    // Create label with operator only
    const label = node.op;

    nodes.push({
      id: nodeId,
      label,
      fill: color,
      size: node.subsumed ? 8 : 12,
      isHyperedge: false,
    });

    // Create edges from this node to the e-classes of its children
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const childNodeId = node.children[i];
        const childNode = egraph.nodes[childNodeId];
        if (childNode) {
          // Edge goes from e-node to the e-class of its argument
          const targetEClass = `eclass-${childNode.eclass}`;
          edges.push({
            id: `${nodeId}-arg${i}`,
            source: nodeId,
            target: targetEClass,
            label: `arg${i}`,
          });
        }
      }
    }
  }

  // Add e-class nodes for all e-classes
  const eclassNodeCounts = new Map<string, number>();
  for (const node of Object.values(egraph.nodes)) {
    eclassNodeCounts.set(
      node.eclass,
      (eclassNodeCounts.get(node.eclass) || 0) + 1,
    );
  }

  // Create nodes for all e-classes
  for (const [eclassId, count] of eclassNodeCounts) {
    const color = eclassColors.get(eclassId) || "#64748b";
    const classData = egraph.class_data?.[eclassId];

    // Use type if available, otherwise show the full e-class ID
    let label = eclassId;
    if (classData?.type) {
      label = `${classData.type}`;
    }

    nodes.push({
      id: `eclass-${eclassId}`,
      label,
      fill: color,
      size: 16,
      isHyperedge: true,
    });

    // Connect e-class node to all nodes in this class
    for (const [nodeId, node] of Object.entries(egraph.nodes)) {
      if (node.eclass === eclassId) {
        edges.push({
          id: `eclass-${eclassId}-${nodeId}`,
          source: `eclass-${eclassId}`,
          target: nodeId,
          label: "∈",
        });
      }
    }
  }

  return { nodes, edges };
}

/**
 * Load and parse egraph from JSON file content
 */
export function parseEGraphJSON(jsonContent: string): SerializedEGraph {
  try {
    const parsed = JSON.parse(jsonContent);

    // Validate basic structure
    if (!parsed.nodes || typeof parsed.nodes !== "object") {
      throw new Error(
        'Invalid egraph format: missing or invalid "nodes" field',
      );
    }

    return parsed as SerializedEGraph;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
    throw error;
  }
}
