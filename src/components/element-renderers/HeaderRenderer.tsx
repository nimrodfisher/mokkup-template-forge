
import React from 'react';
import { Element } from "@/types/wireframe";

interface HeaderRendererProps {
  properties: Element['properties'];
}

export function HeaderRenderer({ properties = {} }: HeaderRendererProps) {
  const variant = properties.variant || 'default';
  
  // Determine styles based on variant
  let containerStyles = "w-full h-full flex items-center";
  let contentLayout = "";
  
  switch(variant) {
    case 'centered-navigation-purple':
      containerStyles += " bg-[#9b87f5] p-4 flex-col justify-center text-white";
      contentLayout = "flex flex-col items-center";
      break;
    case 'double-logo-purple':
      containerStyles += " bg-[#9b87f5] p-4 text-white";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'with-description':
      containerStyles += " p-4 flex-col";
      contentLayout = "flex flex-col";
      break;
    case 'with-metrics':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'navigation-top':
      containerStyles += " p-4";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'dark-navigation':
      containerStyles += " bg-[#1A1F2C] p-4 text-white";
      contentLayout = "flex items-center justify-between w-full";
      break;
    case 'gradient':
      containerStyles += " bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] p-4 text-white";
      contentLayout = "flex items-center";
      break;
    case 'minimal':
      containerStyles += " bg-[#F6F6F7] p-4";
      contentLayout = "flex items-center justify-center";
      break;
    case 'colorful-banner':
      containerStyles += " bg-white p-0 flex-col";
      contentLayout = "flex items-center justify-between w-full";
      break;
    default: 
      containerStyles += " p-4";
      contentLayout = "flex items-center";
  }
  
  return (
    <div 
      className={containerStyles}
      style={{
        backgroundColor: variant !== 'gradient' && variant !== 'colorful-banner' ? properties.backgroundColor || undefined : undefined,
        color: properties.textColor || undefined,
      }}
    >
      {variant === 'colorful-banner' && (
        <div className="h-3 w-full bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
      )}
      
      {variant === 'double-logo-purple' ? (
        <>
          {properties.showLogo && (
            <div className="h-full max-h-12 aspect-square bg-gray-200 flex items-center justify-center text-gray-800">
              {properties.logoUrl ? (
                <img src={properties.logoUrl} alt="Logo" className="h-full max-h-12 object-contain" />
              ) : (
                'Logo'
              )}
            </div>
          )}
          
          {properties.title && (
            <div className="font-bold text-lg text-center">{properties.title}</div>
          )}
          
          <div className="h-full max-h-12 aspect-square bg-gray-200 flex items-center justify-center text-gray-800">
            {properties.logoUrl ? (
              <img src={properties.logoUrl} alt="Logo" className="h-full max-h-12 object-contain" />
            ) : (
              'Logo'
            )}
          </div>
        </>
      ) : variant === 'centered-navigation-purple' ? (
        <div className="flex flex-col items-center">
          {properties.title && (
            <div className="font-bold text-lg mb-2">{properties.title}</div>
          )}
          
          <div className="flex justify-center space-x-6">
            <div className="text-sm">Navigation 1</div>
            <div className="text-sm">Navigation 2</div>
            <div className="text-sm">Navigation 3</div>
          </div>
        </div>
      ) : variant === 'minimal' ? (
        <div className="font-bold text-center">{properties.title || 'DASHBOARD TITLE'}</div>
      ) : variant === 'colorful-banner' ? (
        <div className="p-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {properties.showLogo && (
                <div className="mr-3">
                  {properties.logoUrl ? (
                    <img 
                      src={properties.logoUrl} 
                      alt="Logo" 
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-400">
                      Logo
                    </div>
                  )}
                </div>
              )}
              
              <div className="font-bold">{properties.title || 'DASHBOARD TITLE'}</div>
            </div>
            
            {properties.showNavigation && (
              <div className="flex space-x-4 text-sm">
                <button className="hover:underline">Link 1</button>
                <button className="hover:underline">Link 2</button>
              </div>
            )}
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
                  <div className={`h-10 w-10 ${variant === 'dark-navigation' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-400'} flex items-center justify-center`}>
                    Logo
                  </div>
                )}
              </div>
            )}
            
            <div className="flex-1">
              {properties.title && (
                <div className="font-bold text-lg">{properties.title}</div>
              )}
              
              {variant === 'with-description' && properties.description && (
                <div className="text-sm mt-1 text-gray-600">{properties.description}</div>
              )}
            </div>
          </div>
          
          {variant === 'with-metrics' && (
            <div className="flex space-x-6">
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">Metric 1</div>
                <div className="font-bold">123</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">Metric 2</div>
                <div className="font-bold">456</div>
              </div>
            </div>
          )}
          
          {(variant === 'navigation-top' || variant === 'dark-navigation') && (
            <div className={`flex space-x-4 text-sm ${variant === 'dark-navigation' ? 'text-gray-300' : 'text-blue-500'}`}>
              <div>Navigation 1</div>
              <div>Navigation 2</div>
              <div>Navigation 3</div>
            </div>
          )}
          
          {properties.showNavigation && variant !== 'navigation-top' && variant !== 'dark-navigation' && (
            <div className="ml-auto flex space-x-3">
              <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 1</button>
              <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 2</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
