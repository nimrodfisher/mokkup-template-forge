
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ProjectShare from "@/pages/ProjectShare";
import Editor from "@/pages/Editor";
import TemplateGallery from "@/pages/TemplateGallery";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/project/:id/share" 
            element={
              <AuthGuard>
                <ProjectShare />
              </AuthGuard>
            } 
          />
          <Route 
            path="/editor/:projectId?" 
            element={
              <AuthGuard>
                <Editor />
              </AuthGuard>
            } 
          />
          <Route 
            path="/templates" 
            element={
              <AuthGuard>
                <TemplateGallery />
              </AuthGuard>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
