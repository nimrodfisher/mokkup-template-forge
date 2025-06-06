
import React from 'react';
import { useWireframe } from '@/hooks/useWireframe';
import { Button } from '@/components/ui/button';
import { ComboChartRenderer } from '../element-renderers/ComboChartRenderer';

interface ComboChartStyleTemplateProps {
  template: {
    id: string;
    name: string;
    preview: string;
    properties: any;
  };
  elementId: string;
  onClose: () => void;
}

export function ComboChartStyleTemplate({ template, elementId, onClose }: ComboChartStyleTemplateProps) {
  const { updateElementProperties } = useWireframe();

  const handleApplyStyle = () => {
    updateElementProperties(elementId, template.properties);
    onClose();
  };

  return (
    <div className="border rounded-lg p-4 hover:border-blue-500 transition-colors">
      <div className="aspect-video mb-4 border rounded bg-gray-50 overflow-hidden">
        <div className="h-full scale-75 origin-top-left">
          <ComboChartRenderer properties={template.properties} />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-sm text-gray-600">{template.preview}</p>
        </div>
        
        <Button onClick={handleApplyStyle} className="bg-blue-600 hover:bg-blue-700">
          Apply style
        </Button>
      </div>
    </div>
  );
}
