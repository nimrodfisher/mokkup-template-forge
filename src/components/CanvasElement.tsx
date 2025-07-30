import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useWireframe } from '@/hooks/useWireframe';
import { useProjectComments } from '@/hooks/useProjectComments';
import { ElementRenderer } from './element-renderers/ElementRenderer';
import { ElementInteraction } from './ElementInteraction';
import { CommentBadge } from './comments/CommentBadge';
import { CommentDialog } from './comments/CommentDialog';
import { StyleDialogController } from './StyleDialogController';
import { useParams } from 'react-router-dom';
import type { Element } from '@/types/wireframe';

interface CanvasElementProps {
  element: Element;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export function CanvasElement({ element, onSelect, isSelected }: CanvasElementProps) {
  const { id: projectId } = useParams();
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [styleDialogOpen, setStyleDialogOpen] = useState<string | null>(null);
  const { getCommentCount } = useProjectComments(projectId || '');
  const commentCount = getCommentCount(element.id);
  const { removeElement } = useWireframe();

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'element',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: 'move',
    },
  });

  // Completely hide the drag preview
  useEffect(() => {
    preview(getEmptyImage(), { 
      captureDraggingState: true,
      anchorX: 0,
      anchorY: 0 
    });
  }, [preview]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Map element types to dialog types for the StyleDialogController
    const dialogTypeMap: { [key: string]: string } = {
      'simple-table': 'table',
      'quadrant-chart': 'quadrant',
      'scatter-plot': 'scatter-plot',
      // Most element types match their dialog type directly
    };
    
    const dialogType = dialogTypeMap[element.type] || element.type;
    setStyleDialogOpen(dialogType);
  };

  return (
    <div
      ref={drag}
      className={`absolute cursor-pointer transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: 1,
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="relative w-full h-full group">
        {isSelected ? (
          <ElementInteraction 
            element={element}
            isSelected={isSelected}
            onDoubleClick={handleDoubleClick}
          >
            <ElementRenderer element={element} isEditable={true} />
          </ElementInteraction>
        ) : (
          <ElementRenderer element={element} isEditable={true} />
        )}
        
        {/* Comment Badge */}
        <CommentBadge 
          commentCount={commentCount}
          onClick={() => setCommentDialogOpen(true)}
        />
        
        {/* Comment Dialog */}
        {projectId && (
          <CommentDialog
            elementId={element.id}
            projectId={projectId}
            elementType={element.type}
            open={commentDialogOpen}
            onOpenChange={setCommentDialogOpen}
          />
        )}
        
        {/* Style Dialog Controller */}
        <StyleDialogController
          element={element}
          dialogType={styleDialogOpen}
          onClose={() => setStyleDialogOpen(null)}
        />
      </div>
    </div>
  );
}