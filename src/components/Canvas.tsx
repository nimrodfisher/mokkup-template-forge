
import React from 'react';
import { useWireframe } from '@/hooks/useWireframe';
import { HeaderRenderer } from '@/components/element-renderers/HeaderRenderer';
import { ImageRenderer } from '@/components/element-renderers/ImageRenderer';
import { ButtonRenderer } from '@/components/element-renderers/ButtonRenderer';
import { TextboxRenderer } from '@/components/element-renderers/TextboxRenderer';
import { ChartRenderer } from '@/components/element-renderers/ChartRenderer';
import { ColumnChartRenderer } from '@/components/element-renderers/ColumnChartRenderer';
import { PieChartRenderer } from '@/components/element-renderers/PieChartRenderer';
import { WaterfallRenderer } from './element-renderers/WaterfallRenderer';
import { ElementRenderer } from './element-renderers/ElementRenderer';

export const Canvas = () => {
  const { elements, selectedElementId, updateElement, removeElement, updateElementProperties, screens } = useWireframe();

  const activeScreen = screens.find(screen => screen.isActive);
  const screenId = activeScreen ? activeScreen.id : screens[0].id;

  const visibleElements = elements.filter(element => element.screenId === screenId);

  return (
    <div className="flex-1 relative bg-gray-100 overflow-auto">
      {visibleElements.map(element => (
        <div
          key={element.id}
          className={`absolute top-0 left-0 transition-all duration-200 ${selectedElementId === element.id ? 'z-10 shadow-lg' : 'z-0'}`}
          style={{
            transform: `translate(${element.position.x}px, ${element.position.y}px)`,
            width: element.size.width,
            height: element.size.height,
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {element.type === 'header' && (
            <HeaderRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'image' && (
            <ImageRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'button' && (
            <ButtonRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'textbox' && (
            <TextboxRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'bar-chart' && (
            <ChartRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'column-chart' && (
            <ColumnChartRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'pie-chart' && (
            <PieChartRenderer
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'waterfall' && (
            <WaterfallRenderer 
              properties={element.properties}
              isSelected={selectedElementId === element.id}
              onUpdate={(properties) => updateElementProperties(element.id, properties)}
              onRemove={() => removeElement(element.id)}
            />
          )}
          {/* For all other element types, use the generic ElementRenderer */}
          {!['header', 'image', 'button', 'textbox', 'bar-chart', 'column-chart', 'pie-chart', 'waterfall'].includes(element.type) && (
            <ElementRenderer element={element} />
          )}
        </div>
      ))}
    </div>
  );
};
