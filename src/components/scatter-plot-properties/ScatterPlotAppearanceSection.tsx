
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ScatterPlotAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function ScatterPlotAppearanceSection({ properties, handleChange, propertiesOpen, setPropertiesOpen }: ScatterPlotAppearanceSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setPropertiesOpen(!propertiesOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Appearance</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {propertiesOpen && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Grid Lines</Label>
            <Switch
              checked={properties.showGridLines !== false}
              onCheckedChange={(checked) => handleChange('showGridLines', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Labels</Label>
            <Switch
              checked={properties.showLabels !== false}
              onCheckedChange={(checked) => handleChange('showLabels', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Trend Line</Label>
            <Switch
              checked={properties.showTrendLine || false}
              onCheckedChange={(checked) => handleChange('showTrendLine', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm">Show Correlation</Label>
            <Switch
              checked={properties.showCorrelation || false}
              onCheckedChange={(checked) => handleChange('showCorrelation', checked)}
            />
          </div>
          
          {properties.showCorrelation && (
            <div>
              <Label className="text-sm font-medium">Correlation Value</Label>
              <Input
                type="number"
                min="-1"
                max="1"
                step="0.01"
                value={properties.correlationValue || 0.75}
                onChange={(e) => handleChange('correlationValue', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
