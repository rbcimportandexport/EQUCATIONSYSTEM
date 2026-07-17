import React from 'react';
import type { FlowchartData } from '../utils/data';
import { GitCommit } from 'lucide-react';

interface DiagramViewerProps {
  data?: FlowchartData;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ data }) => {
  if (!data) return null;

  // Calculate viewBox boundary
  let maxX = 800;
  let maxY = 150;

  if (data.nodes.length > 0) {
    maxX = Math.max(...data.nodes.map(n => n.x)) + 150;
    maxY = Math.max(...data.nodes.map(n => n.y)) + 80;
  }

  // Draw connectors
  const renderEdge = (fromId: string, toId: string, label?: string, idx?: number) => {
    const fromNode = data.nodes.find(n => n.id === fromId);
    const toNode = data.nodes.find(n => n.id === toId);

    if (!fromNode || !toNode) return null;

    // Node dimensions for offset calculations
    const nodeW = 120;
    const nodeH = 40;

    // Calculate boundary connection points
    // Basic auto-routing: find if target is right/left or top/down
    let x1 = fromNode.x + nodeW / 2;
    let y1 = fromNode.y + nodeH / 2;
    let x2 = toNode.x + nodeW / 2;
    let y2 = toNode.y + nodeH / 2;

    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Connect horizontal
      if (dx > 0) {
        x1 = fromNode.x + nodeW;
        x2 = toNode.x;
      } else {
        x1 = fromNode.x;
        x2 = toNode.x + nodeW;
      }
    } else {
      // Connect vertical
      if (dy > 0) {
        y1 = fromNode.y + nodeH;
        y2 = toNode.y;
      } else {
        y1 = fromNode.y;
        y2 = toNode.y + nodeH;
      }
    }

    // Mid point for label text
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - 8;

    // Check if edge is drawing backwards to return. If so, draw curved/arced line to avoid overlapping
    const isBackward = dx < -100;
    let pathD = `M ${x1} ${y1} L ${x2} ${y2}`;

    if (isBackward) {
      // Draw a curved line to represent loops
      const ctrlX = (x1 + x2) / 2;
      const ctrlY = y1 - 60; // Curve upwards
      pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;
    }

    return (
      <g key={`edge-${fromId}-${toId}-${idx}`}>
        <path
          d={pathD}
          fill="none"
          stroke="var(--md-sys-color-secondary)"
          strokeWidth="2"
          markerEnd="url(#arrow)"
          strokeDasharray={label === 'Bugs Found' ? '4,4' : 'none'}
        />
        {label && (
          <text
            x={mx}
            y={isBackward ? my - 20 : my}
            textAnchor="middle"
            fontSize="10"
            fontWeight="500"
            fill="var(--md-sys-color-on-surface-variant)"
            className="diagram-edge-label"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  const renderNode = (node: typeof data.nodes[0]) => {
    const w = 120;
    const h = 40;
    const rx = node.type === 'start' || node.type === 'end' ? '20' : node.type === 'decision' ? '4' : '8';

    // Different colors for node states
    let fill = 'var(--md-sys-color-surface)';
    let stroke = 'var(--md-sys-color-outline)';
    let textFill = 'var(--md-sys-color-on-surface)';

    if (node.type === 'start') {
      fill = 'var(--md-sys-color-primary-container)';
      stroke = 'var(--md-sys-color-primary)';
      textFill = 'var(--md-sys-color-on-primary-container)';
    } else if (node.type === 'end') {
      fill = 'var(--md-sys-color-success-container)';
      stroke = 'var(--md-sys-color-success)';
      textFill = 'var(--md-sys-color-on-success-container)';
    } else if (node.type === 'decision') {
      fill = 'var(--md-sys-color-tertiary-container)';
      stroke = 'var(--md-sys-color-tertiary)';
      textFill = 'var(--md-sys-color-on-tertiary-container)';
    }

    return (
      <g key={node.id} className="diagram-node-group">
        {node.type === 'decision' ? (
          // Diamond shape for decision
          <polygon
            points={`${node.x + w/2},${node.y} ${node.x + w},${node.y + h/2} ${node.x + w/2},${node.y + h} ${node.x},${node.y + h/2}`}
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
          />
        ) : (
          // Rectangle or capsule
          <rect
            x={node.x}
            y={node.y}
            width={w}
            height={h}
            rx={rx}
            fill={fill}
            stroke={stroke}
            strokeWidth="1.5"
          />
        )}
        <text
          x={node.x + w / 2}
          y={node.y + h / 2 + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          fill={textFill}
          className="diagram-node-label"
        >
          {node.label}
        </text>
      </g>
    );
  };

  return (
    <div className="diagram-viewer-card">
      <h3 className="section-subtitle">
        <GitCommit size={18} className="subtitle-icon" />
        <span>Technical Flowchart & Architectural Blueprint</span>
      </h3>
      
      <div className="svg-container">
        <svg
          viewBox={`0 0 ${maxX} ${maxY}`}
          width="100%"
          height="auto"
          className="diagram-svg"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--md-sys-color-secondary)" />
            </marker>
          </defs>
          
          {/* Render Connections */}
          {data.edges.map((edge, idx) => renderEdge(edge.from, edge.to, edge.label, idx))}

          {/* Render Nodes */}
          {data.nodes.map(node => renderNode(node))}
        </svg>
      </div>
    </div>
  );
};
