
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';
import { WireframeState, Element, Screen, ElementType } from '../types/wireframe';
import { getDefaultSizeForType, getDefaultPropertiesForType } from '../utils/elementDefaults';

export type { ElementType, FilterVariant, KpiVariant, ButtonVariant, ButtonSize, 
  HeaderVariant, ShapeVariant, ChartVariant, Element, Screen, Template } from '../types/wireframe';

export const useWireframe = create<WireframeState>()(
  persist(
    (set, get) => ({
      screens: [{
        id: uuidv4(),
        name: 'Screen1',
        isActive: true
      }],
      elements: [],
      selectedElementId: null,
      templates: [],
      activeTemplateId: null,
      showProperties: false,
      
      addElement: (type, position) => {
        const newElement: Element = {
          id: uuidv4(),
          type,
          position,
          size: getDefaultSizeForType(type),
          screenId: get().screens.find(screen => screen.isActive)?.id || get().screens[0].id,
          properties: getDefaultPropertiesForType(type)
        };
        
        set(state => ({
          elements: [...state.elements, newElement],
          selectedElementId: newElement.id,
          showProperties: true
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
        set({ 
          selectedElementId: id,
          showProperties: id !== null 
        });
      },
      
      toggleProperties: () => {
        set(state => ({
          showProperties: !state.showProperties
        }));
      },
      
      updateElementProperties: (id, properties) => {
        set(state => ({
          elements: state.elements.map(el => 
            el.id === id ? { 
              ...el, 
              properties: {
                ...el.properties,
                ...properties
              } 
            } : el
          ),
        }));
      },
      
      updateLogoImage: (id, logoUrl) => {
        set(state => ({
          elements: state.elements.map(el => 
            el.id === id ? { 
              ...el, 
              properties: {
                ...el.properties,
                logoUrl
              } 
            } : el
          ),
        }));
      },
      
      updateImage: (id, imageUrl) => {
        set(state => ({
          elements: state.elements.map(el => 
            el.id === id ? { 
              ...el, 
              properties: {
                ...el.properties,
                imageUrl
              } 
            } : el
          ),
        }));
      },
      
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
      
      // Screen management
      addScreen: () => {
        const { screens } = get();
        const newScreenId = uuidv4();
        const screenNumber = screens.length + 1;
        
        const newScreen: Screen = {
          id: newScreenId,
          name: `Screen${screenNumber}`,
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
          selectedElementId: null,
          showProperties: false
        }));
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
