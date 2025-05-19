import { Button } from "@/components/ui/button";
import { useWireframe, Element } from "@/hooks/useWireframe";
import { useState } from "react";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
}

export function PropertiesPanel({ onOpenStyleDialog }: PropertiesPanelProps) {
  const { elements, selectedElementId, updateElementProperties } = useWireframe();
  const selectedElement = selectedElementId ? elements.find(el => el.id === selectedElementId) : null;
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  if (!selectedElement) return null;
  
  const handleToggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };
  
  const renderElementProperties = () => {
    switch (selectedElement.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Header Properties</h2>
            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={onOpenStyleDialog}
            >
              Edit Header Style
            </Button>
          </div>
        );
      
      case 'filter':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Filter Properties</h2>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                // Open filter dialog logic handled in CanvasElement
              }}
            >
              Edit Filter Style
            </Button>
          </div>
        );
      
      case 'kpi':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">KPI Properties</h2>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                // Open KPI dialog logic handled in CanvasElement
              }}
            >
              Edit KPI Style
            </Button>
          </div>
        );
      
      case 'button':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Button Properties</h2>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                // Open button dialog logic handled in CanvasElement
              }}
            >
              Edit Button Style
            </Button>
          </div>
        );
      
      case 'textbox':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Text Box Properties</h2>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={onOpenStyleDialog}
            >
              Edit Text Content & Style
            </Button>
          </div>
        );
      
      default:
        return (
          <div>
            <h2 className="text-lg font-medium">{selectedElement.type} Properties</h2>
            <p className="text-sm text-gray-500 mt-2">No specific properties available.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="border-l border-gray-200 w-72 p-4 overflow-y-auto bg-white">
      <h2 className="font-semibold text-lg">Properties</h2>
      
      <div className="mt-4 space-y-6">
        {renderElementProperties()}
        
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleToggleAdvanced}
            className="text-xs"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Settings
          </Button>
          
          {showAdvanced && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Position</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">X</label>
                    <input 
                      type="number" 
                      value={selectedElement.position.x}
                      onChange={(e) => {
                        const x = parseInt(e.target.value) || 0;
                        updateElementProperties(selectedElement.id, {
                          position: { ...selectedElement.position, x }
                        });
                      }}
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Y</label>
                    <input 
                      type="number"
                      value={selectedElement.position.y}
                      onChange={(e) => {
                        const y = parseInt(e.target.value) || 0;
                        updateElementProperties(selectedElement.id, {
                          position: { ...selectedElement.position, y }
                        });
                      }}
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Width</label>
                    <input 
                      type="number"
                      value={selectedElement.size.width}
                      onChange={(e) => {
                        const width = parseInt(e.target.value) || 0;
                        updateElementProperties(selectedElement.id, {
                          size: { ...selectedElement.size, width }
                        });
                      }}
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Height</label>
                    <input 
                      type="number"
                      value={selectedElement.size.height}
                      onChange={(e) => {
                        const height = parseInt(e.target.value) || 0;
                        updateElementProperties(selectedElement.id, {
                          size: { ...selectedElement.size, height }
                        });
                      }}
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
