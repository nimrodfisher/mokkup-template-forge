import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

export type ElementType = 
  'header' | 'button' | 'filter' | 'kpi' | 'column-chart' | 'bar-chart' | 'line-chart' | 
  'area-chart' | 'combo-chart' | 'pie-chart' | 'donut-chart' | 
  'simple-table' | 'hierarchy-table' | 'geomap' | 'treemap' | 'heatmap' |
  'funnel-chart' | 'image' | 'textbox' | 'histogram' | 'gauge' | 'scatter-plot' |
  'bubble-chart' | 'waterfall' | 'shapes' | 'sankey' | 'quadrant-chart' | 'delete';

export type FilterVariant = 
  'dropdown' | 'checkbox' | 'radio' | 'date' | 'daterange' | 'slider' | 'search';

export type KpiVariant =
  'basic' | 'area' | 'indicator' | 'comparison';

export type ButtonVariant =
  'default' | 'primary' | 'secondary' | 'outline' | 'ghost';

export type ButtonSize =
  'sm' | 'md' | 'lg';

export type HeaderVariant =
  'default' | 'with-metrics' | 'with-description' | 'centered-navigation-purple' | 
  'navigation-top' | 'double-logo-purple';

export type ShapeVariant =
  'triangle' | 'rectangle' | 'circle' | 'oval';

export interface Element {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content?: string;
  screenId: string;
  properties?: {
    backgroundColor?: string;
    textColor?: string;
    title?: string;
    showLogo?: boolean;
    showNavigation?: boolean;
    variant?: HeaderVariant | string;
    description?: string;
    logoUrl?: string;
    secondaryLogoUrl?: string;
    // Filter properties
    filterTitle?: string;
    filterVariant?: FilterVariant;
    filterValues?: string[];
    filterAlignment?: 'left' | 'center' | 'right';
    // KPI properties
    kpiVariant?: KpiVariant;
    kpiTitle?: string;
    kpiValue?: string;
    kpiPreviousValue?: string;
    kpiChangePercentage?: string;
    kpiAlignment?: 'left' | 'center' | 'right';
    showKpiTitle?: boolean;
    showPreviousValue?: boolean;
    showChangePercentage?: boolean;
    indicatorColor?: string;
    // Button properties
    buttonText?: string;
    buttonVariant?: ButtonVariant;
    buttonSize?: ButtonSize;
    buttonIcon?: boolean;
    // Textbox properties
    textboxContent?: string;
    textboxTitle?: string;
    showTextboxTitle?: boolean;
    textAlignment?: 'left' | 'center' | 'right';
    fontSize?: 'sm' | 'md' | 'lg' | 'xl';
    fontWeight?: 'normal' | 'medium' | 'bold';
    // Image properties
    imageUrl?: string;
    imageAlt?: string;
    imageFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    hasBorder?: boolean;
    borderColor?: string;
    hasShadow?: boolean;
    shadowSize?: 'sm' | 'md' | 'lg' | 'xl';
    // Shape properties
    shapeVariant?: ShapeVariant;
    shapeColor?: string;
    showTitle?: boolean;
  };
}

export interface Screen {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Template {
  id: string;
  name: string;
  screens: Screen[];
  elements: Element[];
  createdAt: number;
  updatedAt: number;
}

interface WireframeState {
  screens: Screen[];
  elements: Element[];
  selectedElementId: string | null;
  templates: Template[];
  activeTemplateId: string | null;
  showProperties: boolean;
  
  // Actions
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  saveTemplate: (name: string) => void;
  loadTemplate: (id: string) => void;
  createNewTemplate: () => void;
  deleteTemplate: (id: string) => void;
  toggleProperties: () => void;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  updateLogoImage: (id: string, logoUrl: string) => void;
  updateImage: (id: string, imageUrl: string) => void;
  
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
          const newTemplate: Template = {
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

function getDefaultSizeForType(type: ElementType): { width: number; height: number } {
  switch (type) {
    case 'header':
      return { width: 600, height: 60 };
    case 'button':
      return { width: 120, height: 40 };
    case 'filter':
      return { width: 200, height: 40 };
    case 'kpi':
      return { width: 200, height: 120 };
    case 'image':
      return { width: 250, height: 200 };
    case 'shapes':
      return { width: 150, height: 150 };
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
    case 'textbox':
      return { width: 250, height: 120 };
    case 'delete':
      return { width: 40, height: 40 };
    default:
      return { width: 150, height: 80 };
  }
}

function getDefaultPropertiesForType(type: ElementType): Element['properties'] {
  switch (type) {
    case 'header':
      return {
        backgroundColor: '#ffffff',
        textColor: 'black',
        title: 'DASHBOARD TITLE',
        showLogo: true,
        showNavigation: false,
        variant: 'default',
        description: 'Dashboard description goes here',
      };
    case 'filter':
      return {
        backgroundColor: '#ffffff',
        textColor: 'black',
        filterTitle: 'Filter Title',
        filterVariant: 'dropdown',
        filterValues: ['All', 'Value 1', 'Value 2'],
        filterAlignment: 'left',
      };
    case 'kpi':
      return {
        backgroundColor: '#ffffff',
        textColor: 'black',
        kpiVariant: 'basic',
        kpiTitle: 'Metric Title',
        kpiValue: '25.2K',
        kpiPreviousValue: '11.6K',
        kpiChangePercentage: '+10%',
        kpiAlignment: 'left',
        showKpiTitle: true,
        showPreviousValue: true,
        showChangePercentage: true,
        indicatorColor: '#8B5CF6',
      };
    case 'button':
      return {
        backgroundColor: '#3B82F6',
        textColor: 'white',
        buttonText: 'Button',
        buttonVariant: 'default',
        buttonSize: 'md',
        buttonIcon: false,
      };
    case 'textbox':
      return {
        backgroundColor: 'transparent',
        textColor: 'black',
        textboxTitle: 'Title goes here',
        textboxContent: 'Edit text in left pane...',
        showTextboxTitle: true,
        textAlignment: 'left',
        fontSize: 'md',
        fontWeight: 'normal',
      };
    case 'image':
      return {
        backgroundColor: 'transparent',
        imageUrl: '',
        imageAlt: 'Image description',
        imageFit: 'contain',
        borderRadius: 'md',
        hasBorder: false,
        borderColor: '#e5e7eb',
        hasShadow: false,
        shadowSize: 'md',
      };
    case 'shapes':
      return {
        backgroundColor: 'transparent',
        textColor: 'black',
        title: 'Title goes here',
        showTitle: true,
        shapeVariant: 'triangle',
        shapeColor: '#9b87f5',
        textAlignment: 'center',
        hasBorder: false,
        borderColor: '#e5e7eb',
      };
    case 'bar-chart':
    case 'column-chart':
      return {
        backgroundColor: 'transparent',
        chartTitle: 'Title goes here',
        chartVariant: 'bar',
        barColor: '#4F46E5',
        secondaryBarColor: '#818CF8',
        tertiaryBarColor: '#C7D2FE',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        chartHeight: 200,
      };
    case 'delete':
      return {
        backgroundColor: '#EF4444',
        textColor: 'white',
      };
    default:
      return {};
  }
}
