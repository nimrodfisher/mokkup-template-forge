
import { useState, useEffect } from "react";
import { Element } from "@/hooks/useWireframe";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Upload, Trash2 } from "lucide-react";
import { HeaderAddOnsSection } from "./HeaderAddOnsSection";
import { HeaderVariationSection } from "./HeaderVariationSection";
import { HeaderDesignSection } from "./HeaderDesignSection";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HeaderProperties({ element, updateElementProperties, onOpenStyleDialog }: HeaderPropertiesProps) {
  const [showNavOptions, setShowNavOptions] = useState(false);
  const [showMetricOptions, setShowMetricOptions] = useState(false);
  const [showLogoOptions, setShowLogoOptions] = useState(false);
  const [showDescriptionOptions, setShowDescriptionOptions] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);

  // Local state for properties
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
  const [showLogo, setShowLogo] = useState<boolean>(element.properties?.showLogo || false);
  const [description, setDescription] = useState<string>(element.properties?.description || '');
  const [title, setTitle] = useState<string>(element.properties?.title || 'DASHBOARD TITLE');

  // Update local state when element changes
  useEffect(() => {
    console.log("HeaderProperties: Element updated", element.properties);
    setShowNavigation(element.properties?.showNavigation || false);
    setNavigationItems(element.properties?.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
    setShowMetrics(element.properties?.showMetrics || false);
    setMetrics(element.properties?.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
    setShowLogo(element.properties?.showLogo || false);
    setDescription(element.properties?.description || '');
    setTitle(element.properties?.title || 'DASHBOARD TITLE');
    
    // Auto-expand sections based on template variant
    const variant = element.properties?.variant;
    if (variant === 'with-metrics' || variant === 'title-metrics') {
      setShowMetricOptions(true);
    }
    if (variant === 'navigation-top' || variant === 'dark-navigation' || variant === 'centered-navigation-purple') {
      setShowNavOptions(true);
    }
    if (variant === 'with-description') {
      setShowDescriptionOptions(true);
    }
    if (variant === 'default' || variant === 'with-metrics' || variant === 'navigation-top' || variant === 'dark-navigation' || variant === 'colorful-banner' || variant === 'gradient') {
      setShowLogoOptions(true);
    }
  }, [element]);

  // Handle title change
  const handleTitleChange = (value: string) => {
    setTitle(value);
    updateElementProperties(element.id, { title: value });
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    updateElementProperties(element.id, { description: value });
  };

  // Handle logo toggle
  const handleLogoToggle = (checked: boolean) => {
    setShowLogo(checked);
    updateElementProperties(element.id, { showLogo: checked });
  };

  // Update navigation toggle
  const handleNavigationToggle = (checked: boolean) => {
    setShowNavigation(checked);
    updateElementProperties(element.id, { showNavigation: checked });
    console.log("Navigation toggle:", checked);
  };

  // Update metric toggle
  const handleMetricToggle = (checked: boolean) => {
    setShowMetrics(checked);
    updateElementProperties(element.id, { showMetrics: checked });
    console.log("Metrics toggle:", checked);
  };

  // Update navigation item
  const handleNavigationItemChange = (index: number, value: string) => {
    const newItems = [...navigationItems];
    newItems[index] = value;
    setNavigationItems(newItems);
    updateElementProperties(element.id, { navigationItems: newItems });
    console.log("Navigation items updated:", newItems);
  };

  // Update metric
  const handleMetricChange = (index: number, field: 'title' | 'value', value: string) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
    updateElementProperties(element.id, { metrics: newMetrics });
    console.log("Metrics updated:", newMetrics);
  };

  // Handle add-ons changes
  const handleAddOnsChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateElementProperties(element.id, { logoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleLogoRemove = () => {
    updateElementProperties(element.id, { logoUrl: '' });
  };

  // Check if current variant supports navigation
  const supportsNavigation = () => {
    const variant = element.properties?.variant;
    return !['centered-navigation-purple', 'navigation-top', 'dark-navigation', 'minimal'].includes(variant || '');
  };

  // Check if current variant supports metrics
  const supportsMetrics = () => {
    const variant = element.properties?.variant;
    return ['with-metrics', 'title-metrics'].includes(variant || '') || variant === 'default';
  };

  // Check if current variant supports logo
  const supportsLogo = () => {
    const variant = element.properties?.variant;
    return variant !== 'minimal';
  };

  // Check if current variant supports description
  const supportsDescription = () => {
    const variant = element.properties?.variant;
    return variant === 'with-description';
  };

  // Get variant display name
  const getVariantDisplayName = () => {
    const variant = element.properties?.variant;
    switch (variant) {
      case 'default': return 'Default Style';
      case 'with-description': return 'With Description';
      case 'with-metrics': return 'With Metrics';
      case 'centered-navigation-purple': return 'Centered Navigation (Purple)';
      case 'navigation-top': return 'Top Navigation';
      case 'double-logo-purple': return 'Double Logo (Purple)';
      case 'dark-navigation': return 'Dark Navigation';
      case 'gradient': return 'Gradient';
      case 'minimal': return 'Minimal';
      case 'colorful-banner': return 'Colorful Banner';
      case 'title-metrics': return 'Title with Metrics';
      default: return 'Default Style';
    }
  };

  return (
    <div className="space-y-5">
      {/* Template Info Section */}
      <div className="space-y-2">
        <div className="font-medium text-sm">Template: {getVariantDisplayName()}</div>
        <div className="text-xs text-gray-500">Configure template-specific properties below</div>
      </div>
      
      <Separator />

      {/* Title Section - Always show */}
      <div className="space-y-2">
        <div className="font-medium text-sm">Title</div>
        <div>
          <Label htmlFor="header-title" className="text-xs text-gray-500 mb-1 block">
            Header Title
          </Label>
          <Input
            id="header-title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-sm h-8"
            placeholder="Enter header title"
          />
        </div>
      </div>

      <Separator />

      {/* Logo Section - Show for variants that support it */}
      {supportsLogo() && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Logo</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowLogoOptions(!showLogoOptions)}
                className="h-7 w-7 p-0"
              >
                {showLogoOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-logo" className="text-sm">Show logo</Label>
              <Switch 
                id="show-logo"
                checked={showLogo} 
                onCheckedChange={handleLogoToggle}
              />
            </div>
            
            {showLogoOptions && showLogo && (
              <div className="space-y-3 pt-2">
                <div>
                  <Label className="text-xs text-gray-500 mb-2 block">Upload Logo</Label>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {element.properties?.logoUrl ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    {element.properties?.logoUrl && (
                      <div className="mt-2 p-2 border rounded-md">
                        <img 
                          src={element.properties.logoUrl} 
                          alt="Logo Preview" 
                          className="h-12 w-auto object-contain mx-auto mb-2"
                        />
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="w-full"
                          onClick={handleLogoRemove}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Logo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Separator />
        </>
      )}

      {/* Description Section - Only show for with-description variant */}
      {supportsDescription() && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Description</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDescriptionOptions(!showDescriptionOptions)}
                className="h-7 w-7 p-0"
              >
                {showDescriptionOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            
            {showDescriptionOptions && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="header-description" className="text-xs text-gray-500 mb-1 block">
                  Description Text
                </Label>
                <Textarea
                  id="header-description"
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  className="text-sm h-20 resize-none"
                  placeholder="Enter description text"
                />
              </div>
            )}
          </div>
          <Separator />
        </>
      )}
      
      {/* Navigation Section - Only show for variants that support it */}
      {supportsNavigation() && (
        <>
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
        </>
      )}
      
      {/* Metrics Section - Only show for variants that support it */}
      {supportsMetrics() && (
        <>
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
          <Separator />
        </>
      )}

      {/* Add Ons Section */}
      <HeaderAddOnsSection
        properties={element.properties || {}}
        handleChange={handleAddOnsChange}
        addOnsOpen={showAddOns}
        setAddOnsOpen={setShowAddOns}
      />

      <Separator />

      {/* Variation Section */}
      <HeaderVariationSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />

      {/* Design Customizations Section */}
      <HeaderDesignSection
        properties={element.properties || {}}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
