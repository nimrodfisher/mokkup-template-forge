-- Make projects private by default instead of public
ALTER TABLE public.projects 
ALTER COLUMN is_public SET DEFAULT false;

-- Update existing projects to be private (optional - uncomment if you want to make existing projects private too)
-- UPDATE public.projects SET is_public = false WHERE is_public = true;