
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip 
          formatter={(value: any) => [value, 'Value']}
          labelFormatter={(label) => `Stage: ${label}`}
        />
        <Funnel
          dataKey="value"
          data={chartData}
          isAnimationActive={true}
        >
          {showLabels && (
            <LabelList 
              position="center" 
              fill="#fff" 
              stroke="none"
              fontSize={12}
              formatter={(value: any, entry: any) => {
                console.log('Label formatter called with:', { value, entry });
                
                if (!entry || !entry.payload) {
                  return '';
                }
                
                const payload = entry.payload;
                if (showValues) {
                  return `${payload.name || ''}: ${value || ''}`;
                }
                return payload.name || '';
              }}
            />
          )}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
