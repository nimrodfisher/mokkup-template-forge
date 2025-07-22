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
    setLoading(true);
    try {
      // Get project owner
      const { data: projectData, error: projectError } = await supabase
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
        .single();

      if (projectError) throw projectError;

      // Get collaborators
      const { data: collaboratorData, error: collaboratorError } = await supabase
        .from('project_collaborators')
        .select(`
          role,
          profiles (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('project_id', projectId);

      if (collaboratorError) throw collaboratorError;

      const allCollaborators: Collaborator[] = [];

      // Add project owner
      if (projectData.profiles) {
        allCollaborators.push({
          ...projectData.profiles,
          role: 'owner'
        });
      }

      // Add collaborators
      collaboratorData?.forEach(c => {
        if (c.profiles) {
          allCollaborators.push({
            ...c.profiles,
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