import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/hooks/useProjects";
import { useWireframe } from "@/hooks/useWireframe";
import { supabase } from "@/integrations/supabase/client";
import { Canvas } from "@/components/Canvas";
import { Sidebar } from "@/components/sidebar";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { Navbar } from "@/components/Navbar";
import { ScreenTabs } from "@/components/ScreenTabs";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { StyleDialogController } from "@/components/StyleDialogController";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Editor() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProject } = useProjects();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  
  const {
    screens,
    elements,
    selectedElementId,
    showProperties,
    toggleProperties,
    updateElementProperties,
    loadProjectFromDatabase,
  } = useWireframe();

  useEffect(() => {
    if (projectId) {
      loadProject();
    } else {
      // No project ID, create a new project
      createNewProject();
    }
  }, [projectId, user]);

  const loadProject = async () => {
    if (!projectId || !user) return;

    try {
      setLoading(true);
      
      // Fetch project with collaborator info
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_collaborators (
            role,
            user_id
          )
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast.error('Project not found');
          navigate('/dashboard');
        } else {
          throw error;
        }
        return;
      }

      // Check permissions
      const isOwner = data.owner_id === user.id;
      const collaboration = data.project_collaborators?.find(
        (collab: any) => collab.user_id === user.id
      );
      const hasAccess = isOwner || collaboration || data.is_public;

      if (!hasAccess) {
        toast.error('You do not have permission to access this project');
        navigate('/dashboard');
        return;
      }

      // Check if user can edit
      const canEdit = isOwner || (collaboration && ['editor', 'admin'].includes(collaboration.role));
      setHasPermission(canEdit);

      setProject(data);
      
      // Load project data into wireframe store
      if (data.screens && data.elements) {
        await loadProjectFromDatabase(projectId);
      }
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
        user_id: user.id,
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

  // Auto-save project periodically
  useEffect(() => {
    if (!project || !hasPermission) return;

    const saveProject = async () => {
      try {
        await updateProject(project.id, {
          screens,
          elements,
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    const interval = setInterval(saveProject, 30000); // Auto-save every 30 seconds
    
    // Save on unmount
    return () => {
      clearInterval(interval);
      saveProject();
    };
  }, [project, screens, elements, hasPermission, updateProject]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading project...</span>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <ScreenTabs />
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Canvas />
              </div>
              {showProperties && (
                <div className="w-80 border-l bg-white overflow-y-auto">
                  <PropertiesPanel updateElementProperties={updateElementProperties} />
                </div>
              )}
            </div>
          </div>
        </div>

        <SaveTemplateDialog open={false} onOpenChange={() => {}} />
        <StyleDialogController element={null} dialogType={null} onClose={() => {}} />
        
        {!hasPermission && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              You have view-only access to this project
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
