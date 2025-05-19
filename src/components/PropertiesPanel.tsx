
import { useWireframe } from "@/hooks/useWireframe";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { HeaderProperties } from "./property-editors/HeaderProperties";
import { FilterProperties } from "./property-editors/FilterProperties";
import { KpiProperties } from "./property-editors/KpiProperties";
import { ButtonProperties } from "./property-editors/ButtonProperties";
import { TextboxProperties } from "./property-editors/TextboxProperties";
import { ImageProperties } from "./property-editors/ImageProperties";

export function PropertiesPanel() {
  const { selectedElementId, elements, updateElementProperties, removeElement } = useWireframe();
  
  if (!selectedElementId) return null;
  
  const element = elements.find(el => el.id === selectedElementId);
  
  if (!element) return null;
  
  const handleRemove = () => {
    removeElement(selectedElementId);
    toast.success(`${element.type} removed`);
  };
  
  const renderCustomizationOptions = () => {
    const properties = element.properties || {};
    
    switch (element.type) {
      case 'header':
        return (
          <HeaderProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      case 'filter':
        return (
          <FilterProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      case 'kpi':
        return (
          <KpiProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      case 'button':
        return (
          <ButtonProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      case 'textbox':
        return (
          <TextboxProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      case 'image':
        return (
          <ImageProperties 
            elementId={element.id} 
            properties={properties} 
            updateElementProperties={updateElementProperties} 
          />
        );
      default:
        return (
          <div className="p-4">
            <p className="text-sm text-gray-500">No properties available for this element type.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="w-72 border-l bg-white flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold capitalize">{element.type} Properties</h2>
        <Button variant="outline" size="sm" onClick={handleRemove}>
          Remove
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderCustomizationOptions()}
      </div>
    </div>
  );
}
