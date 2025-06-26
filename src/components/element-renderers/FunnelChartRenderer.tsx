
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
    showDropdowns = false,
    showText = false,
    funnelButtons = [],
    funnelKpis = [],
    funnelDropdowns = [],
    funnelTexts = [],
    backgroundColor = '#ffffff',
    labelPosition = 'inside'
  } = properties || {};

  console.log('FunnelChartRenderer props:', {
    funnelChartVariant,
    showButtons,
    showKpis,
    showDropdowns,
    showText,
    funnelButtons,
    funnelKpis,
    funnelDropdowns,
    funnelTexts,
    showLabels,
    showValues,
    labelPosition
  });

  const chartData = funnelChartData?.map((item, index) => ({
    ...item,
    color: item.color || funnelPrimaryColor
  })) || [];

  const renderChart = () => {
    const commonProps = {
      chartData,
      showLabels,
      showValues,
      funnelPrimaryColor,
      labelPosition
    };

    // Determine which renderer to use based on add-ons
    if ((showButtons && funnelButtons && funnelButtons.length > 0) || 
        (showDropdowns && funnelDropdowns && funnelDropdowns.length > 0)) {
      console.log('Rendering FunnelWithButtonsRenderer');
      return (
        <FunnelWithButtonsRenderer 
          {...commonProps}
          funnelButtons={funnelButtons}
          funnelDropdowns={funnelDropdowns}
          showDropdowns={showDropdowns}
        />
      );
    }

    if ((showKpis && funnelKpis && funnelKpis.length > 0) || 
        (showText && funnelTexts && funnelTexts.length > 0)) {
      console.log('Rendering FunnelWithKpisRenderer');
      return (
        <FunnelWithKpisRenderer 
          {...commonProps}
          funnelKpis={funnelKpis}
          funnelTexts={funnelTexts}
          showText={showText}
        />
      );
    }

    console.log('Rendering BasicFunnelRenderer');
    return <BasicFunnelRenderer {...commonProps} />;
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
