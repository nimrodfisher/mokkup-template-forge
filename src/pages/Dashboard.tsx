
import { useState, useEffect } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useSearchParams } from 'react-router-dom';
import { Loader2, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { SearchHeader } from '@/components/dashboard/SearchHeader';
import { CreateProjectDialog } from '@/components/dashboard/CreateProjectDialog';
import { EmptyProjectsState } from '@/components/dashboard/EmptyProjectsState';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Pagination } from '@/components/dashboard/Pagination';

export default function Dashboard() {
  const { projects, loading } = useProjects();
  const [searchParams] = useSearchParams();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  const view = searchParams.get('view') || 'drafts';
  
  // Mock data for templates and drafts
  const templates = [
    { id: 'template-1', name: 'Business Dashboard', type: 'template' },
    { id: 'template-2', name: 'Analytics Report', type: 'template' },
    { id: 'template-3', name: 'User Profile', type: 'template' },
  ];
  
  const drafts = projects.filter(p => !p.is_public);
  const published = projects.filter(p => p.is_public);
  
  // Get current items based on view
  const getCurrentItems = () => {
    switch (view) {
      case 'templates':
        return templates;
      case 'projects':
        return published;
      case 'drafts':
      default:
        return drafts;
    }
  };
  
  const currentItems = getCurrentItems();
  
  // Calculate pagination
  const totalPages = Math.ceil(currentItems.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const displayedItems = currentItems.slice(startIndex, startIndex + projectsPerPage);
  
  const getTitle = () => {
    switch (view) {
      case 'templates':
        return 'Templates';
      case 'projects':
        return 'My Projects';
      case 'drafts':
      default:
        return 'Drafts';
    }
  };
  
  const getCreateButtonText = () => {
    switch (view) {
      case 'templates':
        return 'Create Template';
      case 'projects':
        return 'Create Project';
      case 'drafts':
      default:
        return 'Save as Draft';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <SearchHeader />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
            </div>
            
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2"
            >
              {view === 'drafts' ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{getCreateButtonText()}</span>
            </Button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-lg">Loading...</span>
            </div>
          ) : currentItems.length === 0 ? (
            <EmptyProjectsState onCreateProject={() => setIsCreateDialogOpen(true)} />
          ) : (
            <>
              {/* Items Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {displayedItems.map((item) => (
                  view === 'templates' ? (
                    <div key={item.id} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{item.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Template</p>
                    </div>
                  ) : (
                    <ProjectCard key={item.id} project={item} />
                  )
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Create Project Dialog */}
      <CreateProjectDialog 
        isOpen={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
