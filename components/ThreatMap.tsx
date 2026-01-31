import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { VectorNode } from '../types';
import { COLORS } from '../constants';

interface ThreatMapProps {
  onNodeSelect?: (node: VectorNode) => void;
  isActive: boolean;
  className?: string;
}

export const ThreatMap: React.FC<ThreatMapProps> = ({ onNodeSelect, isActive, className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<VectorNode[]>([]);

  // Initialize nodes once
  useEffect(() => {
    // Sparse, strategic node placement
    const initialNodes: VectorNode[] = Array.from({ length: 24 }).map((_, i) => ({
      id: `VEC-${(100 + i).toString().padStart(3, '0')}`,
      x: Math.random() * 1000,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.03, 
      vy: (Math.random() - 0.5) * 0.01,
      type: i % 3 === 0 ? 'kinetic' : i % 3 === 1 ? 'cyber' : 'resource',
      instability: Math.random(),
      radius: Math.random() > 0.8 ? 5 : 2, 
      label: `SEC-${Math.floor(Math.random() * 90) + 10}`
    }));
    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || nodes.length === 0) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])
      .style('background-color', COLORS.VOID);

    svg.selectAll('*').remove();

    const gLayerStatic = svg.append('g').attr('class', 'static-layer');
    const gLayerDynamic = svg.append('g').attr('class', 'dynamic-layer');
    
    // Abstract grid lines (Horizons)
    const horizons = [height * 0.3, height * 0.5, height * 0.7];
    gLayerStatic.selectAll('.horizon')
      .data(horizons)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', d => d)
      .attr('x2', width)
      .attr('y2', d => d)
      .attr('stroke', COLORS.TEXT)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.05);

    // Dynamic Simulation
    const simulation = d3.forceSimulation(nodes)
      .alphaDecay(0) 
      .velocityDecay(0.8) 
      .force('charge', d3.forceManyBody().strength(-2)) 
      .force('field', (alpha) => {
        nodes.forEach(node => {
           // Slow drift
           node.x += node.vx;
           node.y += node.vy;
           
           // Wrap
           if (node.x > width) node.x = 0;
           if (node.x < 0) node.x = width;
           if (node.y > height) node.y = 0;
           if (node.y < 0) node.y = height;
        });
      });

    const nodeGroup = gLayerDynamic.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g');

    // Vector Crosses
    nodeGroup.append('path')
      .attr('d', d => {
         const s = d.radius; 
         return `M ${-s},0 L ${s},0 M 0,${-s} L 0,${s}`;
      })
      .attr('stroke', COLORS.TEXT)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.2)
      .attr('fill', 'none');

    simulation.on('tick', () => {
      nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, isActive]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
       <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10] via-transparent to-[#0A0C10] z-10 opacity-80"></div>
       <svg ref={svgRef} className="w-full h-full relative z-0 opacity-40"></svg>
    </div>
  );
};
