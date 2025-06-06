
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Element } from '@/types/wireframe';

interface ComboChartRendererProps {
  properties: Element['properties'];
}

export function ComboChartRenderer({ properties }: ComboChartRendererProps) {
  const {
    chartTitle = 'Combo Chart',
    chartData = [
      { category: 'Jan 22', value: 30, line: 25 },
      { category: 'Feb 22', value: 45, line: 35 },
      { category: 'Mar 22', value: 35, line: 40 },
      { category: 'Apr 22', value: 50, line: 45 },
      { category: 'May 22', value: 25, line: 30 },
      { category: 'Jun 22', value: 60, line: 55 }
    ],
    barColor = '#3b82f6',
    lineColor = '#10b981',
    showLegend = true,
    showGridLines = true,
    showLabels = true,
    chartHeight = 300,
    chartVariant = 'default'
  } = properties || {};

  return (
    <div className="w-full h-full bg-white border rounded-lg p-4">
      {chartTitle && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{chartTitle}</h3>
      )}
      
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              axisLine={showLabels}
              tickLine={showLabels}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={showLabels}
              tickLine={showLabels}
            />
            <Tooltip />
            {showLegend && <Legend />}
            <Bar 
              dataKey="value" 
              fill={barColor}
              name="Bar Data"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="line" 
              stroke={lineColor}
              strokeWidth={2}
              name="Line Data"
              dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
