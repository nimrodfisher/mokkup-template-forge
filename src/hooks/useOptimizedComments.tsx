import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  mentions: string[] | null;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface UseOptimizedCommentsReturn {
  comments: Comment[];
  addComment: (content: string, mentions?: string[]) => Promise<void>;
  loading: boolean;
  refetch: () => Promise<void>;
}

export function useOptimizedComments(projectId: string, elementId: string): UseOptimizedCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    if (!projectId || !elementId) return;
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          mentions,
          created_at,
          profiles!comments_user_id_fkey (
            first_name,
            last_name
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
    }
  }, [projectId, elementId]);

  const addComment = useCallback(async (content: string, mentions: string[] = []) => {
    if (!user || !content.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          project_id: projectId,
          element_id: elementId,
          user_id: user.id,
          content: content.trim(),
          mentions: mentions.length > 0 ? mentions : null
        });

      if (error) throw error;

      // Optimized notifications - batch insert
      if (mentions.length > 0) {
        const notifications = mentions.map(mentionedUserId => ({
          user_id: mentionedUserId,
          type: 'mention',
          project_id: projectId,
          message: `${user.user_metadata?.first_name || 'Someone'} mentioned you in a comment`
        }));

        await supabase.from('notifications').insert(notifications);
      }

      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  }, [user, projectId, elementId]);

  // Memoized channel name to prevent unnecessary re-subscriptions
  const channelName = useMemo(() => `comments-${projectId}-${elementId}`, [projectId, elementId]);

  useEffect(() => {
    if (projectId && elementId) {
      fetchComments();

      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'comments',
            filter: `project_id=eq.${projectId},element_id=eq.${elementId}`
          },
          () => fetchComments()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [projectId, elementId, channelName, fetchComments]);

  return {
    comments,
    addComment,
    loading,
    refetch: fetchComments
  };
}