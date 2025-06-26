
import React from 'react';
import { Element } from '@/types/wireframe';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ButtonTextSection } from './ButtonTextSection';

interface ButtonPropertiesProps {
  element: Element;
  updateElementProperties: (id: string, properties: Partial<Element['properties']>) => void;
  toggleProperties?: () => void;
  onOpenStyleDialog?: () => void;
}

export function ButtonProperties({ 
  element, 
  updateElementProperties, 
  toggleProperties,
  onOpenStyleDialog 
}: ButtonPropertiesProps) {
  const properties = element.properties || {};
  
  const handlePropertyChange = (key: string, value: any) => {
    updateElementProperties(element.id, { [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Button Properties</h3>
        {toggleProperties && (
          <Button variant="ghost" size="sm" onClick={toggleProperties}>
            <X size={16} />
          </Button>
        )}
      </div>

      <ButtonTextSection properties={properties} onPropertyChange={handlePropertyChange} />
    </div>
  );
}
