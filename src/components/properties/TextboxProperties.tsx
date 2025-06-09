
import React from "react";
import { Element } from "@/types/wireframe";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface TextboxPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties: () => void;
  onOpenStyleDialog?: () => void;
}

export function TextboxProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog 
}: TextboxPropertiesProps) {
  const properties = element.properties || {};
  
  const handleChange = (field: string, value: any) => {
    updateElementProperties(element.id, { [field]: value });
  };

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center pb-2 border-b">
        <div className="font-semibold">Textbox Properties</div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onOpenStyleDialog?.()}
        >
          Choose style
        </Button>
      </div>
      
      {/* Show Title Toggle */}
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-title"
              checked={properties.showTextboxTitle !== false}
              onCheckedChange={(checked) => handleChange('showTextboxTitle', checked)}
            />
            <Label htmlFor="show-title">Show Title</Label>
          </div>
          
          {/* Title Field */}
          {properties.showTextboxTitle !== false && (
            <div>
              <Label htmlFor="textbox-title">Title</Label>
              <Input
                id="textbox-title"
                value={properties.textboxTitle || 'Title goes here'}
                onChange={(e) => handleChange('textboxTitle', e.target.value)}
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Content Field */}
        <div>
          <Label htmlFor="textbox-content">Content</Label>
          <Textarea
            id="textbox-content"
            value={properties.textboxContent || 'Edit text in left pane...'}
            onChange={(e) => handleChange('textboxContent', e.target.value)}
            className="mt-1"
            rows={4}
          />
        </div>

        {/* Text Alignment */}
        <div>
          <Label>Text Alignment</Label>
          <RadioGroup 
            value={properties.textAlignment || 'left'}
            onValueChange={(value) => handleChange('textAlignment', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="align-left" />
              <Label htmlFor="align-left">Left</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="center" id="align-center" />
              <Label htmlFor="align-center">Center</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="align-right" />
              <Label htmlFor="align-right">Right</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Font Size */}
        <div>
          <Label>Font Size</Label>
          <RadioGroup 
            value={properties.fontSize || 'md'}
            onValueChange={(value) => handleChange('fontSize', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sm" id="size-sm" />
              <Label htmlFor="size-sm">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="md" id="size-md" />
              <Label htmlFor="size-md">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lg" id="size-lg" />
              <Label htmlFor="size-lg">Large</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xl" id="size-xl" />
              <Label htmlFor="size-xl">XL</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Font Weight */}
        <div>
          <Label>Font Weight</Label>
          <RadioGroup 
            value={properties.fontWeight || 'normal'}
            onValueChange={(value) => handleChange('fontWeight', value)}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="weight-normal" />
              <Label htmlFor="weight-normal">Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="weight-medium" />
              <Label htmlFor="weight-medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bold" id="weight-bold" />
              <Label htmlFor="weight-bold">Bold</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
