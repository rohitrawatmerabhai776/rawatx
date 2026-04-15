import type { VideoPublic } from "@/backend.d";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Play,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoModalProps {
  videos: VideoPublic[];
  initialIndex: number;
  onClose: () => void;
}

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

function useVideoLike(videoId: bigint) {
  const { actor, isLoading } = useBackend();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<bigint>(0n);

  const { data: count } = useQuery({
    queryKey: ["likeCount", videoId.toString()],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getLikeCount(videoId);
    },
    enabled: !!actor && !isLoading,
  });

  useEffect(() => {
    if (count !== undefined) setLikeCount(count);
  }, [count]);

  const toggle = useCallback(async () => {
    if (!actor) return;
    const result = await actor.toggleLike(videoId);
    setLiked(result);
    setLikeCount((prev) => (result ? prev + 1n : prev - 1n));
  }, [actor, videoId]);

  return { liked, likeCount, toggle };
}

function VideoPlayer({ video, index }: { video: VideoPublic; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { liked, likeCount, toggle } = useVideoLike(video.id);
  const [shared, setShared] = useState(false);
  const videoUrl = video.storageKey.getDirectURL();

  const handlePlayPause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: video.caption,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col"
      data-ocid={`video_modal.item.${index + 1}`}
    >
      {/* Video */}
      <button
        type="button"
        className="relative flex-1 bg-black cursor-pointer w-full text-left"
        onClick={handlePlayPause}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          loop
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <track kind="captions" />
        </video>
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        {/* Caption */}
        <div className="absolute bottom-4 left-4 right-16 z-10 pointer-events-none">
          <p className="text-white text-sm leading-snug line-clamp-3">
            {video.caption}
          </p>
          {video.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {video.hashtags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-accent text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>

      {/* Action bar */}
      <div className="flex items-center justify-around py-3 px-4 bg-card border-t border-border">
        <button
          type="button"
          className={cn(
            "flex flex-col items-center gap-1 transition-smooth active:scale-90",
            liked ? "text-red-500" : "text-foreground",
          )}
          onClick={toggle}
          aria-label={liked ? "Unlike" : "Like"}
          data-ocid={`video_modal.like_button.${index + 1}`}
        >
          <Heart className={cn("w-6 h-6", liked && "fill-current")} />
          <span className="text-xs font-medium">{formatCount(likeCount)}</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-foreground transition-smooth active:scale-90"
          aria-label="Comments"
          data-ocid={`video_modal.comment_button.${index + 1}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">
            {formatCount(video.commentsCount)}
          </span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-foreground transition-smooth active:scale-90"
          onClick={handleShare}
          aria-label="Share"
          data-ocid={`video_modal.share_button.${index + 1}`}
        >
          <Share2 className={cn("w-6 h-6", shared && "text-accent")} />
          <span className="text-xs font-medium">
            {shared ? "Copied!" : "Share"}
          </span>
        </button>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-xs">{formatCount(video.viewsCount)}</span>
          <span className="text-xs">views</span>
        </div>
      </div>
    </div>
  );
}

export default function VideoModal({
  videos,
  initialIndex,
  onClose,
}: VideoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const video = videos[currentIndex];

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(videos.length - 1, i + 1));
  }, [videos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  if (!video) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 bg-black/95 flex flex-col w-full h-full m-0 p-0 max-w-full max-h-full"
      aria-label="Video player"
      data-ocid="video_modal.dialog"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-smooth"
          data-ocid="video_modal.close_button"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
        <span className="text-sm text-muted-foreground font-body">
          {currentIndex + 1} / {videos.length}
        </span>
        <div className="w-9" />
      </div>

      {/* Video area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        <VideoPlayer video={video} index={currentIndex} />

        {/* Prev/Next nav */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-smooth z-20"
            aria-label="Previous video"
            data-ocid="video_modal.pagination_prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {currentIndex < videos.length - 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-smooth z-20"
            aria-label="Next video"
            data-ocid="video_modal.pagination_next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </dialog>
  );
}
