/**
 * TypeScript types for egraph-serialize format
 * Based on https://github.com/egraphs-good/egraph-serialize
 */

export interface EGraphNode {
  op: string;
  children?: string[]; // node ids
  eclass: string; // class id
  cost?: number;
  subsumed?: boolean;
}

export interface ClassData {
  type?: string;
  [key: string]: string | undefined; // extra arbitrary data
}

export interface SerializedEGraph {
  nodes: Record<string, EGraphNode>;
  root_eclasses?: string[];
  class_data?: Record<string, ClassData>;
}
