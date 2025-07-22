
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Loader2, FolderOpen, Users, UserCheck, Trash2, Settings, LogOut, Plus } from 'lucide-react';
import { CreateProjectDialog } from '@/components/dashboard/CreateProjectDialog';
import { EmptyProjectsState } from '@/components/dashboard/EmptyProjectsState';
import { ProjectGrid } from '@/components/dashboard/ProjectGrid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { projects, loading } = useProjects();
  const { signOut } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">A</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">Alignify</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground">
              <FolderOpen className="h-4 w-4" />
              <span className="text-sm font-medium">My Projects</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
              <Users className="h-4 w-4" />
              <span className="text-sm">Templates</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm">Workspaces</span>
              <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">0</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Trash</span>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div 
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">R</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">M</span>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create New
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="shared">Shared Projects</TabsTrigger>
              <TabsTrigger value="trash">Trash</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-lg">Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-20">
                  <h2 className="text-2xl font-semibold mb-2">No Projects</h2>
                  <p className="text-muted-foreground mb-6">Add A New Project</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create New
                  </Button>
                </div>
              ) : (
                <ProjectGrid projects={projects} />
              )}
            </TabsContent>
            
            <TabsContent value="shared" className="mt-6">
              <ProjectGrid projects={projects} />
            </TabsContent>
            
            <TabsContent value="trash" className="mt-6">
              <div className="text-center py-20">
                <Trash2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Trash is empty</h3>
                <p className="text-muted-foreground">Deleted projects will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateProjectDialog 
        isOpen={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
