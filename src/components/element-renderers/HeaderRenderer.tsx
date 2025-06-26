
import React from 'react';
import { Element } from "@/types/wireframe";

interface HeaderRendererProps {
  properties: Element['properties'];
}

export function HeaderRenderer({ properties = {} }: HeaderRendererProps) {
  const variant = properties.variant || 'default';
  const navigationItems = properties.navigationItems || ['Navigation 1', 'Navigation 2', 'Navigation 3'];
  
  // Determine styles based on variant
  let containerStyles = "w-full h-full flex items-center";
  let contentLayout = "";
  
  switch(variant) {
    case 'centered-navigation-purple':
      containerStyles += " bg-[#9b87f5] p-4 flex-col justify-center text-white";
      contentLayout = "flex flex-col items-center";
      break;
    case 'navigation-buttons':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'minimal-title':
      containerStyles += " p-4";
      contentLayout = "flex items-center";
      break;
    case 'with-description':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'with-metrics':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'simple-header':
      containerStyles += " p-4";
      contentLayout = "flex items-center";
      break;
    default: 
      containerStyles += " p-4";
      contentLayout = "flex items-center";
  }
  
  return (
    <div 
      className={containerStyles}
      style={{
        backgroundColor: properties.backgroundColor || undefined,
        color: properties.textColor || undefined,
      }}
    >
      {variant === 'centered-navigation-purple' ? (
        <div className="flex flex-col items-center">
          {properties.title && (
            <div className="font-bold text-lg mb-2">{properties.title}</div>
          )}
          
          <div className="flex justify-center space-x-6">
            {navigationItems.slice(0, 3).map((item, index) => (
              <div key={index} className="text-sm">{item}</div>
            ))}
          </div>
        </div>
      ) : variant === 'navigation-buttons' ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {properties.logoUrl ? (
                  <img 
                    src={properties.logoUrl} 
                    alt="Logo" 
                    className="h-full max-h-12 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center">
                    Logo
                  </div>
                )}
              </div>
            )}
            
            <div className="font-bold text-lg">{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
          
          <div className="flex space-x-2">
            {navigationItems.slice(0, 3).map((item, index) => (
              <button 
                key={index} 
                className={`px-3 py-1 rounded text-sm ${
                  index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : variant === 'minimal-title' ? (
        <div className="flex items-center">
          {properties.showLogo && (
            <div className="mr-3">
              {properties.logoUrl ? (
                <img 
                  src={properties.logoUrl} 
                  alt="Logo" 
                  className="h-full max-h-12 object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center">
                  Logo
                </div>
              )}
            </div>
          )}
          
          <div className="font-bold text-lg flex items-center">
            {properties.showIcon && <span className="mr-2">📊</span>}
            {properties.title || 'DASHBOARD TITLE'}
          </div>
        </div>
      ) : variant === 'with-description' ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {properties.logoUrl ? (
                  <img 
                    src={properties.logoUrl} 
                    alt="Logo" 
                    className="h-full max-h-12 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center">
                    Logo
                  </div>
                )}
              </div>
            )}
            
            <div>
              <div className="font-bold text-lg">{properties.title || 'DASHBOARD TITLE'}</div>
              {properties.description && (
                <div className="text-sm text-gray-600 mt-1">{properties.description}</div>
              )}
            </div>
          </div>
          
          <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded">
            Data Last Updated on | 1st Jan 2024
          </div>
        </div>
      ) : variant === 'with-metrics' ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {properties.logoUrl ? (
                  <img 
                    src={properties.logoUrl} 
                    alt="Logo" 
                    className="h-full max-h-12 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center">
                    Logo
                  </div>
                )}
              </div>
            )}
            
            <div className="font-bold text-lg">{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
          
          <div className="flex space-x-6">
            {properties.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-gray-500">{metric.title}</div>
                <div className="font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={contentLayout}>
          <div className="flex items-center">
            {properties.showLogo && (
              <div className="mr-3">
                {properties.logoUrl ? (
                  <img 
                    src={properties.logoUrl} 
                    alt="Logo" 
                    className="h-full max-h-12 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 text-gray-400 flex items-center justify-center">
                    Logo
                  </div>
                )}
              </div>
            )}
            
            <div className="font-bold text-lg">{properties.title || 'DASHBOARD TITLE'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
