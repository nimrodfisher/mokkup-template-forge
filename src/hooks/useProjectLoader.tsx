
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { useWireframe } from "@/hooks/useWireframe";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useProjectLoader(projectId: string | undefined) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProject } = useProjects();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  
  const wireframeStore = useWireframe();

  const loadProject = async () => {
    if (!projectId || !user) return;

    try {
      setLoading(true);
      
      // First, fetch the project data
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          description,
          owner_id,
          screens,
          elements,
          is_public,
          created_at,
          updated_at
        `)
        .eq('id', projectId)
        .maybeSingle();

      if (projectError) {
        console.error('Error loading project:', projectError);
        throw projectError;
      }

      if (!projectData) {
        toast.error('Project not found');
        navigate('/dashboard');
        return;
      }

      // Check if user is the owner
      const isOwner = projectData.owner_id === user.id;

      // If not owner, check for collaboration
      let collaboration = null;
      if (!isOwner) {
        const { data: collabData, error: collabError } = await supabase
          .from('project_collaborators')
          .select('role, user_id')
          .eq('project_id', projectId)
          .eq('user_id', user.id)
          .maybeSingle();

        if (collabError && collabError.code !== 'PGRST116') {
          console.error('Error checking collaboration:', collabError);
          throw collabError;
        }

        collaboration = collabData;
      }

      // Check permissions
      const hasAccess = isOwner || collaboration || projectData.is_public;

      if (!hasAccess) {
        toast.error('You do not have permission to access this project');
        navigate('/dashboard');
        return;
      }

      // Check if user can edit
      const canEdit = isOwner || (collaboration && ['editor', 'admin'].includes(collaboration.role));
      setHasPermission(canEdit);

      setProject(projectData);
      
      // Load project data into wireframe store directly from fetched data
      const screens = Array.isArray(projectData.screens) 
        ? projectData.screens as any[]
        : [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }];
      const elements = Array.isArray(projectData.elements) 
        ? projectData.elements as any[]
        : [];
      
      console.log('Loading project data:', { projectId, screens, elements });
      
      // Use the new loadProjectFromData method to avoid RLS issues
      wireframeStore.loadProjectFromData(projectId, screens, elements);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const newProject = {
        name: 'Untitled Project',
        owner_id: user.id,
        screens: [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }],
        elements: [],
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;

      setProject(data);
      setHasPermission(true);
      
      // Update URL without triggering navigation
      window.history.replaceState(null, '', `/editor/${data.id}`);
      
      toast.success('New project created!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      // No project ID, create a new project
      createNewProject();
    }
  }, [projectId, user]);

  return {
    project,
    loading,
    hasPermission,
    updateProject
  };
}
