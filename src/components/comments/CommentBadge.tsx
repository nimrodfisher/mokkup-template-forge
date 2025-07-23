import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommentBadgeProps {
  commentCount: number;
  onClick: () => void;
  className?: string;
}

export function CommentBadge({ commentCount, onClick, className = "" }: CommentBadgeProps) {
  if (commentCount === 0) return null;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      className={`absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 shadow-lg border-2 border-white ${className}`}
    >
      <MessageCircle className="h-3 w-3" />
      {commentCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {commentCount > 9 ? '9+' : commentCount}
        </span>
      )}
    </Button>
  );
}