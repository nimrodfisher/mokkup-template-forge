
import { useEffect } from "react";
import { useWireframe } from "@/hooks/useWireframe";

export function useAutoSave(
  project: any,
  hasPermission: boolean,
  updateProject: (id: string, updates: any) => Promise<void>
) {
  const { screens, elements } = useWireframe();

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
}
