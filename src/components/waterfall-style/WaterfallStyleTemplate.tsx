
import React from 'react';
import { WaterfallRenderer } from '../element-renderers/WaterfallRenderer';

interface WaterfallStyleTemplateProps {
  variant: 'basic-waterfall' | 'with-buttons' | 'with-kpis';
  isSelected: boolean;
  onClick: () => void;
  title: string;
}

export function WaterfallStyleTemplate({ variant, isSelected, onClick, title }: WaterfallStyleTemplateProps) {
  const getTemplateProperties = () => {
    const baseData = [
      { category: 'Jan 22', value: 50, isTotal: false },
      { category: 'Feb 22', value: 130, isTotal: false },
      { category: 'Mar 22', value: 80, isTotal: false },
      { category: 'Apr 22', value: 150, isTotal: false },
      { category: 'May 22', value: 120, isTotal: false },
      { category: 'Total', value: 530, isTotal: true }
    ];

    switch (variant) {
      case 'basic-waterfall':
        return {
          waterfallVariant: variant,
          waterfallTitle: 'Title goes here',
          waterfallData: baseData,
          showTitle: true,
          waterfallPrimaryColor: '#4F46E5',
          waterfallSecondaryColor: '#818CF8',
          waterfallTotalColor: '#10B981',
          showGridLines: true,
          showLabels: true,
        };
      case 'with-buttons':
        return {
          waterfallVariant: variant,
          waterfallTitle: 'Title goes here',
          waterfallData: baseData,
          showTitle: true,
          waterfallPrimaryColor: '#059669',
          waterfallSecondaryColor: '#34D399',
          waterfallTotalColor: '#10B981',
          showGridLines: true,
          showLabels: true,
          waterfallButtons: [
            { title: 'Title 1', alignment: 'left' },
            { title: 'Title 2', alignment: 'right' }
          ],
        };
      case 'with-kpis':
        return {
          waterfallVariant: variant,
          waterfallTitle: 'Title goes here',
          waterfallData: baseData,
          showTitle: true,
          waterfallPrimaryColor: '#7C3AED',
          waterfallSecondaryColor: '#A78BFA',
          waterfallTotalColor: '#10B981',
          showGridLines: false,
          showLabels: true,
          waterfallKpis: [
            { title: 'Metric 1', value: '1234', change: '12%' },
            { title: 'Metric 2', value: '1234', change: '12%' }
          ],
        };
      default:
        return {
          waterfallVariant: 'basic-waterfall',
          waterfallTitle: 'Title goes here',
          waterfallData: baseData,
          showTitle: true,
          waterfallPrimaryColor: '#4F46E5',
          waterfallSecondaryColor: '#818CF8',
          waterfallTotalColor: '#10B981',
          showGridLines: true,
          showLabels: true,
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
        <WaterfallRenderer properties={getTemplateProperties()} />
      </div>
      <div className="text-sm font-medium text-gray-700">{title}</div>
    </div>
  );
}
