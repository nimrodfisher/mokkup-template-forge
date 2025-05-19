
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export type ElementType = 'header' | 'button' | 'filter' | 'kpi' | 'column-chart' | 'bar-chart';

export interface Element {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content?: string;
}

export interface Template {
  id: string;
  name: string;
  elements: Element[];
  createdAt: number;
  updatedAt: number;
}

interface WireframeState {
  elements: Element[];
  selectedElementId: string | null;
  templates: Template[];
  activeTemplateId: string | null;
  
  // Actions
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  saveTemplate: (name: string) => void;
  loadTemplate: (id: string) => void;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => void;
}

export const useWireframe = create<WireframeState>()(
  persist(
    (set, get) => ({
      elements: [],
      selectedElementId: null,
      templates: [],
      activeTemplateId: null,
      
      addElement: (type, position) => {
        const newElement: Element = {
          id: uuidv4(),
          type,
          position,
          size: getDefaultSizeForType(type),
        };
        
        set(state => ({
          elements: [...state.elements, newElement],
          selectedElementId: newElement.id,
        }));
      },
      
      updateElement: (id, updates) => {
        set(state => ({
          elements: state.elements.map(el => 
            el.id === id ? { ...el, ...updates } : el
          ),
        }));
      },
      
      removeElement: (id) => {
        set(state => ({
          elements: state.elements.filter(el => el.id !== id),
          selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
        }));
      },
      
      selectElement: (id) => {
        set({ selectedElementId: id });
      },
      
      saveTemplate: (name) => {
        const { elements, activeTemplateId, templates } = get();
        const now = Date.now();
        
        if (activeTemplateId) {
          // Update existing template
          set({
            templates: templates.map(t => 
              t.id === activeTemplateId 
                ? { ...t, name, elements, updatedAt: now }
                : t
            ),
          });
        } else {
          // Create new template
          const newTemplate: Template = {
            id: uuidv4(),
            name,
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
            elements: template.elements,
            activeTemplateId: id,
            selectedElementId: null,
          });
        }
      },
      
      createNewTemplate: () => {
        set({
          elements: [],
          selectedElementId: null,
          activeTemplateId: null,
        });
      },
      
      deleteTemplate: (id) => {
        set(state => ({
          templates: state.templates.filter(t => t.id !== id),
          elements: state.activeTemplateId === id ? [] : state.elements,
          activeTemplateId: state.activeTemplateId === id ? null : state.activeTemplateId,
        }));
      },
    }),
    {
      name: 'wireframe-storage',
    }
  )
);

function getDefaultSizeForType(type: ElementType): { width: number; height: number } {
  switch (type) {
    case 'header':
      return { width: 600, height: 60 };
    case 'button':
      return { width: 100, height: 40 };
    case 'filter':
      return { width: 200, height: 40 };
    case 'kpi':
      return { width: 200, height: 100 };
    case 'column-chart':
      return { width: 300, height: 200 };
    case 'bar-chart':
      return { width: 300, height: 200 };
    default:
      return { width: 150, height: 80 };
  }
}
