
import React from 'react';
import { Element } from "@/types/wireframe";

interface GaugeChartRendererProps {
  properties: Element['properties'];
}

export function GaugeChartRenderer({ properties = {} }: GaugeChartRendererProps) {
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
  
  // Apply different styles based on the gauge style
  const isSpeedGaugeStyle = gaugeStyle === 'speed-gauge';
  
  return (
    <div className="w-full h-full p-3 flex flex-col items-center">
      {showTitle && <div className="text-sm font-medium mb-2 text-center">{chartTitle}</div>}
      
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Semi-circle gauge background */}
        <div className="relative w-full max-w-[200px] aspect-[2/1]">
          {/* Background semi-circle */}
          <div 
            className="absolute w-full h-full"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
              background: `conic-gradient(${secondaryColor} 0%, ${secondaryColor} 100%)`,
              borderRadius: '100% 100% 0 0'
            }}
          ></div>
          
          {/* Colored semi-circle based on value */}
          <div 
            className="absolute w-full h-full"
            style={{
              clipPath: `polygon(0 100%, 50% 100%, 50% 0, 0 0)`,
              background: `conic-gradient(${primaryColor} 0%, ${primaryColor} ${percentage}%, transparent ${percentage}%)`,
              borderRadius: '100% 100% 0 0',
              transform: 'rotate(-90deg)',
              transformOrigin: 'right bottom'
            }}
          ></div>
          
          {/* Center white circle */}
          <div 
            className="absolute w-[70%] h-[70%] bg-white rounded-full"
            style={{
              top: '15%',
              left: '15%'
            }}
          >
            {/* Value display */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-xl font-bold">{value}{units}</div>
              {showTarget && (
                <div className="text-xs text-gray-500">Target: {target}{units}</div>
              )}
            </div>
          </div>
          
          {/* Gauge labels */}
          {showLabels && (
            <>
              <div className="absolute bottom-0 left-[5%] text-xs text-gray-500">{min}{units}</div>
              <div className="absolute bottom-0 right-[5%] text-xs text-gray-500">{max}{units}</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">{Math.floor((max - min) / 2 + min)}{units}</div>
            </>
          )}
          
          {/* Needle */}
          {showNeedle && (
            <div 
              className="absolute w-[1px] h-[40%] bg-black origin-bottom bottom-0 left-1/2"
              style={{
                transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
              }}
            >
              <div className="absolute w-2 h-2 rounded-full bg-black -top-1 -left-1"></div>
            </div>
          )}
          
          {/* Target indicator */}
          {showTarget && (
            <div 
              className="absolute w-[2px] h-[15%] bg-red-500 origin-bottom bottom-0 left-1/2"
              style={{
                transform: `translateX(-50%) rotate(${(targetPercentage * 1.8) - 90}deg)`
              }}
            >
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 -top-1 -left-[3px]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
