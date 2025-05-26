
import React from 'react';
import { Element } from '@/types/wireframe';
import { WaterfallDetailsSection } from './WaterfallDetailsSection';
import { WaterfallDataSection } from './WaterfallDataSection';
import { WaterfallXAxisSection } from './WaterfallXAxisSection';
import { WaterfallYAxisSection } from './WaterfallYAxisSection';
import { WaterfallPropertiesSection } from './WaterfallPropertiesSection';
import { WaterfallAppearanceSection } from './WaterfallAppearanceSection';
import { WaterfallAdvancedAddOnsSection } from './WaterfallAdvancedAddOnsSection';
import { WaterfallVariationSection } from './WaterfallVariationSection';
import { WaterfallDesignSection } from './WaterfallDesignSection';
import { Separator } from '@/components/ui/separator';

interface WaterfallPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function WaterfallProperties({ element, updateElementProperties, onOpenStyleDialog }: WaterfallPropertiesProps) {
  const properties = element.properties || {};

  return (
    <div className="space-y-4">
      <WaterfallDetailsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallDataSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallXAxisSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallYAxisSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallPropertiesSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallAppearanceSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallAdvancedAddOnsSection 
        properties={properties}
        elementId={element.id}
        updateElementProperties={updateElementProperties}
      />
      
      <Separator />
      
      <WaterfallVariationSection 
        properties={properties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
      
      <Separator />
      
      <WaterfallDesignSection 
        properties={properties}
        onOpenStyleDialog={onOpenStyleDialog}
      />
    </div>
  );
}
