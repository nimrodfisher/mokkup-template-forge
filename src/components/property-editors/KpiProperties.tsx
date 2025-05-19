
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { KpiVariant, KpiAlignment } from "@/types/wireframe-types";

interface KpiPropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function KpiProperties({ elementId, properties, updateElementProperties }: KpiPropertiesProps) {
  const [kpiVariant, setKpiVariant] = useState<KpiVariant>(properties.kpiVariant as KpiVariant || 'basic');
  const [kpiTitle, setKpiTitle] = useState(properties.kpiTitle || 'Metric Title');
  const [kpiValue, setKpiValue] = useState(properties.kpiValue || '25.2K');
  const [kpiPreviousValue, setKpiPreviousValue] = useState(properties.kpiPreviousValue || '11.6K');
  const [kpiChangePercentage, setKpiChangePercentage] = useState(properties.kpiChangePercentage || '+10%');
  const [kpiAlignment, setKpiAlignment] = useState<KpiAlignment>(properties.kpiAlignment as KpiAlignment || 'left');
  const [showKpiTitle, setShowKpiTitle] = useState(properties.showKpiTitle !== false);
  const [showPreviousValue, setShowPreviousValue] = useState(properties.showPreviousValue !== false);
  const [showChangePercentage, setShowChangePercentage] = useState(properties.showChangePercentage !== false);
  const [indicatorColor, setIndicatorColor] = useState(properties.indicatorColor || '#8B5CF6');
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      kpiVariant,
      kpiTitle,
      kpiValue,
      kpiPreviousValue,
      kpiChangePercentage,
      kpiAlignment,
      showKpiTitle,
      showPreviousValue,
      showChangePercentage,
      indicatorColor,
    });
    toast.success("KPI properties updated");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">KPI Properties</h3>
        <p className="text-sm text-gray-500">Customize the KPI appearance</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kpiVariant">KPI Variant</Label>
          <Select 
            value={kpiVariant} 
            onValueChange={(value: KpiVariant) => setKpiVariant(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="indicator">Indicator</SelectItem>
              <SelectItem value="comparison">Comparison</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kpiTitle">KPI Title</Label>
          <Input
            id="kpiTitle"
            value={kpiTitle}
            onChange={(e) => setKpiTitle(e.target.value)}
            placeholder="Metric Title"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kpiValue">KPI Value</Label>
          <Input
            id="kpiValue"
            value={kpiValue}
            onChange={(e) => setKpiValue(e.target.value)}
            placeholder="25.2K"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kpiPreviousValue">Previous Value</Label>
          <Input
            id="kpiPreviousValue"
            value={kpiPreviousValue}
            onChange={(e) => setKpiPreviousValue(e.target.value)}
            placeholder="11.6K"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kpiChangePercentage">Change Percentage</Label>
          <Input
            id="kpiChangePercentage"
            value={kpiChangePercentage}
            onChange={(e) => setKpiChangePercentage(e.target.value)}
            placeholder="+10%"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="kpiAlignment">KPI Alignment</Label>
          <Select 
            value={kpiAlignment} 
            onValueChange={(value: KpiAlignment) => setKpiAlignment(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showKpiTitle">Show Title</Label>
          <Switch
            id="showKpiTitle"
            checked={showKpiTitle}
            onCheckedChange={(checked) => setShowKpiTitle(checked)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showPreviousValue">Show Previous Value</Label>
          <Switch
            id="showPreviousValue"
            checked={showPreviousValue}
            onCheckedChange={(checked) => setShowPreviousValue(checked)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showChangePercentage">Show Change Percentage</Label>
          <Switch
            id="showChangePercentage"
            checked={showChangePercentage}
            onCheckedChange={(checked) => setShowChangePercentage(checked)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="indicatorColor">Indicator Color</Label>
          <Input
            id="indicatorColor"
            value={indicatorColor}
            onChange={(e) => setIndicatorColor(e.target.value)}
            placeholder="#8B5CF6"
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Update KPI
        </Button>
      </div>
    </div>
  );
}
