import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-icaUxuqU.js";
import { E as ExternalBlob } from "./backend-DR4VLygV.js";
import { I as Input } from "./input-Bfxb9wHU.js";
import { T as Textarea } from "./textarea-pkBCkQVp.js";
import { u as useBackend } from "./useBackend-DFUV52a7.js";
import { u as ue } from "./index-DUPPr5Ke.js";
import { X } from "./x-CnP5d9p0.js";
import { C as CircleAlert, a as CircleCheck } from "./circle-check-B-ISMp_V.js";
import { H as Hash } from "./hash-DsDqu-M-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const MIN_DURATION = 10;
const MAX_DURATION = 60;
const MAX_CAPTION = 150;
function CreatePage() {
  const navigate = useNavigate();
  const { actor } = useBackend();
  const fileInputRef = reactExports.useRef(null);
  const videoPreviewRef = reactExports.useRef(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [fileError, setFileError] = reactExports.useState(null);
  const [caption, setCaption] = reactExports.useState("");
  const [hashtagInput, setHashtagInput] = reactExports.useState("");
  const [hashtags, setHashtags] = reactExports.useState([]);
  const [uploadState, setUploadState] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [uploadError, setUploadError] = reactExports.useState(null);
  const handleFileChange = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFileError(null);
      setUploadState("idle");
      setUploadError(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    },
    [previewUrl]
  );
  const handleLoadedMetadata = reactExports.useCallback(() => {
    const video = videoPreviewRef.current;
    if (!video) return;
    const dur = video.duration;
    if (dur < MIN_DURATION) {
      setFileError(
        `Video too short (${Math.floor(dur)}s). Minimum is ${MIN_DURATION}s.`
      );
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } else if (dur > MAX_DURATION) {
      setFileError(
        `Video too long (${Math.floor(dur)}s). Maximum is ${MAX_DURATION}s.`
      );
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);
  const clearFile = reactExports.useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);
  const commitHashtags = reactExports.useCallback((raw) => {
    const parts = raw.split(",").map((t) => t.trim().replace(/^#+/, "").toLowerCase()).filter((t) => t.length > 0);
    if (parts.length === 0) return;
    setHashtags((prev) => [.../* @__PURE__ */ new Set([...prev, ...parts])].slice(0, 10));
    setHashtagInput("");
  }, []);
  const handleHashtagKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        commitHashtags(hashtagInput);
      }
    },
    [hashtagInput, commitHashtags]
  );
  const handleHashtagBlur = reactExports.useCallback(() => {
    if (hashtagInput.trim()) commitHashtags(hashtagInput);
  }, [hashtagInput, commitHashtags]);
  const removeHashtag = reactExports.useCallback((tag) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  }, []);
  const handleUpload = reactExports.useCallback(async () => {
    if (!actor || !selectedFile) return;
    setUploadState("uploading");
    setProgress(0);
    setUploadError(null);
    try {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setProgress(pct)
      );
      await actor.uploadVideo(blob, caption.trim(), hashtags);
      setUploadState("success");
      ue.success("Reel uploaded! Redirecting…");
      setTimeout(() => navigate({ to: "/" }), 2e3);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setUploadError(msg);
      setUploadState("error");
    }
  }, [actor, selectedFile, caption, hashtags, navigate]);
  const handleRetry = reactExports.useCallback(() => {
    setUploadState("idle");
    setUploadError(null);
    setProgress(0);
  }, []);
  const canUpload = !!selectedFile && uploadState === "idle" && !fileError;
  const isUploading = uploadState === "uploading";
  const isSuccess = uploadState === "success";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "content-with-nav overflow-y-auto", "data-ocid": "create.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Post a Reel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload a short video (10–60 seconds)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      !previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          "data-ocid": "create.dropzone",
          className: "w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 py-12 transition-smooth hover:border-primary hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Tap to select video" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "MP4 or WebM · 10–60 seconds" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              "Browse files"
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-card border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoPreviewRef,
            src: previewUrl,
            onLoadedMetadata: handleLoadedMetadata,
            controls: true,
            playsInline: true,
            muted: true,
            className: "w-full max-h-72 object-contain",
            "data-ocid": "create.video_preview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearFile,
            "aria-label": "Remove video",
            "data-ocid": "create.remove_video_button",
            className: "absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-destructive hover:text-destructive-foreground border border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: ".mp4,.webm,video/mp4,video/webm",
          className: "hidden",
          onChange: handleFileChange,
          "data-ocid": "create.file_input"
        }
      ),
      fileError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-2 text-destructive text-sm p-3 rounded-xl border border-border bg-card",
          "data-ocid": "create.file_error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fileError })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "caption",
          className: "text-sm font-medium text-foreground",
          children: [
            "Caption",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "caption",
          value: caption,
          onChange: (e) => setCaption(e.target.value.slice(0, MAX_CAPTION)),
          placeholder: "Write something about your reel…",
          rows: 3,
          className: "resize-none rounded-xl",
          "data-ocid": "create.caption_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
        caption.length,
        "/",
        MAX_CAPTION
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "hashtags",
          className: "text-sm font-medium text-foreground",
          children: [
            "Hashtags",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional · comma-separated)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hashtags",
            value: hashtagInput,
            onChange: (e) => setHashtagInput(e.target.value),
            onKeyDown: handleHashtagKeyDown,
            onBlur: handleHashtagBlur,
            placeholder: "reels, trending, viral",
            className: "pl-9 rounded-xl",
            "data-ocid": "create.hashtag_input"
          }
        )
      ] }),
      hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2 pt-1",
          "data-ocid": "create.hashtag_chips",
          children: hashtags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => removeHashtag(tag),
              "aria-label": `Remove #${tag}`,
              className: "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium transition-smooth hover:bg-destructive/10 hover:text-destructive border border-primary/20",
              children: [
                "#",
                tag,
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
              ]
            },
            tag
          ))
        }
      )
    ] }),
    isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "create.upload_loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Uploading…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          Math.round(progress),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full bg-primary transition-all duration-300 ease-out",
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Please don't close this page" })
    ] }),
    isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-4 bg-card border border-border rounded-2xl",
        "data-ocid": "create.upload_success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Reel uploaded successfully!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Redirecting to your feed…" })
          ] })
        ]
      }
    ),
    uploadState === "error" && uploadError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 bg-card border border-border rounded-2xl",
        "data-ocid": "create.upload_error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive text-sm", children: "Upload failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground break-words mt-0.5", children: uploadError })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 pb-4", children: uploadState === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: handleRetry,
        className: "flex-1 rounded-xl gap-2",
        "data-ocid": "create.retry_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
          "Try Again"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: handleUpload,
        disabled: !canUpload || isUploading || isSuccess,
        className: "flex-1 rounded-xl gap-2",
        "data-ocid": "create.submit_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          isUploading ? "Uploading…" : "Post Reel"
        ]
      }
    ) })
  ] }) });
}
export {
  CreatePage as default
};
