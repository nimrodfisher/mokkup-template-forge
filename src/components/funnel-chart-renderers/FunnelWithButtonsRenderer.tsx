
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, Filter, RefreshCw } from 'lucide-react';

interface FunnelWithButtonsRendererProps {
  chartData: Array<{ name: string; value: number; color: string }>;
  showLabels: boolean;
  showValues: boolean;
  funnelPrimaryColor: string;
  funnelButtons?: Array<{ title: string; alignment: string }>;
  funnelDropdowns?: Array<{ title: string; values: string[]; editText?: string }>;
  showDropdowns?: boolean;
}

export function FunnelWithButtonsRenderer({ 
  chartData, 
  showLabels, 
  showValues, 
  funnelPrimaryColor,
  funnelButtons = [],
  funnelDropdowns = [],
  showDropdowns = false
}: FunnelWithButtonsRendererProps) {
  console.log('FunnelWithButtonsRenderer props:', { chartData, showLabels, showValues, funnelButtons, funnelDropdowns, showDropdowns });

  const handleButtonClick = (buttonTitle: string) => {
    console.log(`Button clicked: ${buttonTitle}`);
    
    // Add specific functionality based on button title
    switch (buttonTitle.toLowerCase()) {
      case 'export':
      case 'download':
        // Export functionality
        console.log('Exporting chart data...');
        break;
      case 'filter':
        // Filter functionality
        console.log('Opening filter options...');
        break;
      case 'refresh':
        // Refresh functionality
        console.log('Refreshing data...');
        break;
      default:
        console.log(`Custom action for: ${buttonTitle}`);
    }
  };

  const getButtonIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('export') || lowerTitle.includes('download')) {
      return <Download className="h-4 w-4" />;
    }
    if (lowerTitle.includes('filter')) {
      return <Filter className="h-4 w-4" />;
    }
    if (lowerTitle.includes('refresh')) {
      return <RefreshCw className="h-4 w-4" />;
    }
    return null;
  };

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
    <div className="h-full flex flex-col">
      {/* Buttons Section */}
      {funnelButtons.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-2">
          {funnelButtons.map((button, index) => {
            const isRightAligned = button.alignment === 'right';
            return (
              <div key={index} className={`flex ${isRightAligned ? 'ml-auto' : ''}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => handleButtonClick(button.title)}
                >
                  {getButtonIcon(button.title)}
                  <span className={getButtonIcon(button.title) ? 'ml-1' : ''}>
                    {button.title}
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Chart Section */}
      <div className="flex-1">
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
      </div>
    </div>
  );
}
