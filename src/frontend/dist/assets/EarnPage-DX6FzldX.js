import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, e as useQueryClient, r as reactExports, C as Coins, B as Button, t as Link } from "./index-icaUxuqU.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-DR4VLygV.js";
import { S as Skeleton, B as Badge, T as TrendingUp } from "./skeleton-BQLd5Pnn.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-Dn3nN7eh.js";
import { X } from "./x-CnP5d9p0.js";
import { u as useMutation } from "./useMutation-Ctr3CJu-.js";
import { u as ue } from "./index-DUPPr5Ke.js";
import { C as ChevronRight } from "./chevron-right-BMUC5IHt.js";
import { P as Play } from "./index-BH3m4v91.js";
import { U as Users } from "./users-BhsdWJ_k.js";
import "./index-Dx66lMgM.js";
import "./index-NUY2MX8U.js";
import "./index-C_eq0hJt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const ADS_DAILY_LIMIT = 10;
const AD_DURATION_SECS = 5;
const getTodayAdCount = () => {
  try {
    const stored = sessionStorage.getItem("earnPage_adsToday");
    return stored ? Number.parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};
const setTodayAdCount = (n) => {
  try {
    sessionStorage.setItem("earnPage_adsToday", String(n));
  } catch {
  }
};
function CoinBalanceCard({
  balance,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "earn.balance_card",
      className: "relative overflow-hidden rounded-2xl border border-border p-6 text-center",
      style: {
        background: "linear-gradient(135deg, oklch(0.18 0.015 240), oklch(0.20 0.03 195))",
        boxShadow: "0 0 24px oklch(0.75 0.24 195 / 0.25)",
        borderColor: "oklch(0.75 0.24 195 / 0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none",
            style: { background: "oklch(0.75 0.24 195 / 0.08)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -bottom-6 -left-6 w-24 h-24 rounded-full pointer-events-none",
            style: { background: "oklch(0.65 0.2 210 / 0.08)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest",
              style: { color: "oklch(0.55 0.008 240)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Coins,
                  {
                    className: "w-3.5 h-3.5",
                    style: { color: "oklch(0.75 0.24 195)" }
                  }
                ),
                "Coin Balance"
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-40 rounded-xl mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold font-display text-gradient-cyan leading-tight", children: balance !== void 0 ? Number(balance).toLocaleString() : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.55 0.008 240)" }, children: "1000 coins = ₹5 · Min withdrawal ₹50" })
        ] })
      ]
    }
  );
}
function AdWatchSection({
  adsToday,
  onWatchAd,
  isWatching
}) {
  const limitReached = adsToday >= ADS_DAILY_LIMIT;
  const progressPct = Math.min(adsToday / ADS_DAILY_LIMIT * 100, 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "earn.watch_ad_section", className: "glass-card p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            style: { background: "oklch(0.75 0.24 195 / 0.12)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Play,
              {
                className: "w-4 h-4",
                style: { color: "oklch(0.75 0.24 195)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Watch Ads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "+2 coins per ad" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          "data-ocid": "earn.ad_count_badge",
          variant: "secondary",
          className: "font-mono text-xs shrink-0",
          style: {
            color: limitReached ? "oklch(0.65 0.19 22)" : "oklch(0.75 0.24 195)"
          },
          children: [
            adsToday,
            "/",
            ADS_DAILY_LIMIT,
            " today"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "earn.ad_progress_bar",
          className: "h-full rounded-full transition-all duration-700",
          style: {
            width: `${progressPct}%`,
            background: limitReached ? "oklch(0.65 0.19 22)" : "linear-gradient(90deg, oklch(0.75 0.24 195), oklch(0.65 0.2 210))"
          }
        }
      ) }),
      limitReached ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Daily limit reached · Come back tomorrow!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
        ADS_DAILY_LIMIT - adsToday,
        " ads remaining"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "earn.watch_ad_button",
        onClick: onWatchAd,
        disabled: limitReached || isWatching,
        className: "w-full font-semibold rounded-xl h-11",
        style: !limitReached ? {
          background: "linear-gradient(135deg, oklch(0.75 0.24 195), oklch(0.65 0.2 210))",
          color: "oklch(0.1 0.01 240)"
        } : {},
        children: limitReached ? "Daily Limit Reached" : "Watch Ad (+2 coins)"
      }
    )
  ] });
}
function DailyLoginSection({
  loginReward,
  isLoading,
  alreadyClaimed
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "earn.daily_login_section",
      className: "glass-card p-5 flex items-center justify-between gap-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              style: { background: "oklch(0.72 0.2 200 / 0.12)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Calendar,
                {
                  className: "w-5 h-5",
                  style: { color: "oklch(0.72 0.2 200)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Daily Login Bonus" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28 mt-1" }) : alreadyClaimed ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "oklch(0.65 0.18 150)" }, children: "✓ Claimed today" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: loginReward !== null ? `+${loginReward} coins earned` : "Earning…" })
          ] })
        ] }),
        !isLoading && (alreadyClaimed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            "data-ocid": "earn.login_claimed_badge",
            variant: "secondary",
            className: "text-xs shrink-0",
            style: { color: "oklch(0.65 0.18 150)" },
            children: "Done"
          }
        ) : loginReward !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1 text-sm font-semibold shrink-0",
            style: { color: "oklch(0.75 0.24 195)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "+",
                loginReward
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5" })
            ]
          }
        ) : null)
      ]
    }
  );
}
function ReferralSection({
  code,
  isLoading
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    ue.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "earn.referral_section", className: "glass-card p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          style: { background: "oklch(0.65 0.18 150 / 0.12)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Users,
            {
              className: "w-4 h-4",
              style: { color: "oklch(0.65 0.18 150)" }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Refer Friends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "+10 coins per successful referral" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          "data-ocid": "earn.referral_code",
          className: "flex-1 font-mono font-bold text-center text-foreground tracking-widest text-sm min-w-0 truncate",
          children: code ?? "—"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "earn.copy_referral_button",
          size: "sm",
          variant: "ghost",
          onClick: handleCopy,
          className: "shrink-0 h-8 w-8 p-0 rounded-lg",
          "aria-label": "Copy referral code",
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Check,
            {
              className: "w-4 h-4",
              style: { color: "oklch(0.65 0.18 150)" }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 text-muted-foreground" })
        }
      )
    ] })
  ] });
}
function ReferralHistory() {
  const referrals = [
    { id: 1, name: "Riya Sharma", date: "Apr 14, 2026", coins: 10 },
    { id: 2, name: "Arjun Mehta", date: "Apr 12, 2026", coins: 10 },
    { id: 3, name: "Priya Patel", date: "Apr 10, 2026", coins: 10 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "earn.referral_history_section",
      className: "glass-card overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrendingUp,
              {
                className: "w-4 h-4",
                style: { color: "oklch(0.75 0.24 195)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Referral Earnings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            referrals.length,
            " referrals"
          ] })
        ] }),
        referrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "earn.referral_history.empty_state",
            className: "flex flex-col items-center gap-2 py-8 px-5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-8 h-8 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No referrals yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share your code to earn coins!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: referrals.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            "data-ocid": `earn.referral_history.item.${i + 1}`,
            className: "flex items-center justify-between px-5 py-3 border-t border-border/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground", children: r.name.charAt(0) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.date })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-semibold shrink-0",
                  style: { color: "oklch(0.75 0.24 195)" },
                  children: [
                    "+",
                    r.coins,
                    " coins"
                  ]
                }
              )
            ]
          },
          r.id
        )) })
      ]
    }
  );
}
function AdModal({
  open,
  countdown,
  onClose
}) {
  const progress = (AD_DURATION_SECS - countdown) / AD_DURATION_SECS * 100;
  const circumference = 2 * Math.PI * 15.9;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => !v && countdown === 0 && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          "data-ocid": "earn.ad_modal",
          className: "max-w-sm mx-auto rounded-2xl border-border bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-center text-foreground font-display", children: "Watching Ad…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-full h-28 rounded-xl flex flex-col items-center justify-center gap-2",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.20 0.03 195), oklch(0.22 0.025 210))"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 opacity-30 text-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Ad in progress" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    className: "w-full h-full -rotate-90",
                    viewBox: "0 0 36 36",
                    "aria-label": "Countdown timer",
                    role: "img",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "18",
                          cy: "18",
                          r: "15.9",
                          fill: "none",
                          stroke: "oklch(0.28 0.015 240)",
                          strokeWidth: "3"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "18",
                          cy: "18",
                          r: "15.9",
                          fill: "none",
                          stroke: "oklch(0.75 0.24 195)",
                          strokeWidth: "3",
                          strokeDasharray: `${progress / 100 * circumference} ${circumference}`,
                          strokeLinecap: "round",
                          style: { transition: "stroke-dasharray 0.9s linear" }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "data-ocid": "earn.ad_countdown",
                    className: "absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-foreground",
                    children: countdown
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm text-center", children: [
                "Stay on screen to earn",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-semibold",
                    style: { color: "oklch(0.75 0.24 195)" },
                    children: "+2 coins"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "earn.ad_modal.close_button",
                  variant: "ghost",
                  size: "sm",
                  disabled: countdown > 0,
                  onClick: onClose,
                  className: "text-muted-foreground text-xs",
                  children: countdown > 0 ? `Skip in ${countdown}s` : "Close"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function EarnPage() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [adsToday, setAdsToday] = reactExports.useState(getTodayAdCount);
  const [adModalOpen, setAdModalOpen] = reactExports.useState(false);
  const [adCountdown, setAdCountdown] = reactExports.useState(AD_DURATION_SECS);
  const [loginClaimed, setLoginClaimed] = reactExports.useState(false);
  const [loginReward, setLoginReward] = reactExports.useState(null);
  const countdownRef = reactExports.useRef(null);
  const { data: coinBalance, isLoading: balanceLoading } = useQuery({
    queryKey: ["coinBalance"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getCoinBalance();
    },
    enabled: !!actor && !isFetching
  });
  const { data: referralCode, isLoading: codeLoading } = useQuery({
    queryKey: ["referralCode"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getMyReferralCode();
    },
    enabled: !!actor && !isFetching
  });
  const actorRef = reactExports.useRef(actor);
  actorRef.current = actor;
  reactExports.useEffect(() => {
    const a = actorRef.current;
    if (!a || isFetching) return;
    a.recordDailyLogin().then((reward) => {
      const r = Number(reward);
      setLoginReward(r > 0 ? r : 5);
      if (r > 0) {
        setLoginClaimed(false);
        ue.success(`Daily login bonus: +${r} coins!`, { icon: "🎁" });
        queryClient.invalidateQueries({ queryKey: ["coinBalance"] });
      } else {
        setLoginClaimed(true);
      }
    }).catch(() => {
      setLoginClaimed(true);
      setLoginReward(5);
    });
  }, [isFetching, queryClient]);
  const adMutation = useMutation({
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
      ue.success(`+${Number(coinsEarned)} coins earned!`, {
        description: "Keep watching to earn more.",
        icon: "🪙"
      });
    },
    onError: () => {
      setAdModalOpen(false);
      ue.error("Couldn't record ad. Please try again.");
    }
  });
  const handleWatchAd = () => {
    setAdCountdown(AD_DURATION_SECS);
    setAdModalOpen(true);
    countdownRef.current = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          adMutation.mutate();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
  };
  const handleCloseAdModal = () => {
    if (adCountdown > 0) return;
    clearInterval(countdownRef.current);
    setAdModalOpen(false);
  };
  reactExports.useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);
  const isActorLoading = isFetching || !actor;
  const earnTips = [
    { icon: "📺", label: "Watch 10 ads/day", reward: "+20 coins" },
    { icon: "🗓️", label: "Daily login", reward: "+5 coins" },
    { icon: "👥", label: "Refer a friend", reward: "+10 coins" },
    { icon: "💸", label: "Withdraw at 1000 coins", reward: "₹5+" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "earn.page",
      className: "content-with-nav overflow-y-auto pb-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 bg-card border-b border-border/50 px-4 py-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5", style: { color: "oklch(0.75 0.24 195)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground", children: "Earn Coins" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoinBalanceCard,
            {
              balance: coinBalance,
              isLoading: isActorLoading || balanceLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "earn.tips_section", className: "grid grid-cols-2 gap-2", children: earnTips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `earn.tip.${i + 1}`,
              className: "glass-card p-3 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: tip.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: tip.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-semibold",
                      style: { color: "oklch(0.75 0.24 195)" },
                      children: tip.reward
                    }
                  )
                ] })
              ]
            },
            tip.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AdWatchSection,
            {
              adsToday,
              onWatchAd: handleWatchAd,
              isWatching: adModalOpen || adMutation.isPending
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DailyLoginSection,
            {
              loginReward,
              isLoading: isActorLoading,
              alreadyClaimed: loginClaimed
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferralSection,
            {
              code: referralCode ?? null,
              isLoading: isActorLoading || codeLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralHistory, {}),
          !isFetching && !actor && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "earn.error_state",
              className: "glass-card p-5 text-center space-y-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-medium",
                    style: { color: "oklch(0.65 0.19 22)" },
                    children: "Failed to connect to backend"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please refresh and try again." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "earn.retry_button",
                    size: "sm",
                    variant: "secondary",
                    onClick: () => queryClient.invalidateQueries(),
                    children: "Retry"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/wallet",
              "data-ocid": "earn.wallet_link",
              className: "glass-card p-4 flex items-center justify-between gap-3 transition-smooth group",
              style: { textDecoration: "none" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      style: { background: "oklch(0.75 0.24 195 / 0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Coins,
                        {
                          className: "w-4 h-4",
                          style: { color: "oklch(0.75 0.24 195)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Withdraw Coins" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Min ₹50 · Processed in 3–5 days" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground transition-smooth group-hover:text-accent" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AdModal,
          {
            open: adModalOpen,
            countdown: adCountdown,
            onClose: handleCloseAdModal
          }
        )
      ]
    }
  );
}
export {
  EarnPage as default
};
