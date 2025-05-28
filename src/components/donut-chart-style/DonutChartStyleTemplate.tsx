
import React from 'react';
import { DonutChartRenderer } from '../element-renderers/DonutChartRenderer';
import { DonutChartVariant } from '@/types/wireframe';

interface DonutChartStyleTemplateProps {
  variant: DonutChartVariant;
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function DonutChartStyleTemplate({ variant, isSelected, onClick, title }: DonutChartStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { name: 'Text A', value: 30, color: '#4F46E5' },
      { name: 'Text B', value: 25, color: '#7C3AED' },
      { name: 'Text C', value: 20, color: '#06B6D4' },
      { name: 'Text D', value: 20, color: '#8B5CF6' },
      { name: 'Text E', value: 5, color: '#EC4899' }
    ];

    switch (variant) {
      case 'default':
        return {
          donutChartVariant: variant,
          donutChartTitle: 'Title goes here',
          donutChartData: baseData,
          showTitle: true,
          showDonutLegend: false,
          showDonutLabels: true,
          showDonutPercentages: true,
          donutInnerRadius: 40,
          donutOuterRadius: 60,
        };
      case 'with-legend':
        return {
          donutChartVariant: variant,
          donutChartTitle: 'Title goes here',
          donutChartData: baseData,
          showTitle: true,
          showDonutLegend: true,
          showDonutLabels: false,
          showDonutPercentages: false,
          donutInnerRadius: 40,
          donutOuterRadius: 60,
        };
      case 'with-buttons':
        return {
          donutChartVariant: variant,
          donutChartTitle: 'Title goes here',
          donutChartData: baseData,
          showTitle: true,
          showDonutLegend: false,
          showDonutLabels: false,
          showDonutPercentages: false,
          donutInnerRadius: 40,
          donutOuterRadius: 60,
          donutChartButtons: [
            { title: 'Title 1', alignment: 'left' },
            { title: 'Title 2', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          donutChartVariant: variant,
          donutChartTitle: 'Title goes here',
          donutChartData: baseData,
          showTitle: true,
          showDonutLegend: false,
          showDonutLabels: false,
          showDonutPercentages: false,
          donutInnerRadius: 40,
          donutOuterRadius: 50,
          donutChartKpis: [
            { title: 'Metric 1', value: '1234', change: '12%' },
            { title: 'Metric 2', value: '1234', change: '12%' }
          ],
        };
      default:
        return {
          donutChartVariant: 'default',
          donutChartTitle: 'Title goes here',
          donutChartData: baseData,
          showTitle: true,
          showDonutLegend: false,
          showDonutLabels: true,
          showDonutPercentages: true,
        };
    }
  };

  return (
    <div 
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="h-48 mb-3">
        <DonutChartRenderer properties={getTemplateProperties()} />
      </div>
      <div className="text-sm font-medium text-gray-700">{title}</div>
    </div>
  );
}
