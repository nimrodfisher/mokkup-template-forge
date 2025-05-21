import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";
import { Navbar } from "@/components/Navbar";
import { useWireframe } from "@/hooks/useWireframe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScreenTabs } from "@/components/ScreenTabs";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { HeaderStyleDialog } from "@/components/HeaderStyleDialog";
import { ImageStyleDialog } from "@/components/ImageStyleDialog";
import { ShapeStyleDialog } from "@/components/ShapeStyleDialog";
import { FilterStyleDialog } from "@/components/FilterStyleDialog";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { ChartStyleDialog } from "@/components/ChartStyleDialog";

const Editor = () => {
  const { templateId } = useParams();
  const { loadTemplate, showProperties, selectedElementId, elements } = useWireframe();
  const [showHeaderStyleDialog, setShowHeaderStyleDialog] = useState(false);
  const [showImageStyleDialog, setShowImageStyleDialog] = useState(false);
  const [showShapeStyleDialog, setShowShapeStyleDialog] = useState(false);
  const [showFilterStyleDialog, setShowFilterStyleDialog] = useState(false);
  const [showChartStyleDialog, setShowChartStyleDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
      toast.success("Template loaded successfully!");
    }
  }, [templateId, loadTemplate]);
  
  // Get the selected element
  const selectedElement = selectedElementId 
    ? elements.find(element => element.id === selectedElementId) 
    : null;
  
  // Show style dialog based on the element type
  const handleOpenStyleDialog = () => {
    if (selectedElement?.type === 'header') {
      setShowHeaderStyleDialog(true);
    } else if (selectedElement?.type === 'image') {
      setShowImageStyleDialog(true);
    } else if (selectedElement?.type === 'shapes') {
      setShowShapeStyleDialog(true);
    } else if (selectedElement?.type === 'filter') {
      setShowFilterStyleDialog(true);
    } else if (selectedElement?.type === 'bar-chart' || selectedElement?.type === 'column-chart') {
      setShowChartStyleDialog(true);
    }
  };

  // Function to handle save action
  const handleSaveAction = () => {
    setShowSaveDialog(true);
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-white">
        <Navbar onSave={handleSaveAction} />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScreenTabs />
            <div className="flex-1 flex overflow-hidden">
              <Canvas />
              {showProperties && selectedElementId && <PropertiesPanel onOpenStyleDialog={handleOpenStyleDialog} />}
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

        {/* Save Template Dialog */}
        <SaveTemplateDialog 
          open={showSaveDialog}
          onOpenChange={setShowSaveDialog}
        />
      </div>
    </DndProvider>
  );
};

export default Editor;
