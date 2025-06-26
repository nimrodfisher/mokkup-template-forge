
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Element } from '@/types/wireframe';

interface ButtonTextSectionProps {
  properties: Element['properties'];
  onPropertyChange: (key: string, value: any) => void;
}

export function ButtonTextSection({ properties, onPropertyChange }: ButtonTextSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="button-text" className="text-sm font-medium">Button Text</Label>
      <Input
        id="button-text"
        value={properties?.buttonText || 'Button'}
        onChange={(e) => onPropertyChange('buttonText', e.target.value)}
        placeholder="Enter button text"
        className="h-8"
      />
    </div>
  );
}
