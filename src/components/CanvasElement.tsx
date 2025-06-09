
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { ElementRenderer } from "./element-renderers/ElementRenderer";
import { ElementInteraction } from "./ElementInteraction";
import { Element } from "@/types/wireframe";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const { removeElement } = useWireframe();
  
  const handleDelete = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeElement(element.id);
      toast.success(`${element.type} removed`);
    }
  };
  
  return (
    <ElementInteraction 
      element={element}
      isSelected={isSelected} 
      onDoubleClick={() => {}} // Remove double-click functionality
    >
      <div className="h-full w-full" onKeyDown={handleDelete}>
        <ElementRenderer element={element} isEditable={isSelected && element.type === 'simple-table'} />
      </div>
    </ElementInteraction>
  );
}
