
import React from "react";
import { Element } from "@/types/wireframe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "@/components/properties/ChevronDown";

interface GaugePropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function GaugeProperties({ element, updateElementProperties, onOpenStyleDialog }: GaugePropertiesProps) {
  const properties = element.properties || {};
  
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [valuesOpen, setValuesOpen] = React.useState(true);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);
  const [addOnsOpen, setAddOnsOpen] = React.useState(true);
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };
  
  const numericHandler = (field: string, value: string) => {
    const numValue = value === '' ? '' : Number(value);
    handleChange(field, numValue);
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Gauge Chart Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      {/* Details Section */}
      <div className="border-b py-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setDetailsOpen(!detailsOpen)}
        >
          <span className="font-medium">Details</span>
          <ChevronDown open={detailsOpen} />
        </div>
        
        {detailsOpen && (
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="showTitle">Title</Label>
              <Switch 
                id="showTitle" 
                checked={properties.showTitle !== false}
                onCheckedChange={(checked) => handleChange('showTitle', checked)} 
              />
            </div>
            
            {properties.showTitle !== false && (
              <div>
                <Input
                  id="chartTitle"
                  value={properties.chartTitle || ""}
                  onChange={(e) => handleChange('chartTitle', e.target.value)}
                  placeholder="Enter chart title"
                  className="border h-8 px-2"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between gap-2">
              <Label>Alignment</Label>
              <div className="flex border rounded-md">
                <Button 
                  type="button"
                  variant={properties.textAlignment === 'left' ? 'secondary' : 'ghost'}
                  className="px-2 h-7 rounded-none rounded-l-md"
                  onClick={() => handleChange('textAlignment', 'left')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="14" y1="12" y2="12"/><line x1="3" x2="18" y1="18" y2="18"/></svg>
                </Button>
                <Button 
                  type="button"
                  variant={properties.textAlignment === 'center' ? 'secondary' : 'ghost'}
                  className="px-2 h-7 rounded-none border-x"
                  onClick={() => handleChange('textAlignment', 'center')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="7" x2="17" y1="12" y2="12"/><line x1="5" x2="19" y1="18" y2="18"/></svg>
                </Button>
                <Button 
                  type="button"
                  variant={properties.textAlignment === 'right' ? 'secondary' : 'ghost'}
                  className="px-2 h-7 rounded-none rounded-r-md"
                  onClick={() => handleChange('textAlignment', 'right')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="6" x2="21" y1="18" y2="18"/></svg>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Values Section */}
      <div className="border-b py-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setValuesOpen(!valuesOpen)}
        >
          <span className="font-medium">Values</span>
          <ChevronDown open={valuesOpen} />
        </div>
        
        {valuesOpen && (
          <div className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="gaugeValue" className="text-xs">Start Value</Label>
                <Input
                  id="gaugeValue"
                  value={properties.gaugeValue || ""}
                  onChange={(e) => numericHandler('gaugeValue', e.target.value)}
                  placeholder="40"
                  className="border h-8 px-2 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gaugeMax" className="text-xs">End Value</Label>
                <Input
                  id="gaugeMax"
                  value={properties.gaugeMax || ""}
                  onChange={(e) => numericHandler('gaugeMax', e.target.value)}
                  placeholder="100"
                  className="border h-8 px-2 mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="gaugeMin" className="text-xs">Min</Label>
                <Input
                  id="gaugeMin"
                  value={properties.gaugeMin || ""}
                  onChange={(e) => numericHandler('gaugeMin', e.target.value)}
                  placeholder="0"
                  className="border h-8 px-2 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gaugeMaxDisplay" className="text-xs">Max</Label>
                <Input
                  id="gaugeMaxDisplay"
                  value={properties.gaugeMaxDisplay || ""}
                  onChange={(e) => numericHandler('gaugeMaxDisplay', e.target.value)}
                  placeholder="100"
                  className="border h-8 px-2 mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="gaugeUnits" className="text-xs">Units</Label>
              <Input
                id="gaugeUnits"
                value={properties.gaugeUnits || ""}
                onChange={(e) => handleChange('gaugeUnits', e.target.value)}
                placeholder="K"
                className="border h-8 px-2 mt-1"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showGaugeNeedle">Needle</Label>
              <Switch 
                id="showGaugeNeedle" 
                checked={properties.showGaugeNeedle !== false}
                onCheckedChange={(checked) => handleChange('showGaugeNeedle', checked)} 
              />
            </div>
            
            {properties.showGaugeNeedle !== false && (
              <div>
                <Label htmlFor="gaugeNeedleValue" className="text-xs">Edit Needle</Label>
                <Input
                  id="gaugeNeedleValue"
                  value={properties.gaugeValue || ""}
                  onChange={(e) => numericHandler('gaugeValue', e.target.value)}
                  placeholder="40"
                  className="border h-8 px-2 mt-1"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showGaugeTarget">Target</Label>
              <Switch 
                id="showGaugeTarget" 
                checked={properties.showGaugeTarget !== false}
                onCheckedChange={(checked) => handleChange('showGaugeTarget', checked)} 
              />
            </div>
            
            {properties.showGaugeTarget !== false && (
              <div>
                <Label htmlFor="gaugeTarget" className="text-xs">Edit Target</Label>
                <Input
                  id="gaugeTarget"
                  value={properties.gaugeTarget || ""}
                  onChange={(e) => numericHandler('gaugeTarget', e.target.value)}
                  placeholder="50"
                  className="border h-8 px-2 mt-1"
                />
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Properties Section */}
      <div className="border-b py-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setPropertiesOpen(!propertiesOpen)}
        >
          <span className="font-medium">Properties</span>
          <ChevronDown open={propertiesOpen} />
        </div>
        
        {propertiesOpen && (
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="showGaugeLabels">Labels</Label>
              <Switch 
                id="showGaugeLabels" 
                checked={properties.showGaugeLabels !== false}
                onCheckedChange={(checked) => handleChange('showGaugeLabels', checked)} 
              />
            </div>
            
            <div>
              <Label htmlFor="gaugePrimaryColor" className="text-xs">Primary Color</Label>
              <div className="flex mt-1">
                <input
                  id="gaugePrimaryColor"
                  type="color"
                  value={properties.gaugePrimaryColor || "#4F46E5"}
                  onChange={(e) => handleChange('gaugePrimaryColor', e.target.value)}
                  className="w-8 h-8 p-1 border rounded-l-md"
                />
                <Input
                  value={properties.gaugePrimaryColor || "#4F46E5"}
                  onChange={(e) => handleChange('gaugePrimaryColor', e.target.value)}
                  className="border rounded-l-none h-8"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="gaugeSecondaryColor" className="text-xs">Secondary Color</Label>
              <div className="flex mt-1">
                <input
                  id="gaugeSecondaryColor"
                  type="color"
                  value={properties.gaugeSecondaryColor || "#E5E7EB"}
                  onChange={(e) => handleChange('gaugeSecondaryColor', e.target.value)}
                  className="w-8 h-8 p-1 border rounded-l-md"
                />
                <Input
                  value={properties.gaugeSecondaryColor || "#E5E7EB"}
                  onChange={(e) => handleChange('gaugeSecondaryColor', e.target.value)}
                  className="border rounded-l-none h-8"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Ons Section */}
      <div className="py-2">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => setAddOnsOpen(!addOnsOpen)}
        >
          <span className="font-medium">Add Ons</span>
          <ChevronDown open={addOnsOpen} />
        </div>
        
        {addOnsOpen && (
          <div className="space-y-3 mt-2">
            <div className="border-b pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <Label>Buttons</Label>
                </div>
                <Switch 
                  id="showButtons" 
                  checked={properties.showButtons === true}
                  onCheckedChange={(checked) => handleChange('showButtons', checked)} 
                />
              </div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <Label>Dropdowns</Label>
                </div>
                <Switch 
                  id="showDropdowns" 
                  checked={properties.showDropdowns === true}
                  onCheckedChange={(checked) => handleChange('showDropdowns', checked)} 
                />
              </div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <Label>KPIs</Label>
                </div>
                <Switch 
                  id="showKpis" 
                  checked={properties.showKpis === true}
                  onCheckedChange={(checked) => handleChange('showKpis', checked)} 
                />
              </div>
            </div>
            
            <div className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  <Label>Text</Label>
                </div>
                <Switch 
                  id="showText" 
                  checked={properties.showText === true}
                  onCheckedChange={(checked) => handleChange('showText', checked)} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
