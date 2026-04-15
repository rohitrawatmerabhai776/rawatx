import { createActor } from "@/backend";
import CommentsPanel from "@/components/CommentsPanel";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Ad card shown every AD_INTERVAL videos
const AD_INTERVAL = 6;

interface AdCard {
  type: "ad";
  id: string;
}

type FeedItem = Video | AdCard;

const AD_CONTENT = [
  {
    brand: "StudyMax Pro",
    tagline: "Learn faster with AI-powered courses",
    cta: "Try Free",
    gradient: "from-violet-900/80 to-indigo-900/80",
  },
  {
    brand: "EarnyApp",
    tagline: "Earn rewards while you shop online",
    cta: "Get Started",
    gradient: "from-emerald-900/80 to-cyan-900/80",
  },
  {
    brand: "PixelCam",
    tagline: "Edit reels like a pro in seconds",
    cta: "Download Now",
    gradient: "from-rose-900/80 to-orange-900/80",
  },
];

function buildFeedItems(videos: Video[], offset: number): FeedItem[] {
  const result: FeedItem[] = [];
  for (let i = 0; i < videos.length; i++) {
    result.push(videos[i]);
    if ((offset + i + 1) % AD_INTERVAL === 0) {
      result.push({ type: "ad", id: `ad-${offset + i}` });
    }
  }
  return result;
}

function getAdContent(id: string) {
  const n = Number.parseInt(id.replace("ad-", ""), 10);
  return AD_CONTENT[Math.floor(n / AD_INTERVAL) % AD_CONTENT.length];
}

const PAGE_SIZE = BigInt(10);

