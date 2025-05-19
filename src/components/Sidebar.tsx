
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
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'charts' | 'tables' | 'basic' | 'tools'>('all');
  const { elements, selectedElementId, selectElement, removeElement } = useWireframe();
  
  const components: { type: ElementType; label: string; category: 'basic' | 'charts' | 'tables' | 'other' | 'tools' }[] = [
    // Basic elements
    { type: 'header', label: 'Header', category: 'basic' },
    { type: 'filter', label: 'Filter', category: 'basic' },
    { type: 'kpi', label: 'KPIs', category: 'basic' },
    { type: 'button', label: 'Button', category: 'basic' },
    { type: 'textbox', label: 'Text Box', category: 'basic' },
    { type: 'image', label: 'Image', category: 'basic' },
    { type: 'shapes', label: 'Shapes', category: 'basic' },
    
    // Chart elements
    { type: 'column-chart', label: 'Column Chart', category: 'charts' },
    { type: 'bar-chart', label: 'Bar Chart', category: 'charts' },
    { type: 'line-chart', label: 'Line Chart', category: 'charts' },
    { type: 'area-chart', label: 'Area Chart', category: 'charts' },
    { type: 'combo-chart', label: 'Combo Chart', category: 'charts' },
    { type: 'pie-chart', label: 'Pie Chart', category: 'charts' },
    { type: 'donut-chart', label: 'Donut Chart', category: 'charts' },
    { type: 'funnel-chart', label: 'Funnel Chart', category: 'charts' },
    { type: 'histogram', label: 'Histogram', category: 'charts' },
    { type: 'gauge', label: 'Gauge', category: 'charts' },
    { type: 'scatter-plot', label: 'Scatter Plot', category: 'charts' },
    { type: 'bubble-chart', label: 'Bubble Chart', category: 'charts' },
    { type: 'waterfall', label: 'Waterfall', category: 'charts' },
    { type: 'sankey', label: 'Sankey', category: 'charts' },
    { type: 'quadrant-chart', label: 'Quadrant Chart', category: 'charts' },
    
    // Table elements
    { type: 'simple-table', label: 'Simple Table', category: 'tables' },
    { type: 'hierarchy-table', label: 'Hierarchy Table', category: 'tables' },
    
    // Other visualizations
    { type: 'geomap', label: 'Geomap', category: 'other' },
    { type: 'treemap', label: 'Treemap', category: 'other' },
    { type: 'heatmap', label: 'Heatmap', category: 'other' },
    
    // Tools
    { type: 'delete', label: 'Delete Tool', category: 'tools' },
  ];
  
  // Filter components based on category
  const filteredComponents = components.filter(component => 
    categoryFilter === 'all' || component.category === categoryFilter
  );
  
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
            
            <div className="flex mb-4 flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs h-8",
                  categoryFilter === 'all' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                )}
                onClick={() => setCategoryFilter('all')}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs h-8",
                  categoryFilter === 'basic' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                )}
                onClick={() => setCategoryFilter('basic')}
              >
                Basic
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs h-8",
                  categoryFilter === 'charts' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                )}
                onClick={() => setCategoryFilter('charts')}
              >
                Charts
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs h-8",
                  categoryFilter === 'tables' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                )}
                onClick={() => setCategoryFilter('tables')}
              >
                Tables
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "text-xs h-8",
                  categoryFilter === 'tools' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                )}
                onClick={() => setCategoryFilter('tools')}
              >
                Tools
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {filteredComponents.map((component) => (
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
