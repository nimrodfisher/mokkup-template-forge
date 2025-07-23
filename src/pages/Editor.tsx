
import { useParams, useLocation } from "react-router-dom";
import { useWireframe } from "@/hooks/useWireframe";
import { useProjectLoader } from "@/hooks/useProjectLoader";
import { useProjectPermissions } from "@/hooks/useProjectPermissions";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useSilentProjectUpdate } from "@/hooks/useSilentProjectUpdate";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { EditorLoading } from "@/components/editor/EditorLoading";

export default function Editor() {
  const { id } = useParams();
  const location = useLocation();
  const { updateElementProperties } = useWireframe();
  
  // Handle both /editor/:id and /shared/:id routes
  const projectId = id;
  const isSharedLink = location.pathname.startsWith('/shared/');
  
  const { project, loading, hasPermission, updateProject } = useProjectLoader(projectId);
  const { canEdit, canShare, userRole } = useProjectPermissions(projectId);
  const { updateProjectSilently } = useSilentProjectUpdate();
  
  // Set up auto-save with silent updates (only for authenticated users with permission)
  useAutoSave(project, canEdit, updateProjectSilently);

  if (loading) {
    return <EditorLoading />;
  }

  // If no project was loaded, show an error
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist or you don't have permission to view it.</p>
        </div>
      </div>
    );
  }

  return (
    <EditorLayout 
      hasPermission={canEdit}
      canShare={canShare}
      projectId={projectId}
      userRole={userRole}
      updateElementProperties={updateElementProperties}
    />
  );
}
