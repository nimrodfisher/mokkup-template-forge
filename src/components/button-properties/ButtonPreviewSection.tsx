
import React from 'react';
import { Label } from '@/components/ui/label';
import { Element } from '@/types/wireframe';

interface ButtonPreviewSectionProps {
  properties: Element['properties'];
}

export function ButtonPreviewSection({ properties }: ButtonPreviewSectionProps) {
  const getPreviewStyle = () => {
    const style: React.CSSProperties = {};
    let className = 'rounded transition-colors flex items-center justify-center ';
    
    // Size classes
    if (properties?.buttonSize === 'sm') {
      className += 'px-3 py-1 text-xs ';
    } else if (properties?.buttonSize === 'lg') {
      className += 'px-6 py-3 text-base ';
    } else {
      className += 'px-4 py-2 text-sm ';
    }
    
    // Handle custom colors vs variant colors
    if (properties?.backgroundColor || properties?.textColor) {
      if (properties?.backgroundColor) {
        style.backgroundColor = properties.backgroundColor;
        className += 'hover:opacity-90 ';
      }
      if (properties?.textColor) {
        style.color = properties.textColor;
      }
      // Special handling for outline variant
      if (properties?.buttonVariant === 'outline' && properties?.backgroundColor) {
        style.borderColor = properties.backgroundColor;
        style.color = properties.backgroundColor;
        style.backgroundColor = 'transparent';
        className += 'border ';
      }
    } else {
      // Use variant styles
      switch (properties?.buttonVariant) {
        case 'primary':
          className += 'bg-purple-600 text-white hover:bg-purple-700 ';
          break;
        case 'secondary':
          className += 'bg-gray-500 text-white hover:bg-gray-600 ';
          break;
        case 'outline':
          className += 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 ';
          break;
        case 'ghost':
          className += 'bg-transparent hover:bg-gray-100 text-gray-700 ';
          break;
        default:
          className += 'bg-blue-500 text-white hover:bg-blue-600 ';
      }
    }
    
    return { style, className };
  };

  const { style: previewStyle, className: previewClassName } = getPreviewStyle();

  return (
    <div className="space-y-2 pt-2">
      <Label className="text-sm font-medium">Preview</Label>
      <div className="p-4 border rounded-md bg-gray-50 flex items-center justify-center">
        <button 
          className={previewClassName}
          style={previewStyle}
        >
          {properties?.buttonIcon && (
            <svg className="mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {properties?.buttonText || 'Button'}
        </button>
      </div>
    </div>
  );
}
