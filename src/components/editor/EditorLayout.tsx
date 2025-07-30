
import { ReactNode, useState } from "react";
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/sidebar";
import { ScreenTabs } from "@/components/ScreenTabs";
import { Canvas } from "@/components/Canvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { StyleDialogController } from "@/components/StyleDialogController";
import { useWireframe } from "@/hooks/useWireframe";
import { UserRole } from "@/hooks/useProjectPermissions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Eye, X, Menu, Layers } from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const isViewOnly = userRole === 'viewer';
  const isMobile = useIsMobile();

  return (
    <DndProvider options={HTML5toTouch}>
      <div className="h-screen flex flex-col bg-gray-50">
        {!isPreviewMode && <Navbar projectId={projectId} canShare={canShare} />}
        
        <div className="flex-1 flex overflow-hidden relative">
          {/* Desktop Sidebar */}
          {!isPreviewMode && !isMobile && <Sidebar />}
          
          {/* Mobile Sidebar Sheet */}
          {!isPreviewMode && isMobile && (
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="fixed top-4 left-2 z-50 bg-white shadow-lg border"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 max-w-[85vw]">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          
          <div className="flex-1 flex flex-col">
            {!isPreviewMode && <ScreenTabs />}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <Canvas isPreviewMode={isPreviewMode} />
              </div>
              
              {/* Desktop Properties Panel */}
              {showProperties && !isPreviewMode && !isMobile && (
                <div className="w-80 border-l bg-white overflow-y-auto">
                  <PropertiesPanel updateElementProperties={updateElementProperties} />
                </div>
              )}
              
              {/* Mobile Properties Panel Sheet */}
              {showProperties && !isPreviewMode && isMobile && (
                <Sheet open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="fixed bottom-20 right-2 z-50 bg-white shadow-lg border"
                    >
                      <Layers className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 w-80 max-w-[90vw]">
                    <PropertiesPanel updateElementProperties={updateElementProperties} />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
          
        </div>

        <StyleDialogController element={null} dialogType={null} onClose={() => {}} />
        
        {!hasPermission && (
          <div className={`fixed bg-yellow-100 border border-yellow-400 rounded-lg p-2 ${
            isMobile ? 'bottom-2 left-2 right-2 text-center text-xs' : 'bottom-4 right-4 p-3'
          }`}>
            <p className={`text-yellow-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              You have {userRole === 'viewer' ? 'view-only' : userRole} access to this project
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
