
import { useWireframe } from "@/hooks/useWireframe";
import { ElementPropertiesSelector } from "./ElementPropertiesSelector";

interface PropertiesPanelProps {
  onOpenStyleDialog: () => void;
  updateElementProperties: (id: string, properties: any) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { selectedElementId } = useWireframe();

  if (!selectedElementId) return null;

  return (
    <div className="w-64 h-full border-l bg-white overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium">Properties</h2>
          <button 
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onOpenStyleDialog}
          >
            Style
          </button>
        </div>
        
        <ElementPropertiesSelector updateElementProperties={updateElementProperties} />
      </div>
    </div>
  );
}
