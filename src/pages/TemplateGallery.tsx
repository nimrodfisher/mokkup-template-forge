
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWireframe } from "@/hooks/useWireframe";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const TemplateGallery = () => {
  const { templates, deleteTemplate } = useWireframe();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    deleteTemplate(id);
    toast.success("Template deleted successfully!");
  };
  
  const getElementCount = (template) => {
    // Count all elements across all screens
    return template.screens?.reduce((count, screen) => count + (screen.elements?.length || 0), 0) || 0;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600">WireBuilder</Link>
          <div>
            <Link to="/editor">
              <Button className="gap-2">
                Create New <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Templates</h1>
        
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 14l-3-3m0 0l-3 3m3-3v9M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v4" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No templates yet</h3>
            <p className="text-gray-500 mb-4">Create your first wireframe template to get started</p>
            <Link to="/editor">
              <Button>Create Template</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`hover:shadow-md transition-shadow ${
                  selectedId === template.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedId(template.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md border flex items-center justify-center">
                    {getElementCount(template) === 0 ? (
                      <span className="text-gray-400 text-sm">Empty template</span>
                    ) : (
                      <div className="relative w-full h-full p-2">
                        <div className="text-xs text-gray-500">
                          {getElementCount(template)} element{getElementCount(template) === 1 ? '' : 's'}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {format(new Date(template.updatedAt), 'MMM d, yyyy')}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(template.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/editor/${template.id}`)}
                    >
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplateGallery;
