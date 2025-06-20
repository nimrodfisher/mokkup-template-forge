
import React from 'react';
import { Element } from '@/types/wireframe';
import { BasicFunnelRenderer } from '../funnel-chart-renderers/BasicFunnelRenderer';
import { FunnelWithButtonsRenderer } from '../funnel-chart-renderers/FunnelWithButtonsRenderer';
import { FunnelWithKpisRenderer } from '../funnel-chart-renderers/FunnelWithKpisRenderer';

interface FunnelChartRendererProps {
  properties: Element['properties'];
}

export function FunnelChartRenderer({ properties }: FunnelChartRendererProps) {
  const {
    funnelChartTitle = 'Funnel Chart',
    showTitle = true,
    funnelChartData = [
      { name: 'Awareness', value: 1000, color: '#8884d8' },
      { name: 'Interest', value: 800, color: '#82ca9d' },
      { name: 'Consideration', value: 600, color: '#ffc658' },
      { name: 'Intent', value: 400, color: '#ff7c7c' },
      { name: 'Purchase', value: 200, color: '#8dd1e1' }
    ],
    funnelPrimaryColor = '#8884d8',
    showLabels = true,
    showValues = true,
    funnelChartVariant = 'default',
    showButtons = false,
    showKpis = false,
    funnelButtons = [],
    funnelKpis = [],
    backgroundColor = '#ffffff'
  } = properties || {};

  const chartData = funnelChartData?.map((item, index) => ({
    ...item,
    color: item.color || funnelPrimaryColor
  })) || [];

  const renderChart = () => {
    const commonProps = {
      chartData,
      showLabels,
      showValues,
      funnelPrimaryColor
    };

    switch (funnelChartVariant) {
      case 'with-buttons':
        return (
          <FunnelWithButtonsRenderer 
            {...commonProps}
            funnelButtons={funnelButtons}
          />
        );
      case 'with-kpis':
        return (
          <FunnelWithKpisRenderer 
            {...commonProps}
            funnelKpis={funnelKpis}
          />
        );
      default:
        return <BasicFunnelRenderer {...commonProps} />;
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col rounded-lg border border-gray-200 p-4"
      style={{ backgroundColor }}
    >
      {showTitle && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{funnelChartTitle}</h3>
        </div>
      )}
      
      <div className="flex-1">
        {renderChart()}
      </div>
    </div>
  );
}
