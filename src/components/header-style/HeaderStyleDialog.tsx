
import { useState, useEffect } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ColorPicker } from "@/components/ui/color-picker";

interface HeaderStyleDialogProps {
  elementId: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (elementId: string, properties: any) => void;
}

export function HeaderStyleDialog({ elementId, isOpen, onClose, onUpdate }: HeaderStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  
  // Get the element
  const element = elements.find(el => el.id === elementId);
  
  // Local state
  const [selectedVariant, setSelectedVariant] = useState<string>(element?.properties?.variant || 'default');
  const [showNavigation, setShowNavigation] = useState<boolean>(element?.properties?.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    element?.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  const [showMetrics, setShowMetrics] = useState<boolean>(element?.properties?.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    element?.properties?.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );

  // Update state when element changes or dialog opens
  useEffect(() => {
    if (element && isOpen) {
      console.log("HeaderStyleDialog: Element updated and dialog opened", element.properties);
      setSelectedVariant(element.properties?.variant || 'default');
      setShowNavigation(element.properties?.showNavigation || false);
      setNavigationItems(element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
      setShowMetrics(element.properties?.showMetrics || false);
      setMetrics(element.properties?.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
    }
  }, [element, isOpen]);
  
  // Handle changing the variant
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    
    // Reset navigation based on variant
    if (['centered-navigation-purple', 'navigation-top', 'dark-navigation'].includes(value)) {
      setShowNavigation(true);
    } else if (value === 'minimal') {
      setShowNavigation(false);
    }
    
    // Reset metrics based on variant
    if (['with-metrics', 'title-metrics'].includes(value)) {
      setShowMetrics(true);
    }
  };
  
  // Handle save changes
  const handleSave = () => {
    console.log("HeaderStyleDialog: Saving changes with variant", selectedVariant);
    
    const updatedProperties = {
      variant: selectedVariant,
      showNavigation: showNavigation,
      navigationItems: navigationItems,
      showMetrics: showMetrics,
      metrics: metrics
    };
    
    // Apply the changes
    if (onUpdate) {
      console.log("HeaderStyleDialog: Using onUpdate to apply changes", updatedProperties);
      onUpdate(elementId, updatedProperties);
    } else {
      console.log("HeaderStyleDialog: Using updateElementProperties to apply changes", updatedProperties);
      updateElementProperties(elementId, updatedProperties);
    }
    
    toast.success("Header style updated!");
    onClose();
  };
  
  // Handle navigation item change
  const handleNavigationItemChange = (index: number, value: string) => {
    const newNavigationItems = [...navigationItems];
    newNavigationItems[index] = value;
    setNavigationItems(newNavigationItems);
  };
  
  // Handle metric change
  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setMetrics(newMetrics);
  };
  
  if (!element) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Header Style</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="variants" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="variants">Header Variants</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          {/* Header Variants Tab */}
          <TabsContent value="variants" className="space-y-4">
            <RadioGroup
              value={selectedVariant}
              onValueChange={handleVariantChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2">
                <h3 className="font-medium text-base mb-2">Basic Headers</h3>
              </div>
              
              {/* Default Header */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                selectedVariant === 'default' ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}>
                <RadioGroupItem value="default" id="default" className="sr-only" />
                <Label htmlFor="default" className="cursor-pointer block">
                  <div className="font-medium mb-1">Default Header</div>
                  <div className="h-12 bg-white border flex items-center rounded overflow-hidden mb-2">
                    <div className="h-8 w-8 bg-gray-200 mx-3"></div>
                    <div className="font-bold text-xs">DASHBOARD TITLE</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Simple header with logo and title
                  </div>
                </Label>
              </div>
              
              {/* With Description */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                selectedVariant === 'with-description' ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}>
                <RadioGroupItem value="with-description" id="with-description" className="sr-only" />
                <Label htmlFor="with-description" className="cursor-pointer block">
                  <div className="font-medium mb-1">With Description</div>
                  <div className="h-16 bg-white border rounded overflow-hidden mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-200 mx-3"></div>
                      <div className="font-bold text-xs">DASHBOARD TITLE</div>
                    </div>
                    <div className="text-[10px] mx-3 mt-1 text-gray-500">Dashboard description text goes here</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Header with title and description
                  </div>
                </Label>
              </div>
              
              <div className="col-span-2">
                <h3 className="font-medium text-base mb-2 mt-4">Metric Headers</h3>
              </div>
              
              {/* With Metrics */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                selectedVariant === 'with-metrics' ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}>
                <RadioGroupItem value="with-metrics" id="with-metrics" className="sr-only" />
                <Label htmlFor="with-metrics" className="cursor-pointer block">
                  <div className="font-medium mb-1">With Metrics</div>
                  <div className="h-14 bg-white border flex items-center rounded overflow-hidden mb-2">
                    <div className="h-8 w-8 bg-gray-200 mx-3"></div>
                    <div className="font-bold text-xs mr-4">DASHBOARD TITLE</div>
                    <div className="flex text-[10px] ml-auto mr-4">
                      <div className="mx-2 text-center">
                        <div className="font-bold">123</div>
                        <div className="text-gray-500">Metric 1</div>
                      </div>
                      <div className="mx-2 text-center">
                        <div className="font-bold">456</div>
                        <div className="text-gray-500">Metric 2</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Header with metrics display
                  </div>
                </Label>
              </div>
              
              {/* Title With Metrics */}
              <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                selectedVariant === 'title-metrics' ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}>
                <RadioGroupItem value="title-metrics" id="title-metrics" className="sr-only" />
                <Label htmlFor="title-metrics" className="cursor-pointer block">
                  <div className="font-medium mb-1">Title With Metrics</div>
                  <div className="h-20 bg-white border rounded overflow-hidden mb-2">
                    <div className="h-10 flex items-center border-b">
                      <div className="font-bold text-xs mx-4">DASHBOARD TITLE</div>
                    </div>
                    <div className="flex text-[10px] justify-around px-2 py-1">
                      <div className="text-center">
                        <div className="font-bold">123</div>
                        <div className="text-gray-500">Metric 1</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">456</div>
                        <div className="text-gray-500">Metric 2</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">789</div>
                        <div className="text-gray-500">Metric 3</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Metrics displayed below title
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </TabsContent>
          
          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-navigation" 
                checked={showNavigation}
                onCheckedChange={setShowNavigation}
                disabled={['centered-navigation-purple', 'navigation-top', 'dark-navigation'].includes(selectedVariant)}
              />
              <Label htmlFor="show-navigation">Show Navigation</Label>
            </div>
            
            {showNavigation && (
              <div className="border rounded-md p-4 space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="navigation-1">Navigation Item 1</Label>
                  <Input 
                    id="navigation-1" 
                    value={navigationItems[0]} 
                    onChange={(e) => handleNavigationItemChange(0, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="navigation-2">Navigation Item 2</Label>
                  <Input 
                    id="navigation-2" 
                    value={navigationItems[1]} 
                    onChange={(e) => handleNavigationItemChange(1, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="navigation-3">Navigation Item 3</Label>
                  <Input 
                    id="navigation-3" 
                    value={navigationItems[2]} 
                    onChange={(e) => handleNavigationItemChange(2, e.target.value)}
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-metrics" 
                checked={showMetrics}
                onCheckedChange={setShowMetrics}
                disabled={['with-metrics', 'title-metrics'].includes(selectedVariant)}
              />
              <Label htmlFor="show-metrics">Show Metrics</Label>
            </div>
            
            {showMetrics && (
              <div className="border rounded-md p-4 space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric-1-title">Metric 1 Title</Label>
                    <Input 
                      id="metric-1-title" 
                      value={metrics[0]?.title || ''} 
                      onChange={(e) => handleMetricChange(0, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metric-1-value">Metric 1 Value</Label>
                    <Input 
                      id="metric-1-value" 
                      value={metrics[0]?.value || ''} 
                      onChange={(e) => handleMetricChange(0, 'value', e.target.value)}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric-2-title">Metric 2 Title</Label>
                    <Input 
                      id="metric-2-title" 
                      value={metrics[1]?.title || ''} 
                      onChange={(e) => handleMetricChange(1, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metric-2-value">Metric 2 Value</Label>
                    <Input 
                      id="metric-2-value" 
                      value={metrics[1]?.value || ''} 
                      onChange={(e) => handleMetricChange(1, 'value', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
