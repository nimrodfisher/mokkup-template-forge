
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";
import { useState, useRef } from "react";
import { ShapeProperties } from "./properties/ShapeProperties";
import { HeaderProperties } from "./properties/HeaderProperties";
import { FilterProperties } from "./properties/FilterProperties";
import { KpiProperties } from "./properties/KpiProperties";
import { ImageProperties } from "./properties/ImageProperties";
import { DefaultProperties } from "./properties/DefaultProperties";
import { GaugeProperties } from "./gauge-properties/GaugeProperties";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElement, updateLogoImage, updateImage } = useWireframe();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement || !showProperties) {
    return null;
  }
  
  // Render the appropriate properties component based on the element type
  const renderPropertiesComponent = () => {
    switch (selectedElement.type) {
      case 'shapes':
        return (
          <ShapeProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'header':
        return (
          <HeaderProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
            updateLogoImage={updateLogoImage}
          />
        );
      case 'filter':
        return (
          <FilterProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
          />
        );
      case 'kpi':
        return (
          <KpiProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
          />
        );
      case 'image':
        return (
          <ImageProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
            updateImage={updateImage}
          />
        );
      case 'gauge-chart':
        return (
          <GaugeProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      default:
        return (
          <DefaultProperties
            element={selectedElement}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
    }
  };
  
  return (
    <div className="w-72 border-l bg-white overflow-auto h-full">
      <div className="p-4">
        {renderPropertiesComponent()}
      </div>
    </div>
  );
}
