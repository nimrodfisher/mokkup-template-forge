
import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ComboChartRendererProps {
  properties: Element['properties'];
  onUpdateProperties?: (properties: Partial<Element['properties']>) => void;
}

export function ComboChartRenderer({ properties, onUpdateProperties }: ComboChartRendererProps) {
  const [editingKpi, setEditingKpi] = useState<number | null>(null);
  const [tempValue, setTempValue] = useState('');

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
    chartVariant = 'default',
    showButtons = false,
    chartButtons = [
      { title: 'Export', alignment: 'left' },
      { title: 'Filter', alignment: 'right' }
    ],
    showKpis = false,
    chartKpis = [
      { title: 'Total Sales', value: '$245K', change: '+12%' },
      { title: 'Growth Rate', value: '8.5%', change: '+2.1%' }
    ]
  } = properties || {};

  const handleButtonClick = (buttonTitle: string) => {
    console.log(`${buttonTitle} button clicked`);
    // Add specific functionality based on button title
    switch (buttonTitle.toLowerCase()) {
      case 'export':
        console.log('Exporting chart data...');
        break;
      case 'filter':
        console.log('Opening filter options...');
        break;
      case 'refresh':
        console.log('Refreshing chart data...');
        break;
      default:
        console.log(`${buttonTitle} action triggered`);
    }
  };

  const handleKpiClick = (index: number, currentValue: string) => {
    setEditingKpi(index);
    setTempValue(currentValue);
  };

  const handleKpiSave = (index: number) => {
    if (onUpdateProperties && chartKpis) {
      const updatedKpis = [...chartKpis];
      updatedKpis[index] = { ...updatedKpis[index], value: tempValue };
      onUpdateProperties({ chartKpis: updatedKpis });
    }
    setEditingKpi(null);
    setTempValue('');
  };

  const handleKpiCancel = () => {
    setEditingKpi(null);
    setTempValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleKpiSave(index);
    } else if (e.key === 'Escape') {
      handleKpiCancel();
    }
  };

  return (
    <div className="w-full h-full bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          {chartTitle && (
            <h3 className="text-lg font-semibold text-gray-800">{chartTitle}</h3>
          )}
        </div>
        
        {/* Action Buttons */}
        {showButtons && chartButtons && chartButtons.length > 0 && (
          <div className="flex items-center gap-2">
            {chartButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleButtonClick(button.title)}
                className="text-xs"
              >
                {button.title}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* KPIs Section */}
      {showKpis && chartKpis && chartKpis.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {chartKpis.map((kpi, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">{kpi.title}</div>
              <div className="flex items-center gap-2">
                {editingKpi === index ? (
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={() => handleKpiSave(index)}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    className="text-lg font-semibold h-8 w-20"
                    autoFocus
                  />
                ) : (
                  <span 
                    className="text-lg font-semibold cursor-pointer hover:bg-gray-100 px-1 rounded"
                    onClick={() => handleKpiClick(index, kpi.value)}
                    title="Click to edit"
                  >
                    {kpi.value}
                  </span>
                )}
                {kpi.change && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    kpi.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {kpi.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
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
