
import React from 'react';
import { Element } from '@/types/wireframe';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface FunnelButtonsEditorProps {
  funnelButtons: any[];
  updateProperties: (updates: Partial<Element['properties']>) => void;
}

export function FunnelButtonsEditor({ funnelButtons, updateProperties }: FunnelButtonsEditorProps) {
  const updateButton = (index: number, field: string, value: string) => {
    const updatedButtons = [...funnelButtons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    updateProperties({ funnelButtons: updatedButtons });
  };

  const addButton = () => {
    const newButton = { title: 'Button', alignment: 'left' };
    updateProperties({ funnelButtons: [...funnelButtons, newButton] });
  };

  const removeButton = (index: number) => {
    const updatedButtons = funnelButtons.filter((_, i) => i !== index);
    updateProperties({ funnelButtons: updatedButtons });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-gray-600">Buttons</Label>
        <Button
          onClick={addButton}
          size="sm"
          variant="outline"
          className="h-7 px-2"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      {funnelButtons.map((button, index) => (
        <div key={index} className="grid grid-cols-3 gap-2 items-center">
          <Input
            value={button.title}
            onChange={(e) => updateButton(index, 'title', e.target.value)}
            placeholder="Button title"
            className="h-8 text-xs"
          />
          <select
            value={button.alignment}
            onChange={(e) => updateButton(index, 'alignment', e.target.value)}
            className="h-8 text-xs border border-gray-300 rounded px-2"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
          <Button
            onClick={() => removeButton(index)}
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
