
import { useState, useEffect, useCallback } from "react";
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

  const loadProject = useCallback(async () => {
    if (!projectId || !user) return;

    try {
      setLoading(true);
      
      // Single optimized query to get project and collaboration data
      const [projectResult, collabResult] = await Promise.all([
        supabase
          .from('projects')
          .select('id, name, description, owner_id, screens, elements, is_public')
          .eq('id', projectId)
          .maybeSingle(),
        supabase
          .from('project_collaborators')
          .select('role')
          .eq('project_id', projectId)
          .eq('user_id', user.id)
          .maybeSingle()
      ]);

      if (projectResult.error) throw projectResult.error;
      if (!projectResult.data) {
        toast.error('Project not found');
        navigate('/dashboard');
        return;
      }

      const projectData = projectResult.data;
      const isOwner = projectData.owner_id === user.id;
      const collaboration = collabResult.data;
      
      // Quick permission check
      const hasAccess = isOwner || collaboration || projectData.is_public;
      if (!hasAccess) {
        toast.error('You do not have permission to access this project');
        navigate('/dashboard');
        return;
      }

      const canEdit = isOwner || (collaboration?.role && ['editor', 'admin'].includes(collaboration.role));
      
      // Set state efficiently
      setProject(projectData);
      setHasPermission(canEdit);
      
      // Load wireframe data with fallbacks
      const screens = Array.isArray(projectData.screens) ? projectData.screens : 
        [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }];
      const elements = Array.isArray(projectData.elements) ? projectData.elements : [];
      
      wireframeStore.loadProjectFromData(projectId, screens, elements);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [projectId, user, navigate, wireframeStore]);

  const createNewProject = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const defaultScreen = { id: crypto.randomUUID(), name: 'Screen1', isActive: true };
      
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: 'Untitled Project',
          owner_id: user.id,
          screens: [defaultScreen],
          elements: [],
        })
        .select('id, name, description, owner_id, screens, elements, is_public')
        .single();

      if (error) throw error;

      setProject(data);
      setHasPermission(true);
      wireframeStore.loadProjectFromData(data.id, [defaultScreen], []);
      
      window.history.replaceState(null, '', `/editor/${data.id}`);
      toast.success('New project created!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [user, navigate, wireframeStore]);

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      createNewProject();
    }
  }, [projectId, loadProject, createNewProject]);

  return {
    project,
    loading,
    hasPermission,
    updateProject
  };
}
