
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FunnelChartPropertiesSectionProps {
  properties: Element['properties'];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelChartPropertiesSection({ properties, updateProperties }: FunnelChartPropertiesSectionProps) {
  const {
    showLabels = true,
    showValues = true,
    labelPosition = 'inside'
  } = properties || {};

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Properties</h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-labels" className="text-sm">Text Labels</Label>
          <Switch
            id="text-labels"
            checked={showLabels}
            onCheckedChange={(checked) => updateProperties({ showLabels: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-values" className="text-sm">Show Values</Label>
          <Switch
            id="show-values"
            checked={showValues}
            onCheckedChange={(checked) => updateProperties({ showValues: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Position</Label>
          <div className="flex gap-1">
            <Button
              variant={labelPosition === 'left' ? 'default' : 'outline'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateProperties({ labelPosition: 'left' })}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={labelPosition === 'right' ? 'default' : 'outline'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateProperties({ labelPosition: 'right' })}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
