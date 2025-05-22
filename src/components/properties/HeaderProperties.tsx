
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Settings, ChevronDown } from "lucide-react";
import { Element } from "@/types/wireframe";
import { toast } from "sonner";

interface HeaderPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
}

export function HeaderProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog,
  updateLogoImage
}: HeaderPropertiesProps) {
  const properties = element.properties || {};
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || '#000000');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
      if (event.target?.result) {
        const base64String = event.target.result.toString();
        updateLogoImage(element.id, base64String);
        toast.success('Logo updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
    
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
}
