
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";

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

  const handleSave = () => {
    if (!imageUrl) {
      toast.error("Image URL is required");
      return;
    }

    updateElementProperties(elementId, {
      imageUrl,
      altText,
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
          <div className="w-full flex justify-end mt-4">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
