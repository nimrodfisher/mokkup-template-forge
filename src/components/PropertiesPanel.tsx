
import { Element, useWireframe } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, Settings, ChevronDown } from "lucide-react";

export function PropertiesPanel() {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElementProperties } = useWireframe();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement || !showProperties) {
    return null;
  }
  
  // Header properties panel
  const renderHeaderProperties = (element: Element) => {
    const properties = element.properties || {};
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Edit header</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={() => toggleProperties()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex justify-between items-center">
              Details
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="title-toggle">Title</Label>
              <Switch 
                id="title-toggle" 
                checked={properties.title !== ''} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { title: checked ? 'DASHBOARD TITLE' : '' })
                } 
              />
            </div>
            
            {properties.title !== '' && (
              <div className="space-y-2">
                <Label htmlFor="title-text">Edit Text</Label>
                <Input 
                  id="title-text" 
                  value={properties.title || 'DASHBOARD TITLE'} 
                  onChange={(e) => updateElementProperties(element.id, { title: e.target.value })}
                />
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Label htmlFor="logo-toggle">Primary Logo</Label>
              <Switch 
                id="logo-toggle" 
                checked={properties.showLogo === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showLogo: checked })
                } 
              />
            </div>
            
            {properties.showLogo && (
              <Button className="w-full" variant="outline">
                Add Image
              </Button>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex justify-between items-center">
              Properties
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="bg-toggle">Background Color</Label>
              <Switch id="bg-toggle" />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="nav-toggle">Navigation Buttons</Label>
              <Switch 
                id="nav-toggle" 
                checked={properties.showNavigation === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showNavigation: checked })
                } 
              />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex justify-between items-center">
              Add Ons
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="secondary-logo-toggle">Secondary Logo</Label>
              <Switch id="secondary-logo-toggle" />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="text-toggle">Text</Label>
              <Switch id="text-toggle" />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="highlighted-text-toggle">Highlighted Text</Label>
              <Switch id="highlighted-text-toggle" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
          <Label className="text-sm font-semibold">Header Style</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  {properties.variant === 'default' && 'Default'}
                  {properties.variant === 'centered' && 'Centered'}
                  {properties.variant === 'with-description' && 'With Description'}
                  {properties.variant === 'with-metrics' && 'With Metrics'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 space-y-4">
                  <h4 className="font-medium">Available styles</h4>
                  <div className="space-y-2">
                    {['default', 'centered', 'with-description', 'with-metrics'].map(variant => (
                      <div 
                        key={variant}
                        onClick={() => updateElementProperties(element.id, { variant: variant as any })}
                        className={`p-3 border rounded-md cursor-pointer transition-all hover:border-blue-400 ${
                          properties.variant === variant ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          {variant === 'default' && (
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gray-200" />
                              <div className="h-4 bg-gray-300 w-32" />
                            </div>
                          )}
                          {variant === 'centered' && (
                            <div className="w-full flex justify-center">
                              <div className="h-4 bg-gray-300 w-32" />
                            </div>
                          )}
                          {variant === 'with-description' && (
                            <div className="space-y-2 w-full">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gray-200" />
                                <div className="h-4 bg-gray-300 w-32" />
                              </div>
                              <div className="h-2 bg-gray-200 w-full" />
                              <div className="h-2 bg-gray-200 w-3/4" />
                            </div>
                          )}
                          {variant === 'with-metrics' && (
                            <div className="flex justify-between w-full">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gray-200" />
                                <div className="h-4 bg-gray-300 w-24" />
                              </div>
                              <div className="flex space-x-3">
                                <div className="flex flex-col items-center">
                                  <div className="text-xs">Metric 1</div>
                                  <div className="text-xs font-bold">123</div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="text-xs">Metric 2</div>
                                  <div className="text-xs font-bold">456</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-2">
                          {properties.variant === variant && (
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-gray-500 mt-1">Double-click on the header to change styles</p>
        </div>
      </div>
    );
  };
  
  const renderCustomizationOptions = () => {
    switch (selectedElement.type) {
      case 'header':
        return renderHeaderProperties(selectedElement);
      default:
        return (
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Properties</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => toggleProperties()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-500 mt-2">Edit {selectedElement.type} properties</p>
          </div>
        );
    }
  };
  
  return (
    <div className="w-72 border-l bg-white overflow-auto h-full">
      <div className="p-4">
        {renderCustomizationOptions()}
      </div>
    </div>
  );
}
