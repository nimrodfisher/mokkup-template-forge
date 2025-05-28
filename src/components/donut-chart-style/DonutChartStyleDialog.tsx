
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { DonutChartTemplates } from './DonutChartTemplates';
import { DonutChartVariant } from '@/types/wireframe';

interface DonutChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function DonutChartStyleDialog({ elementId, open, onClose }: DonutChartStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  // Get current element to determine initial template
  const currentElement = elements.find(el => el.id === elementId);
  
  useEffect(() => {
    if (currentElement && currentElement.properties) {
      const variant = currentElement.properties.donutChartVariant;
      if (variant) {
        setSelectedTemplate(variant);
      }
    }
  }, [currentElement]);

  const templateConfigs: Record<string, {
    donutChartVariant: DonutChartVariant;
    showDonutLegend: boolean;
    showDonutLabels: boolean;
    showDonutPercentages: boolean;
    donutChartButtons?: Array<{title: string, alignment: string}>;
    donutChartKpis?: Array<{title: string, value: string, change?: string}>;
    donutInnerRadius: number;
    donutOuterRadius: number;
  }> = {
    default: {
      donutChartVariant: 'default',
      showDonutLegend: false,
      showDonutLabels: true,
      showDonutPercentages: true,
      donutInnerRadius: 40,
      donutOuterRadius: 80,
    },
    'with-legend': {
      donutChartVariant: 'with-legend',
      showDonutLegend: true,
      showDonutLabels: false,
      showDonutPercentages: false,
      donutInnerRadius: 40,
      donutOuterRadius: 80,
    },
    'with-buttons': {
      donutChartVariant: 'with-buttons',
      showDonutLegend: false,
      showDonutLabels: false,
      showDonutPercentages: false,
      donutInnerRadius: 40,
      donutOuterRadius: 80,
      donutChartButtons: [
        { title: 'Title 1', alignment: 'left' },
        { title: 'Title 2', alignment: 'right' }
      ],
    },
    'with-kpis': {
      donutChartVariant: 'with-kpis',
      showDonutLegend: false,
      showDonutLabels: false,
      showDonutPercentages: false,
      donutInnerRadius: 40,
      donutOuterRadius: 80,
      donutChartKpis: [
        { title: 'Metric 1', value: '1234', change: '12%' },
        { title: 'Metric 2', value: '1234', change: '12%' }
      ],
    },
  };

  // Apply template immediately when selected (for preview)
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const config = templateConfigs[templateId];
    if (config) {
      updateElementProperties(elementId, config);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Donut Chart Style</DialogTitle>
        </DialogHeader>
        
        <DonutChartTemplates 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
