
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorInput } from "./ColorInput";

interface PropertiesTabProps {
  title: string;
  setTitle: (title: string) => void;
  showLogo: boolean;
  setShowLogo: (show: boolean) => void;
  showNavigation: boolean;
  setShowNavigation: (show: boolean) => void;
  description: string;
  setDescription: (desc: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  alignment: "left" | "center" | "right";
  setAlignment: (alignment: "left" | "center" | "right") => void;
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  setBorderRadius: (radius: "none" | "sm" | "md" | "lg" | "full") => void;
  hasShadow: boolean;
  setHasShadow: (has: boolean) => void;
  shadowColor: string;
  setShadowColor: (color: string) => void;
  borderWidth: string;
  setBorderWidth: (width: string) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

export function PropertiesTab({
  title,
  setTitle,
  showLogo,
  setShowLogo,
  showNavigation,
  setShowNavigation,
  description,
  setDescription,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  alignment,
  setAlignment,
  borderRadius,
  setBorderRadius,
  hasShadow,
  setHasShadow,
  shadowColor,
  setShadowColor,
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
  fontFamily,
  setFontFamily
}: PropertiesTabProps) {
  return (
    <div className="py-4 px-6 max-h-[400px] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="block mb-1">Header Title</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dashboard Title"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="block mb-1">Description</Label>
            <Input 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dashboard description"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showLogo" 
              checked={showLogo}
              onCheckedChange={(checked) => setShowLogo(checked === true)}
            />
            <Label htmlFor="showLogo">Show Logo</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showNavigation" 
              checked={showNavigation}
              onCheckedChange={(checked) => setShowNavigation(checked === true)}
            />
            <Label htmlFor="showNavigation">Show Navigation</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hasShadow" 
              checked={hasShadow}
              onCheckedChange={(checked) => setHasShadow(checked === true)}
            />
            <Label htmlFor="hasShadow">Add Shadow</Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <ColorInput 
            id="backgroundColor" 
            label="Background Color" 
            value={backgroundColor}
            onChange={setBackgroundColor}
          />
          
          <ColorInput 
            id="textColor" 
            label="Text Color" 
            value={textColor}
            onChange={setTextColor}
          />
          
          <ColorInput 
            id="borderColor" 
            label="Border Color" 
            value={borderColor}
            onChange={setBorderColor}
          />
          
          <div>
            <Label htmlFor="borderWidth" className="block mb-1">Border Width</Label>
            <Select
              value={borderWidth}
              onValueChange={(value) => setBorderWidth(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select border width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1px">Thin (1px)</SelectItem>
                <SelectItem value="2px">Medium (2px)</SelectItem>
                <SelectItem value="4px">Thick (4px)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="alignment" className="block mb-1">Content Alignment</Label>
          <Select
            value={alignment}
            onValueChange={(value: "left" | "center" | "right") => setAlignment(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="borderRadius" className="block mb-1">Border Radius</Label>
          <Select
            value={borderRadius}
            onValueChange={(value: "none" | "sm" | "md" | "lg" | "full") => setBorderRadius(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="fontFamily" className="block mb-1">Font Family</Label>
          <Select
            value={fontFamily}
            onValueChange={(value) => setFontFamily(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system-ui">System Default</SelectItem>
              <SelectItem value="'Arial', sans-serif">Arial</SelectItem>
              <SelectItem value="'Helvetica', sans-serif">Helvetica</SelectItem>
              <SelectItem value="'Georgia', serif">Georgia</SelectItem>
              <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
              <SelectItem value="'Segoe UI', sans-serif">Segoe UI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {hasShadow && (
          <div>
            <ColorInput 
              id="shadowColor" 
              label="Shadow Color" 
              value={shadowColor}
              onChange={setShadowColor}
            />
          </div>
        )}
      </div>
    </div>
  );
}
