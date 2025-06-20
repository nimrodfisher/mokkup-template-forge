
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface FunnelChartDataSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartDataSection({ properties, updateProperties }: FunnelChartDataSectionProps) {
  const {
    funnelChartData = [
      { name: 'Awareness', value: 1000, color: '#8884d8' },
      { name: 'Interest', value: 800, color: '#82ca9d' },
      { name: 'Consideration', value: 600, color: '#ffc658' },
      { name: 'Intent', value: 400, color: '#ff7c7c' },
      { name: 'Purchase', value: 200, color: '#8dd1e1' }
    ]
  } = properties || {};

  const handleDataChange = (index: number, field: 'name' | 'value' | 'color', value: string | number) => {
    const newData = [...funnelChartData];
    newData[index] = { ...newData[index], [field]: value };
    updateProperties({ funnelChartData: newData });
  };

  const addDataPoint = () => {
    const newData = [...funnelChartData, { name: 'New Stage', value: 100, color: '#8884d8' }];
    updateProperties({ funnelChartData: newData });
  };

  const removeDataPoint = (index: number) => {
    const newData = funnelChartData.filter((_, i) => i !== index);
    updateProperties({ funnelChartData: newData });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Data</h4>
        <Button
          onClick={addDataPoint}
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        {funnelChartData.map((item, index) => (
          <div key={index} className="p-3 border rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-gray-600">Stage {index + 1}</Label>
              {funnelChartData.length > 1 && (
                <Button
                  onClick={() => removeDataPoint(index)}
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`name-${index}`} className="text-xs text-gray-500">Name</Label>
                <Input
                  id={`name-${index}`}
                  value={item.name}
                  onChange={(e) => handleDataChange(index, 'name', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor={`value-${index}`} className="text-xs text-gray-500">Value</Label>
                <Input
                  id={`value-${index}`}
                  type="number"
                  value={item.value}
                  onChange={(e) => handleDataChange(index, 'value', parseInt(e.target.value) || 0)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`color-${index}`} className="text-xs text-gray-500">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`color-${index}`}
                  type="color"
                  value={item.color}
                  onChange={(e) => handleDataChange(index, 'color', e.target.value)}
                  className="h-8 w-16 p-1"
                />
                <Input
                  value={item.color}
                  onChange={(e) => handleDataChange(index, 'color', e.target.value)}
                  placeholder="#000000"
                  className="h-8 text-xs flex-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
