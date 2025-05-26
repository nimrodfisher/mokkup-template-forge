
import React from 'react';
import { Element } from '@/types/wireframe';
import { WaterfallDetailsSection } from './WaterfallDetailsSection';
import { WaterfallDataSection } from './WaterfallDataSection';
import { WaterfallAppearanceSection } from './WaterfallAppearanceSection';
import { WaterfallAddOnsSection } from './WaterfallAddOnsSection';
import { WaterfallDesignSection } from './WaterfallDesignSection';

interface WaterfallPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function WaterfallProperties({ element, updateElementProperties, onOpenStyleDialog }: WaterfallPropertiesProps) {
  const properties = element.properties || {};

  return (
    <div className="space-y-6">
      <WaterfallDetailsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <WaterfallDataSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <WaterfallAppearanceSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <WaterfallAddOnsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <WaterfallDesignSection 
        properties={properties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
