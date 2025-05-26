
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ColumnChartDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function ColumnChartDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: ColumnChartDetailsSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Details</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {detailsOpen && (
        <div className="space-y-4 mb-4">
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              value={properties.chartTitle || 'Chart Title'}
              onChange={(e) => handleChange('chartTitle', e.target.value)}
              placeholder="Enter chart title"
              className="text-xs"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Title</Label>
            <Switch
              checked={properties.showTitle !== false}
              onCheckedChange={(checked) => handleChange('showTitle', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Legend</Label>
            <Switch
              checked={properties.showLegend !== false}
              onCheckedChange={(checked) => handleChange('showLegend', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Grid Lines</Label>
            <Switch
              checked={properties.showGridLines !== false}
              onCheckedChange={(checked) => handleChange('showGridLines', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Labels</Label>
            <Switch
              checked={properties.showLabels !== false}
              onCheckedChange={(checked) => handleChange('showLabels', checked)}
            />
          </div>
        </div>
      )}
    </>
  );
}
