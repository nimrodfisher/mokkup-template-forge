import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  mentions: string[] | null;
  created_at: string;
  updated_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export function useComments(projectId: string, elementId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          mentions,
          created_at,
          updated_at,
          profiles (
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
  };

  const addComment = async (content: string, mentions: string[] = []) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          project_id: projectId,
          element_id: elementId,
          user_id: user.id,
          content,
          mentions: mentions.length > 0 ? mentions : null
        });

      if (error) throw error;

      // Create notifications for mentioned users
      if (mentions.length > 0) {
        const notifications = mentions.map(mentionedUserId => ({
          user_id: mentionedUserId,
          type: 'mention',
          project_id: projectId,
          message: `${user.user_metadata?.first_name || 'Someone'} mentioned you in a comment`
        }));

        await supabase
          .from('notifications')
          .insert(notifications);
      }

      toast.success('Comment added successfully');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();

    // Set up real-time subscription
    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, elementId]);

  return {
    comments,
    addComment,
    loading,
    refetch: fetchComments
  };
}