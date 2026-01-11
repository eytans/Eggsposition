#!/usr/bin/env node

/**
 * CLI tool for Eggsposition
 * Usage: Eggsposition <file.json>
 */

import { readFileSync } from 'fs';
import { parseEGraphJSON, convertEGraphToGraph } from '../src/utils/egraphConverter.js';

function printUsage() {
  console.log(`
Eggsposition - E-graph Visualization Tool

Usage:
  Eggsposition <file.json>

Arguments:
  file.json    Path to an e-graph JSON file (egraph-serialize format)

Examples:
  Eggsposition fibonacci.json
  Eggsposition path/to/egraph.json
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printUsage();
    process.exit(0);
  }

  const filePath = args[0];

  try {
    console.log(`Loading e-graph from: ${filePath}`);
    const jsonContent = readFileSync(filePath, 'utf-8');

    console.log('Parsing e-graph...');
    const egraph = parseEGraphJSON(jsonContent);

    console.log(`✓ Parsed e-graph with ${Object.keys(egraph.nodes).length} nodes`);

    if (egraph.root_eclasses && egraph.root_eclasses.length > 0) {
      console.log(`✓ Root e-classes: ${egraph.root_eclasses.join(', ')}`);
    }

    console.log('\nConverting to visualization format...');
    const graphData = convertEGraphToGraph(egraph);

    console.log(`✓ Graph has ${graphData.nodes.length} nodes and ${graphData.edges.length} edges`);

    // Count e-classes
    const eclasses = new Set(Object.values(egraph.nodes).map(n => n.eclass));
    console.log(`✓ E-graph contains ${eclasses.size} e-classes`);

    console.log('\n✨ E-graph loaded successfully!');
    console.log('To visualize, run: npm run dev');
    console.log('Then drag and drop this JSON file into the browser window.');

  } catch (error) {
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main();
