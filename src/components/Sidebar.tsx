
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWireframe, ElementType } from "@/hooks/useWireframe";
import { ComponentItem } from "./ComponentItem";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'elements' | 'layers'>('elements');
  const { elements, selectedElementId, selectElement, removeElement } = useWireframe();
  
  const components: { type: ElementType; label: string }[] = [
    { type: 'header', label: 'Header' },
    { type: 'filter', label: 'Filter' },
    { type: 'kpi', label: 'KPIs' },
    { type: 'button', label: 'Button' },
    { type: 'column-chart', label: 'Column Chart' },
    { type: 'bar-chart', label: 'Bar Chart' },
  ];
  
  return (
    <div className={cn("w-64 border-r bg-white flex flex-col h-full", className)}>
      <div className="border-b flex">
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium",
            activeTab === 'elements' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-center text-sm font-medium",
            activeTab === 'layers' ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
          onClick={() => setActiveTab('layers')}
        >
          Layers
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'elements' ? (
          <div>
            <div className="mb-4">
              <div className="relative">
                <input
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Find any element"
                />
              </div>
            </div>
            
            <div className="flex mb-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "flex-1 text-xs h-8",
                  "bg-white hover:bg-gray-50"
                )}
              >
                All elements
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
              >
                Favorites
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {components.map((component) => (
                <ComponentItem
                  key={component.type}
                  label={component.label}
                  type={component.type}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {elements.map((element) => (
              <div
                key={element.id}
                className={cn(
                  "px-2 py-1.5 rounded-md flex items-center justify-between text-sm",
                  selectedElementId === element.id
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100"
                )}
                onClick={() => selectElement(element.id)}
              >
                <span>{element.type}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeElement(element.id);
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            
            {elements.length === 0 && (
              <div className="text-gray-500 text-sm p-2 text-center">
                No elements on canvas
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
