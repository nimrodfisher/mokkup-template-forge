import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer' | 'none';

export function useProjectPermissions(projectId: string | undefined) {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('none');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkPermissions = async () => {
      if (!projectId) {
        setUserRole('none');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First check if user is the owner
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('owner_id, is_public')
          .eq('id', projectId)
          .maybeSingle();

        if (projectError) throw projectError;

        if (!projectData) {
          setUserRole('none');
          setLoading(false);
          return;
        }

        // Check if user is owner
        if (user && projectData.owner_id === user.id) {
          setUserRole('owner');
          setLoading(false);
          return;
        }

        // Check if user is a collaborator
        if (user) {
          const { data: collabData, error: collabError } = await supabase
            .from('project_collaborators')
            .select('role')
            .eq('project_id', projectId)
            .eq('user_id', user.id)
            .maybeSingle();

          if (collabError) throw collabError;

          if (collabData) {
            setUserRole(collabData.role as UserRole);
            setLoading(false);
            return;
          }
        }

        // Check if project is public
        if (projectData.is_public) {
          setUserRole('viewer');
        } else {
          setUserRole('none');
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        setUserRole('none');
      } finally {
        setLoading(false);
      }
    };

    checkPermissions();
  }, [projectId, user]);

  const canEdit = userRole === 'owner' || userRole === 'admin' || userRole === 'editor';
  const canShare = userRole === 'owner' || userRole === 'admin';
  const canInvite = userRole === 'owner' || userRole === 'admin';
  const canView = userRole !== 'none';
  const isOwner = userRole === 'owner';

  return {
    userRole,
    loading,
    canEdit,
    canShare,
    canInvite,
    canView,
    isOwner
  };
}