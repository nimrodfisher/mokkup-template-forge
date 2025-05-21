
import { useWireframe, Element } from "@/hooks/useWireframe";
import { HeaderProperties } from "./header-properties/HeaderProperties";

interface ElementPropertiesSelectorProps {
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ElementPropertiesSelector({ updateElementProperties }: ElementPropertiesSelectorProps) {
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
    case 'textbox':
      return (
        <div className="p-4 text-sm text-gray-500">
          Select the Style button to edit textbox properties
        </div>
      );
    case 'kpi':
      return (
        <div className="p-4 text-sm text-gray-500">
          Select the Style button to edit KPI properties
        </div>
      );
    case 'image':
      return (
        <div className="p-4 text-sm text-gray-500">
          Select the Style button to edit image properties
        </div>
      );
    case 'shapes':
      return (
        <div className="p-4 text-sm text-gray-500">
          Select the Style button to edit shape properties
        </div>
      );
    case 'bar-chart':
    case 'column-chart':
      return (
        <div className="p-4 text-sm text-gray-500">
          Select the Style button to edit chart properties
        </div>
      );
    default:
      return (
        <div className="p-4 text-sm text-gray-500">
          Select an element to edit its properties
        </div>
      );
  }
}
