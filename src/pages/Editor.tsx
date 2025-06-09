import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/sidebar";
import { Canvas } from "@/components/Canvas";
import { Navbar } from "@/components/Navbar";
import { useWireframe } from "@/hooks/useWireframe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScreenTabs } from "@/components/ScreenTabs";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { toast } from "sonner";
import { HeaderStyleDialog } from "@/components/header-style/HeaderStyleDialog";
import { ImageStyleDialog } from "@/components/ImageStyleDialog";
import { ShapeStyleDialog } from "@/components/ShapeStyleDialog";
import { FilterStyleDialog } from "@/components/FilterStyleDialog";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { ChartStyleDialog } from "@/components/ChartStyleDialog";
import { AreaChartStyleDialog } from "@/components/AreaChartStyleDialog";
import { TableStyleDialog } from "@/components/table-style/TableStyleDialog";
import { GaugeStyleDialog } from "@/components/GaugeStyleDialog";
import { HeatmapStyleDialog } from "@/components/heatmap-style/HeatmapStyleDialog";
import { QuadrantStyleDialog } from "@/components/quadrant-style/QuadrantStyleDialog";
import { ScatterPlotStyleDialog } from "@/components/scatter-plot-style/ScatterPlotStyleDialog";
import { GeomapStyleDialog } from "@/components/geomap-style/GeomapStyleDialog";
import { ColumnChartStyleDialog } from "@/components/column-chart-style/ColumnChartStyleDialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WaterfallStyleDialog } from "@/components/waterfall-style/WaterfallStyleDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const Editor = () => {
  const params = useParams();
  const templateId = params?.templateId;
  const isMobile = useIsMobile();
  
  const { 
    loadTemplate, 
    showProperties, 
    selectedElementId, 
    elements, 
    updateElementProperties, 
    fetchTemplates 
  } = useWireframe();
  
  const [showHeaderStyleDialog, setShowHeaderStyleDialog] = useState(false);
  const [showImageStyleDialog, setShowImageStyleDialog] = useState(false);
  const [showShapeStyleDialog, setShowShapeStyleDialog] = useState(false);
  const [showFilterStyleDialog, setShowFilterStyleDialog] = useState(false);
  const [showChartStyleDialog, setShowChartStyleDialog] = useState(false);
  const [showAreaChartStyleDialog, setShowAreaChartStyleDialog] = useState(false);
  const [showTableStyleDialog, setShowTableStyleDialog] = useState(false);
  const [showGaugeStyleDialog, setShowGaugeStyleDialog] = useState(false);
  const [showHeatmapStyleDialog, setShowHeatmapStyleDialog] = useState(false);
  const [showQuadrantStyleDialog, setShowQuadrantStyleDialog] = useState(false);
  const [showScatterPlotStyleDialog, setShowScatterPlotStyleDialog] = useState(false);
  const [showGeomapStyleDialog, setShowGeomapStyleDialog] = useState(false);
  const [showWaterfallStyleDialog, setShowWaterfallStyleDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  useEffect(() => {
    // Fetch all templates when the component mounts
    fetchTemplates().catch(error => {
      console.error("Error fetching templates:", error);
    });
  }, [fetchTemplates]);
  
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId).then(() => {
        toast.success("Template loaded successfully!");
      }).catch(error => {
        console.error("Error loading template:", error);
        toast.error("Failed to load template");
      });
    }
  }, [templateId, loadTemplate]);
  
  // Get the selected element
  const selectedElement = selectedElementId 
    ? elements.find(element => element.id === selectedElementId) 
    : null;
  
  // Show style dialog based on the element type
  const handleOpenStyleDialog = () => {
    if (selectedElement?.type === 'header') {
      console.log("Opening header style dialog");
      setShowHeaderStyleDialog(true);
    } else if (selectedElement?.type === 'image') {
      setShowImageStyleDialog(true);
    } else if (selectedElement?.type === 'shapes') {
      setShowShapeStyleDialog(true);
    } else if (selectedElement?.type === 'filter') {
      setShowFilterStyleDialog(true);
    } else if (selectedElement?.type === 'bar-chart' || selectedElement?.type === 'column-chart') {
      setShowChartStyleDialog(true);
    } else if (selectedElement?.type === 'area-chart') {
      setShowAreaChartStyleDialog(true);
    } else if (selectedElement?.type === 'simple-table') {
      setShowTableStyleDialog(true);
    } else if (selectedElement?.type === 'gauge-chart') {
      setShowGaugeStyleDialog(true);
    } else if (selectedElement?.type === 'heatmap') {
      setShowHeatmapStyleDialog(true);
    } else if (selectedElement?.type === 'quadrant-chart') {
      setShowQuadrantStyleDialog(true);
    } else if (selectedElement?.type === 'scatter-plot') {
      setShowScatterPlotStyleDialog(true);
    } else if (selectedElement?.type === 'geomap') {
      setShowGeomapStyleDialog(true);
    } else if (selectedElement?.type === 'waterfall') {
      setShowWaterfallStyleDialog(true);
    }
  };

  // Function to handle save action
  const handleSaveAction = () => {
    setShowSaveDialog(true);
  };
  
  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen bg-background">
          <Navbar onSave={handleSaveAction} />
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar - hidden on mobile, shown on larger screens */}
            <div className={`${isMobile ? 'hidden' : 'block'}`}>
              <Sidebar />
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <ScreenTabs />
              <div className="flex-1 flex overflow-hidden">
                <Canvas />
                
                {/* Properties Panel - responsive positioning */}
                {showProperties && selectedElementId && (
                  <div className={`
                    ${isMobile 
                      ? 'fixed inset-x-0 bottom-0 h-80 z-50 bg-background border-t' 
                      : 'relative'
                    }
                  `}>
                    <PropertiesPanel 
                      onOpenStyleDialog={handleOpenStyleDialog} 
                      updateElementProperties={updateElementProperties}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Header Style Dialog */}
          {selectedElementId && selectedElement?.type === 'header' && (
            <HeaderStyleDialog 
              elementId={selectedElementId} 
              isOpen={showHeaderStyleDialog}
              onClose={() => setShowHeaderStyleDialog(false)}
            />
          )}
          
          {/* Image Style Dialog */}
          {selectedElementId && selectedElement?.type === 'image' && (
            <ImageStyleDialog 
              elementId={selectedElementId} 
              open={showImageStyleDialog}
              onClose={() => setShowImageStyleDialog(false)}
            />
          )}
          
          {/* Shape Style Dialog */}
          {selectedElementId && selectedElement?.type === 'shapes' && (
            <ShapeStyleDialog 
              elementId={selectedElementId} 
              isOpen={showShapeStyleDialog}
              onClose={() => setShowShapeStyleDialog(false)}
            />
          )}
          
          {/* Filter Style Dialog */}
          {selectedElementId && selectedElement?.type === 'filter' && (
            <FilterStyleDialog 
              elementId={selectedElementId} 
              open={showFilterStyleDialog}
              onClose={() => setShowFilterStyleDialog(false)}
            />
          )}
          
          {/* Chart Style Dialog */}
          {selectedElementId && (selectedElement?.type === 'bar-chart' || selectedElement?.type === 'column-chart') && (
            <ChartStyleDialog 
              elementId={selectedElementId} 
              open={showChartStyleDialog}
              onClose={() => setShowChartStyleDialog(false)}
            />
          )}

          {/* Area Chart Style Dialog */}
          {selectedElementId && selectedElement?.type === 'area-chart' && (
            <AreaChartStyleDialog 
              elementId={selectedElementId} 
              open={showAreaChartStyleDialog}
              onClose={() => setShowAreaChartStyleDialog(false)}
            />
          )}
          
          {/* Table Style Dialog */}
          {selectedElementId && selectedElement?.type === 'simple-table' && (
            <TableStyleDialog 
              elementId={selectedElementId} 
              open={showTableStyleDialog}
              onClose={() => setShowTableStyleDialog(false)}
            />
          )}
          
          {/* Gauge Style Dialog */}
          {selectedElementId && selectedElement?.type === 'gauge-chart' && (
            <GaugeStyleDialog 
              elementId={selectedElementId} 
              open={showGaugeStyleDialog}
              onClose={() => setShowGaugeStyleDialog(false)}
            />
          )}
          
          {/* Heatmap Style Dialog */}
          {selectedElementId && selectedElement?.type === 'heatmap' && (
            <HeatmapStyleDialog 
              elementId={selectedElementId} 
              open={showHeatmapStyleDialog}
              onClose={() => setShowHeatmapStyleDialog(false)}
            />
          )}

          {/* Quadrant Style Dialog */}
          {selectedElementId && selectedElement?.type === 'quadrant-chart' && (
            <QuadrantStyleDialog 
              elementId={selectedElementId} 
              open={showQuadrantStyleDialog}
              onClose={() => setShowQuadrantStyleDialog(false)}
            />
          )}

          {/* Scatter Plot Style Dialog */}
          {selectedElementId && selectedElement?.type === 'scatter-plot' && (
            <ScatterPlotStyleDialog 
              elementId={selectedElementId} 
              open={showScatterPlotStyleDialog}
              onClose={() => setShowScatterPlotStyleDialog(false)}
            />
          )}

          {/* Geomap Style Dialog */}
          {selectedElementId && selectedElement?.type === 'geomap' && (
            <GeomapStyleDialog 
              elementId={selectedElementId} 
              open={showGeomapStyleDialog}
              onClose={() => setShowGeomapStyleDialog(false)}
            />
          )}

          {/* Waterfall Style Dialog */}
          {selectedElementId && selectedElement?.type === 'waterfall' && (
            <WaterfallStyleDialog 
              elementId={selectedElementId} 
              open={showWaterfallStyleDialog}
              onClose={() => setShowWaterfallStyleDialog(false)}
            />
          )}

          {/* Save Template Dialog */}
          <SaveTemplateDialog 
            open={showSaveDialog}
            onOpenChange={setShowSaveDialog}
          />
        </div>
      </DndProvider>
    </TooltipProvider>
  );
};

export default Editor;
