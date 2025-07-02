
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useCollaboratorActions() {
  const { user } = useAuth();
  const [isInviting, setIsInviting] = useState(false);

  const findUserByEmail = async (email: string) => {
    const emailToSearch = email.trim().toLowerCase();
    
    // First, try to find user in profiles table
    const { data: profileUser, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .ilike('email', emailToSearch)
      .maybeSingle();

    if (profileError) {
      console.error('Error searching profiles:', profileError);
      throw profileError;
    }

    if (profileUser) {
      return profileUser;
    }

    // If not found in profiles, check if user exists in auth but doesn't have a profile
    // We'll need to use a different approach since we can't query auth.users directly
    // Instead, we'll create the profile when inviting if the user accepts the invitation
    console.log('User not found in profiles table. They may need to sign up first or complete their profile.');
    return null;
  };

  const inviteUser = async (
    projectId: string, 
    inviteEmail: string, 
    inviteRole: 'viewer' | 'editor' | 'admin'
  ) => {
    if (!projectId || !inviteEmail.trim()) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Prevent inviting yourself
    if (inviteEmail.trim().toLowerCase() === user?.email?.toLowerCase()) {
      toast.error('You cannot invite yourself to the project');
      return false;
    }

    try {
      setIsInviting(true);
      console.log('Inviting user:', { email: inviteEmail, role: inviteRole, projectId });
      
      const userProfile = await findUserByEmail(inviteEmail);

      if (!userProfile) {
        // Instead of showing an error, we'll create a pending invitation
        // that can be claimed when the user signs up
        toast.error('User not found. Please make sure they have an account and have logged in at least once.');
        return false;
      }

      // Check if user is already a collaborator
      const { data: existingCollab } = await supabase
        .from('project_collaborators')
        .select('id')
        .eq('project_id', projectId)
        .eq('user_id', userProfile.id)
        .maybeSingle();

      if (existingCollab) {
        toast.error('User is already a collaborator on this project');
        return false;
      }

      // Add collaborator
      const { error: insertError } = await supabase
        .from('project_collaborators')
        .insert({
          project_id: projectId,
          user_id: userProfile.id,
          role: inviteRole,
          invited_by: user?.id,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      toast.success(`Successfully invited ${inviteEmail} as ${inviteRole}`);
      return true;
    } catch (error: any) {
      console.error('Error inviting user:', error);
      toast.error(error.message || 'Failed to invite user. Please try again.');
      return false;
    } finally {
      setIsInviting(false);
    }
  };

  const removeCollaborator = async (collaboratorId: string) => {
    if (!confirm('Are you sure you want to remove this collaborator?')) return false;

    try {
      const { error } = await supabase
        .from('project_collaborators')
        .delete()
        .eq('id', collaboratorId);

      if (error) throw error;

      toast.success('Collaborator removed successfully');
      return true;
    } catch (error) {
      console.error('Error removing collaborator:', error);
      toast.error('Failed to remove collaborator');
      return false;
    }
  };

  const updateCollaboratorRole = async (collaboratorId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('project_collaborators')
        .update({ role: newRole })
        .eq('id', collaboratorId);

      if (error) throw error;

      toast.success('Role updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
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
