
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { HeaderVariant } from "@/types/wireframe-types";

interface HeaderPropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function HeaderProperties({ elementId, properties, updateElementProperties }: HeaderPropertiesProps) {
  const [backgroundColor, setBackgroundColor] = useState(properties.backgroundColor || '#ffffff');
  const [textColor, setTextColor] = useState(properties.textColor || 'black');
  const [title, setTitle] = useState(properties.title || 'DASHBOARD TITLE');
  const [showLogo, setShowLogo] = useState(properties.showLogo !== false);
  const [showNavigation, setShowNavigation] = useState(properties.showNavigation !== false);
  const [variant, setVariant] = useState<HeaderVariant>(properties.variant as HeaderVariant || 'default');
  const [description, setDescription] = useState(properties.description || 'Dashboard description goes here');
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      backgroundColor,
      textColor,
      title,
      showLogo,
      showNavigation,
      variant,
      description,
    });
    toast.success("Header properties updated");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Header Properties</h3>
        <p className="text-sm text-gray-500">Customize the header appearance</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <Input
            id="backgroundColor"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            placeholder="#ffffff"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <Input
            id="textColor"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            placeholder="black"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Dashboard Title"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showLogo">Show Logo</Label>
          <Switch
            id="showLogo"
            checked={showLogo}
            onCheckedChange={(checked) => setShowLogo(checked)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showNavigation">Show Navigation</Label>
          <Switch
            id="showNavigation"
            checked={showNavigation}
            onCheckedChange={(checked) => setShowNavigation(checked)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="variant">Variant</Label>
          <Select 
            value={variant} 
            onValueChange={(value: HeaderVariant) => setVariant(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="centered">Centered</SelectItem>
              <SelectItem value="with-description">With Description</SelectItem>
              <SelectItem value="with-metrics">With Metrics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Dashboard description"
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Update Header
        </Button>
      </div>
    </div>
  );
}
