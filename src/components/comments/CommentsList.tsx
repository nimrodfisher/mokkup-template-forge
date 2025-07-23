import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  mentions: string[];
  profiles?: {
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

interface CommentsListProps {
  comments: Comment[];
  currentUserId?: string;
}

export function CommentsList({ comments, currentUserId }: CommentsListProps) {
  const renderCommentContent = (content: string, mentions: string[]) => {
    // Simple mention rendering - could be enhanced with user lookup
    let renderedContent = content;
    
    // Replace @mentions with styled spans
    const mentionRegex = /@(\w+)/g;
    renderedContent = renderedContent.replace(mentionRegex, (match, username) => {
      return `<span class="text-blue-600 font-medium bg-blue-50 px-1 rounded">${match}</span>`;
    });

    return { __html: renderedContent };
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const displayName = comment.profiles?.first_name && comment.profiles?.last_name
          ? `${comment.profiles.first_name} ${comment.profiles.last_name}`
          : comment.profiles?.email || 'Unknown User';
        
        const initials = comment.profiles?.first_name && comment.profiles?.last_name
          ? `${comment.profiles.first_name[0]}${comment.profiles.last_name[0]}`
          : comment.profiles?.email?.[0].toUpperCase() || 'U';

        return (
          <Card key={comment.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-3">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{displayName}</h4>
                    <time className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </time>
                  </div>
                  <div 
                    className="mt-1 text-sm text-gray-700"
                    dangerouslySetInnerHTML={renderCommentContent(comment.content, comment.mentions)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}