import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  ChevronRight,
  Coins,
  Copy,
  Gift,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const ADS_DAILY_LIMIT = 10;
const AD_DURATION_SECS = 5;

const getTodayAdCount = (): number => {
  try {
    const stored = sessionStorage.getItem("earnPage_adsToday");
    return stored ? Number.parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};
const setTodayAdCount = (n: number) => {
  try {
    sessionStorage.setItem("earnPage_adsToday", String(n));
  } catch {
    /* noop */
  }
};

// ─── Balance Card ─────────────────────────────────────────────────────────────

function CoinBalanceCard({
  balance,
  isLoading,
}: {
  balance: bigint | undefined;
  isLoading: boolean;
}) {
  return (
    <div
      data-ocid="earn.balance_card"
      className="relative overflow-hidden rounded-2xl border border-border p-6 text-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.015 240), oklch(0.20 0.03 195))",
        boxShadow: "0 0 24px oklch(0.75 0.24 195 / 0.25)",
        borderColor: "oklch(0.75 0.24 195 / 0.3)",
      }}
    >
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "oklch(0.75 0.24 195 / 0.08)" }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: "oklch(0.65 0.2 210 / 0.08)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest"
          style={{ color: "oklch(0.55 0.008 240)" }}
        >
          <Coins
            className="w-3.5 h-3.5"
            style={{ color: "oklch(0.75 0.24 195)" }}
          />
          Coin Balance
        </div>
        {isLoading ? (
          <Skeleton className="h-14 w-40 rounded-xl mt-1" />
        ) : (
          <span className="text-5xl font-bold font-display text-gradient-cyan leading-tight">
            {balance !== undefined ? Number(balance).toLocaleString() : "—"}
          </span>
        )}
        <p className="text-xs" style={{ color: "oklch(0.55 0.008 240)" }}>
          1000 coins = ₹5 · Min withdrawal ₹50
        </p>
      </div>
    </div>
  );
}

// ─── Ad Watch Section ─────────────────────────────────────────────────────────

