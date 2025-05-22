
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { GaugeDetailsSection } from "./GaugeDetailsSection";
import { GaugeValuesSection } from "./GaugeValuesSection";
import { GaugeAppearanceSection } from "./GaugeAppearanceSection";
import { GaugeAddOnsSection } from "./GaugeAddOnsSection";

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
      
      <GaugeDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <GaugeValuesSection 
        properties={properties}
        handleChange={handleChange}
        numericHandler={numericHandler}
        valuesOpen={valuesOpen}
        setValuesOpen={setValuesOpen}
      />
      
      <GaugeAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
      
      <GaugeAddOnsSection 
        properties={properties}
        handleChange={handleChange}
        addOnsOpen={addOnsOpen}
        setAddOnsOpen={setAddOnsOpen}
      />
    </div>
  );
}
