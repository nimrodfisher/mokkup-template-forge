
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { SaveTemplateDialog } from "./SaveTemplateDialog";
import { ExportDialog } from "./export/ExportDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Share, Menu, MoreHorizontal, Eye } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onSave?: () => void;
  projectId?: string;
  canShare?: boolean;
  onTogglePreview?: () => void;
}

export function Navbar({ onSave, projectId, canShare, onTogglePreview }: NavbarProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { activeTemplateId, createNewTemplate } = useWireframe();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      setSaveDialogOpen(true);
    }
  };
  
  return (
    <div className="h-14 border-b flex items-center justify-between px-4" style={{ backgroundColor: 'rgb(155 135 245 / var(--tw-bg-opacity, 1))' }}>
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="font-bold text-lg text-white">
          {isMobile ? "A" : "Alignify"}
        </Link>
        {!isMobile && (
          <>
            <div className="h-6 w-px bg-white/30" />
            <Link to="/dashboard" className="text-sm text-white/80 hover:text-white">Dashboard</Link>
            {!user && (
              <Link to="/auth" className="text-sm text-white/80 hover:text-white">Login</Link>
            )}
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onTogglePreview && (
                <DropdownMenuItem onClick={onTogglePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                <Share className="w-4 h-4 mr-2" />
                {projectId ? "Share" : "Export"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSave}>
                Save as Template
              </DropdownMenuItem>
              {!user && (
                <DropdownMenuItem asChild>
                  <Link to="/auth">Login</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {onTogglePreview && (
              <Button 
                variant="outline" 
                onClick={onTogglePreview}
                className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => setExportDialogOpen(true)}
              className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
              disabled={!projectId}
            >
              <Share className="w-4 h-4 mr-2" />
              {projectId ? "Share" : "Export"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSave}
              className="border-white/30 text-black hover:bg-white/20 hover:text-black bg-white"
            >
              Save as Template
            </Button>
            
          </>
        )}
      </div>
      
      <SaveTemplateDialog 
        open={saveDialogOpen} 
        onOpenChange={setSaveDialogOpen} 
      />
      
      <ExportDialog 
        open={exportDialogOpen} 
        onOpenChange={setExportDialogOpen}
        projectId={projectId || activeTemplateId || undefined}
      />
    </div>
  );
}
