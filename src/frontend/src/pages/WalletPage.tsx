import type { WithdrawalRequestPublic } from "@/backend.d";
import { WithdrawalStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Loader2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────
const COINS_PER_RUPEE = 200n;
const MIN_WITHDRAWAL_INR = 50;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: WithdrawalStatus }) {
  if (status === WithdrawalStatus.completed) {
    return (
      <Badge
        className="bg-emerald-500/15 text-emerald-400 border-emerald-500/25 gap-1.5"
        data-ocid="wallet.history_status_completed"
      >
        <CheckCircle2 className="w-3 h-3" />
        Completed
      </Badge>
    );
  }
  return (
    <Badge
      className="bg-amber-500/15 text-amber-400 border-amber-500/25 gap-1.5"
      data-ocid="wallet.history_status_pending"
    >
      <Clock className="w-3 h-3" />
      Pending
    </Badge>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────
function BalanceSkeleton() {
  return (
    <div className="glass-card p-6 flex flex-col items-center gap-3">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-14 w-40" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-44" />
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="glass-card p-4 flex items-center justify-between"
        >
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ─── Success Banner ───────────────────────────────────────────────────────────
function SuccessBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="glass-card border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3"
      data-ocid="wallet.success_state"
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-emerald-400">
          Withdrawal Request Submitted!
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your withdrawal will be processed in 3–5 business days. You can track
          status below.
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none shrink-0"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

// ─── Withdrawal Form ──────────────────────────────────────────────────────────
function WithdrawalForm({
  coinBalance,
  rupeeEquivalent,
}: {
  coinBalance: bigint;
  rupeeEquivalent: bigint;
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [rupeeAmount, setRupeeAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    rupee?: string;
    payment?: string;
  }>({});

  const mutation = useMutation({
    mutationFn: async ({ rupee }: { rupee: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createWithdrawalRequest(rupee);
    },
    onSuccess: () => {
      setShowSuccess(true);
      setRupeeAmount("");
      setPaymentMethod("");
      queryClient.invalidateQueries({ queryKey: ["wallet-history"] });
      queryClient.invalidateQueries({ queryKey: ["coin-balance"] });
    },
    onError: () => {
      toast.error("Withdrawal failed. Please try again.");
    },
  });

  function validate(): boolean {
    const errors: { rupee?: string; payment?: string } = {};
    const amount = Number.parseFloat(rupeeAmount);

    if (!rupeeAmount || Number.isNaN(amount)) {
      errors.rupee = "Enter a valid rupee amount.";
    } else if (amount < MIN_WITHDRAWAL_INR) {
      errors.rupee = `Minimum withdrawal is ₹${MIN_WITHDRAWAL_INR}.`;
    } else {
      const requiredCoins = BigInt(Math.ceil(amount)) * COINS_PER_RUPEE;
      if (coinBalance < requiredCoins) {
        errors.rupee = `Insufficient balance. You need ${requiredCoins.toString()} coins.`;
      }
    }

    if (!paymentMethod.trim()) {
      errors.payment = "Enter a UPI ID or bank account number.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({
      rupee: BigInt(Math.ceil(Number.parseFloat(rupeeAmount))),
    });
  }

  const rupeeParsed = Number.parseFloat(rupeeAmount);
  const coinsNeeded =
    !Number.isNaN(rupeeParsed) && rupeeParsed > 0
      ? BigInt(Math.ceil(rupeeParsed)) * COINS_PER_RUPEE
      : null;

  return (
    <div
      className="glass-card p-5 space-y-5"
      data-ocid="wallet.withdrawal_form"
    >
      <div className="flex items-center gap-2">
        <CircleDollarSign className="w-4 h-4 text-accent" />
        <h2 className="font-display font-semibold text-sm">
          Withdraw Earnings
        </h2>
      </div>

      {showSuccess && <SuccessBanner onDismiss={() => setShowSuccess(false)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rupee Amount */}
        <div className="space-y-1.5">
          <Label
            htmlFor="rupee-amount"
            className="text-xs text-muted-foreground"
          >
            Amount (₹)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              ₹
            </span>
            <Input
              id="rupee-amount"
              type="number"
              min={MIN_WITHDRAWAL_INR}
              step="1"
              placeholder={`Min ₹${MIN_WITHDRAWAL_INR}`}
              value={rupeeAmount}
              onChange={(e) => {
                setRupeeAmount(e.target.value);
                if (fieldErrors.rupee)
                  setFieldErrors((p) => ({ ...p, rupee: undefined }));
              }}
              className="pl-7 bg-muted/40 border-border focus:border-accent"
              data-ocid="wallet.rupee_amount.input"
            />
          </div>
          {coinsNeeded !== null && !fieldErrors.rupee && (
            <p className="text-xs text-muted-foreground">
              Requires{" "}
              <span className="text-accent font-medium">
                {coinsNeeded.toString()} coins
              </span>{" "}
              · You have{" "}
              <span
                className={
                  coinBalance >= coinsNeeded
                    ? "text-emerald-400"
                    : "text-destructive"
                }
              >
                {coinBalance.toString()}
              </span>
            </p>
          )}
          {fieldErrors.rupee && (
            <p
              className="text-xs text-destructive flex items-center gap-1"
              data-ocid="wallet.rupee_amount.field_error"
            >
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.rupee}
            </p>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-1.5">
          <Label
            htmlFor="payment-method"
            className="text-xs text-muted-foreground"
          >
            UPI ID or Bank Account Number
          </Label>
          <Input
            id="payment-method"
            type="text"
            placeholder="e.g. name@upi or 9876543210"
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              if (fieldErrors.payment)
                setFieldErrors((p) => ({ ...p, payment: undefined }));
            }}
            className="bg-muted/40 border-border focus:border-accent"
            data-ocid="wallet.payment_method.input"
          />
          {fieldErrors.payment && (
            <p
              className="text-xs text-destructive flex items-center gap-1"
              data-ocid="wallet.payment_method.field_error"
            >
              <AlertCircle className="w-3 h-3" />
              {fieldErrors.payment}
            </p>
          )}
        </div>

        {/* Balance check note */}
        <p className="text-xs text-muted-foreground">
          Available:{" "}
          <span className="text-foreground font-medium">
            ₹{rupeeEquivalent.toString()}
          </span>{" "}
          · Processing: 3–5 business days
        </p>

        <Button
          type="submit"
          disabled={mutation.isPending || !actor}
          className="w-full btn-accent border-0"
          data-ocid="wallet.withdrawal.submit_button"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Submitting…
            </>
          ) : (
            "Request Withdrawal"
          )}
        </Button>
      </form>
    </div>
  );
}

// ─── Withdrawal History ───────────────────────────────────────────────────────
function WithdrawalHistory({
  history,
}: { history: WithdrawalRequestPublic[] }) {
  if (history.length === 0) {
    return (
      <div
        className="glass-card p-8 flex flex-col items-center gap-2 text-center"
        data-ocid="wallet.history.empty_state"
      >
        <Clock className="w-8 h-8 text-muted-foreground" />
        <p className="text-sm font-medium">No withdrawals yet</p>
        <p className="text-xs text-muted-foreground">
          Your withdrawal history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-ocid="wallet.history.list">
      {history.map((item, idx) => (
        <div
          key={item.id.toString()}
          className="glass-card p-4 flex items-center justify-between gap-3"
          data-ocid={`wallet.history.item.${idx + 1}`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">
              ₹{item.rupeeAmount.toString()}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDate(item.createdAt)}
            </p>
          </div>
          <StatusBadge status={item.status} />
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WalletPage() {
  const { actor, isLoading: actorLoading } = useBackend();

  const { data: coinBalance, isLoading: balanceLoading } = useQuery<bigint>({
    queryKey: ["coin-balance"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getCoinBalance();
    },
    enabled: !!actor && !actorLoading,
  });

  const balance = coinBalance ?? 0n;

  const { data: rupeeEquivalent, isLoading: rupeeLoading } = useQuery<bigint>({
    queryKey: ["rupee-equivalent", balance.toString()],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getRupeeEquivalent(balance);
    },
    enabled: !!actor && !actorLoading,
  });

  const { data: history, isLoading: historyLoading } = useQuery<
    WithdrawalRequestPublic[]
  >({
    queryKey: ["wallet-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWithdrawalHistory();
    },
    enabled: !!actor && !actorLoading,
  });

  const rupeeVal = rupeeEquivalent ?? 0n;
  const isBalanceLoading = balanceLoading || rupeeLoading || actorLoading;

  return (
    <div className="content-with-nav overflow-y-auto" data-ocid="wallet.page">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5 pb-10">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-accent" />
          <h1 className="font-display font-bold text-lg">Wallet</h1>
        </div>

        {/* Balance Card */}
        {isBalanceLoading ? (
          <BalanceSkeleton />
        ) : (
          <div
            className="glass-card p-6 flex flex-col items-center gap-2 glow-accent"
            data-ocid="wallet.balance.card"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              Coin Balance
            </div>

            <p
              className="text-5xl font-display font-extrabold text-gradient-cyan leading-none"
              data-ocid="wallet.coin_balance.display"
            >
              {balance.toString()}
            </p>
            <p className="text-sm text-muted-foreground font-medium">coins</p>

            <div className="mt-1 flex items-center gap-2 bg-muted/40 rounded-full px-4 py-1.5">
              <span className="text-sm font-semibold text-accent">
                ₹{rupeeVal.toString()}
              </span>
              <span className="text-xs text-muted-foreground">equivalent</span>
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              Conversion:{" "}
              <span className="text-foreground">1000 coins = ₹5</span>
              {balance > 0n && rupeeVal > 0n && (
                <>
                  {" "}
                  · Rate:{" "}
                  {(Number(balance) / Number(rupeeVal || 1n)).toFixed(0)}{" "}
                  coins/₹
                </>
              )}
            </p>
          </div>
        )}

        {/* Withdrawal Form */}
        {!isBalanceLoading && (
          <WithdrawalForm coinBalance={balance} rupeeEquivalent={rupeeVal} />
        )}

        {/* Withdrawal History */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-sm">
              Withdrawal History
            </h2>
          </div>

          {historyLoading ? (
            <HistorySkeleton />
          ) : (
            <WithdrawalHistory history={history ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}
