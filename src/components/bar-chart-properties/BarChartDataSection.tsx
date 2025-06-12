
import React from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface BarChartDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function BarChartDataSection({ 
  properties, 
  handleChange, 
  dataOpen, 
  setDataOpen 
}: BarChartDataSectionProps) {
  const chartData = properties.chartData || [
    { category: 'Jan 22', value: 30, secondary: 20, tertiary: 15 },
    { category: 'Feb 22', value: 45, secondary: 30, tertiary: 25 },
    { category: 'Mar 22', value: 35, secondary: 25, tertiary: 20 },
    { category: 'Apr 22', value: 50, secondary: 35, tertiary: 30 }
  ];

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('chartData', newData);
  };

  const addDataPoint = () => {
    const newData = [...chartData, { category: 'New', value: 0, secondary: 0, tertiary: 0 }];
    handleChange('chartData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_: any, i: number) => i !== index);
    handleChange('chartData', newData);
  };

  return (
    <div className="border-b pb-3 mb-3">
      <button 
        className="flex items-center justify-between w-full text-left font-medium text-sm py-2"
        onClick={() => setDataOpen(!dataOpen)}
      >
        <span>Data</span>
        {dataOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      
      {dataOpen && (
        <div className="space-y-3 mt-2">
          {chartData.map((item: any, index: number) => (
            <div key={index} className="border rounded p-2 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Data Point {index + 1}</Label>
                {chartData.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDataPoint(index)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={12} />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Category</Label>
                  <Input
                    value={item.category}
                    onChange={(e) => updateDataPoint(index, 'category', e.target.value)}
                    className="mt-1 h-7 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Value</Label>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateDataPoint(index, 'value', parseInt(e.target.value) || 0)}
                    className="mt-1 h-7 text-xs"
                  />
                </div>
              </div>
              
              {(properties.chartVariant === 'multi-bar' || properties.chartVariant === 'stacked-bar') && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Secondary</Label>
                    <Input
                      type="number"
                      value={item.secondary || 0}
                      onChange={(e) => updateDataPoint(index, 'secondary', parseInt(e.target.value) || 0)}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Tertiary</Label>
                    <Input
                      type="number"
                      value={item.tertiary || 0}
                      onChange={(e) => updateDataPoint(index, 'tertiary', parseInt(e.target.value) || 0)}
                      className="mt-1 h-7 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={addDataPoint}
            className="w-full h-8 text-xs"
          >
            <Plus size={12} className="mr-1" />
            Add Data Point
          </Button>
        </div>
      )}
    </div>
  );
}
