import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CommentCount {
  element_id: string;
  count: number;
}

export function useProjectComments(projectId: string) {
  const [commentCounts, setCommentCounts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchCommentCounts = async () => {
    if (!projectId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('element_id')
        .eq('project_id', projectId);

      if (error) throw error;

      // Count comments per element
      const counts = new Map<string, number>();
      data.forEach(comment => {
        const currentCount = counts.get(comment.element_id) || 0;
        counts.set(comment.element_id, currentCount + 1);
      });

      setCommentCounts(counts);
    } catch (error) {
      console.error('Error fetching comment counts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentCounts();
  }, [projectId]);

  // Set up real-time subscription
  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel('project-comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          const elementId = payload.new.element_id;
          setCommentCounts(prev => {
            const newCounts = new Map(prev);
            const currentCount = newCounts.get(elementId) || 0;
            newCounts.set(elementId, currentCount + 1);
            return newCounts;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'comments',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          const elementId = payload.old.element_id;
          setCommentCounts(prev => {
            const newCounts = new Map(prev);
            const currentCount = newCounts.get(elementId) || 0;
            if (currentCount > 1) {
              newCounts.set(elementId, currentCount - 1);
            } else {
              newCounts.delete(elementId);
            }
            return newCounts;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const getCommentCount = (elementId: string): number => {
    return commentCounts.get(elementId) || 0;
  };

  return {
    commentCounts,
    loading,
    getCommentCount,
    refetch: fetchCommentCounts
  };
}