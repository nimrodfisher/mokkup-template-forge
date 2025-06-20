
import React from 'react';
import { ResponsiveContainer, Treemap, Cell, Tooltip } from 'recharts';

interface TreemapRendererProps {
  properties: any;
}

export function TreemapRenderer({ properties }: TreemapRendererProps) {
  const {
    treemapTitle = 'Treemap Chart',
    treemapData = [],
    treemapPrimaryColor = '#4F46E5',
    showTitle = true,
    showLabels = true,
    showValues = true,
    showButtons = false,
    showKpis = false,
    treemapButtons = [],
    treemapKpis = [],
    backgroundColor = 'transparent'
  } = properties;

  const CustomContent = (props: any) => {
    const { root, depth, x, y, width, height, index, colors, name, value } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index % colors.length)] : treemapPrimaryColor,
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && showLabels && (
          <text
            x={x + width / 2}
            y={y + height / 2 - (showValues ? 8 : 0)}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
            fontWeight="bold"
          >
            {name}
          </text>
        )}
        {depth === 1 && showValues && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={10}
          >
            {value}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full h-full" style={{ backgroundColor }}>
      <div className="p-4">
        {showTitle && (
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            {treemapTitle}
          </h3>
        )}
        
        {showButtons && treemapButtons.length > 0 && (
          <div className="flex justify-between mb-4">
            {treemapButtons.map((button, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                {button.title}
              </button>
            ))}
          </div>
        )}
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="value"
              aspectRatio={4/3}
              stroke="#fff"
              fill={treemapPrimaryColor}
              content={<CustomContent colors={treemapData.map(item => item.color || treemapPrimaryColor)} />}
            >
              <Tooltip 
                formatter={(value: any, name: any) => [value, name]}
                labelStyle={{ color: '#333' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
        
        {showKpis && treemapKpis.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {treemapKpis.map((kpi, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">{kpi.title}</div>
                <div className="text-lg font-bold text-gray-800">{kpi.value}</div>
                <div className="text-sm text-green-600">{kpi.change}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
