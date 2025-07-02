import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useCollaboratorActions() {
  const { user } = useAuth();
  const [isInviting, setIsInviting] = useState(false);

  const findUserByEmail = async (email: string) => {
    const emailToSearch = email.trim().toLowerCase();
    
    try {
      console.log('Searching for user with email:', emailToSearch);
      
      // Search in profiles table with exact match
      const { data: profileUser, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .eq('email', emailToSearch)
        .maybeSingle();

      if (profileError) {
        console.error('Error searching profiles:', profileError);
        throw profileError;
      }

      if (profileUser) {
        console.log('Found user in profiles:', profileUser);
        return profileUser;
      }

      // If not found with exact match, try case-insensitive search
      const { data: profileUserInsensitive, error: insensitiveError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .ilike('email', emailToSearch)
        .maybeSingle();

      if (insensitiveError) {
        console.error('Error in case-insensitive search:', insensitiveError);
        throw insensitiveError;
      }

      if (profileUserInsensitive) {
        console.log('Found user with case-insensitive search:', profileUserInsensitive);
        return profileUserInsensitive;
      }

      console.log('User not found in profiles table');
      return null;
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      throw error;
    }
  };

  const inviteUser = async (
    projectId: string, 
    inviteEmail: string, 
    inviteRole: 'viewer' | 'editor' | 'admin'
  ) => {
    if (!user) {
      toast.error('You must be logged in to invite collaborators');
      return false;
    }

    const cleanEmail = inviteEmail.trim().toLowerCase();
    if (!projectId || !cleanEmail) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Prevent inviting yourself
    if (cleanEmail === user?.email?.toLowerCase()) {
      toast.error('You cannot invite yourself to the project');
      return false;
    }

    try {
      setIsInviting(true);
      console.log('Starting invitation process:', { email: cleanEmail, role: inviteRole, projectId });
      
      // First verify the project exists and user owns it
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('id, owner_id, name')
        .eq('id', projectId)
        .eq('owner_id', user.id)
        .maybeSingle();

      if (projectError) {
        console.error('Project verification error:', projectError);
        toast.error('Error verifying project ownership');
        return false;
      }

      if (!project) {
        toast.error('Project not found or you do not have permission to invite collaborators');
        return false;
      }

      console.log('Project verified:', project);

      // Look for the user
      const userProfile = await findUserByEmail(cleanEmail);

      if (!userProfile) {
        toast.error(
          'User not found. The person must have an account and be logged in at least once to complete their profile setup.',
          { duration: 6000 }
        );
        return false;
      }

      console.log('User found, checking for existing collaboration...');

      // Check if user is already a collaborator
      const { data: existingCollab, error: existingError } = await supabase
        .from('project_collaborators')
        .select('id, role')
        .eq('project_id', projectId)
        .eq('user_id', userProfile.id)
        .maybeSingle();

      if (existingError) {
        console.error('Error checking existing collaborator:', existingError);
        toast.error('Error checking existing collaborations');
        return false;
      }

      if (existingCollab) {
        toast.error(`${cleanEmail} is already a ${existingCollab.role} on this project`);
        return false;
      }

      console.log('Adding collaborator...');

      // Add collaborator
      const { error: insertError } = await supabase
        .from('project_collaborators')
        .insert({
          project_id: projectId,
          user_id: userProfile.id,
          role: inviteRole,
          invited_by: user.id,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        
        // Handle specific error cases
        if (insertError.code === '23505') {
          toast.error('User is already a collaborator on this project');
        } else {
          toast.error('Failed to add collaborator. Please try again.');
        }
        return false;
      }

      const displayName = userProfile.first_name && userProfile.last_name 
        ? `${userProfile.first_name} ${userProfile.last_name}`
        : cleanEmail;

      toast.success(`Successfully invited ${displayName} as ${inviteRole}`);
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
