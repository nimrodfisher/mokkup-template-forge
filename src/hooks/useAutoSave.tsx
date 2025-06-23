
import { useEffect, useRef } from "react";
import { useWireframe } from "@/hooks/useWireframe";

export function useAutoSave(
  project: any,
  hasPermission: boolean,
  updateProject: (id: string, updates: any) => Promise<void>
) {
  const { screens, elements } = useWireframe();
  const lastSaveRef = useRef<string>('');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!project || !hasPermission) return;

    // Create a hash of the current state to avoid unnecessary saves
    const currentStateHash = JSON.stringify({ screens, elements });
    
    // Only save if the state has actually changed
    if (currentStateHash === lastSaveRef.current) {
      return;
    }

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save operation
    const saveProject = async () => {
      try {
        // Double-check that we still need to save
        const newStateHash = JSON.stringify({ screens, elements });
        if (newStateHash === lastSaveRef.current) {
          return;
        }

        console.log('Auto-saving project...');
        await updateProject(project.id, {
          screens,
          elements,
        });
        
        // Update the last saved state
        lastSaveRef.current = newStateHash;
        console.log('Auto-save completed');
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    // Set a debounced save
    saveTimeoutRef.current = setTimeout(saveProject, 2000); // Debounce for 2 seconds
    
    // Also set up the interval for periodic saves (only if state has changed)
    const interval = setInterval(() => {
      const stateHash = JSON.stringify({ screens, elements });
      if (stateHash !== lastSaveRef.current) {
        saveProject();
      }
    }, 30000); // Check every 30 seconds
    
    // Save on unmount only if there are unsaved changes
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      clearInterval(interval);
      
      const finalStateHash = JSON.stringify({ screens, elements });
      if (finalStateHash !== lastSaveRef.current) {
        saveProject();
      }
    };
  }, [project?.id, screens, elements, hasPermission, updateProject]);
}
