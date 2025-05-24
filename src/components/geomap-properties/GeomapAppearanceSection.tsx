
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface GeomapAppearanceSectionProps {
  properties: any;
  handleChange: (field: string, value: any) => void;
  propertiesOpen: boolean;
  setPropertiesOpen: (open: boolean) => void;
}

export function GeomapAppearanceSection({ properties, handleChange, propertiesOpen, setPropertiesOpen }: GeomapAppearanceSectionProps) {
  return (
    <>
      <div className="border-b pb-2 mb-2">
        <button
          onClick={() => setPropertiesOpen(!propertiesOpen)}
          className="flex items-center justify-between w-full text-left font-medium py-2"
        >
          <span>Appearance</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {propertiesOpen && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Tooltips</Label>
            <Switch
              checked={properties.showTooltips !== false}
              onCheckedChange={(checked) => handleChange('showTooltips', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Show Zoom Controls</Label>
            <Switch
              checked={properties.showZoomControls !== false}
              onCheckedChange={(checked) => handleChange('showZoomControls', checked)}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium">Primary Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="color"
                value={properties.geomapPrimaryColor || '#3B82F6'}
                onChange={(e) => handleChange('geomapPrimaryColor', e.target.value)}
                className="w-8 h-8 border rounded cursor-pointer"
              />
              <span className="text-xs text-gray-500">
                {properties.geomapPrimaryColor || '#3B82F6'}
              </span>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Secondary Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="color"
                value={properties.geomapSecondaryColor || '#EFF6FF'}
                onChange={(e) => handleChange('geomapSecondaryColor', e.target.value)}
                className="w-8 h-8 border rounded cursor-pointer"
              />
              <span className="text-xs text-gray-500">
                {properties.geomapSecondaryColor || '#EFF6FF'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
