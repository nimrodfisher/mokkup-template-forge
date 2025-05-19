
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
import { ButtonVariant, ButtonSize } from "@/types/wireframe-types";

interface ButtonPropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function ButtonProperties({ elementId, properties, updateElementProperties }: ButtonPropertiesProps) {
  const [buttonText, setButtonText] = useState(properties.buttonText || 'Button');
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>(properties.buttonVariant as ButtonVariant || 'default');
  const [buttonSize, setButtonSize] = useState<ButtonSize>(properties.buttonSize as ButtonSize || 'md');
  const [buttonIcon, setButtonIcon] = useState(properties.buttonIcon || false);
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      buttonText,
      buttonVariant,
      buttonSize,
      buttonIcon,
    });
    toast.success("Button properties updated");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Button Properties</h3>
        <p className="text-sm text-gray-500">Customize the button appearance</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Button"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonVariant">Button Variant</Label>
          <Select 
            value={buttonVariant} 
            onValueChange={(value: ButtonVariant) => setButtonVariant(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonSize">Button Size</Label>
          <Select 
            value={buttonSize} 
            onValueChange={(value: ButtonSize) => setButtonSize(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="buttonIcon">Show Icon</Label>
          <Switch
            id="buttonIcon"
            checked={buttonIcon}
            onCheckedChange={(checked) => setButtonIcon(checked)}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Update Button
        </Button>
      </div>
    </div>
  );
}
