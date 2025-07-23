
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, X, Plus, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useCollaboratorActions } from "@/hooks/useCollaboratorActions";

interface ShareProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
}

export function ShareProjectDialog({ open, onOpenChange, projectId }: ShareProjectDialogProps) {
  const navigate = useNavigate();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");
  const [isInviting, setIsInviting] = useState(false);
  
  const { inviteUser } = useCollaboratorActions();
  
  const projectLink = `${window.location.origin}/shared/${projectId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectLink);
    toast.success("Project link copied to clipboard");
  };

  const handleQuickInvite = async () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!projectId) {
      toast.error("No project selected");
      return;
    }

    setIsInviting(true);
    try {
      const roleMapping: Record<string, 'viewer' | 'editor' | 'admin'> = {
        "Can View": "viewer",
        "Can Comment": "viewer", 
        "Can Edit": "editor"
      };
      
      const mappedRole = roleMapping[inviteRole] || "viewer";
      const success = await inviteUser(projectId, inviteEmail, mappedRole);
      
      if (success) {
        toast.success(`Invitation sent to ${inviteEmail}`);
        setInviteEmail("");
      }
    } catch (error) {
      toast.error("Failed to send invitation");
    } finally {
      setIsInviting(false);
    }
  };

  const handleAdvancedShare = () => {
    if (projectId) {
      onOpenChange(false);
      navigate(`/project/${projectId}/share`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Share Project</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            Invite members via link or email and manage access to this project. Only users 
            with Pro license can edit the project. <span className="text-blue-600 cursor-pointer">Learn More</span>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Project Link</Label>
            <div className="flex gap-2">
              <Input 
                value={projectLink}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Manage Access</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Can View">Can View</SelectItem>
                  <SelectItem value="Can Edit">Can Edit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleQuickInvite} disabled={isInviting}>
                <Plus className="h-4 w-4 mr-2" />
                {isInviting ? "Adding..." : "Add"}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAdvancedShare}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Advanced Sharing Options
            </Button>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                T
              </div>
              <div className="flex-1">
                <div className="font-medium">techno rizen</div>
                <div className="text-sm text-gray-600">puneet.technorizen@gmail.com</div>
              </div>
              <div className="text-sm text-gray-500">Project Owner</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
