
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { findUserByEmail, type UserProfile } from './userService';

export async function verifyProjectOwnership(projectId: string, userId: string) {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id, owner_id, name')
    .eq('id', projectId)
    .eq('owner_id', userId)
    .maybeSingle();

  if (projectError) {
    console.error('Project verification error:', projectError);
    throw new Error('Error verifying project ownership');
  }

  if (!project) {
    throw new Error('Project not found or you do not have permission to invite collaborators');
  }

  return project;
}

export async function checkExistingCollaboration(projectId: string, userId: string) {
  const { data: existingCollab, error: existingError } = await supabase
    .from('project_collaborators')
    .select('id, role')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existingError && existingError.code !== 'PGRST116') {
    console.error('Error checking existing collaborator:', existingError);
    throw new Error('Error checking existing collaborations');
  }

  return existingCollab;
}

export async function addCollaboratorToProject(
  projectId: string,
  userId: string,
  role: 'viewer' | 'editor' | 'admin',
  invitedBy: string
) {
  const { error: insertError } = await supabase
    .from('project_collaborators')
    .insert({
      project_id: projectId,
      user_id: userId,
      role: role,
      invited_by: invitedBy,
    });

  if (insertError) {
    console.error('Insert error:', insertError);
    
    // Handle specific error cases
    if (insertError.code === '23505') {
      throw new Error('User is already a collaborator on this project');
    } else {
      throw new Error('Failed to add collaborator. Please try again.');
    }
  }
}

export async function removeCollaboratorFromProject(collaboratorId: string) {
  const { error } = await supabase
    .from('project_collaborators')
    .delete()
    .eq('id', collaboratorId);

  if (error) {
    console.error('Error removing collaborator:', error);
    throw new Error('Failed to remove collaborator');
  }
}

export async function updateCollaboratorRoleInProject(collaboratorId: string, newRole: string) {
  const { error } = await supabase
    .from('project_collaborators')
    .update({ role: newRole })
    .eq('id', collaboratorId);

  if (error) {
    console.error('Error updating role:', error);
    throw new Error('Failed to update role');
  }
}

export async function inviteUserToProject(
  projectId: string, 
  inviteEmail: string, 
  inviteRole: 'viewer' | 'editor' | 'admin',
  currentUserId: string,
  currentUserEmail?: string
): Promise<boolean> {
  const cleanEmail = inviteEmail.trim().toLowerCase();
  
  if (!projectId || !cleanEmail) {
    toast.error('Please enter a valid email address');
    return false;
  }

  // Prevent inviting yourself
  if (cleanEmail === currentUserEmail?.toLowerCase()) {
    toast.error('You cannot invite yourself to the project');
    return false;
  }

  try {
    console.log('Starting invitation process:', { email: cleanEmail, role: inviteRole, projectId });
    
    // Verify project ownership
    await verifyProjectOwnership(projectId, currentUserId);
    console.log('Project verified');

    // Look for the user
    const userProfile = await findUserByEmail(cleanEmail);

    if (!userProfile) {
      toast.error(
        'User not found. Please make sure the person has created an account and logged in at least once.',
        { duration: 8000 }
      );
      return false;
    }

    console.log('User found, checking for existing collaboration...');

    // Check if user is already a collaborator
    const existingCollab = await checkExistingCollaboration(projectId, userProfile.id);

    if (existingCollab) {
      toast.error(`${cleanEmail} is already a ${existingCollab.role} on this project`);
      return false;
    }

    console.log('Adding collaborator...');

    // Add collaborator
    await addCollaboratorToProject(projectId, userProfile.id, inviteRole, currentUserId);

    const displayName = userProfile.first_name && userProfile.last_name 
      ? `${userProfile.first_name} ${userProfile.last_name}`
      : cleanEmail;

    toast.success(`Successfully invited ${displayName} as ${inviteRole}`);
    return true;
  } catch (error: any) {
    console.error('Error inviting user:', error);
    toast.error(error.message || 'Failed to invite user. Please try again.');
    return false;
  }
}
