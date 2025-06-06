
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { ComboChartDetailsSection } from './ComboChartDetailsSection';
import { ComboChartDataSection } from './ComboChartDataSection';
import { ComboChartAppearanceSection } from './ComboChartAppearanceSection';
import { ComboChartAddOnsSection } from './ComboChartAddOnsSection';

interface ComboChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function ComboChartProperties({ 
  element, 
  updateElementProperties, 
  onOpenStyleDialog 
}: ComboChartPropertiesProps) {
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Combo Chart Properties</h3>
        <Button 
          onClick={onOpenStyleDialog}
          variant="outline" 
          size="sm"
        >
          Choose Style
        </Button>
      </div>
      
      <ComboChartDetailsSection 
        element={element}
        updateElementProperties={updateElementProperties}
      />
      
      <ComboChartDataSection 
        element={element}
        updateElementProperties={updateElementProperties}
      />
      
      <ComboChartAppearanceSection 
        element={element}
        updateElementProperties={updateElementProperties}
      />
      
      <ComboChartAddOnsSection 
        element={element}
        updateElementProperties={updateElementProperties}
      />
    </div>
  );
}
