
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ImageStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ImageStyleDialog({ elementId, open, onClose }: ImageStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  const [imageUrl, setImageUrl] = useState(element?.properties?.imageUrl || "");
  const [altText, setAltText] = useState(element?.properties?.altText || "");
  const [imageFit, setImageFit] = useState<"contain" | "cover" | "fill">(element?.properties?.imageFit as "contain" | "cover" | "fill" || "contain");
  const [borderRadius, setBorderRadius] = useState(element?.properties?.borderRadius || "0");

  const handleSave = () => {
    if (!imageUrl) {
      toast.error("Image URL is required");
      return;
    }

    updateElementProperties(elementId, {
      imageUrl,
      altText,
      imageFit,
      borderRadius,
    });
    
    toast.success("Image properties updated");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Image Properties</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="altText" className="text-right">
              Alt Text
            </Label>
            <Input
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="col-span-3"
              placeholder="Image description"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageFit" className="text-right">
              Image Fit
            </Label>
            <Select 
              value={imageFit} 
              onValueChange={(value: "contain" | "cover" | "fill") => setImageFit(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select fit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="borderRadius" className="text-right">
              Border Radius
            </Label>
            <Select 
              value={borderRadius} 
              onValueChange={(value: string) => setBorderRadius(value)}
            >
              <SelectTrigger className="col-span-3">
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
          <div className="w-full flex justify-end mt-4">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
