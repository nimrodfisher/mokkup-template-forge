
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Copy, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { CanvasElement } from '@/components/CanvasElement';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { user } = useAuth();
  const { deleteProject } = useProjects();
  const navigate = useNavigate();

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const getProjectElements = (project: Project) => {
    if (!project.elements || !project.screens) return [];
    
    const firstScreenId = project.screens[0]?.id;
    if (!firstScreenId) return [];
    
    return project.elements.filter((element: any) => element.screenId === firstScreenId);
  };

  const projectElements = getProjectElements(project);

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
      onClick={() => navigate(`/editor/${project.id}`)}
    >
      <CardContent className="p-0">
        {/* Project Thumbnail */}
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
          {projectElements.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Empty project</span>
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
          
          {/* Action buttons overlay */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="secondary"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                // Handle copy/duplicate
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${project.id}/share`);
              }}
            >
              <Share2 className="h-3 w-3" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="h-7 w-7 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3 w-3" />
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
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="p-4">
          <h3 className="font-medium text-sm mb-1 truncate">{project.name}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {project.owner_id === user?.id ? 'Owner' : 'Shared'}
            </span>
            <span>
              {format(new Date(project.updated_at), 'MMM d')} ago
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