function AdWatchSection({
  adsToday,
  onWatchAd,
  isWatching,
}: {
  adsToday: number;
  onWatchAd: () => void;
  isWatching: boolean;
}) {
  const limitReached = adsToday >= ADS_DAILY_LIMIT;
  const progressPct = Math.min((adsToday / ADS_DAILY_LIMIT) * 100, 100);

  return (
    <div data-ocid="earn.watch_ad_section" className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.75 0.24 195 / 0.12)" }}
          >
            <Play
              className="w-4 h-4"
              style={{ color: "oklch(0.75 0.24 195)" }}
            />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Watch Ads</p>
            <p className="text-xs text-muted-foreground">+2 coins per ad</p>
          </div>
        </div>
        <Badge
          data-ocid="earn.ad_count_badge"
          variant="secondary"
          className="font-mono text-xs shrink-0"
          style={{
            color: limitReached
              ? "oklch(0.65 0.19 22)"
              : "oklch(0.75 0.24 195)",
          }}
        >
          {adsToday}/{ADS_DAILY_LIMIT} today
        </Badge>
      </div>

      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            data-ocid="earn.ad_progress_bar"
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPct}%`,
              background: limitReached
                ? "oklch(0.65 0.19 22)"
                : "linear-gradient(90deg, oklch(0.75 0.24 195), oklch(0.65 0.2 210))",
            }}
          />
        </div>
        {limitReached ? (
          <p className="text-xs text-muted-foreground text-center">
            Daily limit reached · Come back tomorrow!
          </p>
        ) : (
          <p className="text-xs text-muted-foreground text-right">
            {ADS_DAILY_LIMIT - adsToday} ads remaining
          </p>
        )}
      </div>

      <Button
        data-ocid="earn.watch_ad_button"
        onClick={onWatchAd}
        disabled={limitReached || isWatching}
        className="w-full font-semibold rounded-xl h-11"
        style={
          !limitReached
            ? {
                background:
                  "linear-gradient(135deg, oklch(0.75 0.24 195), oklch(0.65 0.2 210))",
                color: "oklch(0.1 0.01 240)",
              }
            : {}
        }
      >
        {limitReached ? "Daily Limit Reached" : "Watch Ad (+2 coins)"}
      </Button>
    </div>
  );
}

// ─── Daily Login Section ──────────────────────────────────────────────────────

function DailyLoginSection({
  loginReward,
  isLoading,
  alreadyClaimed,
}: {
  loginReward: number | null;
  isLoading: boolean;
  alreadyClaimed: boolean;
}) {
  return (
    <div
      data-ocid="earn.daily_login_section"
      className="glass-card p-5 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.72 0.2 200 / 0.12)" }}
        >
          <Calendar
            className="w-5 h-5"
            style={{ color: "oklch(0.72 0.2 200)" }}
          />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">
            Daily Login Bonus
          </p>
          {isLoading ? (
            <Skeleton className="h-3.5 w-28 mt-1" />
          ) : alreadyClaimed ? (
            <p className="text-xs" style={{ color: "oklch(0.65 0.18 150)" }}>
              ✓ Claimed today
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              {loginReward !== null
                ? `+${loginReward} coins earned`
                : "Earning…"}
            </p>
          )}
        </div>
      </div>
      {!isLoading &&
        (alreadyClaimed ? (
          <Badge
            data-ocid="earn.login_claimed_badge"
            variant="secondary"
            className="text-xs shrink-0"
            style={{ color: "oklch(0.65 0.18 150)" }}
          >
            Done
          </Badge>
        ) : loginReward !== null ? (
          <div
            className="flex items-center gap-1 text-sm font-semibold shrink-0"
            style={{ color: "oklch(0.75 0.24 195)" }}
          >
            <span>+{loginReward}</span>
            <Coins className="w-3.5 h-3.5" />
          </div>
        ) : null)}
    </div>
  );
}

// ─── Referral Section ─────────────────────────────────────────────────────────

function ReferralSection({
  code,
  isLoading,
}: {
  code: string | null;
  isLoading: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-ocid="earn.referral_section" className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.65 0.18 150 / 0.12)" }}
        >
          <Users
            className="w-4 h-4"
            style={{ color: "oklch(0.65 0.18 150)" }}
          />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">Refer Friends</p>
          <p className="text-muted-foreground text-xs">
            +10 coins per successful referral
          </p>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-12 w-full rounded-xl" />
      ) : (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border">
          <span
            data-ocid="earn.referral_code"
            className="flex-1 font-mono font-bold text-center text-foreground tracking-widest text-sm min-w-0 truncate"
          >
            {code ?? "—"}
          </span>
          <Button
            data-ocid="earn.copy_referral_button"
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="shrink-0 h-8 w-8 p-0 rounded-lg"
            aria-label="Copy referral code"
          >
            {copied ? (
              <Check
                className="w-4 h-4"
                style={{ color: "oklch(0.65 0.18 150)" }}
              />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Referral History ─────────────────────────────────────────────────────────

function ReferralHistory() {
  const referrals = [
    { id: 1, name: "Riya Sharma", date: "Apr 14, 2026", coins: 10 },
    { id: 2, name: "Arjun Mehta", date: "Apr 12, 2026", coins: 10 },
    { id: 3, name: "Priya Patel", date: "Apr 10, 2026", coins: 10 },
  ];

  return (
    <div
      data-ocid="earn.referral_history_section"
      className="glass-card overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp
            className="w-4 h-4"
            style={{ color: "oklch(0.75 0.24 195)" }}
          />
          <p className="font-semibold text-foreground text-sm">
            Referral Earnings
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {referrals.length} referrals
        </span>
      </div>

      {referrals.length === 0 ? (
        <div
          data-ocid="earn.referral_history.empty_state"
          className="flex flex-col items-center gap-2 py-8 px-5 text-center"
        >
          <Gift className="w-8 h-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">No referrals yet</p>
          <p className="text-xs text-muted-foreground">
            Share your code to earn coins!
          </p>
        </div>
      ) : (
        <ul>
          {referrals.map((r, i) => (
            <li
              key={r.id}
              data-ocid={`earn.referral_history.item.${i + 1}`}
              className="flex items-center justify-between px-5 py-3 border-t border-border/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-foreground">
                    {r.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <span
                className="text-sm font-semibold shrink-0"
                style={{ color: "oklch(0.75 0.24 195)" }}
              >
                +{r.coins} coins
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Ad Countdown Modal ───────────────────────────────────────────────────────

function AdModal({
  open,
  countdown,
  onClose,
}: {
  open: boolean;
  countdown: number;
  onClose: () => void;
}) {
  const progress = ((AD_DURATION_SECS - countdown) / AD_DURATION_SECS) * 100;
  const circumference = 2 * Math.PI * 15.9;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => !v && countdown === 0 && onClose()}
    >
      <DialogContent
        data-ocid="earn.ad_modal"
        className="max-w-sm mx-auto rounded-2xl border-border bg-card"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-foreground font-display">
            Watching Ad…
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-3">
          {/* Simulated ad banner */}
          <div
            className="w-full h-28 rounded-xl flex flex-col items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.03 195), oklch(0.22 0.025 210))",
            }}
          >
            <Play className="w-8 h-8 opacity-30 text-foreground" />
            <span className="text-xs text-muted-foreground">
              Ad in progress
            </span>
          </div>

          {/* SVG countdown ring */}
          <div className="relative w-16 h-16">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 36 36"
              aria-label="Countdown timer"
              role="img"
            >
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="oklch(0.28 0.015 240)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="oklch(0.75 0.24 195)"
                strokeWidth="3"
                strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.9s linear" }}
              />
            </svg>
            <span
              data-ocid="earn.ad_countdown"
              className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-foreground"
            >
              {countdown}
            </span>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            Stay on screen to earn{" "}
            <span
              className="font-semibold"
              style={{ color: "oklch(0.75 0.24 195)" }}
            >
              +2 coins
            </span>
          </p>

          <Button
            data-ocid="earn.ad_modal.close_button"
            variant="ghost"
            size="sm"
            disabled={countdown > 0}
            onClick={onClose}
            className="text-muted-foreground text-xs"
          >
            {countdown > 0 ? `Skip in ${countdown}s` : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EarnPage() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [adsToday, setAdsToday] = useState<number>(getTodayAdCount);
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adCountdown, setAdCountdown] = useState(AD_DURATION_SECS);
  const [loginClaimed, setLoginClaimed] = useState(false);
  const [loginReward, setLoginReward] = useState<number | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Coin balance query ──
  const { data: coinBalance, isLoading: balanceLoading } = useQuery<bigint>({
    queryKey: ["coinBalance"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getCoinBalance();
    },
    enabled: !!actor && !isFetching,
  });

  // ── Referral code query ──
  const { data: referralCode, isLoading: codeLoading } = useQuery<string>({
    queryKey: ["referralCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyReferralCode();
    },
    enabled: !!actor && !isFetching,
  });

  // ── Daily login on mount ──
  const actorRef = useRef(actor);
  actorRef.current = actor;

  useEffect(() => {
    const a = actorRef.current;
    if (!a || isFetching) return;
    a.recordDailyLogin()
      .then((reward) => {
        const r = Number(reward);
        setLoginReward(r > 0 ? r : 5);
        if (r > 0) {
          setLoginClaimed(false);
          toast.success(`Daily login bonus: +${r} coins!`, { icon: "🎁" });
          queryClient.invalidateQueries({ queryKey: ["coinBalance"] });
        } else {
          setLoginClaimed(true);
        }
      })
      .catch(() => {
        setLoginClaimed(true);
        setLoginReward(5);
      });
    // actor accessed via ref; isFetching signals actor readiness
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, queryClient]);

  // ── Record ad watch mutation ──
  const adMutation = useMutation<bigint, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.recordAdWatch();
    },
    onSuccess: (coinsEarned) => {
      const newCount = adsToday + 1;
      setAdsToday(newCount);
      setTodayAdCount(newCount);
      queryClient.invalidateQueries({ queryKey: ["coinBalance"] });
      setAdModalOpen(false);
      toast.success(`+${Number(coinsEarned)} coins earned!`, {
        description: "Keep watching to earn more.",
        icon: "🪙",
      });
    },
    onError: () => {
      setAdModalOpen(false);
      toast.error("Couldn't record ad. Please try again.");
    },
  });

  // ── Countdown timer ──
  const handleWatchAd = () => {
    setAdCountdown(AD_DURATION_SECS);
    setAdModalOpen(true);
    countdownRef.current = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          adMutation.mutate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCloseAdModal = () => {
    if (adCountdown > 0) return; // prevent early close
    clearInterval(countdownRef.current!);
    setAdModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const isActorLoading = isFetching || !actor;

  const earnTips = [
    { icon: "📺", label: "Watch 10 ads/day", reward: "+20 coins" },
    { icon: "🗓️", label: "Daily login", reward: "+5 coins" },
    { icon: "👥", label: "Refer a friend", reward: "+10 coins" },
    { icon: "💸", label: "Withdraw at 1000 coins", reward: "₹5+" },
  ] as const;

  return (
    <div
      data-ocid="earn.page"
      className="content-with-nav overflow-y-auto pb-6"
    >
      {/* Page header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-2">
        <Coins className="w-5 h-5" style={{ color: "oklch(0.75 0.24 195)" }} />
        <h1 className="font-display font-bold text-lg text-foreground">
          Earn Coins
        </h1>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Balance hero */}
        <CoinBalanceCard
          balance={coinBalance}
          isLoading={isActorLoading || balanceLoading}
        />

        {/* Earn tips grid */}
        <div data-ocid="earn.tips_section" className="grid grid-cols-2 gap-2">
          {earnTips.map((tip, i) => (
            <div
              key={tip.label}
              data-ocid={`earn.tip.${i + 1}`}
              className="glass-card p-3 flex items-center gap-2"
            >
              <span className="text-xl leading-none">{tip.icon}</span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {tip.label}
                </p>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.75 0.24 195)" }}
                >
                  {tip.reward}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Watch Ads */}
        <AdWatchSection
          adsToday={adsToday}
          onWatchAd={handleWatchAd}
          isWatching={adModalOpen || adMutation.isPending}
        />

        {/* Daily Login */}
        <DailyLoginSection
          loginReward={loginReward}
          isLoading={isActorLoading}
          alreadyClaimed={loginClaimed}
        />

        {/* Referral Code */}
        <ReferralSection
          code={referralCode ?? null}
          isLoading={isActorLoading || codeLoading}
        />

        {/* Referral History */}
        <ReferralHistory />

        {/* Backend error state */}
        {!isFetching && !actor && (
          <div
            data-ocid="earn.error_state"
            className="glass-card p-5 text-center space-y-2"
          >
            <p
              className="text-sm font-medium"
              style={{ color: "oklch(0.65 0.19 22)" }}
            >
              Failed to connect to backend
            </p>
            <p className="text-xs text-muted-foreground">
              Please refresh and try again.
            </p>
            <Button
              data-ocid="earn.retry_button"
              size="sm"
              variant="secondary"
              onClick={() => queryClient.invalidateQueries()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Wallet CTA */}
        <Link
          to="/wallet"
          data-ocid="earn.wallet_link"
          className="glass-card p-4 flex items-center justify-between gap-3 transition-smooth group"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.75 0.24 195 / 0.12)" }}
            >
              <Coins
                className="w-4 h-4"
                style={{ color: "oklch(0.75 0.24 195)" }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Withdraw Coins
              </p>
              <p className="text-xs text-muted-foreground">
                Min ₹50 · Processed in 3–5 days
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground transition-smooth group-hover:text-accent" />
        </Link>
      </div>

      {/* Ad countdown modal */}
      <AdModal
        open={adModalOpen}
        countdown={adCountdown}
        onClose={handleCloseAdModal}
      />
    </div>
  );
}
