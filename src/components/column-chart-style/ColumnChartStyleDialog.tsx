
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWireframe } from '@/hooks/useWireframe';
import { ColumnChartTemplates } from './ColumnChartTemplates';

interface ColumnChartStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function ColumnChartStyleDialog({ elementId, open, onClose }: ColumnChartStyleDialogProps) {
  const { updateElementProperties } = useWireframe();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('default');

  const applyTemplate = () => {
    const templateConfigs = {
      default: {
        chartVariant: 'default',
        barColor: '#3B82F6',
        secondaryBarColor: '#818CF8',
        showLegend: true,
        showGridLines: true,
      },
      grouped: {
        chartVariant: 'grouped',
        barColor: '#10B981',
        secondaryBarColor: '#34D399',
        showLegend: true,
        showGridLines: true,
      },
      stacked: {
        chartVariant: 'stacked',
        barColor: '#F59E0B',
        secondaryBarColor: '#FBBF24',
        tertiaryBarColor: '#FCD34D',
        showLegend: true,
        showGridLines: false,
      },
      gradient: {
        chartVariant: 'gradient',
        barColor: '#8B5CF6',
        secondaryBarColor: '#A78BFA',
        showLegend: false,
        showGridLines: true,
      },
    };

    const config = templateConfigs[selectedTemplate as keyof typeof templateConfigs];
    if (config) {
      updateElementProperties(elementId, config);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Column Chart Style</DialogTitle>
        </DialogHeader>
        
        <ColumnChartTemplates 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={applyTemplate}>
            Apply Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
