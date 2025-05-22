
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
    case 'simple-table':
      return <TableDisplay element={element} isEditable={isEditable} />;
    case 'gauge-chart':
      return <GaugeChartRenderer properties={element.properties} />;
    default:
      return <DefaultRenderer type={element.type} />;
  }
}
