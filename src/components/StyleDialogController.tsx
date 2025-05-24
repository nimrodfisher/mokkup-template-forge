
import React from 'react';
import { Element } from "@/types/wireframe";
import { FilterStyleDialog } from "./FilterStyleDialog";
import { KpiStyleDialog } from "./KpiStyleDialog";
import { ButtonStyleDialog } from "./ButtonStyleDialog";
import { TextboxStyleDialog } from "./TextboxStyleDialog";
import { ShapeStyleDialog } from "./ShapeStyleDialog";
import { ImageStyleDialog } from "./ImageStyleDialog";
import { HeaderStyleDialog } from "./header-style/HeaderStyleDialog";
import { ChartStyleDialog } from "./ChartStyleDialog";
import { TableStyleDialog } from "./table-style/TableStyleDialog";
import { GaugeStyleDialog } from "./GaugeStyleDialog";
import { HeatmapStyleDialog } from "./heatmap-style/HeatmapStyleDialog";
import { QuadrantStyleDialog } from "./quadrant-style/QuadrantStyleDialog";
import { ScatterPlotStyleDialog } from "./scatter-plot-style/ScatterPlotStyleDialog";

interface StyleDialogControllerProps {
  element: Element;
  dialogType: string | null;
  onClose: () => void;
}

export function StyleDialogController({ element, dialogType, onClose }: StyleDialogControllerProps) {
  if (!dialogType) return null;
  
  switch (dialogType) {
    case 'filter':
      return (
        <FilterStyleDialog 
          elementId={element.id} 
          open={true} 
          onClose={onClose}
        />
      );
      
    case 'kpi':
      return (
        <KpiStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'button':
      return (
        <ButtonStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'textbox':
      return (
        <TextboxStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'image':
      return (
        <ImageStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'shapes':
      return (
        <ShapeStyleDialog
          elementId={element.id}
          isOpen={true}
          onClose={onClose}
        />
      );
      
    case 'header':
      return (
        <HeaderStyleDialog 
          elementId={element.id} 
          isOpen={true}
          onClose={onClose}
        />
      );
      
    case 'chart':
      return (
        <ChartStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'table':
      return (
        <TableStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'gauge':
      return (
        <GaugeStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'heatmap':
      return (
        <HeatmapStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'quadrant':
      return (
        <QuadrantStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    case 'scatter-plot':
      return (
        <ScatterPlotStyleDialog
          elementId={element.id}
          open={true}
          onClose={onClose}
        />
      );
      
    default:
      return null;
  }
}
