
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
  'navigation-top' | 'double-logo-purple' | 'dark-navigation' | 'gradient' | 
  'minimal' | 'colorful-banner' | 'title-metrics';

export type ShapeVariant =
  'triangle' | 'rectangle' | 'circle' | 'oval';

export type ChartVariant =
  'bar' | 'dropdown-bar' | 'kpi-bar' | 'multi-bar' | 'stacked-bar' |
  'basic-area' | 'kpi-area' | 'multi-area' | 'stacked-area';

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
    navigationItems?: string[];
    variant?: HeaderVariant | string;
    description?: string;
    logoUrl?: string;
    secondaryLogoUrl?: string;
    showMetrics?: boolean;
    metrics?: Array<{title: string, value: string}>;
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
    // Chart properties
    chartVariant?: ChartVariant;
    chartTitle?: string;
    chartHeight?: number;
    barColor?: string;
    secondaryBarColor?: string;
    tertiaryBarColor?: string;
    showLegend?: boolean;
    showGridLines?: boolean;
    showLabels?: boolean;
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

export interface WireframeState {
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
