
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WireframeState } from '@/types/wireframeState';
import { createElementSlice } from '@/store/elementActions';
import { createScreenSlice } from '@/store/screenActions';
import { createTemplateSlice } from '@/store/templateActions';
import { supabase } from '@/integrations/supabase/client';

// Re-export types for convenience
export type { ElementType, FilterVariant, KpiVariant, ButtonVariant, ButtonSize, 
  HeaderVariant, ShapeVariant, ChartVariant, Element, Screen, Template } from '../types/wireframe';

// Extended interface for project management
interface ProjectWireframeState extends WireframeState {
  // Project management
  currentProjectId: string | null;
  setCurrentProject: (projectId: string | null) => void;
  loadProjectFromDatabase: (projectId: string) => Promise<void>;
  saveProjectToDatabase: (projectId: string) => Promise<void>;
}

// Combine all slices into one store with project management
export const useWireframe = create<ProjectWireframeState>()(
  persist(
    (...a) => ({
      ...createElementSlice(...a),
      ...createScreenSlice(...a),
      ...createTemplateSlice(...a),
      
      // Project management state
      currentProjectId: null,
      
      // Project management actions
      setCurrentProject: (projectId) => {
        a[0]({ currentProjectId: projectId });
      },
      
      loadProjectFromDatabase: async (projectId: string) => {
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
            
          if (error) throw error;
          
          if (data) {
            const screens = Array.isArray(data.screens) ? data.screens : [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }];
            const elements = Array.isArray(data.elements) ? data.elements : [];
            
            a[0]({
              screens,
              elements,
              currentProjectId: projectId,
              selectedElementId: null,
            });
          }
        } catch (error) {
          console.error('Error loading project:', error);
          throw error;
        }
      },
      
      saveProjectToDatabase: async (projectId: string) => {
        try {
          const state = a[0]();
          
          const { error } = await supabase
            .from('projects')
            .update({
              screens: state.screens,
              elements: state.elements,
              updated_at: new Date().toISOString()
            })
            .eq('id', projectId);
            
          if (error) throw error;
        } catch (error) {
          console.error('Error saving project:', error);
          throw error;
        }
      },
    }),
    {
      name: 'wireframe-storage',
      partialize: (state) => ({
        // Only persist template-related data, not project-specific data
        templates: state.templates,
        showProperties: state.showProperties,
      }),
    }
  )
);
