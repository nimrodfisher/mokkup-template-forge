
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface FunnelChartAddOnsSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartAddOnsSection({ properties, updateProperties }: FunnelChartAddOnsSectionProps) {
  const {
    showButtons = false,
    showKpis = false
  } = properties || {};

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Add-ons</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-buttons" className="text-sm">Show Buttons</Label>
          <Switch
            id="show-buttons"
            checked={showButtons}
            onCheckedChange={(checked) => updateProperties({ showButtons: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-kpis" className="text-sm">Show KPIs</Label>
          <Switch
            id="show-kpis"
            checked={showKpis}
            onCheckedChange={(checked) => updateProperties({ showKpis: checked })}
          />
        </div>
      </div>
    </div>
  );
}
