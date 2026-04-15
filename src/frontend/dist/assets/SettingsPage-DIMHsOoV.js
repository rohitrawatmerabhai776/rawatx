import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, y as useComposedRefs, u as useNavigate, z as useInternetIdentity, e as useQueryClient, x as LoadingSpinner, U as User, B as Button } from "./index-icaUxuqU.js";
import { a as useQuery, E as ExternalBlob } from "./backend-DR4VLygV.js";
import { I as Input } from "./input-Bfxb9wHU.js";
import { L as Label } from "./label-C1DKtVAz.js";
import { P as Primitive } from "./index-BpfHV-hv.js";
import { u as useControllableState, P as Primitive$1, a as composeEventHandlers, c as createContextScope } from "./index-Dx66lMgM.js";
import { u as useLayoutEffect2 } from "./index-NUY2MX8U.js";
import { T as Textarea } from "./textarea-pkBCkQVp.js";
import { u as useBackend } from "./useBackend-DFUV52a7.js";
import { u as useMutation } from "./useMutation-Ctr3CJu-.js";
import { u as ue } from "./index-DUPPr5Ke.js";
import { a as CircleCheck, C as CircleAlert } from "./circle-check-B-ISMp_V.js";
import { C as ChevronRight } from "./chevron-right-BMUC5IHt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root$1 = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const FAQ_ITEMS = [
  {
    id: "faq-coins",
    q: "How do I earn coins on RawatX?",
    a: "You can earn coins by watching ads (up to 10 per day), logging in daily for a bonus, and referring friends using your unique referral code. Each ad watch earns you 2 coins, daily login gives 5–20 coins, and successful referrals award 10 coins."
  },
  {
    id: "faq-withdrawal",
    q: "How do I withdraw my earnings?",
    a: "Go to the Wallet tab and tap 'Withdraw'. The minimum withdrawal amount is ₹50 (10,000 coins). Withdrawals are processed in 3–5 business days via UPI or bank transfer. Make sure your account details are verified before requesting."
  },
  {
    id: "faq-conversion",
    q: "What is the coin to rupee conversion rate?",
    a: "1000 coins = ₹5 (200 coins per rupee). You need at least 10,000 coins (₹50) to make a withdrawal request. Conversion rates may be updated from time to time; check the Wallet page for the current rate."
  },
  {
    id: "faq-security",
    q: "How do I keep my account secure?",
    a: "RawatX uses Internet Identity for secure, passwordless login — no passwords to remember or lose. You can set your profile to private so only approved followers see your content. Use 'Block & Report' for any suspicious accounts."
  }
];
function SectionHeader({
  icon,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 pt-6 pb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold font-display text-foreground", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
    ] })
  ] });
}
function FaqItem({ q, a }) {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen((v) => !v),
        className: "w-full flex items-center justify-between py-4 px-4 text-left gap-3 hover:bg-muted/30 transition-smooth",
        "aria-expanded": isOpen,
        "data-ocid": "settings.faq.toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 16,
              className: cn(
                "text-muted-foreground shrink-0 transition-transform duration-200",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pb-4 text-sm text-muted-foreground leading-relaxed", children: a })
  ] });
}
function AvatarUpload({
  currentUrl,
  onUploaded,
  isUploading,
  setIsUploading
}) {
  const fileRef = reactExports.useRef(null);
  const [progress, setProgress] = reactExports.useState(0);
  const [preview, setPreview] = reactExports.useState(null);
  async function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setPreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
    setIsUploading(true);
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setProgress(pct)
      );
      onUploaded(blob);
    } catch {
      ue.error("Failed to prepare image. Try again.");
      setIsUploading(false);
    }
  }
  const displayUrl = preview ?? currentUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        disabled: isUploading,
        className: "relative group",
        "aria-label": "Change avatar",
        "data-ocid": "settings.avatar.upload_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted border-2 border-border overflow-hidden", children: displayUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: displayUrl,
              alt: "Avatar",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 32 }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-md group-hover:scale-110 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 13, className: "text-accent-foreground" }) }),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-background/70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-accent", children: [
            progress,
            "%"
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tap to change profile photo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFile,
        "data-ocid": "settings.avatar.input"
      }
    )
  ] });
}
function SettingsPage() {
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [isPrivate, setIsPrivate] = reactExports.useState(false);
  const [whoCanComment, setWhoCanComment] = reactExports.useState(
    "everyone"
  );
  const [pendingAvatar, setPendingAvatar] = reactExports.useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = reactExports.useState(false);
  const [saveStatus, setSaveStatus] = reactExports.useState("idle");
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorLoading
  });
  reactExports.useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.displayName);
    setUsername(profile.username);
    setBio(profile.bio);
    setIsPrivate(profile.isPrivate);
  }, [profile]);
  const saveProfileMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (pendingAvatar) {
        await actor.updateCallerAvatar(pendingAvatar);
        setPendingAvatar(null);
        setIsUploadingAvatar(false);
      }
      await actor.saveCallerUserProfile(
        displayName.trim(),
        username.trim(),
        bio.trim(),
        isPrivate
      );
    },
    onSuccess: () => {
      setSaveStatus("saved");
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      ue.success("Profile saved!");
      setTimeout(() => setSaveStatus("idle"), 2e3);
    },
    onError: (err) => {
      setSaveStatus("error");
      ue.error((err == null ? void 0 : err.message) ?? "Failed to save profile.");
      setTimeout(() => setSaveStatus("idle"), 2e3);
    }
  });
  const savePrivacyMutation = useMutation({
    mutationFn: async (newPrivate) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile(
        displayName.trim(),
        username.trim(),
        bio.trim(),
        newPrivate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      ue.success("Privacy settings updated.");
    },
    onError: () => {
      ue.error("Failed to update privacy settings.");
    }
  });
  function handlePrivateToggle(val) {
    setIsPrivate(val);
    savePrivacyMutation.mutate(val);
  }
  function handleSignOut() {
    clear();
    navigate({ to: "/login" });
  }
  const isLoading = profileLoading || actorLoading;
  const avatarUrl = (profile == null ? void 0 : profile.avatarStorageKey) ? profile.avatarStorageKey.getDirectURL() : null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-full",
        "data-ocid": "settings.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", message: "Loading settings…" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full overflow-y-auto bg-background pb-6",
      "data-ocid": "settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Settings" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.account.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 }),
              title: "Account",
              subtitle: "Manage your profile information"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 glass-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AvatarUpload,
            {
              currentUrl: avatarUrl,
              isUploading: isUploadingAvatar,
              setIsUploading: setIsUploadingAvatar,
              onUploaded: (blob) => setPendingAvatar(blob)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-3 glass-card p-4 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "displayName",
                  className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: "Display Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "displayName",
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  placeholder: "Your full name",
                  maxLength: 50,
                  className: "bg-muted/40 border-input",
                  "data-ocid": "settings.display_name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "username",
                  className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: "Username"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none", children: "@" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "username",
                    value: username,
                    onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, "")),
                    placeholder: "your_username",
                    maxLength: 30,
                    className: "pl-7 bg-muted/40 border-input",
                    "data-ocid": "settings.username.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "bio",
                  className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                  children: "Bio"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "bio",
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  placeholder: "Tell people about yourself…",
                  maxLength: 200,
                  rows: 3,
                  className: "bg-muted/40 border-input resize-none",
                  "data-ocid": "settings.bio.textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                bio.length,
                "/200"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => {
                  setSaveStatus("saving");
                  saveProfileMutation.mutate();
                },
                disabled: saveProfileMutation.isPending || isUploadingAvatar,
                className: "w-full btn-primary",
                "data-ocid": "settings.account.save_button",
                children: saveProfileMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                  "Saving…"
                ] }) : saveStatus === "saved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }),
                  "Saved!"
                ] }) : saveStatus === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 }),
                  "Try Again"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
                  "Save Changes"
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2 mx-4 bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.privacy.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 }),
              title: "Privacy",
              subtitle: "Control who can see your content"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 glass-card divide-y divide-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-4 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Private Account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: "Only approved followers can see your posts and profile" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: isPrivate,
                  onCheckedChange: handlePrivateToggle,
                  disabled: savePrivacyMutation.isPending,
                  "data-ocid": "settings.privacy.private_account.switch"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Who can comment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Choose who can comment on your videos" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["everyone", "followers"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setWhoCanComment(option),
                  className: cn(
                    "flex-1 py-2 rounded-xl text-sm font-medium transition-smooth capitalize",
                    whoCanComment === option ? "bg-accent text-accent-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  ),
                  "data-ocid": `settings.privacy.comment.${option}`,
                  children: option === "everyone" ? "Everyone" : "Followers Only"
                },
                option
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2 mx-4 bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.help.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { size: 16 }),
              title: "Help & Support",
              subtitle: "Frequently asked questions"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 glass-card overflow-hidden", children: FAQ_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: item.q, a: item.a }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-between px-4 py-3.5 glass-card text-sm text-foreground hover:bg-card/80 transition-smooth",
              "data-ocid": "settings.contact_support.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Contact Support" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2 mx-4 bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 pt-4 pb-2", "data-ocid": "settings.signout.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              className: "w-full flex items-center gap-2 rounded-xl",
              onClick: handleSignOut,
              "data-ocid": "settings.signout.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
                "Sign Out"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "RawatX v1.0 · Built with caffeine.ai" })
        ] })
      ]
    }
  );
}
export {
  SettingsPage as default
};
