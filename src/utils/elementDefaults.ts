import { ElementType } from '../types/wireframe';

export function getDefaultSizeForType(type: ElementType): { width: number; height: number } {
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
    case 'gauge-chart':
      return { width: 250, height: 180 };
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
      return { width: 300, height: 300 };
    case 'heatmap':
      return { width: 300, height: 250 };
    case 'textbox':
      return { width: 250, height: 120 };
    case 'delete':
      return { width: 40, height: 40 };
    case 'simple-table':
      return { width: 400, height: 250 };
    default:
      return { width: 150, height: 80 };
  }
}

export function getDefaultPropertiesForType(type: ElementType): any {
  switch (type) {
    case 'header':
      return {
        backgroundColor: '#ffffff',
        textColor: 'black',
        title: 'DASHBOARD TITLE',
        showLogo: true,
        showNavigation: false,
        navigationItems: ["Navigation 1", "Navigation 2", "Navigation 3"],
        variant: 'default',
        description: 'Dashboard description goes here',
        showMetrics: false,
        metrics: [
          { title: "Metric 1", value: "123" },
          { title: "Metric 2", value: "456" }
        ]
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
        chartData: [
          { category: 'Jan', value: 65 },
          { category: 'Feb', value: 78 },
          { category: 'Mar', value: 52 },
          { category: 'Apr', value: 84 },
          { category: 'May', value: 71 },
          { category: 'Jun', value: 93 }
        ],
        chartButtons: [],
        chartKpis: []
      };
    case 'column-chart':
      return {
        backgroundColor: 'transparent',
        chartTitle: 'Title goes here',
        chartVariant: 'default',
        barColor: '#4F46E5',
        secondaryBarColor: '#818CF8',
        tertiaryBarColor: '#C7D2FE',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        chartHeight: 200,
        chartData: [
          { category: 'Jan', value: 65 },
          { category: 'Feb', value: 78 },
          { category: 'Mar', value: 52 },
          { category: 'Apr', value: 84 },
          { category: 'May', value: 71 },
          { category: 'Jun', value: 93 }
        ],
        chartButtons: [],
        chartKpis: []
      };
    case 'area-chart':
      return {
        backgroundColor: 'transparent',
        chartTitle: 'Title goes here',
        chartVariant: 'basic-area',
        barColor: '#9b87f5',
        secondaryBarColor: '#D6BCFA',
        showLegend: true,
        showGridLines: true,
        showLabels: true,
        chartHeight: 200,
      };
    case 'gauge-chart':
      return {
        backgroundColor: 'transparent',
        chartTitle: 'Title goes here',
        showTitle: true,
        gaugeStyle: 'default',
        gaugeValue: 40,
        gaugeMin: 0,
        gaugeMax: 100,
        gaugeMaxDisplay: 100,
        gaugeTarget: 50,
        gaugeUnits: 'K',
        showGaugeNeedle: true,
        showGaugeTarget: true,
        showGaugeLabels: true,
        textAlignment: 'center',
        gaugePrimaryColor: '#4F46E5',
        gaugeSecondaryColor: '#E5E7EB',
      };
    case 'heatmap':
      return {
        backgroundColor: 'transparent',
        heatmapTitle: 'Title goes here',
        showTitle: true,
        textAlignment: 'left',
        heatmapStyle: 'default',
        heatmapPrimaryColor: '#3B82F6',
        heatmapSecondaryColor: '#EFF6FF',
        heatmapRows: 5,
        heatmapColumns: 5,
        showDataLabels: true,
        heatmapOrientation: 'horizontal',
        showLegends: false,
        showButtons: false,
        showKpis: false,
        heatmapData: [
          { label: 'Data A', value: 86 },
          { label: 'Data B', value: 56 },
          { label: 'Data C', value: 21 },
          { label: 'Data D', value: 18 },
          { label: 'Data E', value: 67 }
        ],
        heatmapButtons: [],
        heatmapKpis: []
      };
    case 'geomap':
      return {
        backgroundColor: 'transparent',
        geomapTitle: 'Geographic Data',
        showTitle: true,
        textAlignment: 'left',
        geomapStyle: 'default',
        geomapPrimaryColor: '#3B82F6',
        geomapSecondaryColor: '#EFF6FF',
        geomapRegion: 'world',
        showTooltips: true,
        showZoomControls: true,
        mapProjection: 'mercator',
        geomapData: [
          { region: 'North America', value: 75, coordinates: [-100, 45] },
          { region: 'Europe', value: 65, coordinates: [10, 50] },
          { region: 'Asia', value: 85, coordinates: [100, 35] },
          { region: 'South America', value: 45, coordinates: [-60, -15] },
          { region: 'Africa', value: 55, coordinates: [20, 0] }
        ]
      };
    case 'delete':
      return {
        backgroundColor: '#EF4444',
        textColor: 'white',
      };
    case 'simple-table':
      return {
        tableTitle: 'Table Title',
        tableHeaders: ['Header 1', 'Header 2', 'Header 3'],
        tableData: [
          ['Data 1', 'Data 2', 'Data 3'],
          ['Data 4', 'Data 5', 'Data 6'],
          ['Data 7', 'Data 8', 'Data 9'],
        ],
        numRows: 3,
        numColumns: 3,
        showTableBorder: true,
        headerBackground: '#f3f4f6',
        headerTextColor: '#111827',
        cellBackground: '#ffffff',
        cellTextColor: '#374151',
        alternateRowColor: false,
        alternateRowBackground: '#f9fafb',
      };
    default:
      return {};
  }
}
