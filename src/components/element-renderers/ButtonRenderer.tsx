
import React from 'react';
import { Element } from "@/types/wireframe";

interface ButtonRendererProps {
  properties: Element['properties'];
}

export function ButtonRenderer({ properties = {} }: ButtonRendererProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded transition-colors hover:bg-blue-600 flex items-center justify-center">
        {properties.buttonText || 'Button'}
      </button>
    </div>
  );
}
