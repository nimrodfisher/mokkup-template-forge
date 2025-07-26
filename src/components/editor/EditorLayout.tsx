
import { ReactNode, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";

interface EditorLayoutProps {
  hasPermission: boolean;
  canShare: boolean;
  projectId?: string;
  userRole: UserRole;
  updateElementProperties: (id: string, properties: any) => void;
}

export function EditorLayout({ hasPermission, canShare, projectId, userRole, updateElementProperties }: EditorLayoutProps) {
  const { showProperties } = useWireframe();
  const [isPreviewMode, setIsPreviewMode] = useState(userRole === 'viewer');
  const isViewOnly = userRole === 'viewer';

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {!isPreviewMode && <Navbar projectId={projectId} canShare={canShare} />}
        
        <div className="flex-1 flex overflow-hidden relative">
          {!isPreviewMode && <Sidebar />}
          
          <div className="flex-1 flex flex-col">
            {!isPreviewMode && <ScreenTabs />}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Canvas isPreviewMode={isPreviewMode} />
              </div>
              {showProperties && !isPreviewMode && (
                <div className="w-80 border-l bg-white overflow-y-auto">
                  <PropertiesPanel updateElementProperties={updateElementProperties} />
                </div>
              )}
            </div>
          </div>
          
          {/* Preview Button - only show for view-only users */}
          {isViewOnly && (
            <Button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="fixed top-4 right-4 z-50 bg-primary hover:bg-primary/90 text-white"
              size="sm"
            >
              {isPreviewMode ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Exit Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          )}
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
