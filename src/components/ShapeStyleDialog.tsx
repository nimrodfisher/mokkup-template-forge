
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useWireframe, ShapeVariant } from "@/hooks/useWireframe";
import { X } from "lucide-react";
import { useState } from "react";

interface ShapeStyleDialogProps {
  elementId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShapeStyleDialog({ elementId, isOpen, onClose }: ShapeStyleDialogProps) {
  const { elements, updateElementProperties } = useWireframe();
  const [selectedStyle, setSelectedStyle] = useState<ShapeVariant | null>(null);
  
  const element = elements.find(el => el.id === elementId);
  if (!element) return null;
  
  const currentVariant = element.properties?.shapeVariant || 'triangle';
  
  // If no style is selected, use the current variant
  if (!selectedStyle && currentVariant) {
    setSelectedStyle(currentVariant as ShapeVariant);
  }
  
  const handleApplyStyle = () => {
    if (selectedStyle) {
      updateElementProperties(elementId, { shapeVariant: selectedStyle });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Choose style</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Select a shape template to apply to your element
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-sm font-medium mb-3">Available styles</div>
          <div className="grid grid-cols-2 gap-4">
            {/* Basic Shapes Section */}
            <div className="col-span-2 mt-2 mb-1">
              <h3 className="text-sm font-medium text-gray-700">Basic Shapes</h3>
            </div>
            
            {/* Triangle shape */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'triangle' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('triangle')}
            >
              <div className="text-center mb-2">Title goes here</div>
              <div className="flex justify-center">
                <div 
                  className="w-32 h-32 border-t-0 border-r-[50px] border-b-[100px] border-l-[50px] border-transparent border-b-blue-600"
                  style={{ width: 0, height: 0 }}
                />
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'triangle' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Rectangle shape */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'rectangle' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('rectangle')}
            >
              <div className="text-center mb-2">Title goes here</div>
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-blue-600" />
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'rectangle' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Oval shape */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'oval' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('oval')}
            >
              <div className="text-center mb-2">Title goes here</div>
              <div className="flex justify-center">
                <div className="w-32 h-16 rounded-full bg-blue-600" />
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'oval' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Circle shape */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'circle' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('circle')}
            >
              <div className="text-center mb-2">Title goes here</div>
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-600" />
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'circle' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="col-span-2 mt-4 mb-1">
              <h3 className="text-sm font-medium text-gray-700">Bar Charts</h3>
            </div>
            
            {/* Basic Bar Chart */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'basic-bar' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('basic-bar')}
            >
              <div className="text-center mb-2">Chart Title</div>
              <div className="flex justify-center">
                <div className="w-full">
                  <div className="flex items-end h-20 gap-1">
                    <div className="bg-indigo-600 w-8 h-10"></div>
                    <div className="bg-indigo-600 w-8 h-16"></div>
                    <div className="bg-indigo-600 w-8 h-8"></div>
                    <div className="bg-indigo-600 w-8 h-14"></div>
                    <div className="bg-indigo-600 w-8 h-12"></div>
                    <div className="bg-indigo-600 w-8 h-18"></div>
                  </div>
                  <div className="h-[1px] bg-gray-300 w-full mt-1"></div>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'basic-bar' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Stacked Bar Chart */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'stacked-bar' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('stacked-bar')}
            >
              <div className="text-center mb-2">Chart Title</div>
              <div className="flex justify-center">
                <div className="w-full">
                  <div className="flex items-end h-20 gap-1">
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-6"></div>
                      <div className="bg-indigo-400 h-4"></div>
                    </div>
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-8"></div>
                      <div className="bg-indigo-400 h-6"></div>
                    </div>
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-4"></div>
                      <div className="bg-indigo-400 h-4"></div>
                    </div>
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-7"></div>
                      <div className="bg-indigo-400 h-5"></div>
                    </div>
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-6"></div>
                      <div className="bg-indigo-400 h-6"></div>
                    </div>
                    <div className="w-8 flex flex-col">
                      <div className="bg-indigo-600 h-10"></div>
                      <div className="bg-indigo-400 h-7"></div>
                    </div>
                  </div>
                  <div className="h-[1px] bg-gray-300 w-full mt-1"></div>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'stacked-bar' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Grouped Bar Chart */}
            <div 
              className={`relative border rounded-lg p-4 cursor-pointer hover:border-blue-400 transition-all ${
                selectedStyle === 'grouped-bar' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedStyle('grouped-bar')}
            >
              <div className="text-center mb-2">Chart Title</div>
              <div className="flex justify-center">
                <div className="w-full">
                  <div className="flex items-end h-20 gap-3">
                    <div className="flex gap-1">
                      <div className="bg-indigo-600 w-4 h-10"></div>
                      <div className="bg-indigo-400 w-4 h-6"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="bg-indigo-600 w-4 h-16"></div>
                      <div className="bg-indigo-400 w-4 h-12"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="bg-indigo-600 w-4 h-8"></div>
                      <div className="bg-indigo-400 w-4 h-10"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="bg-indigo-600 w-4 h-14"></div>
                      <div className="bg-indigo-400 w-4 h-8"></div>
                    </div>
                  </div>
                  <div className="h-[1px] bg-gray-300 w-full mt-1"></div>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                {selectedStyle === 'grouped-bar' && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            onClick={handleApplyStyle}
            disabled={!selectedStyle}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Apply style
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
