
import { Template } from '@/types/wireframe';
import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { WireframeState } from '@/types/wireframeState';

export interface TemplateSlice {
  templates: Template[];
  activeTemplateId: string | null;
  
  saveTemplate: (name: string) => void;
  loadTemplate: (id: string) => void;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => void;
}

export const createTemplateSlice: StateCreator<
  WireframeState,
  [],
  [],
  TemplateSlice
> = (set, get) => ({
  templates: [],
  activeTemplateId: null,
  
  saveTemplate: (name) => {
    const { elements, activeTemplateId, templates, screens } = get();
    const now = Date.now();
    
    if (activeTemplateId) {
      // Update existing template
      set({
        templates: templates.map(t => 
          t.id === activeTemplateId 
            ? { ...t, name, screens, elements, updatedAt: now }
            : t
        ),
      });
    } else {
      // Create new template
      const newTemplate = {
        id: uuidv4(),
        name,
        screens,
        elements,
        createdAt: now,
        updatedAt: now,
      };
      
      set(state => ({
        templates: [...state.templates, newTemplate],
        activeTemplateId: newTemplate.id,
      }));
    }
  },
  
  loadTemplate: (id) => {
    const template = get().templates.find(t => t.id === id);
    if (template) {
      set({
        screens: template.screens,
        elements: template.elements,
        activeTemplateId: id,
        selectedElementId: null,
      });
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
  
  deleteTemplate: (id) => {
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
  },
});
