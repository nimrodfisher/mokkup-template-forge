import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Collaborator {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role?: string;
}

export function useCollaborators(projectId: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCollaborators = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      // Single optimized query to get both owner and collaborators
      const [projectData, collaboratorData] = await Promise.all([
        supabase
          .from('projects')
          .select(`
            owner_id,
            profiles!projects_owner_id_fkey (
              id,
              first_name,
              last_name,
              email
            )
          `)
          .eq('id', projectId)
          .single(),
        
        supabase
          .from('project_collaborators')
          .select(`
            role,
            profiles!project_collaborators_user_id_fkey (
              id,
              first_name,
              last_name,
              email
            )
          `)
          .eq('project_id', projectId)
      ]);

      if (projectData.error) throw projectData.error;
      if (collaboratorData.error) throw collaboratorData.error;

      const allCollaborators: Collaborator[] = [];

      // Add project owner
      if (projectData.data.profiles) {
        allCollaborators.push({
          id: projectData.data.profiles.id,
          first_name: projectData.data.profiles.first_name,
          last_name: projectData.data.profiles.last_name,
          email: projectData.data.profiles.email,
          role: 'owner'
        });
      }

      // Add collaborators
      collaboratorData.data?.forEach(c => {
        if (c.profiles) {
          allCollaborators.push({
            id: c.profiles.id,
            first_name: c.profiles.first_name,
            last_name: c.profiles.last_name,
            email: c.profiles.email,
            role: c.role
          });
        }
      });

      setCollaborators(allCollaborators);
    } catch (error) {
      console.error('Error fetching collaborators:', error);
      toast.error('Failed to load collaborators');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchCollaborators();
    }
  }, [projectId]);

  return {
    collaborators,
    loading,
    refetch: fetchCollaborators
  };
}