// Type definitions for hypergraph data structures

export interface Node {
  id: string;
  label: string;
  color?: string;
  size?: number;
  fill?: string;
}

export interface Hyperedge {
  id: string;
  nodes: string[]; // Array of node IDs that are part of this hyperedge
  label?: string;
  color?: string;
}

export interface HypergraphData {
  nodes: Node[];
  hyperedges: Hyperedge[];
}

// Convert hypergraph to regular graph for visualization
// Each hyperedge becomes a virtual node connected to all its member nodes
export interface GraphNode {
  id: string;
  label: string;
  fill?: string;
  size?: number;
  isHyperedge?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
