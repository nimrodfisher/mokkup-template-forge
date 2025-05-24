
import { useState } from "react";
import { useWireframe } from "@/hooks/useWireframe";
import { toast } from "sonner";
import { ElementRenderer } from "./element-renderers/ElementRenderer";
import { ElementInteraction } from "./ElementInteraction";
import { StyleDialogController } from "./StyleDialogController";
import { Element } from "@/types/wireframe";

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
}

export function CanvasElement({ element, isSelected }: CanvasElementProps) {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const { removeElement } = useWireframe();
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch (element.type) {
      case 'filter':
        setActiveDialog('filter');
        break;
      case 'kpi':
        setActiveDialog('kpi');
        break;
      case 'button':
        setActiveDialog('button');
        break;
      case 'textbox':
        setActiveDialog('textbox');
        break;
      case 'image':
        setActiveDialog('image');
        break;
      case 'shapes':
        setActiveDialog('shapes');
        break;
      case 'header':
        setActiveDialog('header');
        break;
      case 'bar-chart':
      case 'column-chart':
        setActiveDialog('chart');
        break;
      case 'simple-table':
        setActiveDialog('table');
        break;
      case 'gauge-chart':
        setActiveDialog('gauge');
        break;
      case 'heatmap':
        setActiveDialog('heatmap');
        break;
      case 'quadrant-chart':
        setActiveDialog('quadrant');
        break;
      case 'scatter-plot':
        setActiveDialog('scatter-plot');
        break;
    }
  };
  
  const handleDialogClose = () => {
    setActiveDialog(null);
  };
  
  const handleDelete = (e: React.KeyboardEvent) => {
    if (isSelected && e.key === 'Delete') {
      removeElement(element.id);
      toast.success(`${element.type} removed`);
    }
  };
  
  return (
    <>
      <ElementInteraction 
        element={element}
        isSelected={isSelected} 
        onDoubleClick={handleDoubleClick}
      >
        <div className="h-full w-full" onKeyDown={handleDelete}>
          <ElementRenderer element={element} isEditable={isSelected && element.type === 'simple-table'} />
        </div>
      </ElementInteraction>
      
      <StyleDialogController 
        element={element}
        dialogType={activeDialog}
        onClose={handleDialogClose}
      />
    </>
  );
}
