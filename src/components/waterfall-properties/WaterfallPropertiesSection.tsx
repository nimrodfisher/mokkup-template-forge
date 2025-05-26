
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WaterfallPropertiesSectionProps {
  properties: any;
  elementId: string;
  updateElementProperties: (id: string, properties: any) => void;
}

export function WaterfallPropertiesSection({ properties, elementId, updateElementProperties }: WaterfallPropertiesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Properties</h3>
      
      <div className="space-y-4">
        <div>
          <Label className="text-sm">Column Width</Label>
          <div className="mt-2">
            <Slider
              value={[properties.columnWidth || 50]}
              onValueChange={(value) => 
                updateElementProperties(elementId, { columnWidth: value[0] })
              }
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{properties.columnWidth || 50}%</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showDataLabels" className="text-sm">Data Labels</Label>
          <Switch
            id="showDataLabels"
            checked={properties.showDataLabels || false}
            onCheckedChange={(checked) => 
              updateElementProperties(elementId, { showDataLabels: checked })
            }
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="showLegends" className="text-sm">Legends</Label>
            <Switch
              id="showLegends"
              checked={properties.showLegends || false}
              onCheckedChange={(checked) => 
                updateElementProperties(elementId, { showLegends: checked })
              }
            />
          </div>

          {properties.showLegends && (
            <div>
              <Label className="text-sm text-gray-600">Position</Label>
              <Select
                value={properties.legendPosition || 'top-left'}
                onValueChange={(value) => 
                  updateElementProperties(elementId, { legendPosition: value })
                }
              >
                <SelectTrigger className="text-sm mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top left</SelectItem>
                  <SelectItem value="top-right">Top right</SelectItem>
                  <SelectItem value="bottom-left">Bottom left</SelectItem>
                  <SelectItem value="bottom-right">Bottom right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
