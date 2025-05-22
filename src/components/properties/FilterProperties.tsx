
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Settings, ChevronDown } from "lucide-react";
import { Element } from "@/types/wireframe";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface FilterPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
}

export function FilterProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties
}: FilterPropertiesProps) {
  const properties = element.properties || {};
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const [filterValues, setFilterValues] = useState<string[]>(properties.filterValues || ['All', 'Value 1', 'Value 2']);
  
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
}
