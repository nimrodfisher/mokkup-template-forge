
import { useParams } from "react-router-dom";
import { useWireframe } from "@/hooks/useWireframe";
import { useProjectLoader } from "@/hooks/useProjectLoader";
import { useAutoSave } from "@/hooks/useAutoSave";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { EditorLoading } from "@/components/editor/EditorLoading";

export default function Editor() {
  const { projectId } = useParams();
  const { updateElementProperties } = useWireframe();
  
  const { project, loading, hasPermission, updateProject } = useProjectLoader(projectId);
  
  // Set up auto-save
  useAutoSave(project, hasPermission, updateProject);

  if (loading) {
    return <EditorLoading />;
  }

  return (
    <EditorLayout 
      hasPermission={hasPermission}
      updateElementProperties={updateElementProperties}
    />
  );
}
