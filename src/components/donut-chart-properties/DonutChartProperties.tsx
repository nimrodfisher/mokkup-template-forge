
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { DonutChartDetailsSection } from "./DonutChartDetailsSection";
import { DonutChartDataSection } from "./DonutChartDataSection";
import { DonutChartAppearanceSection } from "./DonutChartAppearanceSection";
import { DonutChartAddOnsSection } from "./DonutChartAddOnsSection";

interface DonutChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function DonutChartProperties({ element, updateElementProperties, onOpenStyleDialog }: DonutChartPropertiesProps) {
  const properties = element.properties || {};
  
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [dataOpen, setDataOpen] = React.useState(true);
  const [propertiesOpen, setPropertiesOpen] = React.useState(true);
  const [addOnsOpen, setAddOnsOpen] = React.useState(false);
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Donut Chart Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      <DonutChartDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <DonutChartDataSection 
        properties={properties}
        handleChange={handleChange}
        dataOpen={dataOpen}
        setDataOpen={setDataOpen}
      />
      
      <DonutChartAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
      
      <DonutChartAddOnsSection 
        properties={properties}
        handleChange={handleChange}
        addOnsOpen={addOnsOpen}
        setAddOnsOpen={setAddOnsOpen}
      />
    </div>
  );
}
