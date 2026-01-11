# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd eggsposition
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 (or the port shown in terminal)

### 3. Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` folder, ready to deploy!

## 📊 What You'll See

- **Interactive force-directed graph** with WebGL rendering
- **Multiple example datasets** to explore (teams, papers, chemistry, social groups)
- **Real-time FPS counter** to monitor performance
- **Smooth animations** and drag-and-drop nodes

## 🎨 Customize Your Data

Edit `src/utils/examples.ts` to add your own hypergraph:

```typescript
{
  name: 'My Graph',
  description: 'My custom hypergraph',
  data: {
    nodes: [
      { id: 'n1', label: 'Person A', color: '#60a5fa' },
      { id: 'n2', label: 'Person B', color: '#60a5fa' },
    ],
    hyperedges: [
      {
        id: 'h1',
        nodes: ['n1', 'n2'],  // Connect multiple nodes!
        label: 'Friends',
        color: '#f59e0b',
      },
    ],
  },
}
```

## 🌐 Deploy to Production

### Option 1: Netlify
```bash
npm run build
# Drag the dist/ folder to netlify.com
```

### Option 2: Vercel
```bash
npm run build
vercel --prod
```

### Option 3: Any Static Host
Just upload the `dist/` folder contents!

## 📚 Learn More

- See `README.md` for full documentation
- See `CUSTOMIZATION.md` for advanced customization
- Visit [reagraph.dev](https://reagraph.dev/) for graph library docs

## 💡 Tips

- **Performance**: The visualization uses WebGL and can handle thousands of nodes
- **Interaction**: Drag nodes, click to select, scroll to zoom
- **Examples**: Switch between examples using the dropdown menu
- **FPS**: Toggle the FPS counter to monitor performance

Enjoy visualizing your hypergraphs! 🎉
