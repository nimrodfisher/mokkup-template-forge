
import { useEffect, useRef, useCallback, useMemo } from "react";
import { useWireframe } from "@/hooks/useWireframe";

export function useAutoSave(
  project: any,
  hasPermission: boolean,
  updateProject: (id: string, updates: any) => Promise<void>
) {
  const { screens, elements } = useWireframe();
  const lastSaveRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize the state hash to prevent unnecessary recalculations
  const currentStateHash = useMemo(() => 
    JSON.stringify({ screens, elements }), [screens, elements]
  );

  const saveProject = useCallback(async () => {
    if (!project || !hasPermission) return;
    
    // Only save if the state has actually changed
    if (currentStateHash === lastSaveRef.current) {
      return;
    }

    try {
      await updateProject(project.id, {
        screens,
        elements,
      });
      
      // Update the last saved state
      lastSaveRef.current = currentStateHash;
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [project?.id, hasPermission, screens, elements, currentStateHash, updateProject]);

  useEffect(() => {
    if (!project?.id || !hasPermission || currentStateHash === lastSaveRef.current) return;

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
  }, [project?.id, currentStateHash, hasPermission, saveProject]);

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
