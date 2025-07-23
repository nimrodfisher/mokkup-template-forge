import React from 'react';
import { ElementRenderer } from './element-renderers/ElementRenderer';
import type { Element } from '@/types/wireframe';

interface PreviewElementProps {
  element: Element;
}

export function PreviewElement({ element }: PreviewElementProps) {
  return (
    <div
      className="absolute"
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: 1,
      }}
    >
      <ElementRenderer element={element} isEditable={false} />
    </div>
  );
}