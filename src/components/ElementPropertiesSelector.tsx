
import { useWireframe, Element } from "@/hooks/useWireframe";
import { HeaderProperties } from "./header-properties/HeaderProperties";
import { AreaChartProperties } from "./area-chart-properties/AreaChartProperties";

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
    // Add cases for other element types as needed
    default:
      return (
        <div className="p-4 text-sm text-gray-500">
          Select an element to edit its properties
        </div>
      );
  }
}
