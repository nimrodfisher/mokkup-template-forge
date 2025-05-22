
import React from "react";
import { useDrag } from "react-dnd";
import { Element } from "@/types/wireframe";
import { AreaChartDisplay } from "./AreaChartDisplay";
import { TableDisplay } from "./TableDisplay";
import { ElementRenderer } from "./element-renderers/ElementRenderer";

interface CanvasElementWrapperProps {
  element: Element;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export const CanvasElementWrapper: React.FC<CanvasElementWrapperProps> = ({
  element,
  isSelected,
  onClick,
}) => {
  // Set up drag functionality for the element
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-element',
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`absolute border-2 ${
        isSelected ? 'border-blue-500' : 'border-transparent'
      } cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        backgroundColor: element.properties?.backgroundColor || 'transparent',
      }}
      onClick={() => onClick(element.id)}
    >
      <ElementRenderer element={element} />
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};
