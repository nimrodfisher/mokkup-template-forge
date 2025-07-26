
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
    <DndProvider backend={HTML5Backend}>
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
                  className="fixed top-16 left-2 z-40 bg-white shadow-md"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
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
                      className="fixed bottom-4 right-2 z-40 bg-white shadow-md"
                    >
                      <Layers className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0 w-80">
                    <PropertiesPanel updateElementProperties={updateElementProperties} />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
          
          {/* Preview Button - only show for view-only users */}
          {isViewOnly && (
            <Button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`fixed z-50 bg-primary hover:bg-primary/90 text-white ${
                isMobile ? 'top-16 right-16' : 'top-4 right-4'
              }`}
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
          <div className={`fixed bg-yellow-100 border border-yellow-400 rounded-lg p-3 ${
            isMobile ? 'bottom-2 left-2 right-2 text-center' : 'bottom-4 right-4'
          }`}>
            <p className="text-sm text-yellow-800">
              You have {userRole === 'viewer' ? 'view-only' : userRole} access to this project
            </p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
