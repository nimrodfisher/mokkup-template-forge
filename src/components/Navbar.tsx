
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { useState } from "react";
import { SaveTemplateDialog } from "./SaveTemplateDialog";

interface NavbarProps {
  onSave?: () => void;
}

export function Navbar({ onSave }: NavbarProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { activeTemplateId, createNewTemplate } = useWireframe();
  
  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      setSaveDialogOpen(true);
    }
  };
  
  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg text-blue-600">Alignify</Link>
        <div className="h-6 w-px bg-gray-300" />
        <Link to="/templates" className="text-sm text-gray-600 hover:text-gray-900">Templates</Link>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={handleSave}
        >
          Save
        </Button>
        
        <Button 
          onClick={() => createNewTemplate()}
        >
          New Template
        </Button>
      </div>
      
      <SaveTemplateDialog 
        open={saveDialogOpen} 
        onOpenChange={setSaveDialogOpen} 
      />
    </div>
  );
}
