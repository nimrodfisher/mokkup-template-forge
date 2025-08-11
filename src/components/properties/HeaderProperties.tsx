import { useState, useEffect } from "react";
import { Element } from "@/types/wireframe";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Palette } from "lucide-react";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function HeaderProperties({ element, updateElementProperties, onOpenStyleDialog }: HeaderPropertiesProps) {
  const properties = element.properties || {};
  
  // Local state for all header properties
  const [title, setTitle] = useState<string>(properties.title || 'DASHBOARD TITLE');
  const [showLogo, setShowLogo] = useState<boolean>(properties.showLogo || false);
  const [showNavigation, setShowNavigation] = useState<boolean>(properties.showNavigation || false);
  const [navigationItems, setNavigationItems] = useState<string[]>(
    properties.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]
  );
  const [showMetrics, setShowMetrics] = useState<boolean>(properties.showMetrics || false);
  const [metrics, setMetrics] = useState<Array<{title: string, value: string}>>(
    properties.metrics || [
      { title: "Metric 1", value: "123" },
      { title: "Metric 2", value: "456" }
    ]
  );
  const [description, setDescription] = useState<string>(properties.description || '');
  const [showIcon, setShowIcon] = useState<boolean>(properties.showIcon || false);
  const [showText, setShowText] = useState<boolean>(properties.showText || false);
  const [textContent, setTextContent] = useState<string>(properties.textContent || 'Header text content');
  const [showNavigationButtons, setShowNavigationButtons] = useState<boolean>(properties.showNavigationButtons || false);
  const [navigationButtons, setNavigationButtons] = useState<Array<{title: string, active?: boolean}>>(
    properties.navigationButtons || [
      { title: 'Navigation 1', active: true },
      { title: 'Navigation 2', active: false },
      { title: 'Navigation 3', active: false }
    ]
  );
  const [showDropdowns, setShowDropdowns] = useState<boolean>(properties.showDropdowns || false);
  const [dropdowns, setDropdowns] = useState<Array<{title: string, values: string[]}>>(
    properties.headerDropdowns || [{ title: 'Dropdown 1', values: ['Option 1', 'Option 2'] }]
  );
  const [showDoubleLogos, setShowDoubleLogos] = useState<boolean>(properties.showDoubleLogos || false);
  const [titleAlignment, setTitleAlignment] = useState<'left' | 'center' | 'right'>(
    (properties.titleAlignment as 'left' | 'center' | 'right') || 'left'
  );
  const [titleSize, setTitleSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    (properties.titleSize as 'sm' | 'md' | 'lg' | 'xl') || 'md'
  );
  const [titleWeight, setTitleWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>(
    (properties.titleWeight as 'normal' | 'medium' | 'semibold' | 'bold') || 'bold'
  );

  // Update local state when element changes
  useEffect(() => {
    setTitle(properties.title || 'DASHBOARD TITLE');
    setShowLogo(properties.showLogo || false);
    setShowNavigation(properties.showNavigation || false);
    setNavigationItems(properties.navigationItems || ["Navigation 1", "Navigation 2", "Navigation 3"]);
    setShowMetrics(properties.showMetrics || false);
    setMetrics(properties.metrics || [{ title: "Metric 1", value: "123" }, { title: "Metric 2", value: "456" }]);
    setDescription(properties.description || '');
    setShowIcon(properties.showIcon || false);
    setShowText(properties.showText || false);
    setTextContent(properties.textContent || 'Header text content');
    setShowNavigationButtons(properties.showNavigationButtons || false);
    setNavigationButtons(properties.navigationButtons || [
      { title: 'Navigation 1', active: true },
      { title: 'Navigation 2', active: false },
      { title: 'Navigation 3', active: false }
    ]);
    setShowDropdowns(properties.showDropdowns || false);
    setDropdowns(properties.headerDropdowns || [{ title: 'Dropdown 1', values: ['Option 1', 'Option 2'] }]);
    setShowDoubleLogos(properties.showDoubleLogos || false);
    setTitleAlignment((properties.titleAlignment as 'left' | 'center' | 'right') || 'left');
    setTitleSize((properties.titleSize as 'sm' | 'md' | 'lg' | 'xl') || 'md');
    setTitleWeight((properties.titleWeight as 'normal' | 'medium' | 'semibold' | 'bold') || 'bold');
  }, [properties]);

  // Helper function to update properties
  const updateProperty = (key: string, value: any) => {
    updateElementProperties(element.id, { [key]: value });
  };

  // Handle file upload for logos
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateProperty('logoUrl', logoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle secondary logo upload
  const handleSecondaryLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateProperty('secondaryLogoUrl', logoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle icon upload
  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const iconUrl = e.target?.result as string;
        updateProperty('iconUrl', iconUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header Style */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Header Style
          </h4>
          {onOpenStyleDialog && (
            <Button variant="outline" size="sm" onClick={onOpenStyleDialog}>
              <Settings className="h-4 w-4 mr-1" />
              Styles
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Current: {properties.variant || 'Default'}
        </p>
      </div>

      <Separator />

      {/* Title Configuration */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Title</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-title">Show Title</Label>
          <Switch
            id="show-title"
            checked={title !== ''}
            onCheckedChange={(checked) => {
              const newTitle = checked ? 'DASHBOARD TITLE' : '';
              setTitle(newTitle);
              updateProperty('title', newTitle);
            }}
          />
        </div>

        {title !== '' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="title-text">Title Text</Label>
              <Input
                id="title-text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  updateProperty('title', e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Alignment</Label>
                <Select 
                  value={titleAlignment} 
                  onValueChange={(value) => {
                    setTitleAlignment(value as 'left' | 'center' | 'right');
                    updateProperty('titleAlignment', value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select 
                  value={titleSize} 
                  onValueChange={(value) => {
                    setTitleSize(value as 'sm' | 'md' | 'lg' | 'xl');
                    updateProperty('titleSize', value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weight</Label>
              <Select 
                value={titleWeight} 
                onValueChange={(value) => {
                  setTitleWeight(value as 'normal' | 'medium' | 'semibold' | 'bold');
                  updateProperty('titleWeight', value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      <Separator />

      {/* Logo Configuration */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Logo</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-logo">Show Logo</Label>
          <Switch
            id="show-logo"
            checked={showLogo}
            onCheckedChange={(checked) => {
              setShowLogo(checked);
              updateProperty('showLogo', checked);
            }}
          />
        </div>

        {showLogo && (
          <div className="space-y-2">
            <Button className="w-full" variant="outline" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleLogoUpload(e as any);
              input.click();
            }}>
              {properties.logoUrl ? 'Change Logo' : 'Upload Logo'}
            </Button>
            
            {properties.logoUrl && (
              <div className="p-2 border rounded-md">
                <img 
                  src={properties.logoUrl} 
                  alt="Logo Preview" 
                  className="h-12 w-auto object-contain mx-auto"
                />
                <Button 
                  className="w-full mt-2" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => updateProperty('logoUrl', '')}
                >
                  Remove Logo
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Double Logo Option */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-double-logos">Double Logos</Label>
          <Switch
            id="show-double-logos"
            checked={showDoubleLogos}
            onCheckedChange={(checked) => {
              setShowDoubleLogos(checked);
              updateProperty('showDoubleLogos', checked);
            }}
          />
        </div>

        {showDoubleLogos && (
          <div className="space-y-2">
            <Button className="w-full" variant="outline" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleSecondaryLogoUpload(e as any);
              input.click();
            }}>
              {properties.secondaryLogoUrl ? 'Change Secondary Logo' : 'Upload Secondary Logo'}
            </Button>
            
            {properties.secondaryLogoUrl && (
              <div className="p-2 border rounded-md">
                <img 
                  src={properties.secondaryLogoUrl} 
                  alt="Secondary Logo Preview" 
                  className="h-12 w-auto object-contain mx-auto"
                />
                <Button 
                  className="w-full mt-2" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => updateProperty('secondaryLogoUrl', '')}
                >
                  Remove Secondary Logo
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Description */}
      {properties.variant === 'with-description' && (
        <>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Description</h4>
            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                updateProperty('description', e.target.value);
              }}
              placeholder="Enter description"
              className="h-20"
            />
          </div>
          <Separator />
        </>
      )}

      {/* Icon */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Icon</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-icon">Show Icon</Label>
          <Switch
            id="show-icon"
            checked={showIcon}
            onCheckedChange={(checked) => {
              setShowIcon(checked);
              updateProperty('showIcon', checked);
            }}
          />
        </div>

        {showIcon && (
          <div className="space-y-2">
            <Button className="w-full" variant="outline" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleIconUpload(e as any);
              input.click();
            }}>
              Upload Icon
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Text Content */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Text Content</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-text">Show Text</Label>
          <Switch
            id="show-text"
            checked={showText}
            onCheckedChange={(checked) => {
              setShowText(checked);
              updateProperty('showText', checked);
            }}
          />
        </div>

        {showText && (
          <div className="space-y-2">
            <Textarea
              value={textContent}
              onChange={(e) => {
                setTextContent(e.target.value);
                updateProperty('textContent', e.target.value);
              }}
              placeholder="Enter text content"
              className="h-16"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Navigation</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-navigation">Show Navigation</Label>
          <Switch
            id="show-navigation"
            checked={showNavigation}
            onCheckedChange={(checked) => {
              setShowNavigation(checked);
              updateProperty('showNavigation', checked);
            }}
          />
        </div>

        {showNavigation && (
          <div className="space-y-2">
            <Label>Navigation Items</Label>
            {navigationItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...navigationItems];
                    newItems[index] = e.target.value;
                    setNavigationItems(newItems);
                    updateProperty('navigationItems', newItems);
                  }}
                  placeholder={`Navigation ${index + 1}`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = navigationItems.filter((_, i) => i !== index);
                    setNavigationItems(newItems);
                    updateProperty('navigationItems', newItems);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newItems = [...navigationItems, `Navigation ${navigationItems.length + 1}`];
                setNavigationItems(newItems);
                updateProperty('navigationItems', newItems);
              }}
            >
              Add Navigation Item
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-nav-buttons">Navigation Buttons</Label>
          <Switch
            id="show-nav-buttons"
            checked={showNavigationButtons}
            onCheckedChange={(checked) => {
              setShowNavigationButtons(checked);
              updateProperty('showNavigationButtons', checked);
            }}
          />
        </div>

        {showNavigationButtons && (
          <div className="space-y-2">
            <Label>Navigation Buttons</Label>
            {navigationButtons.map((button, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={button.title}
                  onChange={(e) => {
                    const newButtons = [...navigationButtons];
                    newButtons[index] = { ...newButtons[index], title: e.target.value };
                    setNavigationButtons(newButtons);
                    updateProperty('navigationButtons', newButtons);
                  }}
                  placeholder={`Button ${index + 1}`}
                />
                <Switch
                  checked={button.active || false}
                  onCheckedChange={(checked) => {
                    const newButtons = [...navigationButtons];
                    // Only one button can be active at a time
                    if (checked) {
                      newButtons.forEach((btn, i) => {
                        btn.active = i === index;
                      });
                    } else {
                      newButtons[index].active = false;
                    }
                    setNavigationButtons(newButtons);
                    updateProperty('navigationButtons', newButtons);
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newButtons = navigationButtons.filter((_, i) => i !== index);
                    setNavigationButtons(newButtons);
                    updateProperty('navigationButtons', newButtons);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newButtons = [...navigationButtons, { title: `Button ${navigationButtons.length + 1}`, active: false }];
                setNavigationButtons(newButtons);
                updateProperty('navigationButtons', newButtons);
              }}
            >
              Add Navigation Button
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Metrics</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-metrics">Show Metrics</Label>
          <Switch
            id="show-metrics"
            checked={showMetrics}
            onCheckedChange={(checked) => {
              setShowMetrics(checked);
              updateProperty('showMetrics', checked);
            }}
          />
        </div>

        {showMetrics && (
          <div className="space-y-2">
            <Label>Metrics</Label>
            {metrics.map((metric, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input
                  value={metric.title}
                  onChange={(e) => {
                    const newMetrics = [...metrics];
                    newMetrics[index] = { ...newMetrics[index], title: e.target.value };
                    setMetrics(newMetrics);
                    updateProperty('metrics', newMetrics);
                  }}
                  placeholder="Metric title"
                />
                <Input
                  value={metric.value}
                  onChange={(e) => {
                    const newMetrics = [...metrics];
                    newMetrics[index] = { ...newMetrics[index], value: e.target.value };
                    setMetrics(newMetrics);
                    updateProperty('metrics', newMetrics);
                  }}
                  placeholder="Value"
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newMetrics = [...metrics, { title: `Metric ${metrics.length + 1}`, value: '0' }];
                setMetrics(newMetrics);
                updateProperty('metrics', newMetrics);
              }}
            >
              Add Metric
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Dropdowns */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Dropdowns</h4>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="show-dropdowns">Show Dropdowns</Label>
          <Switch
            id="show-dropdowns"
            checked={showDropdowns}
            onCheckedChange={(checked) => {
              setShowDropdowns(checked);
              updateProperty('showDropdowns', checked);
            }}
          />
        </div>

        {showDropdowns && (
          <div className="space-y-2">
            <Label>Dropdowns</Label>
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="space-y-2 p-2 border rounded">
                <Input
                  value={dropdown.title}
                  onChange={(e) => {
                    const newDropdowns = [...dropdowns];
                    newDropdowns[index] = { ...newDropdowns[index], title: e.target.value };
                    setDropdowns(newDropdowns);
                    updateProperty('headerDropdowns', newDropdowns);
                  }}
                  placeholder="Dropdown title"
                />
                <div className="text-xs text-muted-foreground">
                  Values: {dropdown.values.join(', ')}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDropdowns = dropdowns.filter((_, i) => i !== index);
                    setDropdowns(newDropdowns);
                    updateProperty('headerDropdowns', newDropdowns);
                  }}
                >
                  Remove Dropdown
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newDropdowns = [...dropdowns, { title: `Dropdown ${dropdowns.length + 1}`, values: ['Option 1', 'Option 2'] }];
                setDropdowns(newDropdowns);
                updateProperty('headerDropdowns', newDropdowns);
              }}
            >
              Add Dropdown
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}