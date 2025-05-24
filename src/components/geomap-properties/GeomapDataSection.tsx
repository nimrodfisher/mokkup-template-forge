
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface GeomapDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function GeomapDataSection({ properties, handleChange, dataOpen, setDataOpen }: GeomapDataSectionProps) {
  const geomapData = properties.geomapData || [
    { region: 'North America', value: 75 },
    { region: 'Europe', value: 65 },
    { region: 'Asia', value: 85 }
  ];

  const addDataPoint = () => {
    const newData = [...geomapData, { region: 'New Region', value: 50 }];
    handleChange('geomapData', newData);
  };

  const removeDataPoint = (index: number) => {
    const newData = geomapData.filter((_: any, i: number) => i !== index);
    handleChange('geomapData', newData);
  };

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...geomapData];
    newData[index] = { ...newData[index], [field]: field === 'value' ? Number(value) : value };
    handleChange('geomapData', newData);
  };

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDataOpen(!dataOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Data</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${dataOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {dataOpen && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Geographic Data Points</Label>
            <Button
              onClick={addDataPoint}
              size="sm"
              variant="outline"
              className="h-7 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {geomapData.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-center p-2 border rounded">
                <Input
                  value={item.region}
                  onChange={(e) => updateDataPoint(index, 'region', e.target.value)}
                  placeholder="Region"
                  className="text-xs"
                />
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateDataPoint(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="text-xs"
                />
                <Button
                  onClick={() => removeDataPoint(index)}
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
