
import React from 'react';
import { Element } from '@/types/wireframe';
import { FunnelChartDetailsSection } from './FunnelChartDetailsSection';
import { FunnelChartDataSection } from './FunnelChartDataSection';
import { FunnelChartAppearanceSection } from './FunnelChartAppearanceSection';
import { FunnelChartAddOnsSection } from './FunnelChartAddOnsSection';
import { Button } from '@/components/ui/button';
import { ChevronDown } from '@/components/properties/ChevronDown';

interface FunnelChartPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  onOpenStyleDialog?: () => void;
}

export function FunnelChartProperties({ 
  element, 
  updateElementProperties, 
  onOpenStyleDialog 
}: FunnelChartPropertiesProps) {
  const { properties = {} } = element;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="text-lg font-semibold">Funnel Chart</h3>
        <ChevronDown />
      </div>

      {onOpenStyleDialog && (
        <Button 
          onClick={onOpenStyleDialog}
          className="w-full mb-4"
          variant="outline"
        >
          Choose Style
        </Button>
      )}

      <FunnelChartDetailsSection 
        properties={properties}
        updateProperties={(updates) => updateElementProperties(element.id, updates)}
      />

      <FunnelChartDataSection 
        properties={properties}
        updateProperties={(updates) => updateElementProperties(element.id, updates)}
      />

      <FunnelChartAppearanceSection 
        properties={properties}
        updateProperties={(updates) => updateElementProperties(element.id, updates)}
      />

      <FunnelChartAddOnsSection 
        properties={properties}
        updateProperties={(updates) => updateElementProperties(element.id, updates)}
      />
    </div>
  );
}
