
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface WaterfallDetailsSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (id: string, properties: any) => void;
}

export function WaterfallDetailsSection({ properties, elementId, updateElementProperties }: WaterfallDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Details</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showTitle" className="text-sm">Show Title</Label>
          <Switch
            id="showTitle"
            checked={properties.showTitle !== false}
            onCheckedChange={(checked) => 
              updateElementProperties(elementId, { showTitle: checked })
            }
          />
        </div>

        {properties.showTitle !== false && (
          <div>
            <Label htmlFor="waterfallTitle" className="text-sm">Title</Label>
            <Input
              id="waterfallTitle"
              value={properties.waterfallTitle || ''}
              onChange={(e) => 
                updateElementProperties(elementId, { waterfallTitle: e.target.value })
              }
              placeholder="Waterfall Chart"
            />
          </div>
        )}
      </div>
    </div>
  );
}
