
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';

interface FunnelWithButtonsRendererProps {
  chartData: Array<{ name: string; value: number; color: string }>;
  showLabels: boolean;
  showValues: boolean;
  funnelPrimaryColor: string;
  funnelButtons?: Array<{ title: string; alignment: string }>;
}

export function FunnelWithButtonsRenderer({ 
  chartData, 
  showLabels, 
  showValues, 
  funnelPrimaryColor,
  funnelButtons = []
}: FunnelWithButtonsRendererProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Buttons Section */}
      {funnelButtons.length > 0 && (
        <div className="flex justify-between items-center mb-4 px-2">
          {funnelButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`${button.alignment === 'right' ? 'ml-auto' : ''}`}
            >
              {button.title}
            </Button>
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
