import React from 'react';
import { Element } from "@/types/wireframe";
import { HeaderRenderer } from "./HeaderRenderer";
import { ButtonRenderer } from "./ButtonRenderer";
import { TextboxRenderer } from "./TextboxRenderer";
import { ImageRenderer } from "./ImageRenderer";
import { FilterDisplay } from "../FilterDisplay";
import { KpiDisplay } from "../KpiDisplay";
import { ShapeDisplay } from "../ShapeDisplay";
import { DeleteRenderer } from "./DeleteRenderer";
import { ChartRenderer } from "./ChartRenderer";
import { TableDisplay } from "../TableDisplay";
import { DefaultRenderer } from "./DefaultRenderer";
import { GaugeChartRenderer } from "./GaugeChartRenderer";
import { HeatmapRenderer } from "./HeatmapRenderer";
import { QuadrantChartRenderer } from "./QuadrantChartRenderer";
import { ScatterPlotRenderer } from "./ScatterPlotRenderer";
import { GeomapRenderer } from "./GeomapRenderer";
import { PieChartRenderer } from "./PieChartRenderer";
import { WaterfallRenderer } from "./WaterfallRenderer";
import { DonutChartRenderer } from "./DonutChartRenderer";

interface ElementRendererProps {
  element: Element;
  isEditable?: boolean;
}

export function ElementRenderer({ element, isEditable = false }: ElementRendererProps) {
  switch (element.type) {
    case 'header':
      return <HeaderRenderer properties={element.properties} />;
    case 'button':
      return <ButtonRenderer properties={element.properties} />;
    case 'textbox':
      return <TextboxRenderer properties={element.properties} />;
    case 'image':
      return <ImageRenderer properties={element.properties} />;
    case 'filter':
      return <FilterDisplay element={element} />;
    case 'kpi':
      return <KpiDisplay element={element} />;
    case 'shapes':
      return <ShapeDisplay element={element} />;
    case 'delete':
      return <DeleteRenderer />;
    case 'bar-chart':
    case 'column-chart':
      return <ChartRenderer properties={element.properties} type={element.type} />;
    case 'pie-chart':
      return <PieChartRenderer properties={element.properties} />;
    case 'simple-table':
      return <TableDisplay element={element} isEditable={isEditable} />;
    case 'gauge-chart':
      return <GaugeChartRenderer properties={element.properties} />;
    case 'heatmap':
      return <HeatmapRenderer properties={element.properties} />;
    case 'quadrant-chart':
      return <QuadrantChartRenderer properties={element.properties} />;
    case 'scatter-plot':
      return <ScatterPlotRenderer properties={element.properties} />;
    case 'geomap':
      return <GeomapRenderer properties={element.properties} />;
    case 'waterfall':
      return <WaterfallRenderer properties={element.properties} />;
    case 'donut-chart':
      return <DonutChartRenderer properties={element.properties} />;
    default:
      return <DefaultRenderer type={element.type} />;
  }
}
