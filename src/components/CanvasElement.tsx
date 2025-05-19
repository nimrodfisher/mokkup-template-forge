
import { useState } from "react";
import { useWireframe, Element } from "@/hooks/useWireframe";
import { FilterDisplay } from "./FilterDisplay";
import { FilterStyleDialog } from "./FilterStyleDialog";
import { toast } from "sonner";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const [showFilterStyleDialog, setShowFilterStyleDialog] = useState(false);
  const { updateElement, selectElement, removeElement } = useWireframe();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (element.type === 'filter') {
      setShowFilterStyleDialog(true);
    }
  };
  
  const handleMouseDownOnElement = (e: React.MouseEvent) => {
    if (isSelected) {
      e.stopPropagation();
      setIsDragging(true);
      
      const startX = e.clientX;
      const startY = e.clientY;
      const startElementX = element.position.x;
      const startElementY = element.position.y;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        updateElement(element.id, {
          position: {
            x: startElementX + dx,
            y: startElementY + dy,
          }
        });
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = element.size.width;
    const startHeight = element.size.height;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      const newWidth = Math.max(50, startWidth + dx);
      const newHeight = Math.max(30, startHeight + dy);
      
      updateElement(element.id, {
        size: {
          width: newWidth,
          height: newHeight,
        }
      });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleDelete = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeElement(element.id);
      toast.success(`${element.type} removed`);
    }
  };
  
  // Render element content based on type
  const renderElementContent = () => {
    switch (element.type) {
      case 'header':
        const headerProperties = element.properties || {};
        return (
          <div 
            className="w-full h-full p-4 flex items-center"
            style={{
              backgroundColor: headerProperties.backgroundColor || '#ffffff',
              color: headerProperties.textColor || 'black',
              justifyContent: headerProperties.variant === 'centered' ? 'center' : 'flex-start',
            }}
          >
            {headerProperties.showLogo && headerProperties.logoUrl && (
              <img 
                src={headerProperties.logoUrl} 
                alt="Logo" 
                className="h-full max-h-12 mr-3 object-contain"
              />
            )}
            {headerProperties.showLogo && !headerProperties.logoUrl && (
              <div className="h-full max-h-12 aspect-square bg-gray-200 mr-3 flex items-center justify-center text-gray-400">
                Logo
              </div>
            )}
            <div className={
              headerProperties.variant === 'with-description' || headerProperties.variant === 'with-metrics'
                ? 'flex-1'
                : ''
              }>
              {headerProperties.title && (
                <div className="font-bold text-lg">{headerProperties.title}</div>
              )}
              {headerProperties.variant === 'with-description' && headerProperties.description && (
                <div className="text-sm mt-1 text-gray-600">{headerProperties.description}</div>
              )}
            </div>
            {headerProperties.variant === 'with-metrics' && (
              <div className="flex space-x-6">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500">Metric 1</div>
                  <div className="font-bold">123</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500">Metric 2</div>
                  <div className="font-bold">456</div>
                </div>
              </div>
            )}
            {headerProperties.showNavigation && (
              <div className="ml-auto flex space-x-3">
                <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 1</button>
                <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors">Link 2</button>
              </div>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Button
            </button>
          </div>
        );
      case 'filter':
        return <FilterDisplay element={element} />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-2">
            <div className="font-medium">{element.type}</div>
          </div>
        );
    }
  };
  
  return (
    <>
      <div
        className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          left: element.position.x,
          top: element.position.y,
          width: element.size.width,
          height: element.size.height,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          boxShadow: isSelected ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
          zIndex: isSelected ? 10 : 1,
        }}
        onClick={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDownOnElement}
        onKeyDown={handleDelete}
        tabIndex={0}
      >
        {renderElementContent()}
        
        {isSelected && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>
      
      {showFilterStyleDialog && (
        <FilterStyleDialog 
          elementId={element.id} 
          open={showFilterStyleDialog} 
          onClose={() => setShowFilterStyleDialog(false)}
        />
      )}
    </>
  );
}
