
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WaterfallYAxisSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (id: string, properties: any) => void;
}

export function WaterfallYAxisSection({ properties, elementId, updateElementProperties }: WaterfallYAxisSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Y Axis</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="showYAxis" className="text-sm">Axis</Label>
          <Switch
            id="showYAxis"
            checked={properties.showYAxis !== false}
            onCheckedChange={(checked) => 
              updateElementProperties(elementId, { showYAxis: checked })
            }
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showYAxisTitle" className="text-sm">Title</Label>
            <Switch
              id="showYAxisTitle"
              checked={properties.showYAxisTitle || false}
              onCheckedChange={(checked) => 
                updateElementProperties(elementId, { showYAxisTitle: checked })
              }
            />
          </div>

          <div>
            <Label className="text-sm text-gray-600">Range</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <Label htmlFor="yAxisMin" className="text-xs text-gray-500">Min</Label>
                <Input
                  id="yAxisMin"
                  type="number"
                  value={properties.yAxisMin || 0}
                  onChange={(e) => 
                    updateElementProperties(elementId, { yAxisMin: parseInt(e.target.value) || 0 })
                  }
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="yAxisMax" className="text-xs text-gray-500">Max</Label>
                <Input
                  id="yAxisMax"
                  type="number"
                  value={properties.yAxisMax || 600}
                  onChange={(e) => 
                    updateElementProperties(elementId, { yAxisMax: parseInt(e.target.value) || 600 })
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="yAxisStepSize" className="text-sm">Step Size</Label>
            <Input
              id="yAxisStepSize"
              type="number"
              value={properties.yAxisStepSize || 10}
              onChange={(e) => 
                updateElementProperties(elementId, { yAxisStepSize: parseInt(e.target.value) || 10 })
              }
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
