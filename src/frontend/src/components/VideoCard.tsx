import { cn } from "@/lib/utils";
import type { Video } from "@/types";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreVertical,
  Play,
  Share2,
  UserPlus,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoCardProps {
  video: Video;
  isActive: boolean;
  onLike: (videoId: string) => void;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
  onBookmark: (videoId: string) => void;
  onProfileClick: (userId: string) => void;
  onFollow: (userId: string) => void;
  followedUsers: Set<string>;
  index: number;
}

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

export default function VideoCard({
  video,
  isActive,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onProfileClick,
  onFollow,
  followedUsers,
  index,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const playIconTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFollowed = followedUsers.has(video.userId.toString());

  // Auto-play/pause based on active state
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video.videoUrl) return;
    if (isActive) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isActive, video.videoUrl]);

  const handleVideoTap = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
    // Flash play/pause icon
    setShowPlayIcon(true);
    if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
    playIconTimerRef.current = setTimeout(() => setShowPlayIcon(false), 800);
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFollow(video.userId.toString());
  };

  return (
    <div
      className="relative w-full h-full bg-background"
      data-ocid={`video.item.${index + 1}`}
    >
      {/* Video element */}
      {video.videoUrl ? (
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          muted={muted}
          preload="metadata"
          poster={video.thumbnailUrl || undefined}
          onClick={handleVideoTap}
          onKeyDown={(e) => e.key === "Enter" && handleVideoTap()}
          data-ocid={`video.canvas_target.${index + 1}`}
        />
      ) : (
        <button
          type="button"
          className="absolute inset-0 flex items-center justify-center bg-muted w-full h-full"
          onClick={handleVideoTap}
        >
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.caption}
              className="w-full h-full object-cover"
            />
          ) : (
            <Play className="w-16 h-16 text-muted-foreground/40" />
          )}
        </button>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Play/Pause flash icon */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center animate-ping-once">
            {paused ? (
              <Play className="w-8 h-8 text-white" fill="white" />
            ) : (
              <div className="w-4 h-8 border-l-4 border-r-4 border-white mr-0" />
            )}
          </div>
        </div>
      )}

      {/* Mute toggle top-right */}
      <button
        type="button"
        className="absolute top-14 right-3 z-10 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center transition-smooth active:scale-90"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        data-ocid={`video.toggle.${index + 1}`}
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Right action sidebar */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
        {/* Profile avatar + follow */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            className="relative"
            onClick={() => onProfileClick(video.userId.toString())}
            aria-label={`View ${video.displayName}'s profile`}
            data-ocid={`video.profile_link.${index + 1}`}
          >
            <img
              src={video.profilePhoto || "/assets/images/placeholder.svg"}
              alt={video.displayName}
              className="w-11 h-11 rounded-full border-2 border-accent object-cover"
            />
          </button>
          {!isFollowed && (
            <button
              type="button"
              className="w-6 h-6 rounded-full bg-accent flex items-center justify-center -mt-3 z-10 transition-smooth active:scale-90"
              onClick={handleFollowClick}
              aria-label={`Follow ${video.displayName}`}
              data-ocid={`video.follow_button.${index + 1}`}
            >
              <UserPlus className="w-3 h-3 text-accent-foreground" />
            </button>
          )}
        </div>

        {/* Like */}
        <ActionButton
          icon={
            <Heart
              className={cn(
                "w-7 h-7 transition-smooth",
                video.isLiked
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-white",
              )}
            />
          }
          label={formatCount(video.likesCount)}
          onClick={() => onLike(video.id)}
          ariaLabel={video.isLiked ? "Unlike video" : "Like video"}
          ocid={`video.like_button.${index + 1}`}
        />

        {/* Comment */}
        <ActionButton
          icon={<MessageCircle className="w-7 h-7 text-white" />}
          label={formatCount(video.commentsCount)}
          onClick={() => onComment(video.id)}
          ariaLabel="View comments"
          ocid={`video.comment_button.${index + 1}`}
        />

        {/* Bookmark */}
        <ActionButton
          icon={
            <Bookmark
              className={cn(
                "w-7 h-7 transition-smooth",
                video.isBookmarked ? "fill-accent text-accent" : "text-white",
              )}
            />
          }
          label="Save"
          onClick={() => onBookmark(video.id)}
          ariaLabel={video.isBookmarked ? "Remove bookmark" : "Bookmark video"}
          ocid={`video.bookmark_button.${index + 1}`}
        />

        {/* Share */}
        <ActionButton
          icon={<Share2 className="w-7 h-7 text-white" />}
          label="Share"
          onClick={() => onShare(video.id)}
          ariaLabel="Share video"
          ocid={`video.share_button.${index + 1}`}
        />

        {/* More */}
        <ActionButton
          icon={<MoreVertical className="w-6 h-6 text-white/70" />}
          label=""
          onClick={() => {}}
          ariaLabel="More options"
          ocid={`video.more_button.${index + 1}`}
        />
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-20 left-3 right-16 z-10 space-y-2">
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => onProfileClick(video.userId.toString())}
          data-ocid={`video.username_link.${index + 1}`}
        >
          <span className="font-display font-bold text-white text-sm drop-shadow">
            @{video.username}
          </span>
          {isFollowed && (
            <span className="text-accent text-[10px] font-semibold border border-accent rounded px-1">
              Following
            </span>
          )}
        </button>
        <p className="text-white text-sm leading-snug line-clamp-2 max-w-xs drop-shadow">
          {video.caption}
        </p>
        {video.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {video.hashtags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-accent text-xs font-medium drop-shadow"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel: string;
  ocid: string;
}

function ActionButton({
  icon,
  label,
  onClick,
  ariaLabel,
  ocid,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-0.5 group transition-smooth active:scale-90"
      onClick={onClick}
      aria-label={ariaLabel}
      data-ocid={ocid}
    >
      <div className="w-11 h-11 flex items-center justify-center drop-shadow-md">
        {icon}
      </div>
      {label && (
        <span className="text-white text-xs font-semibold leading-none drop-shadow">
          {label}
        </span>
      )}
    </button>
  );
}
