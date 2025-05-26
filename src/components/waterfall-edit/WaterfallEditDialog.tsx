
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface WaterfallEditDialogProps {
  open: boolean;
  onClose: () => void;
  variant: 'basic-waterfall' | 'with-buttons' | 'with-kpis';
  properties: any;
  onUpdate: (properties: any) => void;
}

export function WaterfallEditDialog({ open, onClose, variant, properties, onUpdate }: WaterfallEditDialogProps) {
  const [localProps, setLocalProps] = useState(properties);

  const handleSave = () => {
    onUpdate(localProps);
    onClose();
  };

  const updateButtons = (index: number, field: string, value: string) => {
    const newButtons = [...(localProps.waterfallButtons || [])];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setLocalProps({ ...localProps, waterfallButtons: newButtons });
  };

  const addButton = () => {
    const newButtons = [...(localProps.waterfallButtons || []), { title: 'New Button', alignment: 'left' }];
    setLocalProps({ ...localProps, waterfallButtons: newButtons });
  };

  const removeButton = (index: number) => {
    const newButtons = (localProps.waterfallButtons || []).filter((_: any, i: number) => i !== index);
    setLocalProps({ ...localProps, waterfallButtons: newButtons });
  };

  const updateKpis = (index: number, field: string, value: string) => {
    const newKpis = [...(localProps.waterfallKpis || [])];
    newKpis[index] = { ...newKpis[index], [field]: value };
    setLocalProps({ ...localProps, waterfallKpis: newKpis });
  };

  const addKpi = () => {
    const newKpis = [...(localProps.waterfallKpis || []), { title: 'New Metric', value: '0', change: '0%' }];
    setLocalProps({ ...localProps, waterfallKpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = (localProps.waterfallKpis || []).filter((_: any, i: number) => i !== index);
    setLocalProps({ ...localProps, waterfallKpis: newKpis });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Waterfall Chart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Title Edit */}
          <div>
            <Label>Chart Title</Label>
            <Input
              value={localProps.waterfallTitle || ''}
              onChange={(e) => setLocalProps({ ...localProps, waterfallTitle: e.target.value })}
              placeholder="Chart Title"
            />
          </div>

          {/* Template-specific controls */}
          {variant === 'with-buttons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Buttons</h3>
                <Button size="sm" variant="outline" onClick={addButton}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Button
                </Button>
              </div>
              
              {(localProps.waterfallButtons || []).map((button: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border rounded">
                  <div className="col-span-5">
                    <Input
                      value={button.title}
                      onChange={(e) => updateButtons(index, 'title', e.target.value)}
                      placeholder="Button Title"
                    />
                  </div>
                  <div className="col-span-5">
                    <select
                      value={button.alignment}
                      onChange={(e) => updateButtons(index, 'alignment', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeButton(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {variant === 'with-kpis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">KPIs</h3>
                <Button size="sm" variant="outline" onClick={addKpi}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add KPI
                </Button>
              </div>
              
              {(localProps.waterfallKpis || []).map((kpi: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border rounded">
                  <div className="col-span-4">
                    <Input
                      value={kpi.title}
                      onChange={(e) => updateKpis(index, 'title', e.target.value)}
                      placeholder="Metric Title"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      value={kpi.value}
                      onChange={(e) => updateKpis(index, 'value', e.target.value)}
                      placeholder="Value"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      value={kpi.change}
                      onChange={(e) => updateKpis(index, 'change', e.target.value)}
                      placeholder="Change %"
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeKpi(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
