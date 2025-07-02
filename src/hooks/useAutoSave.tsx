
import { useEffect, useRef, useCallback } from "react";
import { useWireframe } from "@/hooks/useWireframe";

export function useAutoSave(
  project: any,
  hasPermission: boolean,
  updateProject: (id: string, updates: any) => Promise<void>
) {
  const { screens, elements } = useWireframe();
  const lastSaveRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveProject = useCallback(async () => {
    if (!project || !hasPermission) return;

    // Create a hash of the current state
    const currentStateHash = JSON.stringify({ screens, elements });
    
    // Only save if the state has actually changed
    if (currentStateHash === lastSaveRef.current) {
      return;
    }

    try {
      console.log('Auto-saving project...');
      await updateProject(project.id, {
        screens,
        elements,
      });
      
      // Update the last saved state
      lastSaveRef.current = currentStateHash;
      console.log('Auto-save completed');
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [project, hasPermission, screens, elements, updateProject]);

  useEffect(() => {
    if (!project || !hasPermission) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up debounced save - only save after user stops making changes for 2 seconds
    timeoutRef.current = setTimeout(() => {
      saveProject();
    }, 2000);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [project?.id, screens, elements, hasPermission, saveProject]);

  // Save on unmount if there are unsaved changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Only save on unmount if there are actual changes
      const finalStateHash = JSON.stringify({ screens, elements });
      if (finalStateHash !== lastSaveRef.current && project && hasPermission) {
        saveProject();
      }
    };
  }, []);
}
