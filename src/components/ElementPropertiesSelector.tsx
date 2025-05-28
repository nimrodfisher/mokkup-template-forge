
import { useWireframe } from "@/hooks/useWireframe";
import { Element } from "@/types/wireframe";
import { HeaderProperties } from "./header-properties/HeaderProperties";
import { AreaChartProperties } from "./area-chart-properties/AreaChartProperties";
import { TableProperties } from "./table-properties/TableProperties";
import { ColumnChartProperties } from "./column-chart-properties/ColumnChartProperties";
import { PieChartProperties } from "./pie-chart-properties/PieChartProperties";
import { WaterfallProperties } from "./waterfall-properties/WaterfallProperties";

interface ElementPropertiesSelectorProps {
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function ElementPropertiesSelector({ updateElementProperties, onOpenStyleDialog }: ElementPropertiesSelectorProps) {
  const { selectedElementId, elements } = useWireframe();
  
  // Get the selected element
  const selectedElement = selectedElementId 
    ? elements.find(element => element.id === selectedElementId) 
    : null;
    
  if (!selectedElement) return null;
  
  // Render specific properties component based on element type
  switch (selectedElement.type) {
    case 'header':
      return (
        <HeaderProperties 
          element={selectedElement} 
          updateElementProperties={updateElementProperties}
          onOpenStyleDialog={onOpenStyleDialog}
        />
      );
    case 'area-chart':
      return (
        <AreaChartProperties
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
    case 'pie-chart':
      return (
        <PieChartProperties
          element={selectedElement}
          updateElementProperties={updateElementProperties}
          onOpenStyleDialog={onOpenStyleDialog}
        />
      );
    case 'simple-table':
      return (
        <TableProperties
          element={selectedElement}
          updateElementProperties={updateElementProperties}
          onOpenStyleDialog={onOpenStyleDialog}
        />
      );
    case 'waterfall':
      return (
        <WaterfallProperties
          element={selectedElement}
          updateElementProperties={updateElementProperties}
          onOpenStyleDialog={onOpenStyleDialog}
        />
      );
    default:
      return (
        <div className="p-4 text-sm text-gray-500">
          Select an element to edit its properties
        </div>
      );
  }
}
