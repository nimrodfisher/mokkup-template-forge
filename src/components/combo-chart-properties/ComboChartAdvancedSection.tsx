
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface ComboChartAdvancedSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartAdvancedSection({ element, updateElementProperties }: ComboChartAdvancedSectionProps) {
  const handleToggleChange = (property: string, value: boolean) => {
    updateElementProperties(element.id, { [property]: value });
  };

  const handleInputChange = (property: string, value: string) => {
    updateElementProperties(element.id, { [property]: value });
  };

  const handleSliderChange = (property: string, value: number[]) => {
    updateElementProperties(element.id, { [property]: value[0] });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Advanced Settings</h4>
      
      <div className="space-y-4">
        {/* Animation Settings */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Animation</h5>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-animation" className="text-xs">Enable Animation</Label>
            <Switch
              id="enable-animation"
              checked={element.properties?.enableAnimation || false}
              onCheckedChange={(value) => handleToggleChange('enableAnimation', value)}
            />
          </div>
          {element.properties?.enableAnimation && (
            <div>
              <Label className="text-xs text-gray-600">
                Animation Duration: {element.properties?.animationDuration || 1000}ms
              </Label>
              <Slider
                min={500}
                max={3000}
                step={100}
                value={[element.properties?.animationDuration || 1000]}
                onValueChange={(value) => handleSliderChange('animationDuration', value)}
                className="mt-2"
              />
            </div>
          )}
        </div>

        {/* Tooltip Settings */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Tooltip</h5>
          <div className="flex items-center justify-between">
            <Label htmlFor="custom-tooltip" className="text-xs">Custom Tooltip</Label>
            <Switch
              id="custom-tooltip"
              checked={element.properties?.customTooltip || false}
              onCheckedChange={(value) => handleToggleChange('customTooltip', value)}
            />
          </div>
          {element.properties?.customTooltip && (
            <div>
              <Label htmlFor="tooltip-format" className="text-xs text-gray-600">
                Tooltip Format
              </Label>
              <Input
                id="tooltip-format"
                value={element.properties?.tooltipFormat || ''}
                onChange={(e) => handleInputChange('tooltipFormat', e.target.value)}
                placeholder="e.g., {name}: {value}"
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Data Labels */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Data Labels</h5>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-data-labels" className="text-xs">Show Data Labels</Label>
            <Switch
              id="show-data-labels"
              checked={element.properties?.showDataLabels || false}
              onCheckedChange={(value) => handleToggleChange('showDataLabels', value)}
            />
          </div>
          {element.properties?.showDataLabels && (
            <div>
              <Label htmlFor="label-position" className="text-xs text-gray-600">
                Label Position
              </Label>
              <Select 
                value={element.properties?.labelPosition || 'top'} 
                onValueChange={(value) => handleInputChange('labelPosition', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="middle">Middle</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="inside">Inside</SelectItem>
                  <SelectItem value="outside">Outside</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Zoom and Pan */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Interaction</h5>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-zoom" className="text-xs">Enable Zoom</Label>
            <Switch
              id="enable-zoom"
              checked={element.properties?.enableZoom || false}
              onCheckedChange={(value) => handleToggleChange('enableZoom', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-pan" className="text-xs">Enable Pan</Label>
            <Switch
              id="enable-pan"
              checked={element.properties?.enablePan || false}
              onCheckedChange={(value) => handleToggleChange('enablePan', value)}
            />
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <h5 className="text-xs font-medium text-gray-600">Export</h5>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-export" className="text-xs">Enable Export</Label>
            <Switch
              id="enable-export"
              checked={element.properties?.enableExport || false}
              onCheckedChange={(value) => handleToggleChange('enableExport', value)}
            />
          </div>
          {element.properties?.enableExport && (
            <div>
              <Label htmlFor="export-formats" className="text-xs text-gray-600">
                Export Formats
              </Label>
              <Select 
                value={element.properties?.exportFormats || 'png'} 
                onValueChange={(value) => handleInputChange('exportFormats', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
