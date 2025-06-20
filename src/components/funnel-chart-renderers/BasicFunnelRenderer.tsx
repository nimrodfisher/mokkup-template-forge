
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
                if (!entry || typeof entry !== 'object') {
                  return '';
                }
                
                if (showValues) {
                  return `${entry.name || ''}: ${value || ''}`;
                }
                return entry.name || '';
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
