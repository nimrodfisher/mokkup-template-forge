
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface ComboChartDetailsSectionProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
}

export function ComboChartDetailsSection({ element, updateElementProperties }: ComboChartDetailsSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const handleTitleChange = (value: string) => {
    updateElementProperties(element.id, { chartTitle: value });
  };
  
  const handleShowTitleChange = (checked: boolean) => {
    updateElementProperties(element.id, { showTitle: checked });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium bg-gray-50 hover:bg-gray-100 rounded">
        Details
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 p-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="showTitle">Title</Label>
          <Switch
            id="showTitle"
            checked={element.properties?.showTitle ?? true}
            onCheckedChange={handleShowTitleChange}
          />
        </div>
        
        {element.properties?.showTitle !== false && (
          <div>
            <Label htmlFor="chartTitle">Edit Text</Label>
            <Input
              id="chartTitle"
              value={element.properties?.chartTitle || 'Title goes here'}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter chart title"
            />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
