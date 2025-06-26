
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Element } from '@/types/wireframe';

interface ButtonSizeSectionProps {
  properties: Element['properties'];
  onPropertyChange: (key: string, value: any) => void;
}

export function ButtonSizeSection({ properties, onPropertyChange }: ButtonSizeSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Button Size</Label>
      <Select 
        value={properties?.buttonSize || 'md'} 
        onValueChange={(value) => onPropertyChange('buttonSize', value)}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
