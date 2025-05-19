
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";
import { Navbar } from "@/components/Navbar";
import { useWireframe } from "@/hooks/useWireframe";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScreenTabs } from "@/components/ScreenTabs";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { toast } from "sonner";
import { Toaster } from "sonner";

const Editor = () => {
  const { templateId } = useParams();
  const { loadTemplate, showProperties, selectedElementId } = useWireframe();
  
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
      toast.success("Template loaded successfully!");
    }
  }, [templateId, loadTemplate]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScreenTabs />
            <div className="flex-1 flex overflow-hidden">
              <Canvas />
              {showProperties && selectedElementId && <PropertiesPanel />}
            </div>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </div>
    </DndProvider>
  );
};

export default Editor;
