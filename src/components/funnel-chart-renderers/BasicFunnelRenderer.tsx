
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BasicFunnelRendererProps {
  chartData: Array<{ name: string; value: number; color: string }>;
  showLabels: boolean;
  showValues: boolean;
  funnelPrimaryColor: string;
}

export function BasicFunnelRenderer({ 
  chartData, 
  showLabels, 
  showValues, 
  funnelPrimaryColor 
}: BasicFunnelRendererProps) {
  console.log('BasicFunnelRenderer props:', { chartData, showLabels, showValues });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">
            Value: <span className="font-medium">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Tooltip content={<CustomTooltip />} />
        <Funnel
          dataKey="value"
          data={chartData}
          isAnimationActive={true}
          animationDuration={800}
        >
          {showLabels && (
            <LabelList 
              position="center" 
              fill="#ffffff" 
              stroke="none"
              fontSize={14}
              fontWeight="600"
              formatter={(value: any, entry: any) => {
                if (!entry || !entry.payload) return '';
                
                const payload = entry.payload;
                const name = payload.name || '';
                const formattedValue = value ? value.toLocaleString() : '';
                
                if (showValues) {
                  return `${name}\n${formattedValue}`;
                }
                return name;
              }}
            />
          )}
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
