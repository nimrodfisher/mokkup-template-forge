
import React from "react";
import { ChevronDown } from "@/components/properties/ChevronDown";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DonutChartAddOnsSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  addOnsOpen: boolean;
  setAddOnsOpen: (open: boolean) => void;
}

export function DonutChartAddOnsSection({
  properties,
  handleChange,
  addOnsOpen,
  setAddOnsOpen
}: DonutChartAddOnsSectionProps) {
  const buttons = properties.donutChartButtons || [];
  const kpis = properties.donutChartKpis || [];

  const updateButton = (index: number, field: string, value: any) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange('donutChartButtons', newButtons);
  };

  const addButton = () => {
    const newButtons = [...buttons, { title: 'New Button', alignment: 'left' }];
    handleChange('donutChartButtons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = buttons.filter((_: any, i: number) => i !== index);
    handleChange('donutChartButtons', newButtons);
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...kpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    handleChange('donutChartKpis', newKpis);
  };

  const addKpi = () => {
    const newKpis = [...kpis, { title: 'New KPI', value: '0', change: '0%' }];
    handleChange('donutChartKpis', newKpis);
  };

  const removeKpi = (index: number) => {
    const newKpis = kpis.filter((_: any, i: number) => i !== index);
    handleChange('donutChartKpis', newKpis);
  };

  return (
    <div className="space-y-2 border-t pt-2">
      <div 
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={() => setAddOnsOpen(!addOnsOpen)}
      >
        <span className="font-medium">Add Ons</span>
        <ChevronDown open={addOnsOpen} />
      </div>
      
      {addOnsOpen && (
        <div className="space-y-4 pl-2">
          {/* Buttons Section */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                id="showButtons"
                checked={properties.showButtons === true || buttons.length > 0}
                onCheckedChange={(checked) => {
                  handleChange('showButtons', checked);
                  if (!checked) {
                    handleChange('donutChartButtons', []);
                  }
                }}
              />
              <Label htmlFor="showButtons" className="text-xs">Buttons</Label>
            </div>
            
            {(properties.showButtons === true || buttons.length > 0) && (
              <div className="space-y-2">
                {buttons.map((button: any, index: number) => (
                  <div key={index} className="space-y-2 p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Input
                        value={button.title}
                        onChange={(e) => updateButton(index, 'title', e.target.value)}
                        placeholder="Button Title"
                        className="text-xs h-8 flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeButton(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Select 
                      value={button.alignment || 'left'} 
                      onValueChange={(value) => updateButton(index, 'alignment', value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addButton}
                  className="h-8 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Button
                </Button>
              </div>
            )}
          </div>

          {/* KPIs Section */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Switch
                id="showKpis"
                checked={properties.showKpis === true || kpis.length > 0}
                onCheckedChange={(checked) => {
                  handleChange('showKpis', checked);
                  if (!checked) {
                    handleChange('donutChartKpis', []);
                  }
                }}
              />
              <Label htmlFor="showKpis" className="text-xs">KPIs</Label>
            </div>
            
            {(properties.showKpis === true || kpis.length > 0) && (
              <div className="space-y-2">
                {kpis.map((kpi: any, index: number) => (
                  <div key={index} className="space-y-2 p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Input
                        value={kpi.title}
                        onChange={(e) => updateKpi(index, 'title', e.target.value)}
                        placeholder="KPI Title"
                        className="text-xs h-8 flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeKpi(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={kpi.value}
                        onChange={(e) => updateKpi(index, 'value', e.target.value)}
                        placeholder="Value"
                        className="text-xs h-8 flex-1"
                      />
                      <Input
                        value={kpi.change || ''}
                        onChange={(e) => updateKpi(index, 'change', e.target.value)}
                        placeholder="Change %"
                        className="text-xs h-8 flex-1"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addKpi}
                  className="h-8 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add KPI
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
