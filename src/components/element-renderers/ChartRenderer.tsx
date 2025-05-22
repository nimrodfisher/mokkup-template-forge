
import React from 'react';
import { Element } from "@/types/wireframe";

interface ChartRendererProps {
  properties: Element['properties'];
  type: 'bar-chart' | 'column-chart';
}

export function ChartRenderer({ properties = {}, type }: ChartRendererProps) {
  const chartVariant = properties.chartVariant || 'bar';
  const barColor = properties.barColor || '#4F46E5';
  const secondaryBarColor = properties.secondaryBarColor || '#818CF8';
  const tertiaryBarColor = properties.tertiaryBarColor || '#C7D2FE';
  const chartTitle = properties.chartTitle || 'Title goes here';
  const showLegend = properties.showLegend !== false;
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [40, 60, 20, 70, 50, 35];
  const values2 = [30, 40, 35, 45, 30, 25];
  const values3 = [25, 30, 40, 30, 35, 40];
  
  // Helper to render the chart based on variant
  const renderChart = () => {
    switch (chartVariant) {
      case 'dropdown-bar':
        return (
          <div className="flex flex-col">
            <div className="flex items-center justify-end mb-2">
              <div className="text-xs border px-2 py-1 rounded flex items-center text-gray-700">
                Title 1
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            {months.map((month, index) => (
              <div key={month} className="flex items-center space-x-2 mb-1">
                <div className="text-xs text-gray-500 w-12">{month} 22</div>
                <div 
                  className="bg-indigo-600 h-4 rounded transition-all" 
                  style={{ 
                    width: `${values[index]}%`,
                    backgroundColor: barColor
                  }}
                ></div>
              </div>
            ))}
          </div>
        );
      
      case 'kpi-bar':
        return (
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="flex items-center text-xs text-blue-700 mr-3">
                <span className="mr-1" style={{ color: barColor }}>●</span> Metric 1
              </div>
              <div className="text-xs text-gray-700">1234 | 12% <span className="text-green-600">▲</span></div>
            </div>
            {months.map((month, index) => (
              <div key={month} className="flex items-center space-x-2 mb-1">
                <div className="text-xs text-gray-500 w-12">{month} 22</div>
                <div 
                  className="bg-indigo-600 h-4 rounded transition-all" 
                  style={{ 
                    width: `${values[index]}%`,
                    backgroundColor: barColor
                  }}
                ></div>
              </div>
            ))}
          </div>
        );
      
      case 'multi-bar':
        return (
          <div className="flex flex-col">
            {showLegend && (
              <div className="flex items-center mb-2">
                <div className="flex items-center text-xs mr-3">
                  <span className="mr-1" style={{ color: barColor }}>●</span> Dataset 1
                </div>
                <div className="flex items-center text-xs mr-3">
                  <span className="mr-1" style={{ color: secondaryBarColor }}>●</span> Dataset 2
                </div>
              </div>
            )}
            {months.map((month, index) => (
              <div key={month} className="flex items-center space-x-2 mb-1">
                <div className="text-xs text-gray-500 w-12">{month} 22</div>
                <div className="flex">
                  <div 
                    className="h-4 transition-all" 
                    style={{ 
                      width: `${values[index]}%`,
                      backgroundColor: barColor,
                      borderTopLeftRadius: '0.25rem',
                      borderBottomLeftRadius: '0.25rem'
                    }}
                  ></div>
                  <div 
                    className="h-4 transition-all" 
                    style={{ 
                      width: `${values2[index]}%`,
                      backgroundColor: secondaryBarColor,
                      borderTopRightRadius: '0.25rem',
                      borderBottomRightRadius: '0.25rem'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'stacked-bar':
        return (
          <div className="flex flex-col">
            {showLegend && (
              <div className="flex items-center mb-2">
                <div className="flex items-center text-xs mr-3">
                  <span className="mr-1" style={{ color: barColor }}>●</span> Dataset 1
                </div>
                <div className="flex items-center text-xs mr-3">
                  <span className="mr-1" style={{ color: secondaryBarColor }}>●</span> Dataset 2
                </div>
                <div className="flex items-center text-xs mr-3">
                  <span className="mr-1" style={{ color: tertiaryBarColor }}>●</span> Dataset 3
                </div>
              </div>
            )}
            {months.map((month, index) => (
              <div key={month} className="flex items-center space-x-2 mb-1">
                <div className="text-xs text-gray-500 w-12">{month} 22</div>
                <div className="flex">
                  <div 
                    className="h-4 transition-all" 
                    style={{ 
                      width: `${values[index]/3}%`,
                      backgroundColor: barColor,
                    }}
                  ></div>
                  <div 
                    className="h-4 transition-all" 
                    style={{ 
                      width: `${values2[index]/3}%`,
                      backgroundColor: secondaryBarColor,
                    }}
                  ></div>
                  <div 
                    className="h-4 transition-all" 
                    style={{ 
                      width: `${values3[index]/3}%`,
                      backgroundColor: tertiaryBarColor,
                      borderTopRightRadius: '0.25rem',
                      borderBottomRightRadius: '0.25rem'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default: // regular bar
        return (
          <div className="flex flex-col">
            {months.map((month, index) => (
              <div key={month} className="flex items-center space-x-2 mb-1">
                <div className="text-xs text-gray-500 w-12">{month} 22</div>
                <div 
                  className="bg-indigo-600 h-4 rounded transition-all" 
                  style={{ 
                    width: `${values[index]}%`,
                    backgroundColor: barColor
                  }}
                ></div>
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <div className="w-full h-full p-3 overflow-auto">
      <div className="text-sm font-medium mb-2">{chartTitle}</div>
      {renderChart()}
    </div>
  );
}
