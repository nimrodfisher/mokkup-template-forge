
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTemplateDialog({ open, onOpenChange }: SaveTemplateDialogProps) {
  const [name, setName] = useState("");
  const { saveTemplate, templates, activeTemplateId, elements } = useWireframe();
  
  // Placeholder images for template preview
  const placeholderImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60"
  ];
  
  // Function to get a random image for the template
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  };
  
  const [previewImage, setPreviewImage] = useState(getRandomImage());
  
  useEffect(() => {
    if (open && activeTemplateId) {
      const currentTemplate = templates.find(t => t.id === activeTemplateId);
      if (currentTemplate) {
        setName(currentTemplate.name);
      }
    } else if (open) {
      // Generate new preview image when dialog opens
      setPreviewImage(getRandomImage());
    }
  }, [open, activeTemplateId, templates]);
  
  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    
    saveTemplate(name);
    toast.success("Template saved successfully!");
    onOpenChange(false);
  };
  
  // Calculate element count
  const elementCount = elements.length;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="My Awesome Template"
              autoFocus
            />
          </div>
          
          <div className="mt-2">
            <Label className="mb-2 block">Preview</Label>
            <div className="aspect-video bg-white rounded-md border overflow-hidden">
              <div className="relative w-full h-full">
                <img 
                  src={previewImage}
                  alt="Template preview"
                  className="w-full h-full object-cover"
                />
                {elementCount > 0 ? (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {elementCount} element{elementCount === 1 ? '' : 's'}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 bg-white/70 px-2 py-1 rounded">
                      Empty template
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This preview will be shown in the template gallery
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
