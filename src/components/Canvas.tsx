
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useWireframe, ElementType } from "@/hooks/useWireframe";
import { CanvasElement } from "./CanvasElement";

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { elements, addElement, selectedElementId, selectElement } = useWireframe();
  
  const [, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: ElementType }, monitor) => {
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (canvasRect) {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          addElement(
            item.type,
            {
              x: clientOffset.x - canvasRect.left,
              y: clientOffset.y - canvasRect.top,
            }
          );
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  return (
    <div 
      ref={node => {
        drop(node);
        if (canvasRef) {
          canvasRef.current = node as HTMLDivElement;
        }
      }}
      className="flex-1 overflow-auto bg-gray-100 h-full relative"
      onClick={() => selectElement(null)}
    >
      {elements.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <div className="w-24 h-24 mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="text-gray-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Click/Drag elements onto the canvas & resize instantly!</h3>
          <p className="text-center max-w-md">
            Resize the elements from the bottom right corner to the desired size with a simple drag and release.
          </p>
        </div>
      )}
      
      {elements.map((element) => (
        <CanvasElement
          key={element.id}
          element={element}
          isSelected={selectedElementId === element.id}
        />
      ))}
    </div>
  );
}
