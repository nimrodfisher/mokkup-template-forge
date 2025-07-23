import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useOptimizedComments } from "@/hooks/useOptimizedComments";
import { useCollaborators } from "@/hooks/useCollaborators";
import { formatDistanceToNow } from "date-fns";

interface CommentDialogProps {
  elementId: string;
  projectId: string;
  elementType: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommentDialog({ elementId, projectId, elementType, open: externalOpen, onOpenChange }: CommentDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Use external state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  
  const { comments, addComment, loading } = useOptimizedComments(projectId, elementId);
  const { collaborators } = useCollaborators(projectId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Extract mentions from content
    const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
    const mentions: string[] = [];
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[2]); // userId from @[name](userId)
    }

    await addComment(content, mentions);
    setContent("");
    // Close the dialog after successful submission
    setOpen(false);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart;
    
    setContent(value);
    setCursorPosition(position);

    // Check if user is typing @
    const beforeCursor = value.substring(0, position);
    const atMatch = beforeCursor.match(/@(\w*)$/);
    
    if (atMatch) {
      setMentionQuery(atMatch[1]);
      setShowMentions(true);
    } else {
      setShowMentions(false);
      setMentionQuery("");
    }
  };

  const insertMention = (collaborator: any) => {
    const beforeCursor = content.substring(0, cursorPosition);
    const afterCursor = content.substring(cursorPosition);
    const beforeAt = beforeCursor.replace(/@\w*$/, "");
    
    const mention = `@[${collaborator.first_name} ${collaborator.last_name}](${collaborator.id})`;
    const newContent = beforeAt + mention + " " + afterCursor;
    
    setContent(newContent);
    setShowMentions(false);
    setMentionQuery("");
  };

  const filteredCollaborators = collaborators.filter(c =>
    c.first_name?.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    c.last_name?.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const renderCommentContent = (text: string) => {
    return text.replace(/@\[([^\]]+)\]\(([^)]+)\)/g, (match, name, userId) => {
      return `@${name}`;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          Comments ({comments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Comments on {elementType}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <ScrollArea className="h-64">
            <div className="space-y-3 pr-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {comment.profiles?.first_name?.[0]}{comment.profiles?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {comment.profiles?.first_name} {comment.profiles?.last_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      {renderCommentContent(comment.content)}
                    </p>
                    {comment.mentions && comment.mentions.length > 0 && (
                      <div className="flex gap-1">
                        {comment.mentions.map((mentionId) => {
                          const mentioned = collaborators.find(c => c.id === mentionId);
                          return mentioned ? (
                            <Badge key={mentionId} variant="secondary" className="text-xs">
                              @{mentioned.first_name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <Textarea
                value={content}
                onChange={handleTextareaChange}
                placeholder="Add a comment... Use @ to mention collaborators"
                className="min-h-[80px] resize-none"
              />
              
              {showMentions && filteredCollaborators.length > 0 && (
                <div className="absolute bottom-full mb-1 w-full bg-popover border rounded-md shadow-md z-10">
                  {filteredCollaborators.slice(0, 5).map((collaborator) => (
                    <button
                      key={collaborator.id}
                      type="button"
                      onClick={() => insertMention(collaborator)}
                      className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {collaborator.first_name?.[0]}{collaborator.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {collaborator.first_name} {collaborator.last_name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!content.trim() || loading}>
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}