
import React from "react";
import { useDrag } from "react-dnd";
import { Element } from "@/types/wireframe";
import { AreaChartDisplay } from "./AreaChartDisplay";

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

  // Render different component based on element type
  const renderElementContent = () => {
    switch (element.type) {
      case 'area-chart':
        return <AreaChartDisplay element={element} />;
      default:
        return <div className="flex items-center justify-center h-full">{element.type}</div>;
    }
  };

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
      {renderElementContent()}
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};
