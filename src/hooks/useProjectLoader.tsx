
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
  
  const { loadProjectFromDatabase } = useWireframe();

  const loadProject = async () => {
    if (!projectId) return;

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
        navigate(user ? '/dashboard' : '/');
        return;
      }

      // Check if user is the owner (only if user is authenticated)
      const isOwner = user && projectData.owner_id === user.id;

      // If user is authenticated and not owner, check for collaboration
      let collaboration = null;
      if (user && !isOwner) {
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

      // Check permissions - allow access if public, owner, or collaborator
      const hasAccess = projectData.is_public || isOwner || collaboration;

      if (!hasAccess) {
        if (!user) {
          // If no user and not public, redirect to auth with return URL
          toast.error('Please sign in to access this project');
          navigate('/auth', { state: { from: { pathname: `/editor/${projectId}` } } });
          return;
        } else {
          // User is authenticated but doesn't have access
          toast.error('You do not have permission to access this project');
          navigate('/dashboard');
          return;
        }
      }

      // Check if user can edit (only authenticated users can edit)
      const canEdit = user && (isOwner || (collaboration && ['editor', 'admin'].includes(collaboration.role)));
      setHasPermission(!!canEdit);

      setProject(projectData);
      
      // Load project data into wireframe store directly from fetched data
      const screens = Array.isArray(projectData.screens) 
        ? projectData.screens as any[]
        : [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }];
      const elements = Array.isArray(projectData.elements) 
        ? projectData.elements as any[]
        : [];
      
      // Set the wireframe state directly instead of making another DB call
      const { setCurrentProject } = useWireframe.getState();
      useWireframe.setState({
        screens,
        elements,
        currentProjectId: projectId,
        selectedElementId: null,
      });
      setCurrentProject(projectId);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate(user ? '/dashboard' : '/');
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
