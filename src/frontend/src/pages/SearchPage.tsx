import { createActor } from "@/backend";
import type { UserProfilePublic } from "@/backend.d.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Hash, Search, TrendingUp, Users, X } from "lucide-react";
import { useRef, useState } from "react";

// ─── Search hooks ─────────────────────────────────────────────────────────────
function useSearchUsers(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfilePublic[]>({
    queryKey: ["searchUsers", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchUsers(term.trim());
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

function useTrendingHashtags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["trendingHashtags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingHashtags(BigInt(20));
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Tab type ─────────────────────────────────────────────────────────────────
type TabType = "users" | "hashtags";

// ─── User result card ─────────────────────────────────────────────────────────
function UserResultCard({
  user,
  index,
  onClick,
}: {
  user: UserProfilePublic;
  index: number;
  onClick: () => void;
}) {
  const avatarUrl = user.avatarStorageKey?.getDirectURL?.() ?? "";
  const initials = user.displayName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <button
      type="button"
      data-ocid={`search.user_result.item.${index}`}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-card transition-smooth rounded-xl text-left"
    >
      <Avatar className="h-12 w-12 shrink-0 ring-2 ring-border">
        <AvatarImage src={avatarUrl} alt={user.displayName} />
        <AvatarFallback className="bg-primary text-primary-foreground font-display font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground truncate">
          {user.displayName}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          @{user.username}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-accent">
          {Number(user.followerCount).toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">followers</p>
      </div>
    </button>
  );
}

// ─── Hashtag row ──────────────────────────────────────────────────────────────
function HashtagRow({
  tag,
  count,
  index,
  isActive,
  onClick,
}: {
  tag: string;
  count: bigint;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`search.hashtag.item.${index}`}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth text-left ${
        isActive ? "bg-accent/15 border border-accent/30" : "hover:bg-card"
      }`}
    >
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
          isActive
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Hash className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`font-display font-semibold truncate ${
            isActive ? "text-accent" : "text-foreground"
          }`}
        >
          #{tag}
        </p>
        <p className="text-xs text-muted-foreground">
          {Number(count).toLocaleString()} videos
        </p>
      </div>
      {index <= 2 && (
        <Badge
          variant="secondary"
          className="shrink-0 text-xs bg-primary/20 text-primary border-0"
        >
          Trending
        </Badge>
      )}
    </button>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────
function UserSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

function HashtagSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: userResults = [], isLoading: usersLoading } =
    useSearchUsers(query);
  const { data: trendingHashtags = [], isLoading: hashtagsLoading } =
    useTrendingHashtags();

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleHashtagClick = (tag: string) => {
    setActiveHashtag((prev) => (prev === tag ? null : tag));
  };

  const filteredHashtags =
    activeHashtag && query.trim()
      ? trendingHashtags.filter(([tag]) =>
          tag.toLowerCase().includes(query.toLowerCase()),
        )
      : trendingHashtags;

  return (
    <div
      className="flex flex-col content-with-nav bg-background overflow-hidden"
      data-ocid="search.page"
    >
      {/* Search header */}
      <div className="shrink-0 px-4 pt-4 pb-2 bg-card border-b border-border">
        <h1 className="font-display font-bold text-xl text-foreground mb-3">
          Discover
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            data-ocid="search.search_input"
            type="text"
            placeholder="Search users or hashtags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 bg-muted border-transparent focus:border-accent focus:ring-1 focus:ring-accent rounded-xl font-body text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              data-ocid="search.clear_button"
              onClick={clearQuery}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex mt-3 gap-1 bg-muted rounded-xl p-1">
          <button
            type="button"
            data-ocid="search.users.tab"
            onClick={() => setActiveTab("users")}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-display font-semibold transition-smooth ${
              activeTab === "users"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Users
          </button>
          <button
            type="button"
            data-ocid="search.hashtags.tab"
            onClick={() => setActiveTab("hashtags")}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-sm font-display font-semibold transition-smooth ${
              activeTab === "hashtags"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Hash className="h-4 w-4" />
            Hashtags
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* ── Users tab ── */}
        {activeTab === "users" && (
          <div className="py-2">
            {!query.trim() && (
              <div
                data-ocid="search.users.empty_state"
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  Find people
                </p>
                <p className="text-sm text-muted-foreground">
                  Search by name or username to find creators
                </p>
              </div>
            )}

            {query.trim() && usersLoading && (
              <div>
                {[1, 2, 3, 4].map((i) => (
                  <UserSkeleton key={i} />
                ))}
              </div>
            )}

            {query.trim() && !usersLoading && userResults.length === 0 && (
              <div
                data-ocid="search.users.no_results"
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No users found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different name or username
                </p>
              </div>
            )}

            {query.trim() && !usersLoading && userResults.length > 0 && (
              <div data-ocid="search.user_results.list" className="px-2">
                {userResults.map((user, i) => (
                  <UserResultCard
                    key={user.userId.toString()}
                    user={user}
                    index={i + 1}
                    onClick={() =>
                      navigate({
                        to: "/profile/$userId",
                        params: { userId: user.userId.toString() },
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Hashtags tab ── */}
        {activeTab === "hashtags" && (
          <div className="py-2">
            <div className="flex items-center gap-2 px-4 py-2 mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Trending
              </span>
            </div>

            {hashtagsLoading && (
              <div>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <HashtagSkeleton key={i} />
                ))}
              </div>
            )}

            {!hashtagsLoading && filteredHashtags.length === 0 && (
              <div
                data-ocid="search.hashtags.empty_state"
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Hash className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No hashtags found
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back later for trending tags
                </p>
              </div>
            )}

            {!hashtagsLoading && filteredHashtags.length > 0 && (
              <div data-ocid="search.hashtags.list" className="px-2">
                {filteredHashtags.map(([tag, count], i) => (
                  <HashtagRow
                    key={tag}
                    tag={tag}
                    count={count}
                    index={i + 1}
                    isActive={activeHashtag === tag}
                    onClick={() => handleHashtagClick(tag)}
                  />
                ))}
              </div>
            )}

            {activeHashtag && (
              <div className="px-4 pt-2 pb-4">
                <button
                  type="button"
                  data-ocid="search.clear_hashtag_button"
                  onClick={() => setActiveHashtag(null)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
