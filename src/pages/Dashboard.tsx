
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreVertical, Users, Calendar, Loader2, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { CanvasElement } from '@/components/CanvasElement';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { projects, loading, createProject, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!name?.trim()) {
      return;
    }

    try {
      setIsCreating(true);
      console.log('Starting project creation...');
      
      const newProject = await createProject(name.trim(), description?.trim());
      
      console.log('Project created, navigating to editor...');
      setIsCreateDialogOpen(false);
      navigate(`/editor/${newProject.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      // Error is already handled in the hook with toast
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const getProjectRole = (project: any) => {
    if (project.owner_id === user?.id) return 'Owner';
    
    // Simplified role checking since we removed the complex query
    return 'Viewer';
  };

  // Function to get elements for a specific project
  const getProjectElements = (project: any) => {
    if (!project.elements || !project.screens) return [];
    
    // Get the first screen's ID
    const firstScreenId = project.screens[0]?.id;
    if (!firstScreenId) return [];
    
    // Return elements for the first screen
    return project.elements.filter((element: any) => element.screenId === firstScreenId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600">Alignify</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.user_metadata?.first_name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Projects</h1>
            <p className="text-gray-600 mt-2">Create and manage your wireframe projects</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" disabled={isCreating}>
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter project name"
                    required
                    disabled={isCreating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your project"
                    rows={3}
                    disabled={isCreating}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Project'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Create your first wireframe project to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const projectElements = getProjectElements(project);
              return (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="truncate">{project.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getProjectRole(project) === 'Owner' ? 'default' : 'secondary'}>
                            {getProjectRole(project)}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            1
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/editor/${project.id}`)}>
                            Open
                          </DropdownMenuItem>
                          {project.owner_id === user?.id && (
                            <>
                              <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/share`)}>
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Template Preview Section */}
                    <div className="aspect-video bg-white rounded-md border overflow-hidden mb-3 relative">
                      {projectElements.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-500">Empty project</span>
                        </div>
                      ) : (
                        <div className="relative w-full h-full" style={{ transform: "scale(0.33)", transformOrigin: "top left", width: "300%", height: "300%" }}>
                          {projectElements.map((element: any) => (
                            <CanvasElement
                              key={element.id}
                              element={element}
                              isSelected={false}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {project.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {format(new Date(project.updated_at), 'MMM d, yyyy')}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate(`/editor/${project.id}`)}
                      className="w-full"
                    >
                      Open Project
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
