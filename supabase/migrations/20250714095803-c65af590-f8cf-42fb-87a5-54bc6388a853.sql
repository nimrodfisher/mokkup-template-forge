-- Add RLS policy to allow collaborators to view shared projects
CREATE POLICY "Collaborators can view shared projects" 
ON public.projects 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_collaborators 
    WHERE project_collaborators.project_id = projects.id 
    AND project_collaborators.user_id = auth.uid()
  )
);

-- Add RLS policy to allow editors to update shared projects  
CREATE POLICY "Collaborators with editor role can update shared projects"
ON public.projects
FOR UPDATE
TO authenticated  
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_collaborators 
    WHERE project_collaborators.project_id = projects.id 
    AND project_collaborators.user_id = auth.uid()
    AND project_collaborators.role IN ('editor', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.project_collaborators 
    WHERE project_collaborators.project_id = projects.id 
    AND project_collaborators.user_id = auth.uid()
    AND project_collaborators.role IN ('editor', 'admin')
  )
);