import React from 'react';
import { useWireframe } from '@/hooks/useWireframe';
import { HeaderRenderer } from '@/components/element-renderers/HeaderRenderer';
import { ImageRenderer } from '@/components/element-renderers/ImageRenderer';
import { ShapesRenderer } from '@/components/element-renderers/ShapesRenderer';
import { FilterRenderer } from '@/components/element-renderers/FilterRenderer';
import { KpiRenderer } from '@/components/element-renderers/KpiRenderer';
import { ButtonRenderer } from '@/components/element-renderers/ButtonRenderer';
import { TextboxRenderer } from '@/components/element-renderers/TextboxRenderer';
import { ChartRenderer } from '@/components/element-renderers/ChartRenderer';
import { AreaChartRenderer } from '@/components/element-renderers/AreaChartRenderer';
import { TableRenderer } from '@/components/element-renderers/TableRenderer';
import { GaugeRenderer } from '@/components/element-renderers/GaugeRenderer';
import { HeatmapRenderer } from '@/components/element-renderers/HeatmapRenderer';
import { QuadrantRenderer } from '@/components/element-renderers/QuadrantRenderer';
import { ScatterPlotRenderer } from '@/components/element-renderers/ScatterPlotRenderer';
import { GeomapRenderer } from '@/components/element-renderers/GeomapRenderer';
import { ColumnChartRenderer } from '@/components/element-renderers/ColumnChartRenderer';
import { PieChartRenderer } from '@/components/element-renderers/PieChartRenderer';
import { WaterfallRenderer } from './element-renderers/WaterfallRenderer';

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
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'image' && (
            <ImageRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'shapes' && (
            <ShapesRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'filter' && (
            <FilterRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'kpi' && (
            <KpiRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'button' && (
            <ButtonRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'textbox' && (
            <TextboxRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'bar-chart' && (
            <ChartRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'column-chart' && (
            <ColumnChartRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'area-chart' && (
            <AreaChartRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'simple-table' && (
            <TableRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'gauge-chart' && (
            <GaugeRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'heatmap' && (
            <HeatmapRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'quadrant-chart' && (
            <QuadrantRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'scatter-plot' && (
            <ScatterPlotRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
          {element.type === 'geomap' && (
            <GeomapRenderer
              id={element.id}
              properties={element.properties}
              onResize={(width, height) => updateElement(element.id, { size: { width, height } })}
            />
          )}
           {element.type === 'pie-chart' && (
            <PieChartRenderer
              id={element.id}
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
        </div>
      ))}
    </div>
  );
};
