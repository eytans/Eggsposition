import type {
  HypergraphData,
  GraphData,
  GraphNode,
  GraphEdge,
} from "../types/hypergraph";

/**
 * Converts hypergraph data to a standard graph representation
 * Each hyperedge becomes a virtual node connected to all its member nodes
 */
export function convertToGraph(hypergraph: HypergraphData): GraphData {
  return convertHypergraphToGraph(hypergraph);
}

export function convertHypergraphToGraph(
  hypergraph: HypergraphData,
): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Add original nodes
  hypergraph.nodes.forEach((node) => {
    nodes.push({
      id: node.id,
      label: node.label,
      fill: node.color || node.fill || "#3b82f6",
      size: node.size || 10,
      isHyperedge: false,
    });
  });

  // Add hyperedge virtual nodes and connections
  hypergraph.hyperedges.forEach((hyperedge) => {
    const hyperedgeNodeId = `he_${hyperedge.id}`;

    // Create virtual node for hyperedge
    nodes.push({
      id: hyperedgeNodeId,
      label: hyperedge.label || `HE-${hyperedge.id}`,
      fill: hyperedge.color || "#ef4444",
      size: 8,
      isHyperedge: true,
    });

    // Connect hyperedge node to all its member nodes
    hyperedge.nodes.forEach((nodeId, index) => {
      edges.push({
        id: `${hyperedge.id}_${nodeId}_${index}`,
        source: hyperedgeNodeId,
        target: nodeId,
        label: "",
      });
    });
  });

  return { nodes, edges };
}

/**
 * Generate sample hypergraph data for demonstration
 */
export function generateSampleHypergraph(): HypergraphData {
  const nodes = [
    { id: "n1", label: "Alice", color: "#60a5fa" },
    { id: "n2", label: "Bob", color: "#60a5fa" },
    { id: "n3", label: "Charlie", color: "#60a5fa" },
    { id: "n4", label: "David", color: "#60a5fa" },
    { id: "n5", label: "Eve", color: "#60a5fa" },
    { id: "n6", label: "Frank", color: "#60a5fa" },
    { id: "n7", label: "Grace", color: "#60a5fa" },
    { id: "n8", label: "Henry", color: "#60a5fa" },
  ];

  const hyperedges = [
    {
      id: "h1",
      nodes: ["n1", "n2", "n3"],
      label: "Team A",
      color: "#f59e0b",
    },
    {
      id: "h2",
      nodes: ["n2", "n4", "n5"],
      label: "Team B",
      color: "#10b981",
    },
    {
      id: "h3",
      nodes: ["n3", "n5", "n6", "n7"],
      label: "Team C",
      color: "#8b5cf6",
    },
    {
      id: "h4",
      nodes: ["n1", "n4", "n8"],
      label: "Team D",
      color: "#ec4899",
    },
    {
      id: "h5",
      nodes: ["n6", "n7", "n8"],
      label: "Team E",
      color: "#14b8a6",
    },
  ];

  return { nodes, hyperedges };
}
