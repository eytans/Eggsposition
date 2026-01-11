import type { HypergraphData } from "../types/hypergraph";

export interface Example {
  name: string;
  description: string;
  data: HypergraphData;
}

export const examples: Example[] = [
  {
    name: "Team Collaboration",
    description: "People working across multiple teams",
    data: {
      nodes: [
        { id: "n1", label: "Alice", color: "#60a5fa" },
        { id: "n2", label: "Bob", color: "#60a5fa" },
        { id: "n3", label: "Charlie", color: "#60a5fa" },
        { id: "n4", label: "David", color: "#60a5fa" },
        { id: "n5", label: "Eve", color: "#60a5fa" },
        { id: "n6", label: "Frank", color: "#60a5fa" },
        { id: "n7", label: "Grace", color: "#60a5fa" },
        { id: "n8", label: "Henry", color: "#60a5fa" },
      ],
      hyperedges: [
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
      ],
    },
  },
  {
    name: "Academic Papers",
    description: "Co-authorship network with multiple authors per paper",
    data: {
      nodes: [
        { id: "a1", label: "Dr. Smith", color: "#60a5fa" },
        { id: "a2", label: "Dr. Jones", color: "#60a5fa" },
        { id: "a3", label: "Dr. Brown", color: "#60a5fa" },
        { id: "a4", label: "Dr. Lee", color: "#60a5fa" },
        { id: "a5", label: "Dr. Chen", color: "#60a5fa" },
        { id: "a6", label: "Dr. Wilson", color: "#60a5fa" },
      ],
      hyperedges: [
        {
          id: "p1",
          nodes: ["a1", "a2", "a3"],
          label: "Paper: ML Advances",
          color: "#f59e0b",
        },
        {
          id: "p2",
          nodes: ["a2", "a4"],
          label: "Paper: Neural Nets",
          color: "#10b981",
        },
        {
          id: "p3",
          nodes: ["a1", "a3", "a5", "a6"],
          label: "Paper: Deep Learning",
          color: "#8b5cf6",
        },
        {
          id: "p4",
          nodes: ["a4", "a5"],
          label: "Paper: Computer Vision",
          color: "#ec4899",
        },
      ],
    },
  },
  {
    name: "Chemical Reactions",
    description: "Chemical compounds participating in reactions",
    data: {
      nodes: [
        { id: "c1", label: "H₂", color: "#60a5fa", size: 8 },
        { id: "c2", label: "O₂", color: "#60a5fa", size: 8 },
        { id: "c3", label: "H₂O", color: "#60a5fa", size: 10 },
        { id: "c4", label: "CO₂", color: "#60a5fa", size: 9 },
        { id: "c5", label: "CH₄", color: "#60a5fa", size: 9 },
        { id: "c6", label: "N₂", color: "#60a5fa", size: 8 },
        { id: "c7", label: "NH₃", color: "#60a5fa", size: 9 },
      ],
      hyperedges: [
        {
          id: "r1",
          nodes: ["c1", "c2", "c3"],
          label: "Water Formation",
          color: "#06b6d4",
        },
        {
          id: "r2",
          nodes: ["c5", "c2", "c4", "c3"],
          label: "Combustion",
          color: "#f97316",
        },
        {
          id: "r3",
          nodes: ["c6", "c1", "c7"],
          label: "Ammonia Synthesis",
          color: "#84cc16",
        },
      ],
    },
  },
  {
    name: "Social Groups",
    description: "People belonging to multiple interest groups",
    data: {
      nodes: [
        { id: "p1", label: "Emma", color: "#60a5fa" },
        { id: "p2", label: "Liam", color: "#60a5fa" },
        { id: "p3", label: "Olivia", color: "#60a5fa" },
        { id: "p4", label: "Noah", color: "#60a5fa" },
        { id: "p5", label: "Ava", color: "#60a5fa" },
        { id: "p6", label: "Ethan", color: "#60a5fa" },
        { id: "p7", label: "Sophia", color: "#60a5fa" },
        { id: "p8", label: "Mason", color: "#60a5fa" },
        { id: "p9", label: "Isabella", color: "#60a5fa" },
        { id: "p10", label: "Logan", color: "#60a5fa" },
      ],
      hyperedges: [
        {
          id: "g1",
          nodes: ["p1", "p2", "p5", "p7"],
          label: "Book Club",
          color: "#f59e0b",
        },
        {
          id: "g2",
          nodes: ["p2", "p3", "p4", "p6", "p8"],
          label: "Gaming Group",
          color: "#10b981",
        },
        {
          id: "g3",
          nodes: ["p1", "p3", "p9"],
          label: "Yoga Class",
          color: "#8b5cf6",
        },
        {
          id: "g4",
          nodes: ["p5", "p6", "p7", "p10"],
          label: "Hiking Club",
          color: "#ec4899",
        },
        {
          id: "g5",
          nodes: ["p4", "p8", "p9", "p10"],
          label: "Photography",
          color: "#14b8a6",
        },
      ],
    },
  },
];
