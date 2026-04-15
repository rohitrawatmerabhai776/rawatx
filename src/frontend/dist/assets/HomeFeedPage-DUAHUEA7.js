const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BH3m4v91.js","assets/index-icaUxuqU.js","assets/index-DophPnGc.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, r as reactExports, y as useComposedRefs, j as jsxRuntimeExports, a as cn, B as Button, u as useNavigate, _ as __vitePreload } from "./index-icaUxuqU.js";
import { u as useActor, c as createActor } from "./backend-DR4VLygV.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-DkG-3Qld.js";
import { I as Input } from "./input-Bfxb9wHU.js";
import { P as Primitive, c as createContextScope, a as composeEventHandlers } from "./index-Dx66lMgM.js";
import { b as Presence, R as Root$1, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-Dn3nN7eh.js";
import { u as useCallbackRef } from "./index-C_eq0hJt.js";
import { u as useLayoutEffect2 } from "./index-NUY2MX8U.js";
import { X } from "./x-CnP5d9p0.js";
import { P as Play } from "./index-BH3m4v91.js";
import { U as UserPlus, H as Heart, M as MessageCircle, S as Share2 } from "./user-plus-CyIPX_c9.js";
import { u as ue } from "./index-DUPPr5Ke.js";
import "./index-BpfHV-hv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$2);
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
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
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
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function timeAgo(ts) {
  const diffMs = Date.now() - Number(ts / BigInt(1e6));
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}
function CommentsPanel({
  videoId,
  open,
  onClose,
  onCountChange
}) {
  const { actor } = useActor(createActor);
  const [comments, setComments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [text, setText] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const onCountChangeRef = reactExports.useRef(onCountChange);
  onCountChangeRef.current = onCountChange;
  reactExports.useEffect(() => {
    if (!open || videoId === null || !actor) return;
    setLoading(true);
    actor.getComments(videoId).then((c) => {
      var _a;
      setComments(c);
      (_a = onCountChangeRef.current) == null ? void 0 : _a.call(onCountChangeRef, c.length);
    }).finally(() => setLoading(false));
  }, [open, videoId, actor]);
  const handleSubmit = reactExports.useCallback(async () => {
    if (!text.trim() || !actor || videoId === null) return;
    setSubmitting(true);
    try {
      const newComment = await actor.addComment(videoId, text.trim());
      setComments((prev) => {
        var _a;
        const next = [...prev, newComment];
        (_a = onCountChangeRef.current) == null ? void 0 : _a.call(onCountChangeRef, next.length);
        return next;
      });
      setText("");
    } finally {
      setSubmitting(false);
    }
  }, [text, actor, videoId]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "bottom",
      className: "h-[70vh] rounded-t-2xl bg-card border-t border-border p-0 flex flex-col",
      "data-ocid": "comments.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-4 pt-4 pb-2 border-b border-border shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-foreground font-display text-base", children: "Comments" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 px-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col gap-3 pt-4",
            "data-ocid": "comments.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 animate-pulse", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-muted shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" })
              ] })
            ] }, i))
          }
        ) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center h-32 text-muted-foreground text-sm",
            "data-ocid": "comments.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No comments yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Be the first to comment!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 py-4", children: comments.map((comment, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-3",
            "data-ocid": `comments.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-9 h-9 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: "/assets/images/placeholder.svg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-muted text-muted-foreground text-xs", children: "U" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold text-sm truncate", children: "@user" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs shrink-0", children: timeAgo(comment.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm break-words mt-0.5", children: comment.text })
              ] })
            ]
          },
          comment.id.toString()
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-t border-border shrink-0 bottom-nav-safe", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref: inputRef,
              value: text,
              onChange: (e) => setText(e.target.value),
              onKeyDown: handleKeyDown,
              placeholder: "Add a comment…",
              className: "flex-1 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-full px-4 h-10",
              maxLength: 300,
              "data-ocid": "comments.input",
              disabled: submitting
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              className: "h-10 w-10 rounded-full bg-accent text-accent-foreground shrink-0",
              onClick: handleSubmit,
              disabled: !text.trim() || submitting,
              "aria-label": "Send comment",
              "data-ocid": "comments.submit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ]
    }
  ) });
}
function formatCount(n) {
  const num = Number(n);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return String(num);
}
function VideoCard({
  video,
  isActive,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onProfileClick,
  onFollow,
  followedUsers,
  index
}) {
  const videoRef = reactExports.useRef(null);
  const [muted, setMuted] = reactExports.useState(true);
  const [paused, setPaused] = reactExports.useState(false);
  const [showPlayIcon, setShowPlayIcon] = reactExports.useState(false);
  const playIconTimerRef = reactExports.useRef(null);
  const isFollowed = followedUsers.has(video.userId.toString());
  reactExports.useEffect(() => {
    const el = videoRef.current;
    if (!el || !video.videoUrl) return;
    if (isActive) {
      el.play().catch(() => {
      });
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isActive, video.videoUrl]);
  const handleVideoTap = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {
      });
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
    setShowPlayIcon(true);
    if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
    playIconTimerRef.current = setTimeout(() => setShowPlayIcon(false), 800);
  };
  const handleFollowClick = (e) => {
    e.stopPropagation();
    onFollow(video.userId.toString());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full bg-background",
      "data-ocid": `video.item.${index + 1}`,
      children: [
        video.videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: video.videoUrl,
            className: "absolute inset-0 w-full h-full object-cover cursor-pointer",
            loop: true,
            playsInline: true,
            muted,
            preload: "metadata",
            poster: video.thumbnailUrl || void 0,
            onClick: handleVideoTap,
            onKeyDown: (e) => e.key === "Enter" && handleVideoTap(),
            "data-ocid": `video.canvas_target.${index + 1}`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 flex items-center justify-center bg-muted w-full h-full",
            onClick: handleVideoTap,
            children: video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: video.thumbnailUrl,
                alt: video.caption,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-16 h-16 text-muted-foreground/40" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" }),
        showPlayIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-black/40 flex items-center justify-center animate-ping-once", children: paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white", fill: "white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-8 border-l-4 border-r-4 border-white mr-0" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute top-14 right-3 z-10 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center transition-smooth active:scale-90",
            onClick: () => setMuted((m) => !m),
            "aria-label": muted ? "Unmute video" : "Mute video",
            "data-ocid": `video.toggle.${index + 1}`,
            children: muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "relative",
                onClick: () => onProfileClick(video.userId.toString()),
                "aria-label": `View ${video.displayName}'s profile`,
                "data-ocid": `video.profile_link.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: video.profilePhoto || "/assets/images/placeholder.svg",
                    alt: video.displayName,
                    className: "w-11 h-11 rounded-full border-2 border-accent object-cover"
                  }
                )
              }
            ),
            !isFollowed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-6 h-6 rounded-full bg-accent flex items-center justify-center -mt-3 z-10 transition-smooth active:scale-90",
                onClick: handleFollowClick,
                "aria-label": `Follow ${video.displayName}`,
                "data-ocid": `video.follow_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3 h-3 text-accent-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: cn(
                    "w-7 h-7 transition-smooth",
                    video.isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"
                  )
                }
              ),
              label: formatCount(video.likesCount),
              onClick: () => onLike(video.id),
              ariaLabel: video.isLiked ? "Unlike video" : "Like video",
              ocid: `video.like_button.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 text-white" }),
              label: formatCount(video.commentsCount),
              onClick: () => onComment(video.id),
              ariaLabel: "View comments",
              ocid: `video.comment_button.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bookmark,
                {
                  className: cn(
                    "w-7 h-7 transition-smooth",
                    video.isBookmarked ? "fill-accent text-accent" : "text-white"
                  )
                }
              ),
              label: "Save",
              onClick: () => onBookmark(video.id),
              ariaLabel: video.isBookmarked ? "Remove bookmark" : "Bookmark video",
              ocid: `video.bookmark_button.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-7 h-7 text-white" }),
              label: "Share",
              onClick: () => onShare(video.id),
              ariaLabel: "Share video",
              ocid: `video.share_button.${index + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-6 h-6 text-white/70" }),
              label: "",
              onClick: () => {
              },
              ariaLabel: "More options",
              ocid: `video.more_button.${index + 1}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-20 left-3 right-16 z-10 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-2",
              onClick: () => onProfileClick(video.userId.toString()),
              "data-ocid": `video.username_link.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-white text-sm drop-shadow", children: [
                  "@",
                  video.username
                ] }),
                isFollowed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-[10px] font-semibold border border-accent rounded px-1", children: "Following" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm leading-snug line-clamp-2 max-w-xs drop-shadow", children: video.caption }),
          video.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: video.hashtags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-accent text-xs font-medium drop-shadow",
              children: [
                "#",
                tag
              ]
            },
            tag
          )) })
        ] })
      ]
    }
  );
}
function ActionButton({
  icon,
  label,
  onClick,
  ariaLabel,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "flex flex-col items-center gap-0.5 group transition-smooth active:scale-90",
      onClick,
      "aria-label": ariaLabel,
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 flex items-center justify-center drop-shadow-md", children: icon }),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold leading-none drop-shadow", children: label })
      ]
    }
  );
}
const AD_INTERVAL = 6;
const AD_CONTENT = [
  {
    brand: "StudyMax Pro",
    tagline: "Learn faster with AI-powered courses",
    cta: "Try Free",
    gradient: "from-violet-900/80 to-indigo-900/80"
  },
  {
    brand: "EarnyApp",
    tagline: "Earn rewards while you shop online",
    cta: "Get Started",
    gradient: "from-emerald-900/80 to-cyan-900/80"
  },
  {
    brand: "PixelCam",
    tagline: "Edit reels like a pro in seconds",
    cta: "Download Now",
    gradient: "from-rose-900/80 to-orange-900/80"
  }
];
function buildFeedItems(videos, offset) {
  const result = [];
  for (let i = 0; i < videos.length; i++) {
    result.push(videos[i]);
    if ((offset + i + 1) % AD_INTERVAL === 0) {
      result.push({ type: "ad", id: `ad-${offset + i}` });
    }
  }
  return result;
}
function getAdContent(id) {
  const n = Number.parseInt(id.replace("ad-", ""), 10);
  return AD_CONTENT[Math.floor(n / AD_INTERVAL) % AD_CONTENT.length];
}
const PAGE_SIZE = BigInt(10);
function HomeFeedPage() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const [feedItems, setFeedItems] = reactExports.useState([]);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [page, setPage] = reactExports.useState(0);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  const [followedUsers, setFollowedUsers] = reactExports.useState(/* @__PURE__ */ new Set());
  const [commentVideoId, setCommentVideoId] = reactExports.useState(null);
  const [commentPanelOpen, setCommentPanelOpen] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const observerRef = reactExports.useRef(null);
  const itemRefs = reactExports.useRef(/* @__PURE__ */ new Map());
  const loadedVideoIds = reactExports.useRef(/* @__PURE__ */ new Set());
  const viewedRef = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    loadPage(0);
  }, [actor, isFetching]);
  const loadPage = reactExports.useCallback(
    async (pageNum) => {
      if (!actor) return;
      setLoadingMore(true);
      try {
        const offset = BigInt(pageNum) * PAGE_SIZE;
        const videos = await actor.getFeed(offset, PAGE_SIZE);
        const newVideos = videos.filter((v) => !loadedVideoIds.current.has(v.id.toString())).map((v) => ({
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
          createdAt: v.createdAt
        }));
        for (const v of newVideos) loadedVideoIds.current.add(v.id);
        if (videos.length < Number(PAGE_SIZE)) setHasMore(false);
        setFeedItems((prev) => [
          ...prev,
          ...buildFeedItems(newVideos, pageNum * Number(PAGE_SIZE))
        ]);
        setPage(pageNum + 1);
      } finally {
        setLoadingMore(false);
      }
    },
    [actor]
  );
  const feedCountRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    var _a;
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
      { threshold: 0.5 }
    );
    for (const [, el] of itemRefs.current) (_a = observerRef.current) == null ? void 0 : _a.observe(el);
    return () => {
      var _a2;
      return (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    };
  });
  reactExports.useEffect(() => {
    const item = feedItems[activeIndex];
    if (!item || "type" in item || !actor) return;
    const vid = item;
    if (viewedRef.current.has(vid.id)) return;
    viewedRef.current.add(vid.id);
    actor.recordVideoView(BigInt(vid.id)).catch(() => {
    });
  }, [activeIndex, feedItems, actor]);
  reactExports.useEffect(() => {
    if (activeIndex >= feedItems.length - 3 && hasMore && !loadingMore) {
      loadPage(page);
    }
  }, [activeIndex, feedItems, hasMore, loadingMore, page, loadPage]);
  const handleLike = reactExports.useCallback(
    async (videoId) => {
      if (!actor) return;
      setFeedItems(
        (prev) => prev.map((item) => {
          if ("type" in item || item.id !== videoId) return item;
          const liked = !item.isLiked;
          return {
            ...item,
            isLiked: liked,
            likesCount: liked ? item.likesCount + BigInt(1) : item.likesCount - BigInt(1)
          };
        })
      );
      try {
        await actor.toggleLike(BigInt(videoId));
      } catch {
        setFeedItems(
          (prev) => prev.map((item) => {
            if ("type" in item || item.id !== videoId) return item;
            const liked = !item.isLiked;
            return {
              ...item,
              isLiked: liked,
              likesCount: liked ? item.likesCount + BigInt(1) : item.likesCount - BigInt(1)
            };
          })
        );
      }
    },
    [actor]
  );
  const handleFollow = reactExports.useCallback(
    async (userId) => {
      if (!actor) return;
      setFollowedUsers((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
      try {
        const { Principal } = await __vitePreload(async () => {
          const { Principal: Principal2 } = await import("./index-BH3m4v91.js").then((n) => n.i);
          return { Principal: Principal2 };
        }, true ? __vite__mapDeps([0,1,2]) : void 0);
        await actor.followUser(Principal.fromText(userId));
        ue.success("Following!");
      } catch {
        setFollowedUsers((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      }
    },
    [actor]
  );
  const handleShare = reactExports.useCallback((videoId) => {
    const url = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(url).then(() => ue.success("Link copied to clipboard!")).catch(() => ue.error("Could not copy link"));
  }, []);
  const handleComment = reactExports.useCallback((videoId) => {
    setCommentVideoId(BigInt(videoId));
    setCommentPanelOpen(true);
  }, []);
  const handleBookmark = reactExports.useCallback((videoId) => {
    setFeedItems(
      (prev) => prev.map((item) => {
        if ("type" in item || item.id !== videoId) return item;
        return { ...item, isBookmarked: !item.isBookmarked };
      })
    );
    ue.success("Saved!");
  }, []);
  const handleCommentCountChange = reactExports.useCallback(
    (count) => {
      if (commentVideoId === null) return;
      const id = commentVideoId.toString();
      setFeedItems(
        (prev) => prev.map((item) => {
          if ("type" in item || item.id !== id) return item;
          return { ...item, commentsCount: BigInt(count) };
        })
      );
    },
    [commentVideoId]
  );
  if (!actor && isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-full",
        "data-ocid": "home.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Loading feed…" })
        ] })
      }
    );
  }
  if (!isFetching && feedItems.length === 0 && !loadingMore) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full gap-4 px-8 text-center",
        "data-ocid": "home.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🎬" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-foreground font-display font-bold text-lg", children: "No videos yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Be the first to upload a reel and inspire others!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: containerRef,
        className: "h-full w-full overflow-y-scroll snap-y snap-mandatory",
        style: { scrollbarWidth: "none" },
        "data-ocid": "home.page",
        children: [
          feedItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: (el) => {
                if (el) itemRefs.current.set(idx, el);
                else itemRefs.current.delete(idx);
              },
              "data-feed-index": idx,
              className: "w-full snap-start snap-always",
              style: {
                height: "calc(100vh - 64px - env(safe-area-inset-bottom, 0px))"
              },
              children: "type" in item ? /* @__PURE__ */ jsxRuntimeExports.jsx(AdCard, { adId: item.id }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoCard,
                {
                  video: item,
                  isActive: idx === activeIndex,
                  onLike: handleLike,
                  onComment: handleComment,
                  onShare: handleShare,
                  onBookmark: handleBookmark,
                  onProfileClick: (userId) => {
                    navigate({ to: "/profile/$userId", params: { userId } });
                  },
                  onFollow: handleFollow,
                  followedUsers,
                  index: idx
                }
              )
            },
            "type" in item ? item.id : item.id
          )),
          loadingMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full flex items-center justify-center py-8",
              "data-ocid": "home.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentsPanel,
      {
        videoId: commentVideoId,
        open: commentPanelOpen,
        onClose: () => setCommentPanelOpen(false),
        onCountChange: handleCommentCountChange
      }
    )
  ] });
}
function AdCard({ adId }) {
  const ad = getAdContent(adId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative w-full h-full bg-gradient-to-br ${ad.gradient} flex flex-col items-center justify-center gap-6 px-8`,
      "data-ocid": "home.ad_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 bg-black/30 rounded px-2 py-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-xs font-medium tracking-wide", children: "Sponsored" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📱" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-display font-bold text-2xl", children: ad.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base", children: ad.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "btn-accent glow-accent text-sm",
            "data-ocid": "home.ad_cta",
            children: ad.cta
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Advertisement" })
      ]
    }
  );
}
export {
  HomeFeedPage as default
};
