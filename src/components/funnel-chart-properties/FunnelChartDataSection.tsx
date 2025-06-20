
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

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
    ],
    funnelButtons = [],
    funnelKpis = []
  } = properties || {};

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

  const updateButton = (index: number, field: string, value: string) => {
    const updatedButtons = [...funnelButtons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    updateProperties({ funnelButtons: updatedButtons });
  };

  const addButton = () => {
    const newButton = { title: 'Button', alignment: 'left' };
    updateProperties({ funnelButtons: [...funnelButtons, newButton] });
  };

  const removeButton = (index: number) => {
    const updatedButtons = funnelButtons.filter((_, i) => i !== index);
    updateProperties({ funnelButtons: updatedButtons });
  };

  const updateKpi = (index: number, field: string, value: string) => {
    const updatedKpis = [...funnelKpis];
    updatedKpis[index] = { ...updatedKpis[index], [field]: value };
    updateProperties({ funnelKpis: updatedKpis });
  };

  const addKpi = () => {
    const newKpi = { title: 'Metric', value: '1234', change: '12%' };
    updateProperties({ funnelKpis: [...funnelKpis, newKpi] });
  };

  const removeKpi = (index: number) => {
    const updatedKpis = funnelKpis.filter((_, i) => i !== index);
    updateProperties({ funnelKpis: updatedKpis });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Data</h4>
      
      {/* Funnel Data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600">Funnel Stages</Label>
          <Button
            onClick={addDataItem}
            size="sm"
            variant="outline"
            className="h-7 px-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {funnelChartData.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center">
            <Input
              value={item.name}
              onChange={(e) => updateDataItem(index, 'name', e.target.value)}
              placeholder="Stage name"
              className="h-8 text-xs"
            />
            <Input
              type="number"
              value={item.value}
              onChange={(e) => updateDataItem(index, 'value', parseInt(e.target.value) || 0)}
              placeholder="Value"
              className="h-8 text-xs"
            />
            <Input
              type="color"
              value={item.color}
              onChange={(e) => updateDataItem(index, 'color', e.target.value)}
              className="h-8 w-full p-1"
            />
            <Button
              onClick={() => removeDataItem(index)}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* Buttons Data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600">Buttons</Label>
          <Button
            onClick={addButton}
            size="sm"
            variant="outline"
            className="h-7 px-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {funnelButtons.map((button, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center">
            <Input
              value={button.title}
              onChange={(e) => updateButton(index, 'title', e.target.value)}
              placeholder="Button title"
              className="h-8 text-xs"
            />
            <select
              value={button.alignment}
              onChange={(e) => updateButton(index, 'alignment', e.target.value)}
              className="h-8 text-xs border border-gray-300 rounded px-2"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
            <Button
              onClick={() => removeButton(index)}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {/* KPIs Data */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-gray-600">KPIs</Label>
          <Button
            onClick={addKpi}
            size="sm"
            variant="outline"
            className="h-7 px-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        {funnelKpis.map((kpi, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center">
            <Input
              value={kpi.title}
              onChange={(e) => updateKpi(index, 'title', e.target.value)}
              placeholder="KPI title"
              className="h-8 text-xs"
            />
            <Input
              value={kpi.value}
              onChange={(e) => updateKpi(index, 'value', e.target.value)}
              placeholder="Value"
              className="h-8 text-xs"
            />
            <Input
              value={kpi.change}
              onChange={(e) => updateKpi(index, 'change', e.target.value)}
              placeholder="Change"
              className="h-8 text-xs"
            />
            <Button
              onClick={() => removeKpi(index)}
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
  );
}
