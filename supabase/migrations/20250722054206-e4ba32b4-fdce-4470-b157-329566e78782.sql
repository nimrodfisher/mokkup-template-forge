-- Add missing foreign key constraint for project_collaborators
ALTER TABLE public.project_collaborators 
ADD CONSTRAINT project_collaborators_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;