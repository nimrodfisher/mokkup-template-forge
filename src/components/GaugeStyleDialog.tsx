
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWireframe } from "@/hooks/useWireframe";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface GaugeStyleDialogProps {
  elementId: string;
  open: boolean;
  onClose: () => void;
}

export const GaugeStyleDialog = ({ elementId, open, onClose }: GaugeStyleDialogProps) => {
  const { elements, updateElementProperties } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  
  if (!element) return null;
  
  const gaugeProperties = element.properties || {};
  const [gaugeStyle, setGaugeStyle] = useState<string>(
    gaugeProperties.gaugeStyle || 'default'
  );
  
  const applyStyle = () => {
    updateElementProperties(elementId, {
      gaugeStyle,
      gaugePrimaryColor: gaugeStyle === 'default' ? '#4F46E5' : '#9b87f5',
      gaugeSecondaryColor: gaugeStyle === 'default' ? '#E5E7EB' : '#F1F0FB',
    });
    
    toast.success("Gauge style updated");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Choose gauge style</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-sm text-muted-foreground mb-2">Available styles</div>
          
          <RadioGroup 
            value={gaugeStyle} 
            onValueChange={setGaugeStyle}
            className="grid grid-cols-1 gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default" className="cursor-pointer">Default</Label>
              </div>
              <div className="border rounded-md p-4 bg-white">
                <div className="text-sm font-medium mb-2">Title goes here</div>
                <div className="relative w-full h-[100px]">
                  <div className="w-full h-full bg-gray-200 rounded-t-full overflow-hidden" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}>
                    <div className="w-[40%] h-full bg-indigo-600 rounded-t-full" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">4K</div>
                  <div className="absolute bottom-0 left-0 text-xs">2K</div>
                  <div className="absolute bottom-0 right-0 text-xs">7K</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="speed-gauge" id="speed-gauge" />
                <Label htmlFor="speed-gauge" className="cursor-pointer">Speed-Gauge</Label>
              </div>
              <div className="border rounded-md p-4 bg-white">
                <div className="text-sm font-medium mb-2">Title goes here</div>
                <div className="relative w-full h-[100px]">
                  <div className="w-full h-full bg-purple-100 rounded-t-full overflow-hidden" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}>
                    <div className="w-[40%] h-full bg-purple-400 rounded-t-full" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)' }}></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                    40K
                  </div>
                  <div className="absolute bottom-0 left-0 text-xs">10K</div>
                  <div className="absolute bottom-0 right-0 text-xs">100K</div>
                  {/* Needle */}
                  <div className="absolute w-[1px] h-[50px] bg-gray-800 origin-bottom" 
                    style={{ 
                      bottom: '0px', 
                      left: '40%', 
                      transform: 'rotate(-30deg)',
                      transformOrigin: 'bottom'
                    }}>
                    <div className="absolute w-2 h-2 rounded-full bg-gray-800 -top-1 -left-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={applyStyle} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Apply style
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
