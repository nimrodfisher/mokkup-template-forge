
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
import { TextAlignment, FontSize, FontWeight } from "@/types/wireframe-types";

interface TextboxPropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function TextboxProperties({ elementId, properties, updateElementProperties }: TextboxPropertiesProps) {
  const [textboxContent, setTextboxContent] = useState(properties.textboxContent || 'Edit text in left pane...');
  const [textboxTitle, setTextboxTitle] = useState(properties.textboxTitle || 'Title goes here');
  const [showTextboxTitle, setShowTextboxTitle] = useState(properties.showTextboxTitle !== false);
  const [textAlignment, setTextAlignment] = useState<TextAlignment>(properties.textAlignment as TextAlignment || 'left');
  const [fontSize, setFontSize] = useState<FontSize>(properties.fontSize as FontSize || 'md');
  const [fontWeight, setFontWeight] = useState<FontWeight>(properties.fontWeight as FontWeight || 'normal');
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      textboxContent,
      textboxTitle,
      showTextboxTitle,
      textAlignment,
      fontSize,
      fontWeight,
    });
    toast.success("Textbox properties updated");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Textbox Properties</h3>
        <p className="text-sm text-gray-500">Customize the textbox appearance</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="textboxTitle">Textbox Title</Label>
          <Input
            id="textboxTitle"
            value={textboxTitle}
            onChange={(e) => setTextboxTitle(e.target.value)}
            placeholder="Title goes here"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="showTextboxTitle">Show Title</Label>
          <Switch
            id="showTextboxTitle"
            checked={showTextboxTitle}
            onCheckedChange={(checked) => setShowTextboxTitle(checked)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textboxContent">Textbox Content</Label>
          <Input
            id="textboxContent"
            value={textboxContent}
            onChange={(e) => setTextboxContent(e.target.value)}
            placeholder="Edit text in left pane..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textAlignment">Text Alignment</Label>
          <Select 
            value={textAlignment} 
            onValueChange={(value: TextAlignment) => setTextAlignment(value)}
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
        
        <div className="space-y-2">
          <Label htmlFor="fontSize">Font Size</Label>
          <Select 
            value={fontSize} 
            onValueChange={(value: FontSize) => setFontSize(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontWeight">Font Weight</Label>
          <Select 
            value={fontWeight} 
            onValueChange={(value: FontWeight) => setFontWeight(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Update Textbox
        </Button>
      </div>
    </div>
  );
}
