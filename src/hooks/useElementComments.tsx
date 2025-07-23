import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  user_id: string;
  project_id: string;
  element_id: string;
  created_at: string;
  updated_at: string;
  mentions: string[];
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

export function useElementComments(projectId: string, elementId: string) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    if (!projectId || !elementId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)
        .eq('project_id', projectId)
        .eq('element_id', elementId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string, mentions: string[] = []) => {
    if (!user || !projectId || !elementId || !content.trim()) return;

    try {
      setIsSubmitting(true);
      const { data, error } = await supabase
        .from('comments')
        .insert({
          content: content.trim(),
          user_id: user.id,
          project_id: projectId,
          element_id: elementId,
          mentions: mentions
        })
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) throw error;

      setComments(prev => [...prev, data]);
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success('Comment deleted');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [projectId, elementId]);

  // Set up real-time subscription for comments
  useEffect(() => {
    if (!projectId || !elementId) return;

    const channel = supabase
      .channel('element-comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `project_id=eq.${projectId} AND element_id=eq.${elementId}`
        },
        async (payload) => {
          // Fetch the new comment with profile data
          const { data, error } = await supabase
            .from('comments')
            .select(`
              *,
              profiles:user_id (
                first_name,
                last_name,
                email
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            setComments(prev => {
              const exists = prev.some(comment => comment.id === data.id);
              if (exists) return prev;
              return [...prev, data];
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `project_id=eq.${projectId} AND element_id=eq.${elementId}`
        },
        (payload) => {
          setComments(prev => prev.filter(comment => comment.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, elementId]);

  return {
    comments,
    loading,
    isSubmitting,
    addComment,
    deleteComment,
    refetch: fetchComments
  };
}