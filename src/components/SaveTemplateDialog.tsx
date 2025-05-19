
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
  const { saveTemplate, templates, activeTemplateId } = useWireframe();
  
  useEffect(() => {
    if (open && activeTemplateId) {
      const currentTemplate = templates.find(t => t.id === activeTemplateId);
      if (currentTemplate) {
        setName(currentTemplate.name);
      }
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
