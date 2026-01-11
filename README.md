# Eggsposition

**High-performance e-graph visualization tool** built with React, TypeScript, and WebGL.

Eggsposition visualizes e-graphs in the [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) format, making it easy to understand and debug e-graph-based program optimizations and equality saturation.

![Eggsposition](https://img.shields.io/badge/status-ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![WebGL](https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white)

## ✨ Features

- 🎯 **Native E-graph Support** - Direct support for egraph-serialize JSON format
- 🚀 **High Performance** - WebGL-accelerated rendering handles thousands of nodes
- 🎨 **Interactive Visualization** - Drag nodes, zoom, pan, and select
- 📁 **Drag & Drop** - Simply drop your JSON file into the browser
- 🔧 **CLI Tool** - Validate and inspect e-graphs from the command line
- 🦀 **WASM-Powered** - Uses Rust egraph-serialize library compiled to WebAssembly
- 🎪 **Examples Included** - Sample datasets to get started

## 🚀 Quick Start

### Installation

```bash
git clone --recursive https://github.com/yourusername/Eggsposition.git
cd Eggsposition
npm install
```

### Build WASM Module (First Time)

```bash
npm run build:wasm
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Use the CLI

```bash
./cli/eggsposition egraph-serialize/tests/fibonacci.json
```

## 📊 Using the CLI

The CLI tool validates e-graph JSON files and displays statistics:

```bash
./cli/eggsposition <your-egraph.json>
```

Example output:
```
📂 Loading e-graph from: fibonacci.json
🔍 Parsing e-graph...
✅ Parsed e-graph with 20 nodes
📊 E-graph contains 11 e-classes
🔗 Nodes with children: 9

🔧 Top operations:
   fib: 9
   0: 1
   1: 1

✨ E-graph validation successful!
```

## 🎨 Visualization

### Load E-graph Files

1. **Drag & Drop**: Simply drag a JSON file into the browser window
2. **File Picker**: Click "Load E-graph JSON" and select a file
3. **Examples**: Use the dropdown to view built-in hypergraph examples

### E-graph Format

Eggsposition supports the [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) JSON format:

```json
{
  "nodes": {
    "node1": {
      "op": "add",
      "children": ["node2", "node3"],
      "eclass": "class1",
      "cost": 1.0
    }
  },
  "root_eclasses": ["class1"],
  "class_data": {
    "class1": {
      "type": "i64"
    }
  }
}
```

### Visualization Features

- **Nodes**: Each e-node is visualized with its operation name
- **E-classes**: Grouped nodes shown with colored clusters
- **Edges**: Show parent-child relationships between nodes
- **Interactive**: 
  - Drag nodes to rearrange
  - Click to select
  - Scroll to zoom
  - Pan the canvas

## 🏗️ Project Structure

```
Eggsposition/
├── src/
│   ├── components/           # React components
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Converters and utilities
│   └── App.tsx               # Main application
├── egraph-wasm/              # Rust WASM wrapper
│   ├── src/lib.rs           # WASM bindings
│   └── Cargo.toml           # Rust dependencies
├── egraph-serialize/         # Submodule: egraph format library
├── cli/
│   └── eggsposition         # CLI tool
└── dist/                     # Production build
```

## 🔧 Development

### Build Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:wasm   # Compile Rust to WASM
npm run preview      # Preview production build
npm run lint         # Lint code
```

### Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Reagraph** - WebGL graph visualization
- **Three.js** - 3D graphics (via Reagraph)
- **Rust + WASM** - High-performance e-graph parsing

## 📦 Building for Production

```bash
npm run build:wasm   # Compile WASM module
npm run build        # Build web app
```

The optimized build will be in the `dist/` folder, ready to deploy to any static hosting service.

## 🎯 Use Cases

- **E-graph Debugging** - Visualize e-graphs from egg or egglog
- **Optimization Analysis** - Understand equality saturation results
- **Education** - Learn about e-graphs and term rewriting
- **Research** - Explore program synthesis and optimization

## 📚 Sample E-graphs

Sample e-graphs are included in the `egraph-serialize/tests/` directory:

- `tiny.json` - Minimal example
- `fibonacci.json` - Fibonacci computation
- `math_powers.json` - Mathematical expressions
- `lambda_if.json` - Lambda calculus terms

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional layout algorithms
- Export to image/SVG
- Search and filter functionality
- Animation of e-graph construction
- Integration with egg/egglog

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) - E-graph serialization format
- [egg](https://github.com/egraphs-good/egg) - E-graph library
- [Reagraph](https://reagraph.dev/) - Graph visualization library

## 🔗 Links

- [egraph-serialize GitHub](https://github.com/egraphs-good/egraph-serialize)
- [egg Documentation](https://docs.rs/egg/)
- [Equality Saturation](https://egraphs-good.github.io/)

---

**Made with ❤️ for the e-graphs community**
