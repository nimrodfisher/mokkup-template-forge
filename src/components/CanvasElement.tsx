import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Element, useWireframe } from "@/hooks/useWireframe";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const { updateElement, selectElement, updateElementProperties } = useWireframe();
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const [showStyleDialog, setShowStyleDialog] = useState(false);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANVAS_ELEMENT',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.size.width;
    const startHeight = element.size.height;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      
      updateElement(element.id, {
        size: {
          width: Math.max(20, newWidth),
          height: Math.max(20, newHeight),
        },
      });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Open style dialog on double-click for headers
    if (element.type === 'header') {
      setShowStyleDialog(true);
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...element.position };
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateElement(element.id, {
        position: {
          x: startPos.x + (moveEvent.clientX - startX),
          y: startPos.y + (moveEvent.clientY - startY),
        },
      });
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleStyleSelection = (variant: 'default' | 'centered' | 'with-description' | 'with-metrics') => {
    updateElementProperties(element.id, { variant });
    setShowStyleDialog(false);
  };
  
  // Prevent showing element while dragging
  if (isDragging) {
    return null;
  }
  
  return (
    <>
      <div
        ref={drag}
        className={`absolute border ${isSelected ? 'border-blue-500 shadow-sm' : 'border-gray-300'}`}
        style={{
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          cursor: 'move',
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
      >
        <ElementContent element={element} />
        
        {isSelected && (
          <div
            ref={resizeHandleRef}
            className="absolute w-3 h-3 right-0 bottom-0 cursor-nwse-resize bg-blue-500"
            onMouseDown={handleResizeStart}
          />
        )}
      </div>
      
      {/* Header Style Dialog */}
      <Dialog open={showStyleDialog} onOpenChange={setShowStyleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Choose header style</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="space-y-3">
              {['default', 'centered', 'with-description', 'with-metrics'].map(variant => (
                <div 
                  key={variant}
                  onClick={() => handleStyleSelection(variant as any)}
                  className={`p-3 border rounded-md cursor-pointer transition-all hover:border-blue-400 ${
                    element.properties?.variant === variant ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    {variant === 'default' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-200" />
                        <div className="h-4 bg-gray-300 w-32" />
                      </div>
                    )}
                    {variant === 'centered' && (
                      <div className="w-full flex justify-center">
                        <div className="h-4 bg-gray-300 w-32" />
                      </div>
                    )}
                    {variant === 'with-description' && (
                      <div className="space-y-2 w-full">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-200" />
                          <div className="h-4 bg-gray-300 w-32" />
                        </div>
                        <div className="h-2 bg-gray-200 w-full" />
                        <div className="h-2 bg-gray-200 w-3/4" />
                      </div>
                    )}
                    {variant === 'with-metrics' && (
                      <div className="flex justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-200" />
                          <div className="h-4 bg-gray-300 w-24" />
                        </div>
                        <div className="flex space-x-3">
                          <div className="flex flex-col items-center">
                            <div className="text-xs">Metric 1</div>
                            <div className="text-xs font-bold">123</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-xs">Metric 2</div>
                            <div className="text-xs font-bold">456</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-2">
                    {element.properties?.variant === variant && (
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStyleDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ElementContent({ element }: { element: Element }) {
  const { type, properties = {} } = element;
  
  switch (type) {
    case 'header':
      const {
        backgroundColor = '#ffffff',
        textColor = 'black',
        title = 'DASHBOARD TITLE',
        showLogo = true,
        showNavigation = false,
        variant = 'default',
        description = 'Dashboard description goes here',
        logoUrl = ''
      } = properties;
      
      // Custom logo render function
      const renderLogo = () => {
        if (!showLogo) return null;
        
        if (logoUrl) {
          return (
            <div className="h-8 w-8 bg-transparent flex items-center justify-center overflow-hidden">
              <img src={logoUrl} alt="Logo" className="h-full w-full object-contain" />
            </div>
          );
        }
        
        return <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-xs">Logo</div>;
      };
      
      if (variant === 'default') {
        return (
          <div 
            className="p-2 flex items-center h-full justify-between"
            style={{ backgroundColor, color: textColor }}
          >
            <div className="flex items-center">
              {renderLogo()}
              {title && <div className="ml-2 font-bold">{title}</div>}
            </div>
            
            {showNavigation && (
              <div className="flex space-x-3">
                <div className="text-xs px-2">Navigation 1</div>
                <div className="text-xs px-2">Navigation 2</div>
                <div className="text-xs px-2">Navigation 3</div>
              </div>
            )}
          </div>
        );
      } else if (variant === 'centered') {
        return (
          <div 
            className="p-2 flex flex-col items-center justify-center h-full"
            style={{ backgroundColor, color: textColor }}
          >
            {renderLogo()}
            {title && <div className="font-bold mt-1">{title}</div>}
            
            {showNavigation && (
              <div className="flex space-x-3 mt-1">
                <div className="text-xs px-2">Navigation 1</div>
                <div className="text-xs px-2">Navigation 2</div>
                <div className="text-xs px-2">Navigation 3</div>
              </div>
            )}
          </div>
        );
      } else if (variant === 'with-description') {
        return (
          <div 
            className="p-2 h-full"
            style={{ backgroundColor, color: textColor }}
          >
            <div className="flex items-center mb-1">
              {renderLogo()}
              {title && <div className="ml-2 font-bold">{title}</div>}
            </div>
            <div className="text-xs text-gray-500">{description}</div>
            
            {showNavigation && (
              <div className="flex space-x-3 mt-1">
                <div className="text-xs px-2">Navigation 1</div>
                <div className="text-xs px-2">Navigation 2</div>
                <div className="text-xs px-2">Navigation 3</div>
              </div>
            )}
          </div>
        );
      } else if (variant === 'with-metrics') {
        return (
          <div 
            className="p-2 flex items-center justify-between h-full"
            style={{ backgroundColor, color: textColor }}
          >
            <div className="flex items-center">
              {renderLogo()}
              {title && <div className="ml-2 font-bold">{title}</div>}
            </div>
            
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-xs">Title 1</div>
                <div className="text-xs font-bold">Metric 1</div>
              </div>
              <div className="text-center">
                <div className="text-xs">Title 2</div>
                <div className="text-xs font-bold">Metric 2</div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="bg-white p-2 flex items-center h-full">
          <div className="h-4 w-16 bg-gray-200 rounded mr-2" />
          <div className="h-4 w-32 bg-gray-200 rounded mr-auto" />
          <div className="h-4 w-8 bg-gray-200 rounded mr-2" />
          <div className="h-4 w-8 bg-gray-200 rounded" />
        </div>
      );
      
    case 'button':
      return (
        <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-xs rounded">
          Button
        </div>
      );
    case 'filter':
      return (
        <div className="bg-white p-2 flex items-center h-full rounded border">
          <div className="h-3 w-12 bg-gray-200 rounded mr-2" />
          <div className="h-3 w-3 ml-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      );
    case 'kpi':
      return (
        <div className="bg-white p-2 h-full rounded border flex flex-col justify-center items-center">
          <div className="h-6 w-20 bg-gray-200 mb-1 rounded" />
          <div className="h-10 w-16 bg-gray-300 rounded" />
        </div>
      );
    case 'column-chart':
      return (
        <div className="bg-white p-2 h-full rounded border flex items-end justify-center gap-2">
          <div className="h-40% w-6 bg-blue-200 rounded-t" />
          <div className="h-70% w-6 bg-blue-400 rounded-t" />
          <div className="h-30% w-6 bg-blue-200 rounded-t" />
          <div className="h-60% w-6 bg-blue-300 rounded-t" />
          <div className="h-80% w-6 bg-blue-500 rounded-t" />
        </div>
      );
    case 'bar-chart':
      return (
        <div className="bg-white p-2 h-full rounded border flex flex-col justify-around">
          <div className="flex items-center h-4">
            <div className="w-40% h-4 bg-blue-200 rounded-r mr-2" />
            <div className="h-2 w-8 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center h-4">
            <div className="w-70% h-4 bg-blue-400 rounded-r mr-2" />
            <div className="h-2 w-8 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center h-4">
            <div className="w-30% h-4 bg-blue-200 rounded-r mr-2" />
            <div className="h-2 w-8 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center h-4">
            <div className="w-60% h-4 bg-blue-300 rounded-r mr-2" />
            <div className="h-2 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      );
    default:
      return null;
  }
}
