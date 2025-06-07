
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
import { HeatmapProperties } from "./heatmap-properties/HeatmapProperties";
import { QuadrantProperties } from "./quadrant-properties/QuadrantProperties";
import { ScatterPlotProperties } from "./scatter-plot-properties/ScatterPlotProperties";
import { GeomapProperties } from "./geomap-properties/GeomapProperties";
import { ColumnChartProperties } from "./column-chart-properties/ColumnChartProperties";
import { PieChartProperties } from "./pie-chart-properties/PieChartProperties";
import { ComboChartProperties } from "./combo-chart-properties/ComboChartProperties";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElement, updateLogoImage, updateImage, removeElement } = useWireframe();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement || !showProperties) {
    return null;
  }

  const handleDeleteElement = () => {
    if (selectedElementId) {
      removeElement(selectedElementId);
      toast.success(`${selectedElement.type} deleted`);
    }
  };
  
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
    <div className="w-72 border-l bg-white overflow-auto h-full">
      <div className="p-4">
        {/* Header with delete button */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
          <h3 className="font-semibold text-lg capitalize">{selectedElement.type} Properties</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteElement}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        {renderPropertiesComponent()}
      </div>
    </div>
  );
}
