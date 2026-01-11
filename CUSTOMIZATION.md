# Customization Guide

## Adding Your Own Hypergraph Data

### Method 1: Edit Examples

Add your data to `src/utils/examples.ts`:

```typescript
{
  name: 'My Custom Graph',
  description: 'Description of my graph',
  data: {
    nodes: [
      { id: 'n1', label: 'Node 1', color: '#60a5fa' },
      { id: 'n2', label: 'Node 2', color: '#60a5fa' },
      // Add more nodes...
    ],
    hyperedges: [
      {
        id: 'h1',
        nodes: ['n1', 'n2'],  // IDs of connected nodes
        label: 'My Hyperedge',
        color: '#f59e0b',
      },
      // Add more hyperedges...
    ],
  },
}
```

### Method 2: Load from JSON

Create a JSON file with your data and import it:

```typescript
// data.json
{
  "nodes": [
    { "id": "n1", "label": "Node 1" }
  ],
  "hyperedges": [
    { "id": "h1", "nodes": ["n1", "n2"], "label": "Edge 1" }
  ]
}
```

Then in your component:
```typescript
import data from './data.json';
```

### Method 3: Fetch from API

Modify `App.tsx` to fetch data:

```typescript
const [hypergraphData, setHypergraphData] = useState<HypergraphData | null>(null);

useEffect(() => {
  fetch('https://api.example.com/graph-data')
    .then(res => res.json())
    .then(data => setHypergraphData(data));
}, []);
```

## Customizing Appearance

### Node Colors

In your data, specify colors for nodes:
```typescript
{ id: 'n1', label: 'Node 1', color: '#ff0000' }  // Red node
```

### Node Sizes

Adjust node sizes:
```typescript
{ id: 'n1', label: 'Big Node', size: 20 }  // Larger node
```

### Hyperedge Colors

Each hyperedge can have its own color:
```typescript
{ id: 'h1', nodes: ['n1', 'n2'], color: '#00ff00' }  // Green hyperedge
```

### Graph Layout

Edit `src/components/HypergraphVisualization.tsx` to change layout:

```typescript
<GraphCanvas
  layoutType="forceDirected2d"  // Options: forceDirected2d, forceDirected3d
  // ... other props
/>
```

### Background Color

Change background in `HypergraphVisualization.tsx`:
```typescript
<div style={{ background: '#ffffff' }}>  // White background
```

## Advanced Customization

### 3D Visualization

Switch to 3D mode:
```typescript
<GraphCanvas
  layoutType="forceDirected3d"
  // ...
/>
```

### Custom Node Rendering

Modify the `renderNode` function in `HypergraphVisualization.tsx`:

```typescript
renderNode={(node) => {
  const isHyperedge = node.data?.isHyperedge;
  return {
    ...node,
    size: isHyperedge ? 12 : 15,
    opacity: isHyperedge ? 0.6 : 1,
    // Add custom styling
  };
}}
```

### Edge Styling

Customize edge appearance:
```typescript
<GraphCanvas
  edgeInterpolation="curved"  // Options: curved, linear
  edgeArrowPosition="end"     // Add arrows
  // ...
/>
```

### Force-Directed Settings

Fine-tune the physics simulation in `HypergraphVisualization.tsx`:

```typescript
<GraphCanvas
  // ... other props
  clusterAttribute="group"  // Enable clustering
/>
```

## Performance Optimization

### For Large Graphs (1000+ nodes)

1. **Disable labels on small nodes:**
```typescript
labelType="nodes"  // Only show labels on hover
```

2. **Simplify rendering:**
```typescript
renderNode={(node) => ({
  ...node,
  // Reduce visual complexity
})}
```

3. **Use 2D instead of 3D:**
```typescript
layoutType="forceDirected2d"
```

### Lazy Loading

For very large datasets, implement pagination or lazy loading:

```typescript
const [visibleNodes, setVisibleNodes] = useState(
  allNodes.slice(0, 100)
);
```

## Color Schemes

### Popular Palettes

Tailwind CSS colors (already used):
- Blue: `#60a5fa`
- Red: `#ef4444`
- Green: `#10b981`
- Purple: `#8b5cf6`
- Orange: `#f59e0b`

### Categorical Colors (for hyperedges)

```typescript
const colors = [
  '#f59e0b', '#10b981', '#8b5cf6', '#ec4899',
  '#14b8a6', '#f97316', '#06b6d4', '#84cc16'
];
```

## Export Options

### Export Graph Data

Add a button to export the current graph:

```typescript
const exportData = () => {
  const json = JSON.stringify(hypergraphData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hypergraph-data.json';
  a.click();
};
```

### Screenshot

Reagraph supports taking screenshots programmatically. Check the documentation for details.

## Interactivity

### Click Handlers

Handle node clicks in `HypergraphVisualization.tsx`:

```typescript
const { selections, onNodeClick } = useSelection({
  nodes: graphData.nodes,
  edges: graphData.edges,
  onNodeClick: (node) => {
    console.log('Clicked node:', node);
    // Add custom logic
  }
});
```

### Context Menu

Already implemented! Right-click nodes to see the context menu.

## Resources

- [Reagraph Documentation](https://reagraph.dev/)
- [D3-Force Documentation](https://github.com/d3/d3-force)
- [Three.js Documentation](https://threejs.org/)
