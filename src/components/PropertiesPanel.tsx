import { Element, useWireframe } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, Settings, ChevronDown, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertiesPanelProps {
  onOpenStyleDialog?: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function PropertiesPanel({ onOpenStyleDialog, updateElementProperties }: PropertiesPanelProps) {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElement, updateLogoImage, updateImage } = useWireframe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [filterValues, setFilterValues] = useState<string[]>(['All', 'Value 1', 'Value 2']);
  const [indicatorColor, setIndicatorColor] = useState('#8B5CF6');
  const [borderColor, setBorderColor] = useState('#e5e7eb');
  const [shapeColor, setShapeColor] = useState('#9b87f5');
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement || !showProperties) {
    return null;
  }
  
  // Update colors when the component mounts or when the selected element changes
  if (selectedElement.properties?.backgroundColor && backgroundColor !== selectedElement.properties.backgroundColor) {
    setBackgroundColor(selectedElement.properties.backgroundColor);
  }
  
  if (selectedElement.properties?.textColor && textColor !== selectedElement.properties.textColor) {
    setTextColor(selectedElement.properties.textColor);
  }
  
  if (selectedElement.properties?.filterValues && 
      JSON.stringify(filterValues) !== JSON.stringify(selectedElement.properties.filterValues)) {
    setFilterValues(selectedElement.properties.filterValues);
  }
  
  if (selectedElement.properties?.indicatorColor && indicatorColor !== selectedElement.properties.indicatorColor) {
    setIndicatorColor(selectedElement.properties.indicatorColor);
  }
  
  if (selectedElement.properties?.borderColor && borderColor !== selectedElement.properties.borderColor) {
    setBorderColor(selectedElement.properties.borderColor);
  }
  
  if (selectedElement.properties?.shapeColor && shapeColor !== selectedElement.properties.shapeColor) {
    setShapeColor(selectedElement.properties.shapeColor);
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && selectedElementId) {
        const base64String = event.target.result.toString();
        updateLogoImage(selectedElementId, base64String);
        toast.success('Logo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && selectedElementId) {
        const base64String = event.target.result.toString();
        updateImage(selectedElementId, base64String);
        toast.success('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const triggerImageFileInput = () => {
    imageFileInputRef.current?.click();
  };
  
  // Shape properties panel
  const renderShapeProperties = (element: Element) => {
    const properties = element.properties || {};
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Edit Shape</h3>
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
              Shape Content
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="title-toggle">Title</Label>
              <Switch 
                id="title-toggle" 
                checked={properties.showTitle !== false} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showTitle: checked })
                } 
              />
            </div>
            
            {properties.showTitle !== false && (
              <div className="space-y-2">
                <Label htmlFor="title-text">Edit Text</Label>
                <Input 
                  id="title-text" 
                  value={properties.title || 'Title goes here'} 
                  onChange={(e) => updateElementProperties(element.id, { title: e.target.value })}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="block mb-1">Text Alignment</Label>
              <ToggleGroup type="single" value={properties.textAlignment || 'center'} 
                onValueChange={(value) => {
                  if (value) updateElementProperties(element.id, { textAlignment: value as 'left' | 'center' | 'right' });
                }}
                className="justify-start border rounded-md p-1"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="shape-color">Shape Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="shape-color" 
                  value={shapeColor} 
                  onChange={(e) => {
                    setShapeColor(e.target.value);
                    updateElementProperties(element.id, { shapeColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={shapeColor} 
                  onChange={(e) => {
                    setShapeColor(e.target.value);
                    updateElementProperties(element.id, { shapeColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="text-color" 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="has-border">Border</Label>
              <Switch 
                id="has-border" 
                checked={properties.hasBorder === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { hasBorder: checked })
                }
              />
            </div>
            
            {properties.hasBorder && (
              <div className="flex justify-between items-center">
                <Label htmlFor="border-color">Border Color</Label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    id="border-color" 
                    value={borderColor} 
                    onChange={(e) => {
                      setBorderColor(e.target.value);
                      updateElementProperties(element.id, { borderColor: e.target.value });
                    }}
                    className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                  />
                  <Input 
                    value={borderColor} 
                    onChange={(e) => {
                      setBorderColor(e.target.value);
                      updateElementProperties(element.id, { borderColor: e.target.value });
                    }}
                    className="w-24"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
          <Label className="text-sm font-semibold">Shape Style</Label>
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              onClick={onOpenStyleDialog}
            >
              {properties.shapeVariant === 'triangle' && 'Triangle'}
              {properties.shapeVariant === 'rectangle' && 'Rectangle'}
              {properties.shapeVariant === 'circle' && 'Circle'}
              {properties.shapeVariant === 'oval' && 'Oval'}
              {!properties.shapeVariant && 'Choose Shape Style'}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Double-click on the shape to change styles</p>
        </div>
      </div>
    );
  };
  
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
            
            {properties.variant !== 'minimal' && (
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
            )}
            
            {properties.showLogo && properties.variant !== 'minimal' && (
              <>
                <Button className="w-full" variant="outline" onClick={triggerFileInput}>
                  {properties.logoUrl ? 'Change Image' : 'Add Image'}
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  className="hidden" 
                  accept="image/*" 
                />
                {properties.logoUrl && (
                  <div className="mt-2 p-2 border rounded-md">
                    <img 
                      src={properties.logoUrl} 
                      alt="Logo Preview" 
                      className="h-12 w-auto object-contain mx-auto"
                    />
                    <Button 
                      className="w-full mt-2" 
                      variant="destructive" 
                      size="sm"
                      onClick={() => updateLogoImage(element.id, '')}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </>
            )}
            
            {properties.variant === 'with-description' && (
              <div className="space-y-2">
                <Label htmlFor="description-text">Description</Label>
                <Textarea 
                  id="description-text" 
                  value={properties.description || ''} 
                  onChange={(e) => updateElementProperties(element.id, { description: e.target.value })}
                  placeholder="Enter description"
                  className="h-20"
                />
              </div>
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
            
            {properties.variant !== 'gradient' && properties.variant !== 'colorful-banner' && (
              <div className="flex justify-between items-center">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    id="bg-color" 
                    value={backgroundColor} 
                    onChange={(e) => {
                      setBackgroundColor(e.target.value);
                      updateElementProperties(element.id, { backgroundColor: e.target.value });
                    }}
                    className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                  />
                  <Input 
                    value={backgroundColor} 
                    onChange={(e) => {
                      setBackgroundColor(e.target.value);
                      updateElementProperties(element.id, { backgroundColor: e.target.value });
                    }}
                    className="w-24"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="text-color" 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            {!['centered-navigation-purple', 'navigation-top', 'dark-navigation', 'minimal'].includes(properties.variant || '') && (
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
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
          <Label className="text-sm font-semibold">Header Style</Label>
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              onClick={onOpenStyleDialog}
            >
              {properties.variant === 'default' && 'Default'}
              {properties.variant === 'with-description' && 'With Description'}
              {properties.variant === 'with-metrics' && 'With Metrics'}
              {properties.variant === 'centered-navigation-purple' && 'Centered Navigation (Purple)'}
              {properties.variant === 'navigation-top' && 'Top Navigation'}
              {properties.variant === 'double-logo-purple' && 'Double Logo (Purple)'}
              {properties.variant === 'dark-navigation' && 'Dark Navigation'}
              {properties.variant === 'gradient' && 'Gradient'}
              {properties.variant === 'minimal' && 'Minimal'}
              {properties.variant === 'colorful-banner' && 'Colorful Banner'}
              {!properties.variant && 'Choose Header Style'}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Double-click on the header to change styles</p>
        </div>
      </div>
    );
  };
  
  // Filter properties panel
  const renderFilterProperties = (element: Element) => {
    const properties = element.properties || {};
    
    const handleFilterValueChange = (index: number, value: string) => {
      const newValues = [...filterValues];
      newValues[index] = value;
      setFilterValues(newValues);
      updateElementProperties(element.id, { filterValues: newValues });
    };
    
    const addFilterValue = () => {
      const newValues = [...filterValues, `Value ${filterValues.length}`];
      setFilterValues(newValues);
      updateElementProperties(element.id, { filterValues: newValues });
    };
    
    const removeFilterValue = (index: number) => {
      if (filterValues.length <= 1) {
        toast.error("Filter must have at least one value");
        return;
      }
      const newValues = filterValues.filter((_, i) => i !== index);
      setFilterValues(newValues);
      updateElementProperties(element.id, { filterValues: newValues });
    };
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Edit filter</h3>
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
            
            <div className="space-y-2">
              <Label htmlFor="filter-title">Title</Label>
              <Input 
                id="filter-title" 
                value={properties.filterTitle || 'Filter'} 
                onChange={(e) => updateElementProperties(element.id, { filterTitle: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="block mb-1">Title Position</Label>
              <ToggleGroup type="single" value={properties.filterAlignment || 'left'} 
                onValueChange={(value) => {
                  if (value) updateElementProperties(element.id, { filterAlignment: value as 'left' | 'center' | 'right' });
                }}
                className="justify-start border rounded-md p-1"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {(properties.filterVariant === 'dropdown' || properties.filterVariant === 'checkbox' || 
              properties.filterVariant === 'radio') && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Filter Values</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addFilterValue}
                  >
                    Add Value
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto py-1">
                  {filterValues.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={value}
                        onChange={(e) => handleFilterValueChange(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFilterValue(index)}
                        disabled={filterValues.length <= 1}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
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
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="bg-color" 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="text-color" 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
          <Label className="text-sm font-semibold">Filter Style</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  {properties.filterVariant === 'dropdown' && 'Dropdown Menu'}
                  {properties.filterVariant === 'checkbox' && 'Checkbox Filter'}
                  {properties.filterVariant === 'radio' && 'Radio Filter'}
                  {properties.filterVariant === 'date' && 'Date Picker'}
                  {properties.filterVariant === 'daterange' && 'Date Range'}
                  {properties.filterVariant === 'slider' && 'Slider Filter'}
                  {properties.filterVariant === 'search' && 'Search Box'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <div className="p-4 space-y-2">
                  <h4 className="font-medium">Available filter types</h4>
                  <div className="space-y-1">
                    {[
                      { id: 'dropdown', name: 'Dropdown Menu' },
                      { id: 'checkbox', name: 'Checkbox Filter' },
                      { id: 'radio', name: 'Radio Filter' },
                      { id: 'date', name: 'Date Picker' },
                      { id: 'daterange', name: 'Date Range' },
                      { id: 'slider', name: 'Slider Filter' },
                      { id: 'search', name: 'Search Box' },
                    ].map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => updateElementProperties(element.id, { filterVariant: type.id as any })}
                        className={`p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                          properties.filterVariant === type.id ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                      >
                        {type.name}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-gray-500 mt-1">Double-click on the filter to change styles</p>
        </div>
      </div>
    );
  };
  
  // KPI properties panel
  const renderKpiProperties = (element: Element) => {
    const properties = element.properties || {};
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Edit KPI</h3>
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
              <Label htmlFor="kpi-title-toggle">Title</Label>
              <Switch 
                id="kpi-title-toggle" 
                checked={properties.showKpiTitle !== false} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showKpiTitle: checked })
                } 
              />
            </div>
            
            {properties.showKpiTitle !== false && (
              <div className="space-y-2">
                <Label htmlFor="kpi-title">Edit Title</Label>
                <Input 
                  id="kpi-title" 
                  value={properties.kpiTitle || 'Metric Title'} 
                  onChange={(e) => updateElementProperties(element.id, { kpiTitle: e.target.value })}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="kpi-value">Value</Label>
              <Input 
                id="kpi-value" 
                value={properties.kpiValue || '25.2K'} 
                onChange={(e) => updateElementProperties(element.id, { kpiValue: e.target.value })}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="kpi-previous-toggle">Previous Value</Label>
              <Switch 
                id="kpi-previous-toggle" 
                checked={properties.showPreviousValue !== false} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showPreviousValue: checked })
                } 
              />
            </div>
            
            {properties.showPreviousValue !== false && (
              <div className="space-y-2">
                <Label htmlFor="kpi-previous-value">Previous Value</Label>
                <Input 
                  id="kpi-previous-value" 
                  value={properties.kpiPreviousValue || '11.6K'} 
                  onChange={(e) => updateElementProperties(element.id, { kpiPreviousValue: e.target.value })}
                />
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <Label htmlFor="kpi-change-toggle">Change Percentage</Label>
              <Switch 
                id="kpi-change-toggle" 
                checked={properties.showChangePercentage !== false} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { showChangePercentage: checked })
                } 
              />
            </div>
            
            {properties.showChangePercentage !== false && (
              <div className="space-y-2">
                <Label htmlFor="kpi-change-percentage">Change Percentage</Label>
                <Input 
                  id="kpi-change-percentage" 
                  value={properties.kpiChangePercentage || '+10%'} 
                  onChange={(e) => updateElementProperties(element.id, { kpiChangePercentage: e.target.value })}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="block mb-1">Alignment</Label>
              <ToggleGroup type="single" value={properties.kpiAlignment || 'left'} 
                onValueChange={(value) => {
                  if (value) updateElementProperties(element.id, { kpiAlignment: value as 'left' | 'center' | 'right' });
                }}
                className="justify-start border rounded-md p-1"
              >
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
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
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="bg-color" 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={backgroundColor} 
                  onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    updateElementProperties(element.id, { backgroundColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center">
                <input 
                  type="color" 
                  id="text-color" 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                />
                <Input 
                  value={textColor} 
                  onChange={(e) => {
                    setTextColor(e.target.value);
                    updateElementProperties(element.id, { textColor: e.target.value });
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            {(properties.kpiVariant === 'indicator' || properties.kpiVariant === 'area') && (
              <div className="flex justify-between items-center">
                <Label htmlFor="indicator-color">Indicator Color</Label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    id="indicator-color" 
                    value={indicatorColor} 
                    onChange={(e) => {
                      setIndicatorColor(e.target.value);
                      updateElementProperties(element.id, { indicatorColor: e.target.value });
                    }}
                    className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                  />
                  <Input 
                    value={indicatorColor} 
                    onChange={(e) => {
                      setIndicatorColor(e.target.value);
                      updateElementProperties(element.id, { indicatorColor: e.target.value });
                    }}
                    className="w-24"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
          <Label className="text-sm font-semibold">KPI Style</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  {properties.kpiVariant === 'basic' && 'Basic KPI'}
                  {properties.kpiVariant === 'area' && 'Area KPI'}
                  {properties.kpiVariant === 'indicator' && 'Indicator KPI'}
                  {properties.kpiVariant === 'comparison' && 'Comparison KPI'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <div className="p-4 space-y-2">
                  <h4 className="font-medium">Available KPI types</h4>
                  <RadioGroup 
                    value={properties.kpiVariant || 'basic'}
                    onValueChange={(value) => updateElementProperties(element.id, { kpiVariant: value as any })}
                    className="space-y-2"
                  >
                    {[
                      { id: 'basic', name: 'Basic KPI' },
                      { id: 'area', name: 'Area KPI' },
                      { id: 'indicator', name: 'Indicator KPI' },
                      { id: 'comparison', name: 'Comparison KPI' },
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <RadioGroupItem value={type.id} id={`kpi-type-${type.id}`} />
                        <Label htmlFor={`kpi-type-${type.id}`} className="cursor-pointer flex-1">
                          {type.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-gray-500 mt-1">Double-click on the KPI to change styles</p>
        </div>
      </div>
    );
  };
  
  // Image properties panel
  const renderImageProperties = (element: Element) => {
    const properties = element.properties || {};
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Edit Image</h3>
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
              Image Content
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <Button className="w-full" variant="outline" onClick={triggerImageFileInput}>
              {properties.imageUrl ? 'Change Image' : 'Upload Image'}
            </Button>
            <input 
              type="file" 
              ref={imageFileInputRef} 
              onChange={handleImageUpload}
              className="hidden" 
              accept="image/*" 
            />
            
            {properties.imageUrl && (
              <div className="mt-2 p-2 border rounded-md">
                <img 
                  src={properties.imageUrl} 
                  alt="Image Preview" 
                  className="h-32 w-auto object-contain mx-auto"
                />
                <Button 
                  className="w-full mt-2" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => updateImage(element.id, '')}
                >
                  Remove
                </Button>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input 
                id="image-alt" 
                value={properties.imageAlt || ''} 
                placeholder="Describe the image for screen readers"
                onChange={(e) => updateElementProperties(element.id, { imageAlt: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex justify-between items-center">
              Style Properties
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="image-fit">Image Fit</Label>
              <Select 
                value={properties.imageFit || 'contain'} 
                onValueChange={(value) => 
                  updateElementProperties(element.id, { 
                    imageFit: value as 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a fit style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="scale-down">Scale Down</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose how the image fits within its container
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Select 
                value={properties.borderRadius || 'md'} 
                onValueChange={(value) => 
                  updateElementProperties(element.id, { 
                    borderRadius: value as 'none' | 'sm' | 'md' | 'lg' | 'full' 
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a border radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="full">Full (Circle)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="has-border">Border</Label>
              <Switch 
                id="has-border" 
                checked={properties.hasBorder === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { hasBorder: checked })
                }
              />
            </div>
            
            {properties.hasBorder && (
              <div className="flex justify-between items-center">
                <Label htmlFor="border-color">Border Color</Label>
                <div className="flex items-center">
                  <input 
                    type="color" 
                    id="border-color" 
                    value={borderColor} 
                    onChange={(e) => {
                      setBorderColor(e.target.value);
                      updateElementProperties(element.id, { borderColor: e.target.value });
                    }}
                    className="w-8 h-8 cursor-pointer p-0 border-none mr-2"
                  />
                  <Input 
                    value={borderColor} 
                    onChange={(e) => {
                      setBorderColor(e.target.value);
                      updateElementProperties(element.id, { borderColor: e.target.value });
                    }}
                    className="w-24"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="has-shadow">Shadow</Label>
              <Switch 
                id="has-shadow" 
                checked={properties.hasShadow === true} 
                onCheckedChange={(checked) => 
                  updateElementProperties(element.id, { hasShadow: checked })
                }
              />
            </div>
            
            {properties.hasShadow && (
              <div className="space-y-2">
                <Label htmlFor="shadow-size">Shadow Size</Label>
                <Select 
                  value={properties.shadowSize || 'md'} 
                  onValueChange={(value) => 
                    updateElementProperties(element.id, { 
                      shadowSize: value as 'sm' | 'md' | 'lg' | 'xl' 
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shadow size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const renderCustomizationOptions = () => {
    switch (selectedElement.type) {
      case 'shapes':
        return renderShapeProperties(selectedElement);
      case 'header':
        return renderHeaderProperties(selectedElement);
      case 'filter':
        return renderFilterProperties(selectedElement);
      case 'kpi':
        return renderKpiProperties(selectedElement);
      case 'image':
        return renderImageProperties(selectedElement);
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
            {onOpenStyleDialog && (
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={onOpenStyleDialog}
              >
                Open Style Editor
              </Button>
            )}
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
