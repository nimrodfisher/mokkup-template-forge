
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PieChartDetailsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  detailsOpen: boolean;
  setDetailsOpen: (open: boolean) => void;
}

export function PieChartDetailsSection({ properties, handleChange, detailsOpen, setDetailsOpen }: PieChartDetailsSectionProps) {
  const pieChartVariant = properties.pieChartVariant || 'default';
  const showLegendOption = pieChartVariant === 'with-legend';
  const showButtonsOption = pieChartVariant === 'with-buttons';
  const showKpisOption = pieChartVariant === 'with-kpis';

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
              value={properties.pieChartTitle || 'Title goes here'}
              onChange={(e) => handleChange('pieChartTitle', e.target.value)}
              placeholder="Enter chart title"
              className="text-xs"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Chart Variant</Label>
            <Select
              value={pieChartVariant}
              onValueChange={(value) => handleChange('pieChartVariant', value)}
            >
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="with-legend">With Legend</SelectItem>
                <SelectItem value="with-buttons">With Buttons</SelectItem>
                <SelectItem value="with-kpis">With KPIs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Title</Label>
            <Switch
              checked={properties.showTitle !== false}
              onCheckedChange={(checked) => handleChange('showTitle', checked)}
            />
          </div>
          
          {showLegendOption && (
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Show Legend</Label>
              <Switch
                checked={properties.showPieLegend !== false}
                onCheckedChange={(checked) => handleChange('showPieLegend', checked)}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Labels</Label>
            <Switch
              checked={properties.showPieLabels !== false}
              onCheckedChange={(checked) => handleChange('showPieLabels', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Percentages</Label>
            <Switch
              checked={properties.showPercentages !== false}
              onCheckedChange={(checked) => handleChange('showPercentages', checked)}
            />
          </div>
        </div>
      )}
    </>
  );
}
