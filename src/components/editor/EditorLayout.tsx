
import { ReactNode } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { ScreenTabs } from "@/components/ScreenTabs";
import { Canvas } from "@/components/Canvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { StyleDialogController } from "@/components/StyleDialogController";
import { useWireframe } from "@/hooks/useWireframe";
import { UserRole } from "@/hooks/useProjectPermissions";

interface EditorLayoutProps {
  hasPermission: boolean;
  canShare: boolean;
  projectId?: string;
  userRole: UserRole;
  updateElementProperties: (id: string, properties: any) => void;
}

export function EditorLayout({ hasPermission, canShare, projectId, userRole, updateElementProperties }: EditorLayoutProps) {
  const { showProperties } = useWireframe();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <Navbar projectId={projectId} canShare={canShare} />
        
        <div className="flex-1 flex overflow-hidden relative">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <ScreenTabs />
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Canvas />
              </div>
            </div>
          </div>
        </div>

        <StyleDialogController element={null} dialogType={null} onClose={() => {}} />
        
        {!hasPermission && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              You have {userRole === 'viewer' ? 'view-only' : userRole} access to this project
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
