
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { WaterfallTemplates } from './WaterfallTemplates';

interface WaterfallStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function WaterfallStyleDialog({ elementId, open, onClose }: WaterfallStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('basic-waterfall');

  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.waterfallVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs = {
    'basic-waterfall': {
      waterfallVariant: 'basic-waterfall' as const,
      waterfallPrimaryColor: '#4F46E5',
      waterfallSecondaryColor: '#818CF8',
      waterfallTotalColor: '#10B981',
      showGridLines: true,
      showLabels: true,
      showButtons: false,
      showKpis: false,
    },
    'with-buttons': {
      waterfallVariant: 'with-buttons' as const,
      waterfallPrimaryColor: '#059669',
      waterfallSecondaryColor: '#34D399',
      waterfallTotalColor: '#10B981',
      showGridLines: true,
      showLabels: true,
      showButtons: true,
      showKpis: false,
      waterfallButtons: [
        { title: 'Title 1', alignment: 'left' },
        { title: 'Title 2', alignment: 'right' }
      ],
    },
    'with-kpis': {
      waterfallVariant: 'with-kpis' as const,
      waterfallPrimaryColor: '#7C3AED',
      waterfallSecondaryColor: '#A78BFA',
      waterfallTotalColor: '#10B981',
      showGridLines: false,
      showLabels: true,
      showButtons: false,
      showKpis: true,
      waterfallKpis: [
        { title: 'Metric 1', value: '1234', change: '12%' },
        { title: 'Metric 2', value: '1234', change: '12%' }
      ],
    },
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const config = templateConfigs[templateId as keyof typeof templateConfigs];
    if (config) {
      updateElementProperties(elementId, config);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl lg:max-w-4xl">
        <SheetHeader className="pb-6">
          <SheetTitle>Choose Waterfall Style</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          <WaterfallTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />
        </div>
        
        <div className="flex justify-end pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
