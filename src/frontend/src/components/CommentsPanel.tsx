import { createActor } from "@/backend";
import type { Comment as BackendComment } from "@/backend.d.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useActor } from "@caffeineai/core-infrastructure";
import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CommentsPanelProps {
  videoId: bigint | null;
  open: boolean;
  onClose: () => void;
  initialCount?: bigint;
  onCountChange?: (count: number) => void;
}

function timeAgo(ts: bigint): string {
  const diffMs = Date.now() - Number(ts / BigInt(1_000_000));
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export default function CommentsPanel({
  videoId,
  open,
  onClose,
  onCountChange,
}: CommentsPanelProps) {
  const { actor } = useActor(createActor);
  const [comments, setComments] = useState<BackendComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onCountChangeRef = useRef(onCountChange);
  onCountChangeRef.current = onCountChange;

  // Load comments when panel opens
  useEffect(() => {
    if (!open || videoId === null || !actor) return;
    setLoading(true);
    actor
      .getComments(videoId)
      .then((c) => {
        setComments(c);
        onCountChangeRef.current?.(c.length);
      })
      .finally(() => setLoading(false));
  }, [open, videoId, actor]);

  const handleSubmit = useCallback(async () => {
    if (!text.trim() || !actor || videoId === null) return;
    setSubmitting(true);
    try {
      const newComment = await actor.addComment(videoId, text.trim());
      setComments((prev) => {
        const next = [...prev, newComment];
        onCountChangeRef.current?.(next.length);
        return next;
      });
      setText("");
    } finally {
      setSubmitting(false);
    }
  }, [text, actor, videoId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[70vh] rounded-t-2xl bg-card border-t border-border p-0 flex flex-col"
        data-ocid="comments.dialog"
      >
        <SheetHeader className="px-4 pt-4 pb-2 border-b border-border shrink-0">
          <SheetTitle className="text-foreground font-display text-base">
            Comments
          </SheetTitle>
        </SheetHeader>

        {/* Comments list */}
        <ScrollArea className="flex-1 px-4">
          {loading ? (
            <div
              className="flex flex-col gap-3 pt-4"
              data-ocid="comments.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-muted rounded w-24" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm"
              data-ocid="comments.empty_state"
            >
              <p className="font-medium">No comments yet</p>
              <p className="text-xs mt-1">Be the first to comment!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              {comments.map((comment, idx) => (
                <div
                  key={comment.id.toString()}
                  className="flex gap-3"
                  data-ocid={`comments.item.${idx + 1}`}
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src="/assets/images/placeholder.svg" />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-foreground font-semibold text-sm truncate">
                        @user
                      </span>
                      <span className="text-muted-foreground text-xs shrink-0">
                        {timeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-foreground text-sm break-words mt-0.5">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-border shrink-0 bottom-nav-safe">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment…"
              className="flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-full px-4 h-10"
              maxLength={300}
              data-ocid="comments.input"
              disabled={submitting}
            />
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-accent text-accent-foreground shrink-0"
              onClick={handleSubmit}
              disabled={!text.trim() || submitting}
              aria-label="Send comment"
              data-ocid="comments.submit_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
