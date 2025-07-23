import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useWireframe } from '@/hooks/useWireframe';
import { useProjectComments } from '@/hooks/useProjectComments';
import { ElementRenderer } from './element-renderers/ElementRenderer';
import { ElementInteraction } from './ElementInteraction';
import { CommentBadge } from './comments/CommentBadge';
import { CommentDialog } from './comments/CommentDialog';
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
  const { getCommentCount } = useProjectComments(projectId || '');
  const commentCount = getCommentCount(element.id);
  const { removeElement } = useWireframe();

  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(element.id);
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
    >
      <div className="relative w-full h-full group">
        <ElementRenderer element={element} isEditable={true} />
        {isSelected && (
          <ElementInteraction 
            element={element}
            isSelected={isSelected}
            onDoubleClick={() => {}}
          >
            <div className="w-full h-full" />
          </ElementInteraction>
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
          />
        )}
      </div>
    </div>
  );
}