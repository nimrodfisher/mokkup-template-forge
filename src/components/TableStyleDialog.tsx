
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useWireframe } from "@/hooks/useWireframe";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface TableStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export function TableStyleDialog({ elementId, open, onClose }: TableStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(e => e.id === elementId);
  
  if (!element) return null;
  
  const properties = element.properties || {};
  const {
    headerBackground = '#f3f4f6',
    headerTextColor = '#111827',
    cellBackground = '#ffffff',
    cellTextColor = '#374151',
    alternateRowColor = false,
    alternateRowBackground = '#f9fafb',
  } = properties;
  
  const [localHeaderBg, setLocalHeaderBg] = useState(headerBackground);
  const [localHeaderText, setLocalHeaderText] = useState(headerTextColor);
  const [localCellBg, setLocalCellBg] = useState(cellBackground);
  const [localCellText, setLocalCellText] = useState(cellTextColor);
  const [localAlternate, setLocalAlternate] = useState(alternateRowColor);
  const [localAlternateBg, setLocalAlternateBg] = useState(alternateRowBackground);
  
  const handleSave = () => {
    updateElementProperties(elementId, {
      headerBackground: localHeaderBg,
      headerTextColor: localHeaderText,
      cellBackground: localCellBg,
      cellTextColor: localCellText,
      alternateRowColor: localAlternate,
      alternateRowBackground: localAlternateBg,
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Table Style Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headerBg">Header Background</Label>
              <div className="flex mt-2">
                <input
                  id="headerBg"
                  type="color"
                  value={localHeaderBg}
                  onChange={(e) => setLocalHeaderBg(e.target.value)}
                  className="h-10 w-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={localHeaderBg}
                  onChange={(e) => setLocalHeaderBg(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="headerText">Header Text</Label>
              <div className="flex mt-2">
                <input
                  id="headerText"
                  type="color"
                  value={localHeaderText}
                  onChange={(e) => setLocalHeaderText(e.target.value)}
                  className="h-10 w-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={localHeaderText}
                  onChange={(e) => setLocalHeaderText(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cellBg">Cell Background</Label>
              <div className="flex mt-2">
                <input
                  id="cellBg"
                  type="color"
                  value={localCellBg}
                  onChange={(e) => setLocalCellBg(e.target.value)}
                  className="h-10 w-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={localCellBg}
                  onChange={(e) => setLocalCellBg(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cellText">Cell Text</Label>
              <div className="flex mt-2">
                <input
                  id="cellText"
                  type="color"
                  value={localCellText}
                  onChange={(e) => setLocalCellText(e.target.value)}
                  className="h-10 w-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={localCellText}
                  onChange={(e) => setLocalCellText(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="alternateRows"
                checked={localAlternate}
                onCheckedChange={setLocalAlternate}
              />
              <Label htmlFor="alternateRows">Alternate Row Colors</Label>
            </div>
          </div>

          {localAlternate && (
            <div>
              <Label htmlFor="alternateBg">Alternate Row Background</Label>
              <div className="flex mt-2">
                <input
                  id="alternateBg"
                  type="color"
                  value={localAlternateBg}
                  onChange={(e) => setLocalAlternateBg(e.target.value)}
                  className="h-10 w-10 cursor-pointer"
                />
                <input
                  type="text"
                  value={localAlternateBg}
                  onChange={(e) => setLocalAlternateBg(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>
          )}
          
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
