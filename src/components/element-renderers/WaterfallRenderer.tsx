
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend } from 'recharts';

interface WaterfallRendererProps {
  properties?: {
    waterfallTitle?: string;
    showTitle?: boolean;
    waterfallData?: Array<{category: string, value: number, isTotal?: boolean}>;
    waterfallPrimaryColor?: string;
    waterfallSecondaryColor?: string;
    waterfallTotalColor?: string;
    showGridLines?: boolean;
    showLabels?: boolean;
    showYAxis?: boolean;
    showYAxisTitle?: boolean;
    yAxisMin?: number;
    yAxisMax?: number;
    yAxisStepSize?: number;
    columnWidth?: number;
    showDataLabels?: boolean;
    showLegends?: boolean;
    legendPosition?: string;
    waterfallVariant?: 'basic-waterfall' | 'with-buttons' | 'with-kpis';
    waterfallButtons?: Array<{title: string, alignment: string}>;
    waterfallKpis?: Array<{title: string, value: string, change?: string}>;
    showButtons?: boolean;
    showDropdowns?: boolean;
    showKpis?: boolean;
    showText?: boolean;
  };
}

export function WaterfallRenderer({ properties = {} }: WaterfallRendererProps) {
  const {
    waterfallTitle = 'Waterfall Chart',
    showTitle = true,
    waterfallData = [
      { category: 'Jan 22', value: 50, isTotal: false },
      { category: 'Feb 22', value: 130, isTotal: false },
      { category: 'Mar 22', value: 80, isTotal: false },
      { category: 'Apr 22', value: 150, isTotal: false },
      { category: 'May 22', value: 120, isTotal: false },
      { category: 'Total', value: 530, isTotal: true }
    ],
    waterfallPrimaryColor = '#4F46E5',
    waterfallSecondaryColor = '#818CF8',
    waterfallTotalColor = '#10B981',
    showGridLines = true,
    showLabels = true,
    showYAxis = true,
    yAxisMin = 0,
    yAxisMax = 600,
    columnWidth = 50,
    showDataLabels = false,
    showLegends = false,
    legendPosition = 'top-left',
    waterfallVariant = 'basic-waterfall',
    waterfallButtons = [],
    waterfallKpis = [],
    showButtons = false,
    showKpis = false
  } = properties;

  const getBarColor = (entry: any, index: number) => {
    if (entry.isTotal) return waterfallTotalColor;
    return index % 2 === 0 ? waterfallPrimaryColor : waterfallSecondaryColor;
  };

  const barSize = Math.max(20, Math.min(100, columnWidth));

  return (
    <div className="h-full w-full bg-white border border-gray-200 rounded-lg p-4">
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{waterfallTitle}</h3>
      )}
      
      {(showButtons || waterfallButtons.length > 0) && waterfallButtons.length > 0 && (
        <div className="flex justify-between mb-4">
          {waterfallButtons.map((button, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm border border-gray-300 rounded ${
                button.alignment === 'left' ? 'mr-auto' : 
                button.alignment === 'right' ? 'ml-auto' : 'mx-auto'
              }`}
            >
              {button.title}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 relative" style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={waterfallData} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            {showYAxis && (
              <YAxis 
                domain={[yAxisMin, yAxisMax]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
            )}
            {showLegends && (
              <Legend 
                verticalAlign={legendPosition.includes('top') ? 'top' : 'bottom'}
                align={legendPosition.includes('left') ? 'left' : 'right'}
                height={36}
              />
            )}
            <Bar 
              dataKey="value" 
              radius={[2, 2, 0, 0]}
              maxBarSize={barSize}
            >
              {waterfallData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry, index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {showDataLabels && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Data labels would be positioned here */}
          </div>
        )}
      </div>

      {(showKpis || waterfallKpis.length > 0) && waterfallKpis.length > 0 && (
        <div className="flex justify-around mt-4 pt-4 border-t border-gray-200">
          {waterfallKpis.map((kpi, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600">{kpi.title}</div>
              <div className="text-lg font-semibold">{kpi.value}</div>
              {kpi.change && (
                <div className="text-sm text-green-600">{kpi.change}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
