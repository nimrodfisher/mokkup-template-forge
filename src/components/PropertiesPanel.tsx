
import { Element } from "@/types/wireframe";
import { useWireframe } from "@/hooks/useWireframe";
import { useState, useRef } from "react";
import { ShapeProperties } from "./properties/ShapeProperties";
import { HeaderProperties } from "./properties/HeaderProperties";
import { FilterProperties } from "./properties/FilterProperties";
import { KpiProperties } from "./properties/KpiProperties";
import { ImageProperties } from "./properties/ImageProperties";
import { DefaultProperties } from "./properties/DefaultProperties";
import { TextboxProperties } from "./properties/TextboxProperties";
import { GaugeProperties } from "./gauge-properties/GaugeProperties";
import { HeatmapProperties } from "./heatmap-properties/HeatmapProperties";
import { QuadrantProperties } from "./quadrant-properties/QuadrantProperties";
import { ScatterPlotProperties } from "./scatter-plot-properties/ScatterPlotProperties";
import { GeomapProperties } from "./geomap-properties/GeomapProperties";
import { ColumnChartProperties } from "./column-chart-properties/ColumnChartProperties";
import { PieChartProperties } from "./pie-chart-properties/PieChartProperties";
import { ComboChartProperties } from "./combo-chart-properties/ComboChartProperties";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElement, updateLogoImage, updateImage } = useWireframe();
  const isMobile = useIsMobile();
  
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
      case 'textbox':
        return (
          <TextboxProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            toggleProperties={toggleProperties}
            onOpenStyleDialog={onOpenStyleDialog}
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
      case 'heatmap':
        return (
          <HeatmapProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'quadrant-chart':
        return (
          <QuadrantProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'scatter-plot':
        return (
          <ScatterPlotProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'geomap':
        return (
          <GeomapProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'column-chart':
        return (
          <ColumnChartProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'combo-chart':
        return (
          <ComboChartProperties
            element={selectedElement}
            updateElementProperties={updateElementProperties}
            onOpenStyleDialog={onOpenStyleDialog}
          />
        );
      case 'pie-chart':
        return (
          <PieChartProperties
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
    <div className={`
      ${isMobile 
        ? 'w-full h-full overflow-auto bg-background' 
        : 'w-72 border-l bg-background overflow-auto h-full'
      }
    `}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Properties</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleProperties}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="p-4">
        {renderPropertiesComponent()}
      </div>
    </div>
  );
}
