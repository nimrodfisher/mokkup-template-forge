
import React from 'react';
import { Element } from "@/types/wireframe";

interface TextboxRendererProps {
  properties: Element['properties'];
}

export function TextboxRenderer({ properties = {} }: TextboxRendererProps) {
  const textAlignment = properties.textAlignment || 'left';
  const fontSize = properties.fontSize || 'md';
  const fontWeight = properties.fontWeight || 'normal';
  
  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  const fontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };
  
  return (
    <div 
      className="w-full h-full p-4 overflow-auto"
      style={{ textAlign: textAlignment as any }}
    >
      {properties.showTextboxTitle !== false && properties.textboxTitle && (
        <h3 className={`mb-2 ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${fontWeightClasses[fontWeight as keyof typeof fontWeightClasses]}`}>
          {properties.textboxTitle}
        </h3>
      )}
      <div className={`${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]} ${fontWeightClasses[fontWeight as keyof typeof fontWeightClasses]}`}>
        {properties.textboxContent || 'Edit text in left pane...'}
      </div>
    </div>
  );
}
