
import React from 'react';
import { Element } from "@/types/wireframe";
import { DefaultGaugeRenderer } from "../gauge-renderers/DefaultGaugeRenderer";
import { SpeedGaugeRenderer } from "../gauge-renderers/SpeedGaugeRenderer";
import { RoundGaugeRenderer } from "../gauge-renderers/RoundGaugeRenderer";
import { DigitalGaugeRenderer } from "../gauge-renderers/DigitalGaugeRenderer";
import { GradientGaugeRenderer } from "../gauge-renderers/GradientGaugeRenderer";

interface GaugeChartRendererProps {
  properties: Element['properties'];
}

export function GaugeChartRenderer({ properties = {} }: GaugeChartRendererProps) {
  // Get gauge parameters from properties or use defaults
  const chartTitle = properties.chartTitle || 'Title goes here';
  const showTitle = properties.showTitle !== false;
  const value = properties.gaugeValue || 40;
  const min = properties.gaugeMin || 0;
  const max = properties.gaugeMax || 100;
  const target = properties.gaugeTarget || 50;
  const showTarget = properties.showGaugeTarget !== false;
  const showNeedle = properties.showGaugeNeedle !== false;
  const showLabels = properties.showGaugeLabels !== false;
  const units = properties.gaugeUnits || '';
  const gaugeStyle = properties.gaugeStyle || 'default';
  const primaryColor = properties.gaugePrimaryColor || '#4F46E5';
  const secondaryColor = properties.gaugeSecondaryColor || '#E5E7EB';

  // Calculate percentages for the arc
  const percentage = ((value - min) / (max - min)) * 100;
  const targetPercentage = ((target - min) / (max - min)) * 100;
  
  // Common props for all gauge renderers
  const gaugeProps = {
    value,
    min,
    max,
    target,
    showTarget,
    showNeedle,
    showLabels,
    units,
    primaryColor,
    secondaryColor,
    percentage,
    targetPercentage
  };
  
  // Render the gauge based on style
  const renderGauge = () => {
    switch (gaugeStyle) {
      case 'speed-gauge':
        return <SpeedGaugeRenderer {...gaugeProps} />;
      case 'round-gauge':
        return <RoundGaugeRenderer {...gaugeProps} />;
      case 'digital-gauge':
        return <DigitalGaugeRenderer {...gaugeProps} />;
      case 'gradient-gauge':
        return <GradientGaugeRenderer {...gaugeProps} />;
      default:
        return <DefaultGaugeRenderer {...gaugeProps} />;
    }
  };
  
  return (
    <div className="w-full h-full p-3 flex flex-col items-center">
      {showTitle && <div className="text-sm font-medium mb-2 text-center">{chartTitle}</div>}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {renderGauge()}
      </div>
    </div>
  );
}
