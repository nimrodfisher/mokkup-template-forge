
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  inviteUserToProject, 
  removeCollaboratorFromProject, 
  updateCollaboratorRoleInProject 
} from '@/services/collaboratorService';

export function useCollaboratorActions() {
  const { user } = useAuth();
  const [isInviting, setIsInviting] = useState(false);

  const inviteUser = async (
    projectId: string, 
    inviteEmail: string, 
    inviteRole: 'viewer' | 'editor' | 'admin'
  ) => {
    if (!user) {
      toast.error('You must be logged in to invite collaborators');
      return false;
    }

    try {
      setIsInviting(true);
      return await inviteUserToProject(projectId, inviteEmail, inviteRole, user.id, user.email);
    } finally {
      setIsInviting(false);
    }
  };

  const removeCollaborator = async (collaboratorId: string) => {
    if (!confirm('Are you sure you want to remove this collaborator?')) return false;

    try {
      await removeCollaboratorFromProject(collaboratorId);
      toast.success('Collaborator removed successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove collaborator');
      return false;
    }
  };

  const updateCollaboratorRole = async (collaboratorId: string, newRole: string) => {
    try {
      await updateCollaboratorRoleInProject(collaboratorId, newRole);
      toast.success('Role updated successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update role');
      return false;
    }
  };

  return {
    inviteUser,
    removeCollaborator,
    updateCollaboratorRole,
    isInviting
  };
}
