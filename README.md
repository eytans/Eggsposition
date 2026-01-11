# Eggsposition

**Interactive e-graph visualization tool for the community**

Eggsposition is a web-based visualizer for e-graphs, built to help the community debug and understand e-graph-based program optimizations and equality saturation.

🎉 **Fully vibecoded after the Dagstuhl seminar on debugability of e-graphs!**

Built on top of [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) format.

![Eggsposition Demo](https://img.shields.io/badge/status-live-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)

## 🚀 Quick Start

**Try it live:** [https://eytans.github.io/Eggsposition/](https://eytans.github.io/Eggsposition/)

### Local Development

```bash
git clone --recursive https://github.com/eytans/Eggsposition.git
cd Eggsposition
npm install
npm run build:wasm
npm run dev
```

Open http://localhost:5173 and drag-and-drop your e-graph JSON file!

## ✨ Features

- 🎯 **Native E-graph Format** - Uses [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) JSON format
- 🖱️ **Drag & Drop** - Simply drop your JSON file into the browser
- 📊 **Clear Visualization** - E-classes (rectangles) and e-nodes (circles)
- ➡️ **Directional Edges** - Shows argument flow with labels (arg0, arg1, etc.)
- 🎨 **Interactive** - Drag nodes, zoom, pan, and re-center
- ⚡ **High Performance** - Force-directed layout with smooth animations
- 🛠️ **CLI Tool** - Validate e-graph files from command line
- 🦀 **WASM-Powered** - Rust egraph-serialize library compiled to WebAssembly

## 📖 E-graph Visualization

Eggsposition visualizes e-graphs following the proper structure:

- **Rectangles** = E-classes (equivalence classes)
- **Circles** = E-nodes (individual operations/terms)
- **Edges** = Relationships:
  - `E-class → E-node` = Membership (∈)
  - `E-node → E-class` = Arguments (arg0, arg1, ...)

## 🎯 E-graph Format

Eggsposition uses the [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) format:

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

## 🔧 CLI Tool

Validate and inspect e-graph files:

```bash
./cli/eggsposition fibonacci.json
```

Output:
```
📂 Loading e-graph from: fibonacci.json
✅ Parsed e-graph with 20 nodes
📊 E-graph contains 11 e-classes
🔧 Top operations:
   fib: 9
   0: 1
   1: 1
✨ E-graph validation successful!
```

## 🏗️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **react-force-graph-2d** - Graph visualization
- **Rust + WASM** - E-graph parsing via egraph-serialize
- **GitHub Actions** - Automatic deployment

## 📦 Building for Production

```bash
npm run build:wasm   # Compile WASM module
npm run build        # Build web app
```

## 🎓 Background

This project was created following the **Dagstuhl seminar on debugability of e-graphs** to provide the community with better tools for understanding and debugging e-graph-based optimizations.

E-graphs are a powerful data structure for program optimization and equality saturation, but they can be difficult to visualize and debug. Eggsposition aims to make e-graphs more accessible and understandable.

## 🙏 Acknowledgments

- [egraph-serialize](https://github.com/egraphs-good/egraph-serialize) - E-graph serialization format
- [egg](https://github.com/egraphs-good/egg) - E-graph library
- The Dagstuhl seminar participants for inspiration and feedback
- The e-graphs community

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Live Demo**: https://eytans.github.io/Eggsposition/
- **egraph-serialize**: https://github.com/egraphs-good/egraph-serialize
- **egg Documentation**: https://docs.rs/egg/
- **Equality Saturation**: https://egraphs-good.github.io/

---

**Built with ❤️ for the e-graphs community**
