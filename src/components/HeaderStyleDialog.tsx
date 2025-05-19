
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface HeaderStyleDialogProps {
  elementId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderStyleDialog({ elementId, isOpen, onClose }: HeaderStyleDialogProps) {
  const { updateElementProperties, elements } = useWireframe();
  const element = elements.find(el => el.id === elementId);
  const [selectedVariant, setSelectedVariant] = useState<string>(element?.properties?.variant || 'default');
  
  const handleApplyStyle = () => {
    updateElementProperties(elementId, { variant: selectedVariant });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose style</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">Available styles</span>
            <Button 
              variant="link" 
              size="sm" 
              className="text-xs" 
              onClick={() => setSelectedVariant('default')}
            >
              Default
            </Button>
          </div>
          
          <RadioGroup 
            value={selectedVariant} 
            onValueChange={setSelectedVariant}
            className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
          >
            {/* Default style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="default" id="default" />
              <Label htmlFor="default" className="flex-1 cursor-pointer">
                <div className="bg-gray-50 border rounded-md p-4 mt-1">
                  <div className="flex items-center">
                    <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                    <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* With metrics style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="with-metrics" id="with-metrics" />
              <Label htmlFor="with-metrics" className="flex-1 cursor-pointer">
                <div className="bg-gray-50 border rounded-md p-4 mt-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                      <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="text-[8px]">
                        <div>Title 1</div>
                        <div className="text-gray-400">Metric 1</div>
                      </div>
                      <div className="text-[8px]">
                        <div>Title 2</div>
                        <div className="text-gray-400">Metric 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* With description style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="with-description" id="with-description" />
              <Label htmlFor="with-description" className="flex-1 cursor-pointer">
                <div className="bg-gray-50 border rounded-md p-4 mt-1">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                      <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                    </div>
                    <div className="text-[8px] mt-2 text-gray-500">
                      Some dummy description text<br />
                      Some dummy description text
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* Centered navigation style - Purple */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="centered-navigation-purple" id="centered-navigation-purple" />
              <Label htmlFor="centered-navigation-purple" className="flex-1 cursor-pointer">
                <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
                  <div className="flex flex-col items-center">
                    <div className="font-bold text-xs text-center mt-1">DASHBOARD TITLE</div>
                    <div className="flex justify-center space-x-6 mt-1">
                      <div className="text-[8px]">Navigation 1</div>
                      <div className="text-[8px]">Navigation 2</div>
                      <div className="text-[8px]">Navigation 3</div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* Navigation top style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="navigation-top" id="navigation-top" />
              <Label htmlFor="navigation-top" className="flex-1 cursor-pointer">
                <div className="bg-gray-50 border rounded-md p-4 mt-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                      <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                    </div>
                    <div className="flex space-x-4 text-[8px] text-blue-500">
                      <div>Navigation 1</div>
                      <div>Navigation 2</div>
                      <div>Navigation 3</div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* Double logo style - Purple */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="double-logo-purple" id="double-logo-purple" />
              <Label htmlFor="double-logo-purple" className="flex-1 cursor-pointer">
                <div className="bg-[#9b87f5] rounded-md p-4 mt-1 text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
                    <div className="font-bold text-xs text-center">DASHBOARD TITLE</div>
                    <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded text-gray-800">Upload Logo</div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* NEW: Dark navigation style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="dark-navigation" id="dark-navigation" />
              <Label htmlFor="dark-navigation" className="flex-1 cursor-pointer">
                <div className="bg-[#1A1F2C] rounded-md p-4 mt-1 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-6 bg-gray-600 text-[8px] flex items-center justify-center rounded text-white">Upload Logo</div>
                      <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                    </div>
                    <div className="flex space-x-4 text-[8px] text-gray-300">
                      <div>Navigation 1</div>
                      <div>Navigation 2</div>
                      <div>Navigation 3</div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* NEW: Gradient style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="gradient" id="gradient" />
              <Label htmlFor="gradient" className="flex-1 cursor-pointer">
                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-md p-4 mt-1 text-white">
                  <div className="flex items-center">
                    <div className="w-16 h-6 bg-white/20 backdrop-blur-sm text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                    <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* NEW: Minimal style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="minimal" id="minimal" />
              <Label htmlFor="minimal" className="flex-1 cursor-pointer">
                <div className="bg-[#F6F6F7] rounded-md p-4 mt-1">
                  <div className="flex items-center justify-center">
                    <div className="font-bold text-xs text-gray-800">DASHBOARD TITLE</div>
                  </div>
                </div>
              </Label>
            </div>
            
            {/* NEW: Colorful banner style */}
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <RadioGroupItem value="colorful-banner" id="colorful-banner" />
              <Label htmlFor="colorful-banner" className="flex-1 cursor-pointer">
                <div className="relative bg-white rounded-md overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#0EA5E9]"></div>
                  <div className="p-4 mt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-6 bg-gray-200 text-[8px] flex items-center justify-center rounded">Upload Logo</div>
                        <div className="font-bold ml-4 text-xs">DASHBOARD TITLE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button 
            variant="default" 
            onClick={handleApplyStyle} 
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            Apply style
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
