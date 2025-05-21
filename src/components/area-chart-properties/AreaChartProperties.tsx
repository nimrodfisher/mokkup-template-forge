
import React from "react";
import { Element } from "@/hooks/useWireframe";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface AreaChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export const AreaChartProperties: React.FC<AreaChartPropertiesProps> = ({
  element,
  updateElementProperties,
}) => {
  const properties = element.properties || {};
  const {
    chartTitle = "Title goes here",
    showLegend = true,
    showGridLines = true,
    showLabels = true,
  } = properties;

  const handlePropertyChange = (key: string, value: any) => {
    updateElementProperties(element.id, { [key]: value });
  };

  return (
    <div className="p-4 space-y-6 overflow-auto">
      <div>
        <h2 className="text-lg font-medium">Area Chart Properties</h2>
        <p className="text-sm text-muted-foreground">
          Configure the area chart appearance and data
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="chartTitle">Chart Title</Label>
          <Input
            id="chartTitle"
            value={chartTitle}
            onChange={(e) => handlePropertyChange("chartTitle", e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Display Options</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLegend" className="cursor-pointer">
            Show Legend
          </Label>
          <Switch
            id="showLegend"
            checked={showLegend}
            onCheckedChange={(checked) => handlePropertyChange("showLegend", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showGridLines" className="cursor-pointer">
            Show Grid Lines
          </Label>
          <Switch
            id="showGridLines"
            checked={showGridLines}
            onCheckedChange={(checked) => handlePropertyChange("showGridLines", checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showLabels" className="cursor-pointer">
            Show Labels
          </Label>
          <Switch
            id="showLabels"
            checked={showLabels}
            onCheckedChange={(checked) => handlePropertyChange("showLabels", checked)}
          />
        </div>
      </div>
    </div>
  );
};
