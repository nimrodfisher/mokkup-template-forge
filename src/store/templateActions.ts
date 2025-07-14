
import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { WireframeState } from '@/types/wireframeState';
import { TemplateSlice } from '@/types/template';
import { TemplateService } from '@/services/templateService';
import { toast } from 'sonner';

export const createTemplateSlice: StateCreator<
  WireframeState,
  [],
  [],
  TemplateSlice
> = (set, get) => ({
  templates: [],
  activeTemplateId: null,
  
  saveTemplate: async (name) => {
    const { elements, activeTemplateId, templates, screens } = get();
    
    try {
      const savedTemplate = await TemplateService.saveTemplate({
        id: activeTemplateId || undefined,
        name,
        screens,
        elements,
      });
      
      if (activeTemplateId) {
        // Update existing template
        set({
          templates: templates.map(t => 
            t.id === activeTemplateId 
              ? { ...t, name, screens, elements, updatedAt: savedTemplate.updatedAt }
              : t
          ),
        });
      } else {
        // Add new template
        set(state => ({
          templates: [...state.templates, savedTemplate],
          activeTemplateId: savedTemplate.id,
        }));
      }
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template. Please try again.');
    }
  },
  
  loadTemplate: async (id) => {
    try {
      // Try to find template in local state first
      const localTemplate = get().templates.find(t => t.id === id);
      
      if (localTemplate) {
        set({
          screens: localTemplate.screens,
          elements: localTemplate.elements,
          activeTemplateId: id,
          selectedElementId: null,
        });
        return;
      }
      
      // If not found locally, fetch from Supabase
      const template = await TemplateService.loadTemplate(id);
      
      if (template) {
        set({
          screens: template.screens,
          elements: template.elements,
          activeTemplateId: id,
          selectedElementId: null,
          templates: [...get().templates.filter(t => t.id !== id), template]
        });
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast.error('Failed to load template. Please try again.');
    }
  },
  
  createNewTemplate: () => {
    const initialScreen = {
      id: uuidv4(),
      name: 'Screen1',
      isActive: true
    };
    
    set({
      screens: [initialScreen],
      elements: [],
      selectedElementId: null,
      activeTemplateId: null,
    });
  },
  
  deleteTemplate: async (id) => {
    try {
      await TemplateService.deleteTemplate(id);
      
      // Update local state
      set(state => ({
        templates: state.templates.filter(t => t.id !== id),
        screens: state.activeTemplateId === id ? [{
          id: uuidv4(),
          name: 'Screen1',
          isActive: true
        }] : state.screens,
        elements: state.activeTemplateId === id ? [] : state.elements,
        activeTemplateId: state.activeTemplateId === id ? null : state.activeTemplateId,
      }));
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template. Please try again.');
    }
  },
  
  fetchTemplates: async () => {
    try {
      const templates = await TemplateService.fetchTemplates();
      set({ templates });
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates. Please try again.');
    }
  },
});
