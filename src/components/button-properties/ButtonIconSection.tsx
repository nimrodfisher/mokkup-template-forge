
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Element } from '@/types/wireframe';

interface ButtonIconSectionProps {
  properties: Element['properties'];
  onPropertyChange: (key: string, value: any) => void;
}

export function ButtonIconSection({ properties, onPropertyChange }: ButtonIconSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="button-icon" className="text-sm font-medium">Show Icon</Label>
        <Switch
          id="button-icon"
          checked={properties?.buttonIcon || false}
          onCheckedChange={(checked) => onPropertyChange('buttonIcon', checked)}
        />
      </div>
    </div>
  );
}
