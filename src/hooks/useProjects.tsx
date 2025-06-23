
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  screens: any[];
  elements: any[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
  collaborators?: Array<{
    id: string;
    role: string;
    profiles: {
      first_name?: string;
      last_name?: string;
      email: string;
    };
  }>;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch projects owned by user and projects shared with user
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:owner_id (first_name, last_name, email),
          project_collaborators (
            id,
            role,
            profiles:user_id (first_name, last_name, email)
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (name: string, description?: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const newProject = {
        name,
        description,
        owner_id: user.id,
        screens: [{ id: crypto.randomUUID(), name: 'Screen1', isActive: true }],
        elements: [],
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;

      await fetchProjects();
      toast.success('Project created successfully!');
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast.success('Project updated successfully!');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchProjects();
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
      throw error;
    }
  };

  const shareProject = async (projectId: string, userEmail: string, role: 'viewer' | 'editor' | 'admin') => {
    try {
      // First, find the user by email
      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (userError || !userProfile) {
        throw new Error('User not found');
      }

      // Add collaborator
      const { error } = await supabase
        .from('project_collaborators')
        .insert({
          project_id: projectId,
          user_id: userProfile.id,
          role,
          invited_by: user?.id,
        });

      if (error) throw error;

      await fetchProjects();
      toast.success(`Project shared with ${userEmail}`);
    } catch (error) {
      console.error('Error sharing project:', error);
      toast.error('Failed to share project');
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    shareProject,
  };
}
