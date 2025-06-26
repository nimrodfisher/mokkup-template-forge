
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Element } from '@/types/wireframe';

interface ButtonColorSectionProps {
  properties: Element['properties'];
  onPropertyChange: (key: string, value: any) => void;
}

export function ButtonColorSection({ properties, onPropertyChange }: ButtonColorSectionProps) {
  return (
    <>
      {/* Background Color */}
      <div className="space-y-2">
        <Label htmlFor="bg-color" className="text-sm font-medium">Background Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="bg-color"
            type="color"
            value={properties?.backgroundColor || '#3b82f6'}
            onChange={(e) => onPropertyChange('backgroundColor', e.target.value)}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={properties?.backgroundColor || '#3b82f6'}
            onChange={(e) => onPropertyChange('backgroundColor', e.target.value)}
            placeholder="#3b82f6"
            className="h-8 flex-1"
          />
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label htmlFor="text-color" className="text-sm font-medium">Text Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="text-color"
            type="color"
            value={properties?.textColor || '#ffffff'}
            onChange={(e) => onPropertyChange('textColor', e.target.value)}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={properties?.textColor || '#ffffff'}
            onChange={(e) => onPropertyChange('textColor', e.target.value)}
            placeholder="#ffffff"
            className="h-8 flex-1"
          />
        </div>
      </div>
    </>
  );
}
