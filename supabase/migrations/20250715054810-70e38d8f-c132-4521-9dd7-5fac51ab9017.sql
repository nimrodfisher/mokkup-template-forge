-- First, disable RLS temporarily to clear all policies
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on projects table to start fresh
DROP POLICY IF EXISTS "projects_select_owner" ON public.projects;
DROP POLICY IF EXISTS "projects_select_public" ON public.projects;
DROP POLICY IF EXISTS "projects_insert_authenticated" ON public.projects;
DROP POLICY IF EXISTS "projects_update_owner" ON public.projects;
DROP POLICY IF EXISTS "projects_delete_owner" ON public.projects;
DROP POLICY IF EXISTS "Project owners can delete their projects" ON public.projects;
DROP POLICY IF EXISTS "Project owners can insert their projects" ON public.projects;
DROP POLICY IF EXISTS "Project owners can update their projects" ON public.projects;
DROP POLICY IF EXISTS "Collaborators can view shared projects" ON public.projects;
DROP POLICY IF EXISTS "Collaborators with editor role can update shared projects" ON public.projects;

-- Re-enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create clean, non-recursive policies
CREATE POLICY "projects_owner_all" ON public.projects
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "projects_public_select" ON public.projects  
  FOR SELECT USING (is_public = true);

-- Create a security definer function to check collaborator access
CREATE OR REPLACE FUNCTION public.check_project_collaborator(project_id uuid, required_role text DEFAULT 'viewer')
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.project_collaborators pc
    WHERE pc.project_id = $1 
    AND pc.user_id = auth.uid()
    AND (
      CASE 
        WHEN $2 = 'viewer' THEN pc.role IN ('viewer', 'editor', 'admin')
        WHEN $2 = 'editor' THEN pc.role IN ('editor', 'admin') 
        WHEN $2 = 'admin' THEN pc.role = 'admin'
        ELSE false
      END
    )
  );
$$;

-- Create policies using the security definer function
CREATE POLICY "projects_collaborator_select" ON public.projects
  FOR SELECT USING (public.check_project_collaborator(id, 'viewer'));

CREATE POLICY "projects_collaborator_update" ON public.projects
  FOR UPDATE USING (public.check_project_collaborator(id, 'editor'))
  WITH CHECK (public.check_project_collaborator(id, 'editor'));