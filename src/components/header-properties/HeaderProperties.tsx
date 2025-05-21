
import { useState, useEffect } from "react";
import { Element } from "@/hooks/useWireframe";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function HeaderProperties({ element, updateElementProperties }: HeaderPropertiesProps) {
  const [showNavOptions, setShowNavOptions] = useState(false);
  const [showMetricOptions, setShowMetricOptions] = useState(false);
  const [showTitleOptions, setShowTitleOptions] = useState(false);

  // Local state for properties
  const [title, setTitle] = useState<string>(element.properties?.title || 'DASHBOARD TITLE');
  const [showNavigation, setShowNavigation] = useState<boolean>(element.properties?.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  const [showMetrics, setShowMetrics] = useState<boolean>(element.properties?.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    element.properties?.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );

  // Update local state when element changes
  useEffect(() => {
    setTitle(element.properties?.title || 'DASHBOARD TITLE');
    setShowNavigation(element.properties?.showNavigation || false);
    setNavigationItems(element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
    setShowMetrics(element.properties?.showMetrics || false);
    setMetrics(element.properties?.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
  }, [element]);

  // Update title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateElementProperties(element.id, { title: value });
  };

  // Update navigation toggle
  const handleNavigationToggle = (checked: boolean) => {
    setShowNavigation(checked);
    updateElementProperties(element.id, { showNavigation: checked });
  };

  // Update metric toggle
  const handleMetricToggle = (checked: boolean) => {
    setShowMetrics(checked);
    updateElementProperties(element.id, { showMetrics: checked });
  };

  // Update navigation item
  const handleNavigationItemChange = (index: number, value: string) => {
    const newItems = [...navigationItems];
    newItems[index] = value;
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
  };

  // Update metric
  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
  };

  return (
    <div className="space-y-5">
      {/* Title Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Title</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowTitleOptions(!showTitleOptions)}
            className="h-7 w-7 p-0"
          >
            {showTitleOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        {(showTitleOptions || true) && (
          <div className="space-y-2 pt-2">
            <div>
              <Label htmlFor="header-title" className="text-xs text-gray-500 mb-1 block">
                Dashboard Title
              </Label>
              <Input
                id="header-title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-sm h-8"
              />
            </div>
          </div>
        )}
      </div>

      <Separator />
      
      {/* Navigation Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Navigation</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNavOptions(!showNavOptions)}
            className="h-7 w-7 p-0"
          >
            {showNavOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-nav" className="text-sm">Show navigation</Label>
          <Switch 
            id="show-nav"
            checked={showNavigation} 
            onCheckedChange={handleNavigationToggle}
          />
        </div>
        
        {showNavOptions && showNavigation && (
          <div className="space-y-2 pt-2">
            {navigationItems.map((item, index) => (
              <div key={index} className="mb-2">
                <Label htmlFor={`nav-item-${index}`} className="text-xs text-gray-500 mb-1 block">
                  Item {index + 1}
                </Label>
                <Input
                  id={`nav-item-${index}`}
                  value={item}
                  onChange={(e) => handleNavigationItemChange(index, e.target.value)}
                  className="text-sm h-8"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />
      
      {/* Metrics Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">Metrics</div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMetricOptions(!showMetricOptions)}
            className="h-7 w-7 p-0"
          >
            {showMetricOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-metrics" className="text-sm">Show metrics</Label>
          <Switch 
            id="show-metrics"
            checked={showMetrics} 
            onCheckedChange={handleMetricToggle}
          />
        </div>
        
        {showMetricOptions && showMetrics && (
          <div className="space-y-3 pt-2">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <Label htmlFor={`metric-title-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Title {index + 1}
                  </Label>
                  <Input
                    id={`metric-title-${index}`}
                    value={metric.title}
                    onChange={(e) => handleMetricChange(index, 'title', e.target.value)}
                    className="text-sm h-8 mb-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`metric-value-${index}`} className="text-xs text-gray-500 mb-1 block">
                    Value {index + 1}
                  </Label>
                  <Input
                    id={`metric-value-${index}`}
                    value={metric.value}
                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                    className="text-sm h-8"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
