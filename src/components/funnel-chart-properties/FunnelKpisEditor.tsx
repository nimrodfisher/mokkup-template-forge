
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface FunnelKpisEditorProps {
  funnelKpis: any[];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelKpisEditor({ funnelKpis, updateProperties }: FunnelKpisEditorProps) {
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
  );
}
