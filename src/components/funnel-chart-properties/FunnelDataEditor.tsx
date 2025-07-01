
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface FunnelDataEditorProps {
  funnelChartData: any[];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelDataEditor({ funnelChartData, updateProperties }: FunnelDataEditorProps) {
  const updateDataItem = (index: number, field: string, value: any) => {
    const updatedData = [...funnelChartData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    updateProperties({ funnelChartData: updatedData });
  };

  const addDataItem = () => {
    const newItem = { name: 'New Stage', value: 100, color: '#8884d8' };
    updateProperties({ funnelChartData: [...funnelChartData, newItem] });
  };

  const removeDataItem = (index: number) => {
    const updatedData = funnelChartData.filter((_, i) => i !== index);
    updateProperties({ funnelChartData: updatedData });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-600">Edit Data</Label>
        <Button
          onClick={addDataItem}
          size="sm"
          variant="outline"
          className="h-7 px-2"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {funnelChartData.map((item, index) => (
          <div key={index} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">{item.name}</Label>
              <Button
                onClick={() => removeDataItem(index)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500">Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) => updateDataItem(index, 'name', e.target.value)}
                  placeholder="Stage name"
                  className="h-7 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Value</Label>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateDataItem(index, 'value', parseInt(e.target.value) || 0)}
                  placeholder="Value"
                  className="h-7 text-xs"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={item.color}
                  onChange={(e) => updateDataItem(index, 'color', e.target.value)}
                  className="h-7 w-12 p-1"
                />
                <Input
                  value={item.color}
                  onChange={(e) => updateDataItem(index, 'color', e.target.value)}
                  placeholder="#8884d8"
                  className="h-7 text-xs flex-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
