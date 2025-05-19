
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";
import { Navbar } from "@/components/Navbar";
import { useWireframe } from "@/hooks/useWireframe";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Editor = () => {
  const { templateId } = useParams();
  const { loadTemplate } = useWireframe();
  
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId, loadTemplate]);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <Canvas />
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
