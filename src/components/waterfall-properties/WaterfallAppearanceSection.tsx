
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface WaterfallAppearanceSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (id: string, properties: any) => void;
}

export function WaterfallAppearanceSection({ properties, elementId, updateElementProperties }: WaterfallAppearanceSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Appearance</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines" className="text-sm">Show Grid Lines</Label>
          <Switch
            id="showGridLines"
            checked={properties.showGridLines !== false}
            onCheckedChange={(checked) => 
              updateElementProperties(elementId, { showGridLines: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="text-sm">Show Labels</Label>
          <Switch
            id="showLabels"
            checked={properties.showLabels !== false}
            onCheckedChange={(checked) => 
              updateElementProperties(elementId, { showLabels: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
