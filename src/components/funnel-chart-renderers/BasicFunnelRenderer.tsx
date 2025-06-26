
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

  const renderCustomLabel = (entry: any) => {
    console.log('Rendering label for entry:', entry);
    
    if (!entry || !entry.payload) {
      console.log('No entry or payload found');
      return '';
    }
    
    const name = entry.payload.name || '';
    const value = entry.payload.value || entry.value || 0;
    const formattedValue = value.toLocaleString();
    
    console.log('Label data:', { name, value, formattedValue, showLabels, showValues });
    
    if (showLabels && showValues) {
      return `${name}: ${formattedValue}`;
    } else if (showLabels) {
      return name;
    } else if (showValues) {
      return formattedValue;
    }
    
    return '';
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
          {(showLabels || showValues) && (
            <LabelList 
              position="center" 
              fill="#ffffff" 
              stroke="none"
              fontSize={14}
              fontWeight="600"
              content={renderCustomLabel}
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
