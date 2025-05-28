
import React from "react";
import { ChevronDown } from "@/components/properties/ChevronDown";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DonutChartAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function DonutChartAppearanceSection({
  properties,
  handleChange,
  propertiesOpen,
  setPropertiesOpen
}: DonutChartAppearanceSectionProps) {
  return (
    <div className="space-y-2 border-t pt-2">
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setPropertiesOpen(!propertiesOpen)}
      >
        <span className="font-medium">Properties</span>
        <ChevronDown open={propertiesOpen} />
      </div>
      
      {propertiesOpen && (
        <div className="space-y-3 pl-2">
          <div>
            <Label className="text-xs text-gray-600 mb-2 block">Inner Radius</Label>
            <Slider
              value={[properties.donutInnerRadius || 40]}
              onValueChange={([value]) => handleChange('donutInnerRadius', value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{properties.donutInnerRadius || 40}</div>
          </div>
          
          <div>
            <Label className="text-xs text-gray-600 mb-2 block">Outer Radius</Label>
            <Slider
              value={[properties.donutOuterRadius || 80]}
              onValueChange={([value]) => handleChange('donutOuterRadius', value)}
              max={120}
              min={20}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{properties.donutOuterRadius || 80}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showDonutLabels"
              checked={properties.showDonutLabels !== false}
              onCheckedChange={(checked) => handleChange('showDonutLabels', checked)}
            />
            <Label htmlFor="showDonutLabels" className="text-xs">Data Labels</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showDonutPercentages"
              checked={properties.showDonutPercentages !== false}
              onCheckedChange={(checked) => handleChange('showDonutPercentages', checked)}
            />
            <Label htmlFor="showDonutPercentages" className="text-xs">Show Percentages</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showDonutLegend"
              checked={properties.showDonutLegend === true}
              onCheckedChange={(checked) => handleChange('showDonutLegend', checked)}
            />
            <Label htmlFor="showDonutLegend" className="text-xs">Show Legend</Label>
          </div>
        </div>
      )}
    </div>
  );
}
