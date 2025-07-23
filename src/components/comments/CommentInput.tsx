import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, AtSign } from 'lucide-react';
import { useCollaborators } from '@/hooks/useCollaborators';

interface CommentInputProps {
  onSubmit: (content: string, mentions: string[]) => Promise<void>;
  projectId: string;
  placeholder?: string;
  isSubmitting?: boolean;
}

interface Collaborator {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role?: string;
}

export function CommentInput({ 
  onSubmit, 
  projectId, 
  placeholder = "Add a comment...",
  isSubmitting = false 
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const [mentions, setMentions] = useState<string[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { collaborators, loading } = useCollaborators(projectId);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    try {
      await onSubmit(content, mentions);
      setContent('');
      setMentions([]);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    setContent(value);
    setCursorPosition(cursorPos);

    // Check for @ mentions
    const textBeforeCursor = value.substring(0, cursorPos);
    const atIndex = textBeforeCursor.lastIndexOf('@');
    
    if (atIndex !== -1 && atIndex === cursorPos - 1) {
      setShowMentions(true);
      setMentionSearch('');
    } else if (atIndex !== -1) {
      const searchText = textBeforeCursor.substring(atIndex + 1);
      if (searchText.includes(' ')) {
        setShowMentions(false);
      } else {
        setMentionSearch(searchText);
        setShowMentions(true);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (collaborator: Collaborator) => {
    const textBeforeCursor = content.substring(0, cursorPosition);
    const textAfterCursor = content.substring(cursorPosition);
    const atIndex = textBeforeCursor.lastIndexOf('@');
    
    const displayName = collaborator.first_name && collaborator.last_name
      ? `${collaborator.first_name} ${collaborator.last_name}`
      : collaborator.email;
    
    const beforeAt = content.substring(0, atIndex);
    const mentionText = `@${displayName}`;
    const newContent = beforeAt + mentionText + ' ' + textAfterCursor;
    
    setContent(newContent);
    setMentions(prev => [...prev, collaborator.id]);
    setShowMentions(false);
    
    // Focus back to textarea
    if (textareaRef.current) {
      const newCursorPos = atIndex + mentionText.length + 1;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
  };

  const filteredCollaborators = collaborators.filter(collaborator => {
    if (!mentionSearch) return true;
    
    const displayName = collaborator.first_name && collaborator.last_name
      ? `${collaborator.first_name} ${collaborator.last_name}`
      : collaborator.email;
    
    return displayName.toLowerCase().includes(mentionSearch.toLowerCase());
  });

  return (
    <div className="relative">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="min-h-[80px] pr-12 resize-none"
          disabled={isSubmitting}
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
          className="absolute bottom-2 right-2"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {showMentions && filteredCollaborators.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
        {filteredCollaborators.map((collaborator) => {
          const displayName = collaborator.first_name && collaborator.last_name
            ? `${collaborator.first_name} ${collaborator.last_name}`
            : collaborator.email;
          
          return (
              <button
                key={collaborator.id}
                onClick={() => insertMention(collaborator)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <AtSign className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{displayName}</span>
              </button>
            );
          })}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        Type @ to mention users • Press Cmd/Ctrl + Enter to send
      </div>
    </div>
  );
}