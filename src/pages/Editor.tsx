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
import { Toaster } from "sonner";
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
import { TooltipProvider } from "@/components/ui/tooltip";

const Editor = () => {
  const { templateId } = useParams();
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
    }
  };

  // Function to handle save action
  const handleSaveAction = () => {
    setShowSaveDialog(true);
  };
  
  return (
    <TooltipProvider>
      {/* Make sure we only have ONE DndProvider in the entire app */}
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen bg-white">
          <Navbar onSave={handleSaveAction} />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <ScreenTabs />
              <div className="flex-1 flex overflow-hidden">
                <Canvas />
                {showProperties && selectedElementId && 
                  <PropertiesPanel 
                    onOpenStyleDialog={handleOpenStyleDialog} 
                    updateElementProperties={updateElementProperties}
                  />
                }
              </div>
            </div>
          </div>
          <Toaster position="top-right" richColors />
          
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
