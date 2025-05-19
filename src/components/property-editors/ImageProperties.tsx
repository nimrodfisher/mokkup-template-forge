
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
import { toast } from "sonner";
import { ImageFit } from "@/types/wireframe-types";

interface ImagePropertiesProps {
  elementId: string;
  properties: any;
  updateElementProperties: (id: string, properties: any) => void;
}

export function ImageProperties({ elementId, properties, updateElementProperties }: ImagePropertiesProps) {
  const [imageUrl, setImageUrl] = useState(properties.imageUrl || '');
  const [altText, setAltText] = useState(properties.altText || 'Image');
  const [imageFit, setImageFit] = useState<ImageFit>(properties.imageFit as ImageFit || 'contain');
  const [borderRadius, setBorderRadius] = useState(properties.borderRadius || '0');
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      imageUrl,
      altText,
      imageFit,
      borderRadius,
    });
    toast.success("Image properties updated");
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Image Properties</h3>
        <p className="text-sm text-gray-500">Configure the image appearance</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <div className="flex space-x-2">
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="altText">Alt Text</Label>
          <Input
            id="altText"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Image description"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageFit">Image Fit</Label>
          <Select 
            value={imageFit} 
            onValueChange={(value: ImageFit) => setImageFit(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderRadius">Border Radius</Label>
          <Select 
            value={borderRadius} 
            onValueChange={(value: string) => setBorderRadius(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select border radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="0.25rem">Small</SelectItem>
              <SelectItem value="0.5rem">Medium</SelectItem>
              <SelectItem value="1rem">Large</SelectItem>
              <SelectItem value="9999px">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {imageUrl && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-md p-2 h-40 flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={altText} 
                className="max-w-full max-h-full" 
                style={{
                  objectFit: imageFit as "contain" | "cover" | "fill",
                  borderRadius
                }}
              />
            </div>
          </div>
        )}
        
        <Button onClick={handleSave} className="w-full">
          Update Image
        </Button>
      </div>
    </div>
  );
}
