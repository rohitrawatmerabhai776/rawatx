import { c as createLucideIcon, j as jsxRuntimeExports, e as useQueryClient, r as reactExports, B as Button, L as LoaderCircle } from "./index-icaUxuqU.js";
import { T as TrendingUp, S as Skeleton, B as Badge } from "./skeleton-BQLd5Pnn.js";
import { I as Input } from "./input-Bfxb9wHU.js";
import { L as Label } from "./label-C1DKtVAz.js";
import { u as useBackend } from "./useBackend-DFUV52a7.js";
import { a as useQuery } from "./backend-DR4VLygV.js";
import { u as useMutation } from "./useMutation-Ctr3CJu-.js";
import { u as ue } from "./index-DUPPr5Ke.js";
import { C as CircleAlert, a as CircleCheck } from "./circle-check-B-ISMp_V.js";
import "./index-BpfHV-hv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 18V6", key: "zqpxq5" }]
];
const CircleDollarSign = createLucideIcon("circle-dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
var WithdrawalStatus = /* @__PURE__ */ ((WithdrawalStatus2) => {
  WithdrawalStatus2["pending"] = "pending";
  WithdrawalStatus2["completed"] = "completed";
  return WithdrawalStatus2;
})(WithdrawalStatus || {});
const COINS_PER_RUPEE = 200n;
const MIN_WITHDRAWAL_INR = 50;
function formatDate(timestamp) {
  return new Date(Number(timestamp) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function StatusBadge({ status }) {
  if (status === WithdrawalStatus.completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 gap-1.5",
        "data-ocid": "wallet.history_status_completed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
          "Completed"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      className: "bg-amber-500/15 text-amber-400 border-amber-500/25 gap-1.5",
      "data-ocid": "wallet.history_status_pending",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
        "Pending"
      ]
    }
  );
}
function BalanceSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-6 flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-44" })
  ] });
}
function HistorySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card p-4 flex items-center justify-between",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
      ]
    },
    i
  )) });
}
function SuccessBanner({ onDismiss }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3",
      "data-ocid": "wallet.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-400", children: "Withdrawal Request Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your withdrawal will be processed in 3–5 business days. You can track status below." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "text-muted-foreground hover:text-foreground transition-colors text-lg leading-none shrink-0",
            "aria-label": "Dismiss",
            children: "×"
          }
        )
      ]
    }
  );
}
function WithdrawalForm({
  coinBalance,
  rupeeEquivalent
}) {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [rupeeAmount, setRupeeAmount] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("");
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const mutation = useMutation({
    mutationFn: async ({ rupee }) => {
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
      ue.error("Withdrawal failed. Please try again.");
    }
  });
  function validate() {
    const errors = {};
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
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({
      rupee: BigInt(Math.ceil(Number.parseFloat(rupeeAmount)))
    });
  }
  const rupeeParsed = Number.parseFloat(rupeeAmount);
  const coinsNeeded = !Number.isNaN(rupeeParsed) && rupeeParsed > 0 ? BigInt(Math.ceil(rupeeParsed)) * COINS_PER_RUPEE : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card p-5 space-y-5",
      "data-ocid": "wallet.withdrawal_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDollarSign, { className: "w-4 h-4 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm", children: "Withdraw Earnings" })
        ] }),
        showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessBanner, { onDismiss: () => setShowSuccess(false) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "rupee-amount",
                className: "text-xs text-muted-foreground",
                children: "Amount (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "₹" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rupee-amount",
                  type: "number",
                  min: MIN_WITHDRAWAL_INR,
                  step: "1",
                  placeholder: `Min ₹${MIN_WITHDRAWAL_INR}`,
                  value: rupeeAmount,
                  onChange: (e) => {
                    setRupeeAmount(e.target.value);
                    if (fieldErrors.rupee)
                      setFieldErrors((p) => ({ ...p, rupee: void 0 }));
                  },
                  className: "pl-7 bg-muted/40 border-border focus:border-accent",
                  "data-ocid": "wallet.rupee_amount.input"
                }
              )
            ] }),
            coinsNeeded !== null && !fieldErrors.rupee && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Requires",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
                coinsNeeded.toString(),
                " coins"
              ] }),
              " ",
              "· You have",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: coinBalance >= coinsNeeded ? "text-emerald-400" : "text-destructive",
                  children: coinBalance.toString()
                }
              )
            ] }),
            fieldErrors.rupee && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs text-destructive flex items-center gap-1",
                "data-ocid": "wallet.rupee_amount.field_error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                  fieldErrors.rupee
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "payment-method",
                className: "text-xs text-muted-foreground",
                children: "UPI ID or Bank Account Number"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "payment-method",
                type: "text",
                placeholder: "e.g. name@upi or 9876543210",
                value: paymentMethod,
                onChange: (e) => {
                  setPaymentMethod(e.target.value);
                  if (fieldErrors.payment)
                    setFieldErrors((p) => ({ ...p, payment: void 0 }));
                },
                className: "bg-muted/40 border-border focus:border-accent",
                "data-ocid": "wallet.payment_method.input"
              }
            ),
            fieldErrors.payment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs text-destructive flex items-center gap-1",
                "data-ocid": "wallet.payment_method.field_error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                  fieldErrors.payment
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Available:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "₹",
              rupeeEquivalent.toString()
            ] }),
            " ",
            "· Processing: 3–5 business days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: mutation.isPending || !actor,
              className: "w-full btn-accent border-0",
              "data-ocid": "wallet.withdrawal.submit_button",
              children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }),
                "Submitting…"
              ] }) : "Request Withdrawal"
            }
          )
        ] })
      ]
    }
  );
}
function WithdrawalHistory({
  history
}) {
  if (history.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card p-8 flex flex-col items-center gap-2 text-center",
        "data-ocid": "wallet.history.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No withdrawals yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your withdrawal history will appear here." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "wallet.history.list", children: history.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card p-4 flex items-center justify-between gap-3",
      "data-ocid": `wallet.history.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
            "₹",
            item.rupeeAmount.toString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(item.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status })
      ]
    },
    item.id.toString()
  )) });
}
function WalletPage() {
  const { actor, isLoading: actorLoading } = useBackend();
  const { data: coinBalance, isLoading: balanceLoading } = useQuery({
    queryKey: ["coin-balance"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getCoinBalance();
    },
    enabled: !!actor && !actorLoading
  });
  const balance = coinBalance ?? 0n;
  const { data: rupeeEquivalent, isLoading: rupeeLoading } = useQuery({
    queryKey: ["rupee-equivalent", balance.toString()],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getRupeeEquivalent(balance);
    },
    enabled: !!actor && !actorLoading
  });
  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["wallet-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWithdrawalHistory();
    },
    enabled: !!actor && !actorLoading
  });
  const rupeeVal = rupeeEquivalent ?? 0n;
  const isBalanceLoading = balanceLoading || rupeeLoading || actorLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-with-nav overflow-y-auto", "data-ocid": "wallet.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-6 space-y-5 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg", children: "Wallet" })
    ] }),
    isBalanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BalanceSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card p-6 flex flex-col items-center gap-2 glow-accent",
        "data-ocid": "wallet.balance.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-accent" }),
            "Coin Balance"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-5xl font-display font-extrabold text-gradient-cyan leading-none",
              "data-ocid": "wallet.coin_balance.display",
              children: balance.toString()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "coins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 bg-muted/40 rounded-full px-4 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-accent", children: [
              "₹",
              rupeeVal.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "equivalent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Conversion:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "1000 coins = ₹5" }),
            balance > 0n && rupeeVal > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "· Rate:",
              " ",
              (Number(balance) / Number(rupeeVal || 1n)).toFixed(0),
              " ",
              "coins/₹"
            ] })
          ] })
        ]
      }
    ),
    !isBalanceLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalForm, { coinBalance: balance, rupeeEquivalent: rupeeVal }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm", children: "Withdrawal History" })
      ] }),
      historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(HistorySkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(WithdrawalHistory, { history: history ?? [] })
    ] })
  ] }) });
}
export {
  WalletPage as default
};
