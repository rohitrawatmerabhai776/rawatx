const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BH3m4v91.js","assets/index-icaUxuqU.js","assets/index-DophPnGc.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, w as useParams, e as useQueryClient, x as LoadingSpinner, t as Link, _ as __vitePreload } from "./index-icaUxuqU.js";
import { u as useBackend } from "./useBackend-DFUV52a7.js";
import { a as useQuery } from "./backend-DR4VLygV.js";
import { X } from "./x-CnP5d9p0.js";
import { C as ChevronRight } from "./chevron-right-BMUC5IHt.js";
import { P as Play } from "./index-BH3m4v91.js";
import { H as Heart, M as MessageCircle, S as Share2, U as UserPlus } from "./user-plus-CyIPX_c9.js";
import { u as useMutation } from "./useMutation-Ctr3CJu-.js";
import { U as Users } from "./users-BhsdWJ_k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const Grid3x3 = createLucideIcon("grid-3x3", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function formatCount$1(n) {
  const num = Number(n);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return String(num);
}
function useVideoLike(videoId) {
  const { actor, isLoading } = useBackend();
  const [liked, setLiked] = reactExports.useState(false);
  const [likeCount, setLikeCount] = reactExports.useState(0n);
  const { data: count } = useQuery({
    queryKey: ["likeCount", videoId.toString()],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getLikeCount(videoId);
    },
    enabled: !!actor && !isLoading
  });
  reactExports.useEffect(() => {
    if (count !== void 0) setLikeCount(count);
  }, [count]);
  const toggle = reactExports.useCallback(async () => {
    if (!actor) return;
    const result = await actor.toggleLike(videoId);
    setLiked(result);
    setLikeCount((prev) => result ? prev + 1n : prev - 1n);
  }, [actor, videoId]);
  return { liked, likeCount, toggle };
}
function VideoPlayer({ video, index }) {
  const videoRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const { liked, likeCount, toggle } = useVideoLike(video.id);
  const [shared, setShared] = reactExports.useState(false);
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
        url: window.location.href
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
    }
    setShared(true);
    setTimeout(() => setShared(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-ocid": `video_modal.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "relative flex-1 bg-black cursor-pointer w-full text-left",
            onClick: handlePlayPause,
            "aria-label": playing ? "Pause video" : "Play video",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  ref: videoRef,
                  src: videoUrl,
                  className: "w-full h-full object-contain",
                  loop: true,
                  playsInline: true,
                  onPlay: () => setPlaying(true),
                  onPause: () => setPlaying(false),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
                }
              ),
              !playing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white fill-white ml-1" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-16 z-10 pointer-events-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm leading-snug line-clamp-3", children: video.caption }),
                video.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: video.hashtags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent text-xs font-medium", children: [
                  "#",
                  tag
                ] }, tag)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-around py-3 px-4 bg-card border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: cn(
                "flex flex-col items-center gap-1 transition-smooth active:scale-90",
                liked ? "text-red-500" : "text-foreground"
              ),
              onClick: toggle,
              "aria-label": liked ? "Unlike" : "Like",
              "data-ocid": `video_modal.like_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-6 h-6", liked && "fill-current") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: formatCount$1(likeCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex flex-col items-center gap-1 text-foreground transition-smooth active:scale-90",
              "aria-label": "Comments",
              "data-ocid": `video_modal.comment_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: formatCount$1(video.commentsCount) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex flex-col items-center gap-1 text-foreground transition-smooth active:scale-90",
              onClick: handleShare,
              "aria-label": "Share",
              "data-ocid": `video_modal.share_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: cn("w-6 h-6", shared && "text-accent") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: shared ? "Copied!" : "Share" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: formatCount$1(video.viewsCount) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "views" })
          ] })
        ] })
      ]
    }
  );
}
function VideoModal({
  videos,
  initialIndex,
  onClose
}) {
  const [currentIndex, setCurrentIndex] = reactExports.useState(initialIndex);
  const video = videos[currentIndex];
  const prev = reactExports.useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);
  const next = reactExports.useCallback(() => {
    setCurrentIndex((i) => Math.min(videos.length - 1, i + 1));
  }, [videos.length]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);
  if (!video) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 bg-black/95 flex flex-col w-full h-full m-0 p-0 max-w-full max-h-full",
      "aria-label": "Video player",
      "data-ocid": "video_modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "aria-label": "Close video",
              className: "w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-smooth",
              "data-ocid": "video_modal.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-body", children: [
            currentIndex + 1,
            " / ",
            videos.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-0 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { video, index: currentIndex }),
          currentIndex > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prev,
              className: "absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-smooth z-20",
              "aria-label": "Previous video",
              "data-ocid": "video_modal.pagination_prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          currentIndex < videos.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: next,
              className: "absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-smooth z-20",
              "aria-label": "Next video",
              "data-ocid": "video_modal.pagination_next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
            }
          )
        ] })
      ]
    }
  );
}
function formatCount(n) {
  const num = Number(n);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return String(num);
}
function useMyProfile() {
  const { actor, isLoading } = useBackend();
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isLoading
  });
}
function useUserProfile(userId, isMe) {
  const { actor, isLoading } = useBackend();
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !isMe && !!userId
  });
}
function useUserVideos(userId) {
  const { actor, isLoading } = useBackend();
  return useQuery({
    queryKey: ["userVideos", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.getUserVideos(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !!userId
  });
}
function useIsFollowing(userId, isMe) {
  const { actor, isLoading } = useBackend();
  return useQuery({
    queryKey: ["isFollowing", userId],
    queryFn: async () => {
      if (!actor || !userId) return false;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.isFollowing(Principal.fromText(userId));
    },
    enabled: !!actor && !isLoading && !isMe && !!userId
  });
}
function Avatar({
  profile,
  size = 80
}) {
  var _a;
  const src = (_a = profile.avatarStorageKey) == null ? void 0 : _a.getDirectURL();
  const initials = (profile.displayName || profile.username || "?")[0].toUpperCase();
  if (src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt: profile.displayName,
        className: "rounded-full object-cover border-2 border-accent",
        style: { width: size, height: size }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-full flex items-center justify-center bg-accent/20 border-2 border-accent font-display font-bold text-accent",
      style: { width: size, height: size, fontSize: size * 0.4 },
      children: initials
    }
  );
}
function VideoThumbnail({
  video,
  index,
  onClick
}) {
  var _a;
  const thumbUrl = (_a = video.storageKey) == null ? void 0 : _a.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-muted group",
      onClick,
      "aria-label": `Play: ${video.caption}`,
      "data-ocid": `profile.video_thumb.${index + 1}`,
      children: [
        thumbUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: thumbUrl,
            alt: video.caption,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-smooth fill-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 left-1.5 flex items-center gap-1 text-white text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 fill-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCount(video.viewsCount) })
        ] })
      ]
    }
  );
}
function ProfilePage() {
  var _a;
  const params = useParams({ strict: false });
  const isMe = !params.userId || params.userId === "me";
  const myProfileQuery = useMyProfile();
  const userProfileQuery = useUserProfile(
    !isMe ? params.userId : void 0,
    isMe
  );
  const profile = isMe ? myProfileQuery.data : userProfileQuery.data;
  const profileLoading = isMe ? myProfileQuery.isLoading : userProfileQuery.isLoading;
  const targetUserId = isMe ? (_a = profile == null ? void 0 : profile.userId) == null ? void 0 : _a.toString() : params.userId;
  const videosQuery = useUserVideos(targetUserId);
  const followingQuery = useIsFollowing(targetUserId, isMe);
  const queryClient = useQueryClient();
  const { actor } = useBackend();
  const followMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !targetUserId) return;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.followUser(Principal.fromText(targetUserId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", targetUserId]
      });
      queryClient.invalidateQueries({ queryKey: ["profile", targetUserId] });
    }
  });
  const unfollowMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !targetUserId) return;
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      return actor.unfollowUser(Principal.fromText(targetUserId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", targetUserId]
      });
      queryClient.invalidateQueries({ queryKey: ["profile", targetUserId] });
    }
  });
  const [modalIndex, setModalIndex] = reactExports.useState(null);
  const openModal = reactExports.useCallback((index) => setModalIndex(index), []);
  const closeModal = reactExports.useCallback(() => setModalIndex(null), []);
  const videos = videosQuery.data ?? [];
  const isFollowing = followingQuery.data ?? false;
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-full",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", message: "Loading profile..." })
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-4 px-6",
        "data-ocid": "profile.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display text-lg font-semibold", children: "Profile not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center", children: "This account doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "btn-primary text-sm",
              "data-ocid": "profile.back_home_link",
              children: "Go home"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full overflow-y-auto",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-5 pt-6 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { profile, size: 80 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col justify-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-around", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg leading-none", children: videos.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Videos" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-0.5",
                  "data-ocid": "profile.followers_count",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg leading-none", children: formatCount(profile.followerCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Followers" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-0.5",
                  "data-ocid": "profile.following_count",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-lg leading-none", children: formatCount(profile.followingCount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Following" })
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-base leading-tight", children: profile.displayName || profile.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-body", children: [
              "@",
              profile.username
            ] }),
            profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-body leading-snug pt-1 break-words", children: profile.bio })
          ] }),
          isMe ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/settings",
              className: "flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-smooth border border-border",
              "data-ocid": "profile.edit_profile_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
                "Edit Profile"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: isFollowing ? "flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-smooth border border-border" : "flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm transition-smooth",
              onClick: () => {
                if (isFollowing) unfollowMutation.mutate();
                else followMutation.mutate();
              },
              disabled: followMutation.isPending || unfollowMutation.isPending,
              "data-ocid": "profile.follow_button",
              children: isFollowing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
                "Following"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                "Follow"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground font-display", children: "Videos" })
          ] }),
          videosQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-16",
              "data-ocid": "profile.videos_loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" })
            }
          ) : videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 gap-3 px-6",
              "data-ocid": "profile.videos_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-7 h-7 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold text-sm", children: "No videos yet" }),
                isMe && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/create",
                    className: "btn-accent text-xs",
                    "data-ocid": "profile.upload_button",
                    children: "Upload your first reel"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-0.5 p-0.5",
              "data-ocid": "profile.videos_list",
              children: videos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoThumbnail,
                {
                  video: v,
                  index: i,
                  onClick: () => openModal(i)
                },
                v.id.toString()
              ))
            }
          )
        ] }),
        modalIndex !== null && videos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoModal,
          {
            videos,
            initialIndex: modalIndex,
            onClose: closeModal
          }
        )
      ]
    }
  );
}
export {
  ProfilePage as default
};
