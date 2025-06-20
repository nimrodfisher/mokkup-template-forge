
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface FunnelWithKpisRendererProps {
  chartData: Array<{ name: string; value: number; color: string }>;
  showLabels: boolean;
  showValues: boolean;
  funnelPrimaryColor: string;
  funnelKpis?: Array<{ title: string; value: string; change: string }>;
}

export function FunnelWithKpisRenderer({ 
  chartData, 
  showLabels, 
  showValues, 
  funnelPrimaryColor,
  funnelKpis = []
}: FunnelWithKpisRendererProps) {
  return (
    <div className="h-full flex flex-col">
      {/* KPIs Section */}
      {funnelKpis.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {funnelKpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{kpi.title}</div>
              <div className="text-lg font-semibold text-gray-900">{kpi.value}</div>
              <div className="text-sm text-green-600">{kpi.change}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Chart Section */}
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
