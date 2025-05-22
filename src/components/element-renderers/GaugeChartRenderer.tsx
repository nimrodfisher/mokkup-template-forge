
import React from 'react';
import { Element } from "@/types/wireframe";

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
  
  // Render the gauge based on style
  const renderGauge = () => {
    switch (gaugeStyle) {
      case 'speed-gauge':
        return renderSpeedGauge();
      case 'round-gauge':
        return renderRoundGauge();
      case 'digital-gauge':
        return renderDigitalGauge();
      case 'gradient-gauge':
        return renderGradientGauge();
      default:
        return renderDefaultGauge();
    }
  };
  
  // Default semi-circle gauge
  const renderDefaultGauge = () => {
    return (
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
              {Math.floor((max - min) / 2 + min)}{units}
            </div>
          </>
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
      </div>
    );
  };
  
  // Speed gauge with a sleeker design and prominent needle
  const renderSpeedGauge = () => {
    return (
      <div className="relative w-full max-w-[200px] aspect-[2/1]">
        {/* Background semi-circle */}
        <div 
          className="absolute w-full h-full"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
            background: secondaryColor,
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
          className="absolute w-[60%] h-[60%] bg-white rounded-full shadow-md"
          style={{
            top: '20%',
            left: '20%'
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
            <div className="absolute bottom-0 left-[5%] text-xs font-medium">{min}{units}</div>
            <div className="absolute bottom-0 right-[5%] text-xs font-medium">{max}{units}</div>
            <div className="absolute bottom-2 left-1/4 -translate-x-1/2 text-xs font-medium">
              {Math.floor((max - min) * 0.25 + min)}{units}
            </div>
            <div className="absolute bottom-2 left-3/4 -translate-x-1/2 text-xs font-medium">
              {Math.floor((max - min) * 0.75 + min)}{units}
            </div>
          </>
        )}
        
        {/* Needle with a thicker design */}
        {showNeedle && (
          <div 
            className="absolute w-[2px] h-[45%] bg-gray-800 origin-bottom bottom-0 left-1/2"
            style={{
              transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
            }}
          >
            <div className="absolute w-3 h-3 rounded-full bg-gray-800 -top-1.5 -left-1.5"></div>
          </div>
        )}
        
        {/* Target indicator */}
        {showTarget && (
          <div 
            className="absolute w-[2px] h-[12%] bg-red-500 origin-bottom bottom-0 left-1/2"
            style={{
              transform: `translateX(-50%) rotate(${(targetPercentage * 1.8) - 90}deg)`
            }}
          >
            <div className="absolute w-2 h-2 rounded-full bg-red-500 -top-1 -left-1"></div>
          </div>
        )}
      </div>
    );
  };
  
  // Round gauge style (circular)
  const renderRoundGauge = () => {
    return (
      <div className="relative w-full max-w-[200px] aspect-square">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-8" style={{ borderColor: secondaryColor }}></div>
        
        {/* Progress arc */}
        <div 
          className="absolute inset-0 rounded-full border-8"
          style={{ 
            borderColor: primaryColor,
            clipPath: `path('M 100 100 L 100 0 A 100 100 0 ${percentage * 3.6 > 180 ? 1 : 0} 1 ${100 + 100 * Math.sin(percentage * 3.6 * Math.PI / 180)} ${100 - 100 * Math.cos(percentage * 3.6 * Math.PI / 180)} Z')`,
          }}
        ></div>
        
        {/* Center area with value */}
        <div className="absolute inset-[20%] bg-white rounded-full flex items-center justify-center shadow-inner">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: primaryColor }}>{value}{units}</div>
            {showTarget && (
              <div className="text-xs text-gray-500">Target: {target}{units}</div>
            )}
          </div>
        </div>
        
        {/* Gauge labels */}
        {showLabels && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-medium">{max}{units}</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs font-medium">{min}{units}</div>
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 text-xs font-medium">
              {Math.floor((max - min) * 0.75 + min)}{units}
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1 -translate-y-1/2 text-xs font-medium">
              {Math.floor((max - min) * 0.25 + min)}{units}
            </div>
          </>
        )}
        
        {/* Needle (only showing on certain styles) */}
        {showNeedle && (
          <div 
            className="absolute w-[2px] h-[40%] bg-gray-800 origin-bottom"
            style={{
              bottom: '50%',
              left: '50%',
              transform: `translateX(-50%) rotate(${(percentage * 3.6) - 180}deg)`
            }}
          >
            <div className="absolute w-3 h-3 rounded-full bg-gray-800 top-0 -left-1.5"></div>
          </div>
        )}
      </div>
    );
  };
  
  // Digital gauge style
  const renderDigitalGauge = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-[220px] bg-white rounded-md border p-4 shadow-sm">
          <div className="text-2xl font-bold text-center mb-2" style={{ color: primaryColor }}>
            {value}{units}
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mb-1">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: primaryColor
              }}
            ></div>
          </div>
          
          {/* Labels */}
          {showLabels && (
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{min}{units}</span>
              <span>{max}{units}</span>
            </div>
          )}
          
          {/* Target indicator */}
          {showTarget && (
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Target</span>
              <span className="text-xs font-medium">{target}{units}</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Gradient gauge style
  const renderGradientGauge = () => {
    return (
      <div className="relative w-full max-w-[200px] aspect-[2/1]">
        {/* Background semi-circle with gradient */}
        <div 
          className="absolute w-full h-full rounded-t-full overflow-hidden"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
            background: `linear-gradient(to right, ${secondaryColor}22, ${secondaryColor}77)`,
            borderRadius: '100% 100% 0 0'
          }}
        ></div>
        
        {/* Colored semi-circle based on value with gradient */}
        <div 
          className="absolute w-full h-full"
          style={{
            clipPath: `polygon(0 100%, 50% 100%, 50% 0, 0 0)`,
            background: `conic-gradient(${primaryColor} 0%, ${primaryColor} ${percentage}%, transparent ${percentage}%)`,
            borderRadius: '100% 100% 0 0',
            transform: 'rotate(-90deg)',
            transformOrigin: 'right bottom',
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}bb)`
          }}
        ></div>
        
        {/* Center white circle */}
        <div 
          className="absolute w-[65%] h-[65%] bg-white rounded-full shadow-md"
          style={{
            top: '17.5%',
            left: '17.5%'
          }}
        >
          {/* Value display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-xl font-bold" style={{ color: primaryColor }}>{value}{units}</div>
            {showTarget && (
              <div className="text-xs" style={{ color: `${primaryColor}99` }}>Target: {target}{units}</div>
            )}
          </div>
        </div>
        
        {/* Gauge labels */}
        {showLabels && (
          <>
            <div className="absolute bottom-0 left-[5%] text-xs" style={{ color: primaryColor }}>{min}{units}</div>
            <div className="absolute bottom-0 right-[5%] text-xs" style={{ color: primaryColor }}>{max}{units}</div>
          </>
        )}
        
        {/* Needle with color matching the gauge */}
        {showNeedle && (
          <div 
            className="absolute w-[2px] h-[45%] origin-bottom bottom-0 left-1/2"
            style={{
              backgroundColor: primaryColor,
              transform: `translateX(-50%) rotate(${(percentage * 1.8) - 90}deg)`
            }}
          >
            <div className="absolute w-3 h-3 rounded-full -top-1.5 -left-1.5" style={{ backgroundColor: primaryColor }}></div>
          </div>
        )}
        
        {/* Target indicator */}
        {showTarget && (
          <div 
            className="absolute w-[2px] h-[12%] bg-red-500 origin-bottom bottom-0 left-1/2"
            style={{
              transform: `translateX(-50%) rotate(${(targetPercentage * 1.8) - 90}deg)`
            }}
          >
            <div className="absolute w-2 h-2 rounded-full bg-red-500 -top-1 -left-1"></div>
          </div>
        )}
      </div>
    );
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
