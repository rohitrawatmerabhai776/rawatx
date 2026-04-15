import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Search } from "./index-icaUxuqU.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-DR4VLygV.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-DkG-3Qld.js";
import { T as TrendingUp, S as Skeleton, B as Badge } from "./skeleton-BQLd5Pnn.js";
import { I as Input } from "./input-Bfxb9wHU.js";
import { X } from "./x-CnP5d9p0.js";
import { U as Users } from "./users-BhsdWJ_k.js";
import { H as Hash } from "./hash-DsDqu-M-.js";
import "./index-C_eq0hJt.js";
import "./index-NUY2MX8U.js";
import "./index-BpfHV-hv.js";
function useSearchUsers(term) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["searchUsers", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchUsers(term.trim());
    },
    enabled: !!actor && !isFetching && term.trim().length > 0
  });
}
function useTrendingHashtags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["trendingHashtags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingHashtags(BigInt(20));
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function UserResultCard({
  user,
  index,
  onClick
}) {
  var _a, _b, _c, _d;
  const avatarUrl = ((_b = (_a = user.avatarStorageKey) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) ?? "";
  const initials = ((_d = (_c = user.displayName) == null ? void 0 : _c.charAt(0)) == null ? void 0 : _d.toUpperCase()) ?? "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `search.user_result.item.${index}`,
      onClick,
      className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-card transition-smooth rounded-xl text-left",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-12 w-12 shrink-0 ring-2 ring-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl, alt: user.displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground font-display font-bold", children: initials })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: user.displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground truncate", children: [
            "@",
            user.username
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent", children: Number(user.followerCount).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "followers" })
        ] })
      ]
    }
  );
}
function HashtagRow({
  tag,
  count,
  index,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `search.hashtag.item.${index}`,
      onClick,
      className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth text-left ${isActive ? "bg-accent/15 border border-accent/30" : "hover:bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `font-display font-semibold truncate ${isActive ? "text-accent" : "text-foreground"}`,
              children: [
                "#",
                tag
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            Number(count).toLocaleString(),
            " videos"
          ] })
        ] }),
        index <= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "shrink-0 text-xs bg-primary/20 text-primary border-0",
            children: "Trending"
          }
        )
      ]
    }
  );
}
function UserSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" })
  ] });
}
function HashtagSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-xl shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
    ] })
  ] });
}
function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("users");
  const [activeHashtag, setActiveHashtag] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const { data: userResults = [], isLoading: usersLoading } = useSearchUsers(query);
  const { data: trendingHashtags = [], isLoading: hashtagsLoading } = useTrendingHashtags();
  const clearQuery = () => {
    var _a;
    setQuery("");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handleHashtagClick = (tag) => {
    setActiveHashtag((prev) => prev === tag ? null : tag);
  };
  const filteredHashtags = activeHashtag && query.trim() ? trendingHashtags.filter(
    ([tag]) => tag.toLowerCase().includes(query.toLowerCase())
  ) : trendingHashtags;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col content-with-nav bg-background overflow-hidden",
      "data-ocid": "search.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 px-4 pt-4 pb-2 bg-card border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-3", children: "Discover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                ref: inputRef,
                "data-ocid": "search.search_input",
                type: "text",
                placeholder: "Search users or hashtags…",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                className: "pl-10 pr-10 bg-muted border-transparent focus:border-accent focus:ring-1 focus:ring-accent rounded-xl font-body text-foreground placeholder:text-muted-foreground"
              }
            ),
            query && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "search.clear_button",
                onClick: clearQuery,
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex mt-3 gap-1 bg-muted rounded-xl p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "search.users.tab",
                onClick: () => setActiveTab("users"),
                className: `flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-display font-semibold transition-smooth ${activeTab === "users" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
                  "Users"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "search.hashtags.tab",
                onClick: () => setActiveTab("hashtags"),
                className: `flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-display font-semibold transition-smooth ${activeTab === "hashtags" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-4 w-4" }),
                  "Hashtags"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
          activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
            !query.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "search.users.empty_state",
                className: "flex flex-col items-center justify-center py-16 px-6 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "Find people" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Search by name or username to find creators" })
                ]
              }
            ),
            query.trim() && usersLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserSkeleton, {}, i)) }),
            query.trim() && !usersLoading && userResults.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "search.users.no_results",
                className: "flex flex-col items-center justify-center py-16 px-6 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No users found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different name or username" })
                ]
              }
            ),
            query.trim() && !usersLoading && userResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "search.user_results.list", className: "px-2", children: userResults.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserResultCard,
              {
                user,
                index: i + 1,
                onClick: () => navigate({
                  to: "/profile/$userId",
                  params: { userId: user.userId.toString() }
                })
              },
              user.userId.toString()
            )) })
          ] }),
          activeTab === "hashtags" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: "Trending" })
            ] }),
            hashtagsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HashtagSkeleton, {}, i)) }),
            !hashtagsLoading && filteredHashtags.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "search.hashtags.empty_state",
                className: "flex flex-col items-center justify-center py-16 px-6 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-8 w-8 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No hashtags found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Check back later for trending tags" })
                ]
              }
            ),
            !hashtagsLoading && filteredHashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "search.hashtags.list", className: "px-2", children: filteredHashtags.map(([tag, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              HashtagRow,
              {
                tag,
                count,
                index: i + 1,
                isActive: activeHashtag === tag,
                onClick: () => handleHashtagClick(tag)
              },
              tag
            )) }),
            activeHashtag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-2 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "search.clear_hashtag_button",
                onClick: () => setActiveHashtag(null),
                className: "text-sm text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2",
                children: "Clear filter"
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
export {
  SearchPage as default
};
