
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export type ElementType = 
  'header' | 'button' | 'filter' | 'kpi' | 'column-chart' | 'bar-chart' | 
  'line-chart' | 'area-chart' | 'combo-chart' | 'pie-chart' | 'donut-chart' | 
  'simple-table' | 'hierarchy-table' | 'geomap' | 'treemap' | 'heatmap' |
  'funnel-chart' | 'image' | 'textbox' | 'histogram' | 'gauge' | 'scatter-plot' |
  'bubble-chart' | 'waterfall' | 'shapes' | 'sankey' | 'quadrant-chart';

export interface Element {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content?: string;
  screenId: string;
}

export interface Screen {
  id: string;
  name: string;
  elements: Element[];
  isActive: boolean;
}

export interface Template {
  id: string;
  name: string;
  screens: Screen[];
  createdAt: number;
  updatedAt: number;
}

interface WireframeState {
  screens: Screen[];
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
  
  // Screen actions
  addScreen: () => void;
  switchScreen: (id: string) => void;
  renameScreen: (id: string, name: string) => void;
  deleteScreen: (id: string) => void;
}

export const useWireframe = create<WireframeState>()(
  persist(
    (set, get) => ({
      screens: [{
        id: uuidv4(),
        name: 'Screen1',
        elements: [],
        isActive: true
      }],
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
          screenId: get().screens.find(screen => screen.isActive)?.id || get().screens[0].id,
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
        const { elements, activeTemplateId, templates, screens } = get();
        const now = Date.now();
        
        if (activeTemplateId) {
          // Update existing template
          set({
            templates: templates.map(t => 
              t.id === activeTemplateId 
                ? { ...t, name, screens, updatedAt: now }
                : t
            ),
          });
        } else {
          // Create new template
          const newTemplate: Template = {
            id: uuidv4(),
            name,
            screens,
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
            elements: template.screens.flatMap(screen => screen.elements),
            activeTemplateId: id,
            selectedElementId: null,
          });
        }
      },
      
      createNewTemplate: () => {
        const initialScreen = {
          id: uuidv4(),
          name: 'Screen1',
          elements: [],
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
            elements: [],
            isActive: true
          }] : state.screens,
          elements: state.activeTemplateId === id ? [] : state.elements,
          activeTemplateId: state.activeTemplateId === id ? null : state.activeTemplateId,
        }));
      },
      
      // Screen management
      addScreen: () => {
        const { screens } = get();
        const newScreenId = uuidv4();
        const screenNumber = screens.length + 1;
        
        const newScreen: Screen = {
          id: newScreenId,
          name: `Screen${screenNumber}`,
          elements: [],
          isActive: false
        };
        
        set(state => ({
          screens: state.screens.map(screen => ({
            ...screen,
            isActive: false
          })).concat(newScreen)
        }));
        
        // Activate the new screen
        get().switchScreen(newScreenId);
      },
      
      switchScreen: (id) => {
        set(state => ({
          screens: state.screens.map(screen => ({
            ...screen,
            isActive: screen.id === id
          })),
          selectedElementId: null
        }));
        
        // Filter elements to only show those for the active screen
        const activeScreenId = id;
        const activeScreenElements = get().elements.filter(
          element => element.screenId === activeScreenId
        );
        
        set({
          elements: activeScreenElements
        });
      },
      
      renameScreen: (id, name) => {
        set(state => ({
          screens: state.screens.map(screen => 
            screen.id === id ? { ...screen, name } : screen
          )
        }));
      },
      
      deleteScreen: (id) => {
        const { screens } = get();
        
        // Don't allow deleting the last screen
        if (screens.length <= 1) {
          return;
        }
        
        const screenToDelete = screens.find(screen => screen.id === id);
        if (!screenToDelete) return;
        
        // If the screen to delete is active, activate another screen
        let newActiveScreenId = null;
        if (screenToDelete.isActive) {
          const otherScreen = screens.find(screen => screen.id !== id);
          if (otherScreen) {
            newActiveScreenId = otherScreen.id;
          }
        }
        
        set(state => ({
          screens: state.screens
            .filter(screen => screen.id !== id)
            .map(screen => ({
              ...screen,
              isActive: newActiveScreenId ? screen.id === newActiveScreenId : screen.isActive
            })),
          elements: state.elements.filter(element => element.screenId !== id)
        }));
        
        // If we had to change the active screen, switch to it
        if (newActiveScreenId) {
          get().switchScreen(newActiveScreenId);
        }
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
    case 'bar-chart':
    case 'line-chart':
    case 'area-chart':
    case 'combo-chart':
    case 'pie-chart':
    case 'donut-chart':
    case 'simple-table':
    case 'hierarchy-table':
    case 'scatter-plot':
    case 'bubble-chart':
    case 'waterfall':
    case 'funnel-chart':
    case 'histogram':
    case 'gauge':
    case 'sankey':
    case 'quadrant-chart':
      return { width: 300, height: 200 };
    case 'geomap':
      return { width: 400, height: 300 };
    case 'treemap':
    case 'heatmap':
      return { width: 300, height: 300 };
    case 'image':
      return { width: 200, height: 150 };
    case 'textbox':
      return { width: 250, height: 100 };
    case 'shapes':
      return { width: 100, height: 100 };
    default:
      return { width: 150, height: 80 };
  }
}
