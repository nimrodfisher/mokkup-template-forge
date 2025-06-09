
import React from 'react';
import { Element, ChartVariant } from '@/types/wireframe';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ComboChartDetailsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartDetailsSection({ element, updateElementProperties }: ComboChartDetailsSectionProps) {
  const handleTitleChange = (value: string) => {
    updateElementProperties(element.id, { chartTitle: value });
  };

  const handleVariantChange = (value: string) => {
    updateElementProperties(element.id, { chartVariant: value as ChartVariant });
  };

  const handleHeightChange = (value: number[]) => {
    updateElementProperties(element.id, { chartHeight: value[0] });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Chart Details</h4>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="chart-title" className="text-xs font-medium text-gray-600">
            Chart Title
          </Label>
          <Input
            id="chart-title"
            value={element.properties?.chartTitle || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter chart title"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="chart-variant" className="text-xs font-medium text-gray-600">
            Chart Type
          </Label>
          <Select value={element.properties?.chartVariant || 'basic-combo'} onValueChange={handleVariantChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic-combo">Basic Combo</SelectItem>
              <SelectItem value="kpi-combo">KPI Combo</SelectItem>
              <SelectItem value="advanced-combo">Advanced Combo</SelectItem>
              <SelectItem value="multi-line-combo">Multi-Line Combo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="chart-height" className="text-xs font-medium text-gray-600">
            Chart Height: {element.properties?.chartHeight || 300}px
          </Label>
          <Slider
            id="chart-height"
            min={200}
            max={600}
            step={50}
            value={[element.properties?.chartHeight || 300]}
            onValueChange={handleHeightChange}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}
