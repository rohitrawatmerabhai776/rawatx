import type { UserProfilePublic, VideoPublic } from "@/backend.d";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoModal from "@/components/VideoModal";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  Grid3X3,
  Play,
  Settings,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useCallback, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

// ─── Profile hooks ────────────────────────────────────────────────────────────
function useMyProfile() {
  const { actor, isLoading } = useBackend();
  return useQuery<UserProfilePublic | null>({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isLoading,
  });
}

function useUserProfile(userId: string | undefined, isMe: boolean) {
  const { actor, isLoading } = useBackend();
  return useQuery<UserProfilePublic | null>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !isMe && !!userId,
  });
}

function useUserVideos(userId: string | undefined) {
  const { actor, isLoading } = useBackend();
  return useQuery<VideoPublic[]>({
    queryKey: ["userVideos", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getUserVideos(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !!userId,
  });
}

function useIsFollowing(userId: string | undefined, isMe: boolean) {
  const { actor, isLoading } = useBackend();
  return useQuery<boolean>({
    queryKey: ["isFollowing", userId],
    queryFn: async () => {
      if (!actor || !userId) return false;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.isFollowing(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !isMe && !!userId,
  });
}

// ─── Avatar component ─────────────────────────────────────────────────────────
function Avatar({
  profile,
  size = 80,
}: { profile: UserProfilePublic; size?: number }) {
  const src = profile.avatarStorageKey?.getDirectURL();
  const initials = (profile.displayName ||
    profile.username ||
    "?")[0].toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={profile.displayName}
        className="rounded-full object-cover border-2 border-accent"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center bg-accent/20 border-2 border-accent font-display font-bold text-accent"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

// ─── Video thumbnail grid ─────────────────────────────────────────────────────
function VideoThumbnail({
  video,
  index,
  onClick,
}: {
  video: VideoPublic;
  index: number;
  onClick: () => void;
}) {
  const thumbUrl = video.storageKey?.getDirectURL();
  return (
    <button
      type="button"
      className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-muted group"
      onClick={onClick}
      aria-label={`Play: ${video.caption}`}
      data-ocid={`profile.video_thumb.${index + 1}`}
    >
      {thumbUrl ? (
        <img
          src={thumbUrl}
          alt={video.caption}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Play className="w-8 h-8 text-muted-foreground/40" />
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
        <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-smooth fill-white" />
      </div>
      {/* Views count */}
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white text-xs font-medium">
        <Play className="w-3 h-3 fill-white" />
        <span>{formatCount(video.viewsCount)}</span>
      </div>
    </button>
  );
}

// ─── Main ProfilePage ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  const params = useParams({ strict: false }) as { userId?: string };
  const isMe = !params.userId || params.userId === "me";

  const myProfileQuery = useMyProfile();
  const userProfileQuery = useUserProfile(
    !isMe ? params.userId : undefined,
    isMe,
  );

  const profile = isMe ? myProfileQuery.data : userProfileQuery.data;
  const profileLoading = isMe
    ? myProfileQuery.isLoading
    : userProfileQuery.isLoading;

  // For userId-based queries, we need the principal string
  const targetUserId = isMe ? profile?.userId?.toString() : params.userId;

  const videosQuery = useUserVideos(targetUserId);
  const followingQuery = useIsFollowing(targetUserId, isMe);

  const queryClient = useQueryClient();
  const { actor } = useBackend();

  const followMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !targetUserId) return;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.followUser(Principal.fromText(targetUserId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", targetUserId],
      });
      queryClient.invalidateQueries({ queryKey: ["profile", targetUserId] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !targetUserId) return;
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.unfollowUser(Principal.fromText(targetUserId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", targetUserId],
      });
      queryClient.invalidateQueries({ queryKey: ["profile", targetUserId] });
    },
  });

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => setModalIndex(index), []);
  const closeModal = useCallback(() => setModalIndex(null), []);

  const videos = videosQuery.data ?? [];
  const isFollowing = followingQuery.data ?? false;

  // ── Loading state ──
  if (profileLoading) {
    return (
      <div
        className="flex items-center justify-center h-full"
        data-ocid="profile.loading_state"
      >
        <LoadingSpinner size="lg" message="Loading profile..." />
      </div>
    );
  }

  // ── Not found ──
  if (!profile) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4 px-6"
        data-ocid="profile.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-foreground font-display text-lg font-semibold">
          Profile not found
        </p>
        <p className="text-muted-foreground text-sm text-center">
          This account doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="btn-primary text-sm"
          data-ocid="profile.back_home_link"
        >
          Go home
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      data-ocid="profile.page"
    >
      {/* ── Header section ── */}
      <div className="bg-card border-b border-border px-5 pt-6 pb-5 space-y-4">
        {/* Avatar + stats row */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Avatar profile={profile} size={80} />
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-col justify-center pt-1">
            <div className="flex justify-around">
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-display font-bold text-foreground text-lg leading-none">
                  {videos.length}
                </span>
                <span className="text-muted-foreground text-xs">Videos</span>
              </div>

              <div
                className="flex flex-col items-center gap-0.5"
                data-ocid="profile.followers_count"
              >
                <span className="font-display font-bold text-foreground text-lg leading-none">
                  {formatCount(profile.followerCount)}
                </span>
                <span className="text-muted-foreground text-xs">Followers</span>
              </div>

              <div
                className="flex flex-col items-center gap-0.5"
                data-ocid="profile.following_count"
              >
                <span className="font-display font-bold text-foreground text-lg leading-none">
                  {formatCount(profile.followingCount)}
                </span>
                <span className="text-muted-foreground text-xs">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Name + bio */}
        <div className="space-y-0.5">
          <h1 className="font-display font-bold text-foreground text-base leading-tight">
            {profile.displayName || profile.username}
          </h1>
          <p className="text-muted-foreground text-sm font-body">
            @{profile.username}
          </p>
          {profile.bio && (
            <p className="text-foreground text-sm font-body leading-snug pt-1 break-words">
              {profile.bio}
            </p>
          )}
        </div>

        {/* CTA button */}
        {isMe ? (
          <Link
            to="/settings"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-smooth border border-border"
            data-ocid="profile.edit_profile_button"
          >
            <Settings className="w-4 h-4" />
            Edit Profile
          </Link>
        ) : (
          <button
            type="button"
            className={
              isFollowing
                ? "flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-smooth border border-border"
                : "flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm transition-smooth"
            }
            onClick={() => {
              if (isFollowing) unfollowMutation.mutate();
              else followMutation.mutate();
            }}
            disabled={followMutation.isPending || unfollowMutation.isPending}
            data-ocid="profile.follow_button"
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-4 h-4" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Follow
              </>
            )}
          </button>
        )}
      </div>

      {/* ── Videos section ── */}
      <div className="flex-1 bg-background">
        {/* Section header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Grid3X3 className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-foreground font-display">
            Videos
          </span>
        </div>

        {videosQuery.isLoading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="profile.videos_loading_state"
          >
            <LoadingSpinner size="md" />
          </div>
        ) : videos.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3 px-6"
            data-ocid="profile.videos_empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Play className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-foreground font-display font-semibold text-sm">
              No videos yet
            </p>
            {isMe && (
              <Link
                to="/create"
                className="btn-accent text-xs"
                data-ocid="profile.upload_button"
              >
                Upload your first reel
              </Link>
            )}
          </div>
        ) : (
          <div
            className="grid grid-cols-3 gap-0.5 p-0.5"
            data-ocid="profile.videos_list"
          >
            {videos.map((v, i) => (
              <VideoThumbnail
                key={v.id.toString()}
                video={v}
                index={i}
                onClick={() => openModal(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Video modal ── */}
      {modalIndex !== null && videos.length > 0 && (
        <VideoModal
          videos={videos}
          initialIndex={modalIndex}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
