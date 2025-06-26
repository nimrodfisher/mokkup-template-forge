
import React from 'react';
import { Element } from "@/types/wireframe";

interface ButtonRendererProps {
  properties: Element['properties'];
}

export function ButtonRenderer({ properties = {} }: ButtonRendererProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };
  
  const size = (properties.buttonSize as keyof typeof sizeClasses) || 'md';
  const variant = (properties.buttonVariant as keyof typeof variantClasses) || 'default';
  
  // Build custom styles
  const customStyles: React.CSSProperties = {};
  let customClasses = '';
  
  // Handle custom colors
  if (properties.backgroundColor) {
    customStyles.backgroundColor = properties.backgroundColor;
    // Remove hover effects when using custom colors
    customClasses += ' hover:opacity-90';
  }
  
  if (properties.textColor) {
    customStyles.color = properties.textColor;
  }
  
  // For outline variant with custom background color
  if (variant === 'outline' && properties.backgroundColor) {
    customStyles.borderColor = properties.backgroundColor;
    customStyles.color = properties.backgroundColor;
    customStyles.backgroundColor = 'transparent';
  }
  
  // Determine which classes to use
  const shouldUseVariantClasses = !properties.backgroundColor && !properties.textColor;
  const buttonClasses = `rounded transition-colors ${sizeClasses[size]} ${
    shouldUseVariantClasses ? variantClasses[variant] : customClasses
  } flex items-center justify-center`;
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <button 
        className={buttonClasses}
        style={customStyles}
      >
        {properties.buttonIcon && (
          <svg className="mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {properties.buttonText || 'Button'}
      </button>
    </div>
  );
}
