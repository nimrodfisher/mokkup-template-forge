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

export function PropertiesPanel() {
  const { elements, selectedElementId, showProperties, toggleProperties, updateElementProperties, updateLogoImage } = useWireframe();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [filterValues, setFilterValues] = useState<string[]>(['All', 'Value 1', 'Value 2']);
  const [indicatorColor, setIndicatorColor] = useState('#8B5CF6');
  
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
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
  
  const renderCustomizationOptions = () => {
    switch (selectedElement.type) {
      case 'header':
        return renderHeaderProperties(selectedElement);
      case 'filter':
        return renderFilterProperties(selectedElement);
      case 'kpi':
        return renderKpiProperties(selectedElement);
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
