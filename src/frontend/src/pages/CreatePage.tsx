import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Hash,
  RotateCcw,
  Upload,
  Video,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ─────────────────────────────────────────────────────────────────

const MIN_DURATION = 10;
const MAX_DURATION = 60;
const MAX_CAPTION = 150;

// ─── Types ─────────────────────────────────────────────────────────────────────

type UploadState = "idle" | "uploading" | "success" | "error";

// ─── CreatePage ────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const navigate = useNavigate();
  const { actor } = useBackend();

  // File state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Form state
  const [caption, setCaption] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  // Upload state
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // ─── File handling ──────────────────────────────────────────────────────────

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setFileError(null);
      setUploadState("idle");
      setUploadError(null);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    },
    [previewUrl],
  );

  const handleLoadedMetadata = useCallback(() => {
    const video = videoPreviewRef.current;
    if (!video) return;
    const dur = video.duration;
    if (dur < MIN_DURATION) {
      setFileError(
        `Video too short (${Math.floor(dur)}s). Minimum is ${MIN_DURATION}s.`,
      );
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } else if (dur > MAX_DURATION) {
      setFileError(
        `Video too long (${Math.floor(dur)}s). Maximum is ${MAX_DURATION}s.`,
      );
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);

  // ─── Hashtag handling ───────────────────────────────────────────────────────

  const commitHashtags = useCallback((raw: string) => {
    const parts = raw
      .split(",")
      .map((t) => t.trim().replace(/^#+/, "").toLowerCase())
      .filter((t) => t.length > 0);
    if (parts.length === 0) return;
    setHashtags((prev) => [...new Set([...prev, ...parts])].slice(0, 10));
    setHashtagInput("");
  }, []);

  const handleHashtagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        commitHashtags(hashtagInput);
      }
    },
    [hashtagInput, commitHashtags],
  );

  const handleHashtagBlur = useCallback(() => {
    if (hashtagInput.trim()) commitHashtags(hashtagInput);
  }, [hashtagInput, commitHashtags]);

  const removeHashtag = useCallback((tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  }, []);

  // ─── Upload ─────────────────────────────────────────────────────────────────

  const handleUpload = useCallback(async () => {
    if (!actor || !selectedFile) return;

    setUploadState("uploading");
    setProgress(0);
    setUploadError(null);

    try {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct: number) => setProgress(pct),
      );

      await actor.uploadVideo(blob, caption.trim(), hashtags);

      setUploadState("success");
      toast.success("Reel uploaded! Redirecting…");
      setTimeout(() => navigate({ to: "/" }), 2000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setUploadError(msg);
      setUploadState("error");
    }
  }, [actor, selectedFile, caption, hashtags, navigate]);

  const handleRetry = useCallback(() => {
    setUploadState("idle");
    setUploadError(null);
    setProgress(0);
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  const canUpload = !!selectedFile && uploadState === "idle" && !fileError;
  const isUploading = uploadState === "uploading";
  const isSuccess = uploadState === "success";

  return (
    <div className="content-with-nav overflow-y-auto" data-ocid="create.page">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* ── Header ── */}
        <div className="space-y-1">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Post a Reel
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload a short video (10–60 seconds)
          </p>
        </div>

        {/* ── Video dropzone / preview ── */}
        <div className="space-y-3">
          {!previewUrl ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="create.dropzone"
              className="w-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 py-12 transition-smooth hover:border-primary hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <Video className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-semibold text-foreground">
                  Tap to select video
                </p>
                <p className="text-xs text-muted-foreground">
                  MP4 or WebM · 10–60 seconds
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <Upload className="w-4 h-4" />
                Browse files
              </div>
            </button>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
              <video
                ref={videoPreviewRef}
                src={previewUrl}
                onLoadedMetadata={handleLoadedMetadata}
                controls
                playsInline
                muted
                className="w-full max-h-72 object-contain"
                data-ocid="create.video_preview"
              />
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove video"
                data-ocid="create.remove_video_button"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-smooth hover:bg-destructive hover:text-destructive-foreground border border-border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.webm,video/mp4,video/webm"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="create.file_input"
          />

          {/* File validation error */}
          {fileError && (
            <div
              className="flex items-start gap-2 text-destructive text-sm p-3 rounded-xl border border-border bg-card"
              data-ocid="create.file_error_state"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
              <span>{fileError}</span>
            </div>
          )}
        </div>

        {/* ── Caption ── */}
        <div className="space-y-2">
          <label
            htmlFor="caption"
            className="text-sm font-medium text-foreground"
          >
            Caption{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, MAX_CAPTION))}
            placeholder="Write something about your reel…"
            rows={3}
            className="resize-none rounded-xl"
            data-ocid="create.caption_input"
          />
          <p className="text-xs text-muted-foreground text-right">
            {caption.length}/{MAX_CAPTION}
          </p>
        </div>

        {/* ── Hashtags ── */}
        <div className="space-y-2">
          <label
            htmlFor="hashtags"
            className="text-sm font-medium text-foreground"
          >
            Hashtags{" "}
            <span className="text-muted-foreground font-normal">
              (optional · comma-separated)
            </span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="hashtags"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
              onBlur={handleHashtagBlur}
              placeholder="reels, trending, viral"
              className="pl-9 rounded-xl"
              data-ocid="create.hashtag_input"
            />
          </div>
          {hashtags.length > 0 && (
            <div
              className="flex flex-wrap gap-2 pt-1"
              data-ocid="create.hashtag_chips"
            >
              {hashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => removeHashtag(tag)}
                  aria-label={`Remove #${tag}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium transition-smooth hover:bg-destructive/10 hover:text-destructive border border-primary/20"
                >
                  #{tag}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Upload progress ── */}
        {isUploading && (
          <div className="space-y-2" data-ocid="create.upload_loading_state">
            <div className="flex justify-between text-sm">
              <span className="text-foreground font-medium">Uploading…</span>
              <span className="text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Please don't close this page
            </p>
          </div>
        )}

        {/* ── Success state ── */}
        {isSuccess && (
          <div
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl"
            data-ocid="create.upload_success_state"
          >
            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">
                Reel uploaded successfully!
              </p>
              <p className="text-xs text-muted-foreground">
                Redirecting to your feed…
              </p>
            </div>
          </div>
        )}

        {/* ── Upload error ── */}
        {uploadState === "error" && uploadError && (
          <div
            className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl"
            data-ocid="create.upload_error_state"
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-destructive text-sm">
                Upload failed
              </p>
              <p className="text-xs text-muted-foreground break-words mt-0.5">
                {uploadError}
              </p>
            </div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="flex gap-3 pb-4">
          {uploadState === "error" ? (
            <Button
              variant="outline"
              onClick={handleRetry}
              className="flex-1 rounded-xl gap-2"
              data-ocid="create.retry_button"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          ) : (
            <Button
              onClick={handleUpload}
              disabled={!canUpload || isUploading || isSuccess}
              className="flex-1 rounded-xl gap-2"
              data-ocid="create.submit_button"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? "Uploading…" : "Post Reel"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
