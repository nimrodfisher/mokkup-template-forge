
import React from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { GeomapDetailsSection } from "./GeomapDetailsSection";
import { GeomapDataSection } from "./GeomapDataSection";
import { GeomapAppearanceSection } from "./GeomapAppearanceSection";
import { GeomapAddOnsSection } from "./GeomapAddOnsSection";

interface GeomapPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function GeomapProperties({ element, updateElementProperties, onOpenStyleDialog }: GeomapPropertiesProps) {
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
        <div className="font-semibold">Geomap Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      <GeomapDetailsSection 
        properties={properties}
        handleChange={handleChange}
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
      />
      
      <GeomapDataSection 
        properties={properties}
        handleChange={handleChange}
        dataOpen={dataOpen}
        setDataOpen={setDataOpen}
      />
      
      <GeomapAppearanceSection 
        properties={properties}
        handleChange={handleChange}
        propertiesOpen={propertiesOpen}
        setPropertiesOpen={setPropertiesOpen}
      />
      
      <GeomapAddOnsSection 
        properties={properties}
        handleChange={handleChange}
        addOnsOpen={addOnsOpen}
        setAddOnsOpen={setAddOnsOpen}
      />
    </div>
  );
}
