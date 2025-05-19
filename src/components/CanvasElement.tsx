
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { Element, useWireframe } from "@/hooks/useWireframe";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const { updateElement, selectElement } = useWireframe();
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  
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
  
  // Prevent showing element while dragging
  if (isDragging) {
    return null;
  }
  
  return (
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
      onMouseDown={handleMouseDown}
    >
      <ElementContent type={element.type} />
      
      {isSelected && (
        <div
          ref={resizeHandleRef}
          className="absolute w-3 h-3 right-0 bottom-0 cursor-nwse-resize bg-blue-500"
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}

function ElementContent({ type }: { type: Element['type'] }) {
  switch (type) {
    case 'header':
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
