
import React from 'react';
import { Element } from '@/types/wireframe';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FunnelChartRendererProps {
  properties: Element['properties'];
}

export function FunnelChartRenderer({ properties }: FunnelChartRendererProps) {
  const {
    funnelChartTitle = 'Funnel Chart',
    showTitle = true,
    funnelChartData = [
      { name: 'Awareness', value: 1000, color: '#8884d8' },
      { name: 'Interest', value: 800, color: '#82ca9d' },
      { name: 'Consideration', value: 600, color: '#ffc658' },
      { name: 'Intent', value: 400, color: '#ff7c7c' },
      { name: 'Purchase', value: 200, color: '#8dd1e1' }
    ],
    funnelPrimaryColor = '#8884d8',
    showLabels = true,
    showValues = true,
    funnelChartVariant = 'default'
  } = properties || {};

  const chartData = funnelChartData?.map((item, index) => ({
    ...item,
    color: item.color || funnelPrimaryColor
  })) || [];

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg border border-gray-200 p-4">
      {showTitle && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{funnelChartTitle}</h3>
        </div>
      )}
      
      <div className="flex-1">
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
                    // Add safety check for entry
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
      </div>
    </div>
  );
}
