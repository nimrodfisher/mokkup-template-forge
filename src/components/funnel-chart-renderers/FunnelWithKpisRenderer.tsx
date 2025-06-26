
import React from 'react';
import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FunnelWithKpisRendererProps {
  chartData: Array<{ name: string; value: number; color: string }>;
  showLabels: boolean;
  showValues: boolean;
  funnelPrimaryColor: string;
  labelPosition: 'left' | 'right' | 'inside' | 'outside' | 'top' | 'bottom';
  funnelKpis?: Array<{ title: string; value: string; change?: string }>;
  funnelTexts?: Array<{ title: string; content: string }>;
  showText?: boolean;
}

export function FunnelWithKpisRenderer({ 
  chartData, 
  showLabels, 
  showValues, 
  funnelPrimaryColor,
  labelPosition,
  funnelKpis = [],
  funnelTexts = [],
  showText = false
}: FunnelWithKpisRendererProps) {
  console.log('FunnelWithKpisRenderer props:', { chartData, showLabels, showValues, funnelKpis, funnelTexts, showText });

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
    if (!entry || !entry.payload) return '';
    
    const name = entry.payload.name || '';
    const value = entry.payload.value || entry.value || 0;
    const formattedValue = value.toLocaleString();
    
    if (showValues) {
      return `${name}: ${formattedValue}`;
    }
    return name;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+') || (!change.startsWith('-') && !change.startsWith('0'))) {
      return 'text-green-600';
    }
    if (change.startsWith('-')) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+') || (!change.startsWith('-') && !change.startsWith('0'))) {
      return <TrendingUp className="h-3 w-3" />;
    }
    if (change.startsWith('-')) {
      return <TrendingDown className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* KPIs and Text Section */}
      {(funnelKpis.length > 0 || (showText && funnelTexts.length > 0)) && (
        <div className="mb-4 p-2 space-y-3">
          {/* KPIs */}
          {funnelKpis.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {funnelKpis.map((kpi, index) => (
                <div key={`kpi-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1 font-medium">{kpi.title}</div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{kpi.value}</div>
                  {kpi.change && (
                    <div className={`text-xs flex items-center gap-1 ${getChangeColor(kpi.change)}`}>
                      {getChangeIcon(kpi.change)}
                      <span>{kpi.change}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Text Elements */}
          {showText && funnelTexts.length > 0 && (
            <div className="space-y-2">
              {funnelTexts.map((text, index) => (
                <div key={`text-${index}`} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-blue-900 mb-1">{text.title}</div>
                  <div className="text-sm text-blue-700">{text.content}</div>
                </div>
              ))}
            </div>
          )}
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
              {showLabels && (
                <LabelList 
                  position="center" 
                  fill="#ffffff" 
                  stroke="none"
                  fontSize={12}
                  fontWeight="500"
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
