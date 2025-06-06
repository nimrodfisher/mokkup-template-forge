
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface ComboChartAddOnsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartAddOnsSection({ element, updateElementProperties }: ComboChartAddOnsSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded">
        Add-ons
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 p-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="showButtons">Buttons</Label>
          <Switch
            id="showButtons"
            checked={element.properties?.showButtons ?? false}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showButtons: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="showKpis">KPIs</Label>
          <Switch
            id="showKpis"
            checked={element.properties?.showKpis ?? false}
            onCheckedChange={(checked) => updateElementProperties(element.id, { showKpis: checked })}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