export default function HomeFeedPage() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [commentVideoId, setCommentVideoId] = useState<bigint | null>(null);
  const [commentPanelOpen, setCommentPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const loadedVideoIds = useRef<Set<string>>(new Set());
  const viewedRef = useRef<Set<string>>(new Set());

  // Load initial feed
  useEffect(() => {
    if (!actor || isFetching) return;
    loadPage(0);
  }, [actor, isFetching]);

  const loadPage = useCallback(
    async (pageNum: number) => {
      if (!actor) return;
      setLoadingMore(true);
      try {
        const offset = BigInt(pageNum) * PAGE_SIZE;
        const videos = await actor.getFeed(offset, PAGE_SIZE);
        const newVideos: Video[] = videos
          .filter((v) => !loadedVideoIds.current.has(v.id.toString()))
          .map((v) => ({
            id: v.id.toString(),
            userId: v.uploaderId,
            username: v.uploaderId.toString().slice(0, 8),
            displayName: v.uploaderId.toString().slice(0, 8),
            profilePhoto: "",
            videoUrl: v.storageKey.getDirectURL(),
            thumbnailUrl: "",
            caption: v.caption,
            hashtags: v.hashtags,
            likesCount: v.likesCount,
            commentsCount: v.commentsCount,
            viewsCount: v.viewsCount,
            isLiked: false,
            isBookmarked: false,
            createdAt: v.createdAt,
          }));

        for (const v of newVideos) loadedVideoIds.current.add(v.id);
        if (videos.length < Number(PAGE_SIZE)) setHasMore(false);
        setFeedItems((prev) => [
          ...prev,
          ...buildFeedItems(newVideos, pageNum * Number(PAGE_SIZE)),
        ]);
        setPage(pageNum + 1);
      } finally {
        setLoadingMore(false);
      }
    },
    [actor],
  );

  const feedCountRef = useRef(0);

  // Track active reel via IntersectionObserver
  useEffect(() => {
    feedCountRef.current = feedItems.length;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = Number(entry.target.getAttribute("data-feed-index"));
            setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.5 },
    );
    for (const [, el] of itemRefs.current) observerRef.current?.observe(el);
    return () => observerRef.current?.disconnect();
  });

  // Record view when video becomes active
  useEffect(() => {
    const item = feedItems[activeIndex];
    if (!item || "type" in item || !actor) return;
    const vid = item as Video;
    if (viewedRef.current.has(vid.id)) return;
    viewedRef.current.add(vid.id);
    actor.recordVideoView(BigInt(vid.id)).catch(() => {});
  }, [activeIndex, feedItems, actor]);

  // Load more when near end
  useEffect(() => {
    if (activeIndex >= feedItems.length - 3 && hasMore && !loadingMore) {
      loadPage(page);
    }
  }, [activeIndex, feedItems, hasMore, loadingMore, page, loadPage]);

  const handleLike = useCallback(
    async (videoId: string) => {
      if (!actor) return;
      setFeedItems((prev) =>
        prev.map((item) => {
          if ("type" in item || item.id !== videoId) return item;
          const liked = !item.isLiked;
          return {
            ...item,
            isLiked: liked,
            likesCount: liked
              ? item.likesCount + BigInt(1)
              : item.likesCount - BigInt(1),
          };
        }),
      );
      try {
        await actor.toggleLike(BigInt(videoId));
      } catch {
        // revert on error
        setFeedItems((prev) =>
          prev.map((item) => {
            if ("type" in item || item.id !== videoId) return item;
            const liked = !item.isLiked;
            return {
              ...item,
              isLiked: liked,
              likesCount: liked
                ? item.likesCount + BigInt(1)
                : item.likesCount - BigInt(1),
            };
          }),
        );
      }
    },
    [actor],
  );

  const handleFollow = useCallback(
    async (userId: string) => {
      if (!actor) return;
      setFollowedUsers((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
      try {
        // followUser expects a UserId (Principal) — parse from string
        const { Principal } = await import("@icp-sdk/core/principal");
        await actor.followUser(Principal.fromText(userId));
        toast.success("Following!");
      } catch {
        setFollowedUsers((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      }
    },
    [actor],
  );

  const handleShare = useCallback((videoId: string) => {
    const url = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Could not copy link"));
  }, []);

  const handleComment = useCallback((videoId: string) => {
    setCommentVideoId(BigInt(videoId));
    setCommentPanelOpen(true);
  }, []);

  const handleBookmark = useCallback((videoId: string) => {
    setFeedItems((prev) =>
      prev.map((item) => {
        if ("type" in item || item.id !== videoId) return item;
        return { ...item, isBookmarked: !item.isBookmarked };
      }),
    );
    toast.success("Saved!");
  }, []);

  const handleCommentCountChange = useCallback(
    (count: number) => {
      if (commentVideoId === null) return;
      const id = commentVideoId.toString();
      setFeedItems((prev) =>
        prev.map((item) => {
          if ("type" in item || item.id !== id) return item;
          return { ...item, commentsCount: BigInt(count) };
        }),
      );
    },
    [commentVideoId],
  );

  if (!actor && isFetching) {
    return (
      <div
        className="flex items-center justify-center h-full"
        data-ocid="home.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading feed…</p>
        </div>
      </div>
    );
  }

  if (!isFetching && feedItems.length === 0 && !loadingMore) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center"
        data-ocid="home.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <span className="text-3xl">🎬</span>
        </div>
        <h3 className="text-foreground font-display font-bold text-lg">
          No videos yet
        </h3>
        <p className="text-muted-foreground text-sm">
          Be the first to upload a reel and inspire others!
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
        data-ocid="home.page"
      >
        {feedItems.map((item, idx) => (
          <div
            key={"type" in item ? item.id : item.id}
            ref={(el) => {
              if (el) itemRefs.current.set(idx, el);
              else itemRefs.current.delete(idx);
            }}
            data-feed-index={idx}
            className="w-full snap-start snap-always"
            style={{
              height: "calc(100vh - 64px - env(safe-area-inset-bottom, 0px))",
            }}
          >
            {"type" in item ? (
              <AdCard adId={item.id} />
            ) : (
              <VideoCard
                video={item as Video}
                isActive={idx === activeIndex}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onBookmark={handleBookmark}
                onProfileClick={(userId: string) => {
                  navigate({ to: "/profile/$userId", params: { userId } });
                }}
                onFollow={handleFollow}
                followedUsers={followedUsers}
                index={idx}
              />
            )}
          </div>
        ))}

        {loadingMore && (
          <div
            className="w-full flex items-center justify-center py-8"
            data-ocid="home.loading_state"
          >
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      <CommentsPanel
        videoId={commentVideoId}
        open={commentPanelOpen}
        onClose={() => setCommentPanelOpen(false)}
        onCountChange={handleCommentCountChange}
      />
    </>
  );
}

function AdCard({ adId }: { adId: string }) {
  const ad = getAdContent(adId);
  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${ad.gradient} flex flex-col items-center justify-center gap-6 px-8`}
      data-ocid="home.ad_card"
    >
      <div className="absolute top-4 right-4 bg-black/30 rounded px-2 py-0.5">
        <span className="text-white/70 text-xs font-medium tracking-wide">
          Sponsored
        </span>
      </div>
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto">
          <span className="text-2xl">📱</span>
        </div>
        <h3 className="text-white font-display font-bold text-2xl">
          {ad.brand}
        </h3>
        <p className="text-white/80 text-base">{ad.tagline}</p>
      </div>
      <button
        type="button"
        className="btn-accent glow-accent text-sm"
        data-ocid="home.ad_cta"
      >
        {ad.cta}
      </button>
      <p className="text-white/40 text-xs">Advertisement</p>
    </div>
  );
}
