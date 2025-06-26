
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Element } from '@/types/wireframe';

interface ButtonVariantSectionProps {
  properties: Element['properties'];
  onPropertyChange: (key: string, value: any) => void;
}

export function ButtonVariantSection({ properties, onPropertyChange }: ButtonVariantSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Button Style</Label>
      <RadioGroup
        value={properties?.buttonVariant || 'default'}
        onValueChange={(value) => onPropertyChange('buttonVariant', value)}
        className="grid grid-cols-1 gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="variant-default" />
          <Label htmlFor="variant-default" className="text-sm">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="primary" id="variant-primary" />
          <Label htmlFor="variant-primary" className="text-sm">Primary</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="secondary" id="variant-secondary" />
          <Label htmlFor="variant-secondary" className="text-sm">Secondary</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="outline" id="variant-outline" />
          <Label htmlFor="variant-outline" className="text-sm">Outline</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ghost" id="variant-ghost" />
          <Label htmlFor="variant-ghost" className="text-sm">Ghost</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
