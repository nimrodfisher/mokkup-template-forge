
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LineChartDataSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function LineChartDataSection({ element, updateElementProperties }: LineChartDataSectionProps) {
  const chartData = element.properties?.chartData || [
    { category: 'Jan 22', value: 30 },
    { category: 'Feb 22', value: 45 },
    { category: 'Mar 22', value: 35 },
    { category: 'Apr 22', value: 50 },
    { category: 'May 22', value: 25 },
    { category: 'Jun 22', value: 60 }
  ];

  const handleDataChange = (index: number, field: string, value: string | number) => {
    const newData = [...chartData];
    newData[index] = { ...newData[index], [field]: value };
    updateElementProperties(element.id, { chartData: newData });
  };

  const addDataPoint = () => {
    const newData = [...chartData, { category: `Item ${chartData.length + 1}`, value: 0 }];
    updateElementProperties(element.id, { chartData: newData });
  };

  const removeDataPoint = (index: number) => {
    const newData = chartData.filter((_, i) => i !== index);
    updateElementProperties(element.id, { chartData: newData });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 border-b pb-2 flex-1">Data Points</h4>
        <Button onClick={addDataPoint} size="sm" variant="outline" className="ml-2">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 p-2 border rounded">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Category</Label>
              <Input
                value={item.category}
                onChange={(e) => handleDataChange(index, 'category', e.target.value)}
                className="mt-1 text-xs"
                placeholder="Category"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Value</Label>
              <Input
                type="number"
                value={item.value}
                onChange={(e) => handleDataChange(index, 'value', parseInt(e.target.value) || 0)}
                className="mt-1 text-xs"
                placeholder="Value"
              />
            </div>
            <Button 
              onClick={() => removeDataPoint(index)} 
              size="sm" 
              variant="outline"
              className="mt-4"
            >
              <Minus className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
