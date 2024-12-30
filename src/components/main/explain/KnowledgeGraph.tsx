import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape'; // Import cytoscape library for graph rendering
import { fetchData } from '../../../services/FetchingData'; // Service for data fetching (not used directly here)

// Define the interface for props
interface KGProps {
  explainDataKG: any; // Data for the knowledge graph (nodes and relationships)
}

// React functional component for rendering the Knowledge Graph
const KnowledgeGraph: React.FC<KGProps> = ({ explainDataKG }) => {
  const graphContainer = useRef<HTMLDivElement>(null); // Ref for graph container element
  const [data, setData] = useState<any>(null); // Local state (currently unused)

  // Effect to initialize and render the cytoscape graph
  useEffect(() => {
    // Check if required data and container exist before rendering
    if (
      explainDataKG?.entities &&
      explainDataKG?.relationships &&
      graphContainer?.current
    ) {
      // Convert entities (nodes) and relationships (edges) into Cytoscape elements
      const elements = [
        ...explainDataKG.entities.map((entity: any) => ({
          data: { id: entity.id, name: entity.name, ...entity.attributes },
        })),
        ...explainDataKG.relationships.map((rel: any) => ({
          data: {
            source: rel.source, // Edge source
            target: rel.target, // Edge target
            type: rel.type, // Edge type
            ...rel.attributes, // Additional attributes
          },
        })),
      ];

      // Initialize Cytoscape instance
      const cy = cytoscape({
        container: graphContainer.current, // Graph container reference
        elements: elements, // Graph data (nodes and edges)
        style: [
          // Style for nodes
          {
            selector: 'node',
            style: {
              'background-color': '#e6f5fb', // Light blue background
              label: 'data(name)', // Display node label
              'text-valign': 'center', // Center text vertically
              'text-halign': 'center', // Center text horizontally
              width: '70px',
              height: '70px',
              'font-size': '12px',
              color: '#333', // Text color
            },
          },
          // Style for selected nodes
          {
            selector: 'node:selected',
            style: {
              'border-width': '3px',
              'border-color': '#057fa6', // Highlight color
            },
          },
          // Style for a specific node with id "Techcorp"
          {
            selector: "node[id='Techcorp']",
            style: {
              'background-color': '#b55050', // Darker red background
              label: 'data(name)',
              'text-valign': 'center',
              'text-halign': 'center',
              width: '50px',
              height: '50px',
              'font-size': '12px',
              color: 'black',
            },
          },
          // Style for edges
          {
            selector: 'edge',
            style: {
              width: 1, // Edge line width
              'curve-style': 'bezier', // Curved lines for edges
              'text-rotation': 'autorotate', // Rotate text along the edge
              'text-margin-y': -10,
              'line-color': '#a2b4c8', // Line color
              'target-arrow-shape': 'triangle', // Arrow shape at the end of edges
              label: 'data(type)', // Display edge type as label
              'font-size': '12px',
              color: '#999', // Text color
              'source-distance-from-node': 10,
              'target-distance-from-node': 10,
            },
          },
        ],
      });

      // Cleanup function to destroy the cytoscape instance
      return () => cy.destroy();
    }
  }, [explainDataKG]); // Re-run effect when explainDataKG changes

  // Render the graph container
  return (
    <div
      ref={graphContainer} // Attach ref to the container
      style={{ width: '100%', height: '100%', margin: '0 auto' }} // Style to ensure full size
    />
  );
};

export default KnowledgeGraph;
