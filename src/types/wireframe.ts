export type ElementType = 
  'header' | 'button' | 'filter' | 'kpi' | 'column-chart' | 'bar-chart' | 'line-chart' | 
  'area-chart' | 'combo-chart' | 'pie-chart' | 'donut-chart' | 'gauge-chart' |
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
  'basic-area' | 'kpi-area' | 'multi-area' | 'stacked-area' |
  'default' | 'grouped' | 'stacked' | 'gradient';

export type PieChartVariant =
  'default' | 'with-legend' | 'with-buttons' | 'with-kpis';

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
    chartData?: Array<{category: string, value: number}>;
    chartButtons?: Array<{title: string, alignment: string}>;
    chartKpis?: Array<{title: string, value: string, change?: string}>;
    barColor?: string;
    secondaryBarColor?: string;
    tertiaryBarColor?: string;
    showLegend?: boolean;
    showGridLines?: boolean;
    showLabels?: boolean;
    // Pie Chart properties
    pieChartVariant?: PieChartVariant;
    pieChartTitle?: string;
    pieChartData?: Array<{name: string, value: number, color?: string}>;
    pieChartButtons?: Array<{title: string, alignment: string}>;
    pieChartKpis?: Array<{title: string, value: string, change?: string}>;
    pieColors?: string[];
    showPieLabels?: boolean;
    showPieLegend?: boolean;
    pieInnerRadius?: number;
    pieOuterRadius?: number;
    showPercentages?: boolean;
    // Table properties
    tableTitle?: string;
    tableHeaders?: string[];
    tableData?: string[][];
    numRows?: number;
    numColumns?: number;
    showTableBorder?: boolean;
    headerBackground?: string;
    headerTextColor?: string;
    cellBackground?: string;
    cellTextColor?: string;
    alternateRowColor?: boolean;
    alternateRowBackground?: string;
    // Gauge Chart properties
    gaugeStyle?: GaugeVariant | string;
    gaugeValue?: number;
    gaugeMin?: number;
    gaugeMax?: number;
    gaugeMaxDisplay?: number;
    gaugeTarget?: number;
    gaugeUnits?: string;
    showGaugeNeedle?: boolean;
    showGaugeTarget?: boolean;
    showGaugeLabels?: boolean;
    gaugePrimaryColor?: string;
    gaugeSecondaryColor?: string;
    // Heatmap properties
    heatmapStyle?: HeatmapVariant | string;
    heatmapTitle?: string;
    heatmapData?: Array<{label: string, value: number}>;
    heatmapRows?: number;
    heatmapColumns?: number;
    heatmapPrimaryColor?: string;
    heatmapSecondaryColor?: string;
    heatmapOrientation?: 'horizontal' | 'vertical';
    showDataLabels?: boolean;
    showLegends?: boolean;
    heatmapButtons?: Array<{title: string, alignment: string}>;
    heatmapKpis?: Array<{title: string, value: string, change?: string}>;
    // Quadrant Chart properties
    quadrantStyle?: QuadrantVariant | string;
    quadrantTitle?: string;
    quadrantData?: Array<{name: string, x: number, y: number}>;
    quadrantPrimaryColor?: string;
    quadrantSecondaryColor?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    quadrantLabels?: Array<{label: string, position: string}>;
    // Scatter Plot properties
    scatterPlotStyle?: ScatterPlotVariant | string;
    scatterPlotTitle?: string;
    scatterPlotData?: Array<{name: string, x: number, y: number, size?: number}>;
    scatterPlotPrimaryColor?: string;
    scatterPlotSecondaryColor?: string;
    scatterXAxisLabel?: string;
    scatterYAxisLabel?: string;
    showTrendLine?: boolean;
    showCorrelation?: boolean;
    correlationValue?: number;
    // Geomap properties
    geomapStyle?: GeomapVariant | string;
    geomapTitle?: string;
    geomapData?: Array<{region: string, value: number, coordinates?: [number, number]}>;
    geomapPrimaryColor?: string;
    geomapSecondaryColor?: string;
    geomapRegion?: 'world' | 'usa' | 'europe' | 'asia';
    showTooltips?: boolean;
    showZoomControls?: boolean;
    mapProjection?: 'mercator' | 'natural-earth' | 'equal-earth';
    // Add-ons
    showButtons?: boolean;
    showDropdowns?: boolean;
    showKpis?: boolean;
    showText?: boolean;
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
