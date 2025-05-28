
import React from "react";
import { ChevronDown } from "@/components/properties/ChevronDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface DonutChartDataSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  dataOpen: boolean;
  setDataOpen: (open: boolean) => void;
}

export function DonutChartDataSection({
  properties,
  handleChange,
  dataOpen,
  setDataOpen
}: DonutChartDataSectionProps) {
  const data = properties.donutChartData || [
    { name: 'Text A', value: 30, color: '#4F46E5' },
    { name: 'Text B', value: 25, color: '#7C3AED' },
    { name: 'Text C', value: 20, color: '#06B6D4' },
    { name: 'Text D', value: 20, color: '#8B5CF6' },
    { name: 'Text E', value: 5, color: '#EC4899' }
  ];

  const updateDataItem = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    handleChange('donutChartData', newData);
  };

  const addDataItem = () => {
    const newData = [...data, { name: `Text ${String.fromCharCode(65 + data.length)}`, value: 10, color: '#4F46E5' }];
    handleChange('donutChartData', newData);
  };

  const removeDataItem = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    handleChange('donutChartData', newData);
  };

  return (
    <div className="space-y-2 border-t pt-2">
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setDataOpen(!dataOpen)}
      >
        <span className="font-medium">Data</span>
        <ChevronDown isOpen={dataOpen} />
      </div>
      
      {dataOpen && (
        <div className="space-y-3 pl-2">
          <div>
            <Label className="text-xs text-gray-600 mb-2 block">Edit Data</Label>
            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => updateDataItem(index, 'name', e.target.value)}
                    placeholder="Label"
                    className="text-xs h-8 flex-1"
                  />
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateDataItem(index, 'value', parseInt(e.target.value) || 0)}
                    placeholder="Value"
                    className="text-xs h-8 w-16"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDataItem(index)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addDataItem}
              className="mt-2 h-8 text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
