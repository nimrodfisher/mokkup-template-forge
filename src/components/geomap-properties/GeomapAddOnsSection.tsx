
import React from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeomapAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function GeomapAddOnsSection({ properties, handleChange, addOnsOpen, setAddOnsOpen }: GeomapAddOnsSectionProps) {
  const geomapButtons = properties.geomapButtons || [];
  const geomapKpis = properties.geomapKpis || [];

  const addButton = () => {
    const newButtons = [...geomapButtons, { title: 'New Button', alignment: 'left' }];
    handleChange('geomapButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = geomapButtons.filter((_: any, i: number) => i !== index);
    handleChange('geomapButtons', newButtons);
  };

  const updateButton = (index: number, field: string, value: any) => {
    const newButtons = [...geomapButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange('geomapButtons', newButtons);
  };

  const addKpi = () => {
    const newKpis = [...geomapKpis, { title: 'Metric 1', value: '1234', change: '12%' }];
    handleChange('geomapKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = geomapKpis.filter((_: any, i: number) => i !== index);
    handleChange('geomapKpis', newKpis);
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...geomapKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handleChange('geomapKpis', newKpis);
  };

  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setAddOnsOpen(!addOnsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Add Ons</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${addOnsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {addOnsOpen && (
        <div className="space-y-4 mb-4">
          {/* Buttons Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Buttons</Label>
              <Switch
                checked={properties.showButtons !== false}
                onCheckedChange={(checked) => handleChange('showButtons', checked)}
              />
            </div>
            
            {properties.showButtons !== false && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Alignment</span>
                  <Button
                    onClick={addButton}
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Button
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {geomapButtons.map((button: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Input
                        value={button.title}
                        onChange={(e) => updateButton(index, 'title', e.target.value)}
                        placeholder="Button title"
                        className="text-xs flex-1"
                      />
                      <Select
                        value={button.alignment}
                        onValueChange={(value) => updateButton(index, 'alignment', value)}
                      >
                        <SelectTrigger className="w-20 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => removeButton(index)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dropdowns Section */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Dropdowns</Label>
            <Switch
              checked={properties.showDropdowns !== false}
              onCheckedChange={(checked) => handleChange('showDropdowns', checked)}
            />
          </div>

          {/* KPIs Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">KPIs</Label>
              <Switch
                checked={properties.showKpis !== false}
                onCheckedChange={(checked) => handleChange('showKpis', checked)}
              />
            </div>
            
            {properties.showKpis !== false && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Alignment</span>
                  <Button
                    onClick={addKpi}
                    size="sm"
                    variant="outline"
                    className="h-6 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add KPI
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {geomapKpis.map((kpi: any, index: number) => (
                    <div key={index} className="space-y-2 p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Input
                          value={kpi.title}
                          onChange={(e) => updateKpi(index, 'title', e.target.value)}
                          placeholder="Title"
                          className="text-xs flex-1"
                        />
                        <Button
                          onClick={() => removeKpi(index)}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-500">Measured Value</Label>
                          <Input
                            value={kpi.value}
                            onChange={(e) => updateKpi(index, 'value', e.target.value)}
                            placeholder="1234"
                            className="text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Percentage Change</Label>
                          <Input
                            value={kpi.change}
                            onChange={(e) => updateKpi(index, 'change', e.target.value)}
                            placeholder="12%"
                            className="text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Text</Label>
            <Switch
              checked={properties.showText !== false}
              onCheckedChange={(checked) => handleChange('showText', checked)}
            />
          </div>
        </div>
      )}
    </>
  );
}
