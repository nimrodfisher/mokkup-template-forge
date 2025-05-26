
import React from 'react';
import { useWireframe } from '@/hooks/useWireframe';
import { CanvasElement } from './CanvasElement';

export const Canvas = () => {
  const { elements, selectedElementId, selectElement, screens } = useWireframe();

  const activeScreen = screens.find(screen => screen.isActive);
  const screenId = activeScreen ? activeScreen.id : screens[0].id;

  const visibleElements = elements.filter(element => element.screenId === screenId);

  const handleCanvasClick = () => {
    selectElement(null);
  };

  return (
    <div 
      className="flex-1 relative bg-gray-100 overflow-auto" 
      onClick={handleCanvasClick}
    >
      {visibleElements.map(element => (
        <CanvasElement
          key={element.id}
          element={element}
          isSelected={selectedElementId === element.id}
        />
      ))}
    </div>
  );
};
