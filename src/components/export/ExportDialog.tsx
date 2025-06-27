
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Download, Code, X } from "lucide-react";
import { ShareProjectDialog } from "./ShareProjectDialog";
import { ImageDownloadDialog } from "./ImageDownloadDialog";
import { EmbedProjectDialog } from "./EmbedProjectDialog";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
}

export function ExportDialog({ open, onOpenChange, projectId }: ExportDialogProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [embedDialogOpen, setEmbedDialogOpen] = useState(false);

  const handleFeatureClick = (feature: 'share' | 'image' | 'embed') => {
    onOpenChange(false);
    
    switch (feature) {
      case 'share':
        setShareDialogOpen(true);
        break;
      case 'image':
        setImageDialogOpen(true);
        break;
      case 'embed':
        setEmbedDialogOpen(true);
        break;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Export & Share</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('share')}
            >
              <Users className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Invite members</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('image')}
            >
              <Download className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Image Download</div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => handleFeatureClick('embed')}
            >
              <Code className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Embed Project</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ShareProjectDialog 
        open={shareDialogOpen} 
        onOpenChange={setShareDialogOpen}
        projectId={projectId}
      />
      
      <ImageDownloadDialog 
        open={imageDialogOpen} 
        onOpenChange={setImageDialogOpen}
      />
      
      <EmbedProjectDialog 
        open={embedDialogOpen} 
        onOpenChange={setEmbedDialogOpen}
        projectId={projectId}
      />
    </>
  );
}
