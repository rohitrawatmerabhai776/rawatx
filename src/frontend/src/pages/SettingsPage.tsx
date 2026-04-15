import { ExternalBlob } from "@/backend";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Lock,
  LogOut,
  Save,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    id: "faq-coins",
    q: "How do I earn coins on RawatX?",
    a: "You can earn coins by watching ads (up to 10 per day), logging in daily for a bonus, and referring friends using your unique referral code. Each ad watch earns you 2 coins, daily login gives 5–20 coins, and successful referrals award 10 coins.",
  },
  {
    id: "faq-withdrawal",
    q: "How do I withdraw my earnings?",
    a: "Go to the Wallet tab and tap 'Withdraw'. The minimum withdrawal amount is ₹50 (10,000 coins). Withdrawals are processed in 3–5 business days via UPI or bank transfer. Make sure your account details are verified before requesting.",
  },
  {
    id: "faq-conversion",
    q: "What is the coin to rupee conversion rate?",
    a: "1000 coins = ₹5 (200 coins per rupee). You need at least 10,000 coins (₹50) to make a withdrawal request. Conversion rates may be updated from time to time; check the Wallet page for the current rate.",
  },
  {
    id: "faq-security",
    q: "How do I keep my account secure?",
    a: "RawatX uses Internet Identity for secure, passwordless login — no passwords to remember or lose. You can set your profile to private so only approved followers see your content. Use 'Block & Report' for any suspicious accounts.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 pt-6 pb-3">
      <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-semibold font-display text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-4 text-left gap-3 hover:bg-muted/30 transition-smooth"
        aria-expanded={isOpen}
        data-ocid="settings.faq.toggle"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted-foreground shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Avatar Upload ────────────────────────────────────────────────────────────
function AvatarUpload({
  currentUrl,
  onUploaded,
  isUploading,
  setIsUploading,
}: {
  currentUrl: string | null;
  onUploaded: (blob: ExternalBlob) => void;
  isUploading: boolean;
  setIsUploading: (v: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    // Local preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    setProgress(0);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setProgress(pct),
      );
      onUploaded(blob);
    } catch {
      toast.error("Failed to prepare image. Try again.");
      setIsUploading(false);
    }
  }

  const displayUrl = preview ?? currentUrl;

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={isUploading}
        className="relative group"
        aria-label="Change avatar"
        data-ocid="settings.avatar.upload_button"
      >
        <div className="w-20 h-20 rounded-full bg-muted border-2 border-border overflow-hidden">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <User size={32} />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-md group-hover:scale-110 transition-smooth">
          <Camera size={13} className="text-accent-foreground" />
        </div>
        {isUploading && (
          <div className="absolute inset-0 rounded-full bg-background/70 flex items-center justify-center">
            <span className="text-xs font-mono text-accent">{progress}%</span>
          </div>
        )}
      </button>
      <p className="text-xs text-muted-foreground">
        Tap to change profile photo
      </p>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        data-ocid="settings.avatar.input"
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const { actor, isLoading: actorLoading } = useBackend();
  const queryClient = useQueryClient();

  // ── Form state ──
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [whoCanComment, setWhoCanComment] = useState<"everyone" | "followers">(
    "everyone",
  );
  const [pendingAvatar, setPendingAvatar] = useState<ExternalBlob | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // ── Load profile ──
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorLoading,
  });

  // Populate form when profile loads
  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.displayName);
    setUsername(profile.username);
    setBio(profile.bio);
    setIsPrivate(profile.isPrivate);
  }, [profile]);

  // ── Save profile mutation ──
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
        isPrivate,
      );
    },
    onSuccess: () => {
      setSaveStatus("saved");
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      toast.success("Profile saved!");
      setTimeout(() => setSaveStatus("idle"), 2000);
    },
    onError: (err: Error) => {
      setSaveStatus("error");
      toast.error(err?.message ?? "Failed to save profile.");
      setTimeout(() => setSaveStatus("idle"), 2000);
    },
  });

  // ── Privacy toggle mutation ──
  const savePrivacyMutation = useMutation({
    mutationFn: async (newPrivate: boolean) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile(
        displayName.trim(),
        username.trim(),
        bio.trim(),
        newPrivate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
      toast.success("Privacy settings updated.");
    },
    onError: () => {
      toast.error("Failed to update privacy settings.");
    },
  });

  function handlePrivateToggle(val: boolean) {
    setIsPrivate(val);
    savePrivacyMutation.mutate(val);
  }

  function handleSignOut() {
    clear();
    navigate({ to: "/login" });
  }

  const isLoading = profileLoading || actorLoading;
  const avatarUrl = profile?.avatarStorageKey
    ? profile.avatarStorageKey.getDirectURL()
    : null;

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-full"
        data-ocid="settings.loading_state"
      >
        <LoadingSpinner size="md" message="Loading settings…" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto bg-background pb-6"
      data-ocid="settings.page"
    >
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold font-display text-foreground">
          Settings
        </h1>
      </div>

      {/* ── Account Section ──────────────────────────────────────────── */}
      <section data-ocid="settings.account.section">
        <SectionHeader
          icon={<User size={16} />}
          title="Account"
          subtitle="Manage your profile information"
        />

        {/* Avatar */}
        <div className="mx-4 glass-card">
          <AvatarUpload
            currentUrl={avatarUrl}
            isUploading={isUploadingAvatar}
            setIsUploading={setIsUploadingAvatar}
            onUploaded={(blob) => setPendingAvatar(blob)}
          />
        </div>

        {/* Profile form */}
        <div className="mx-4 mt-3 glass-card p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="displayName"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              maxLength={50}
              className="bg-muted/40 border-input"
              data-ocid="settings.display_name.input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="username"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Username
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">
                @
              </span>
              <Input
                id="username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                }
                placeholder="your_username"
                maxLength={30}
                className="pl-7 bg-muted/40 border-input"
                data-ocid="settings.username.input"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="bio"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
            >
              Bio
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people about yourself…"
              maxLength={200}
              rows={3}
              className="bg-muted/40 border-input resize-none"
              data-ocid="settings.bio.textarea"
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/200
            </p>
          </div>

          <Button
            onClick={() => {
              setSaveStatus("saving");
              saveProfileMutation.mutate();
            }}
            disabled={saveProfileMutation.isPending || isUploadingAvatar}
            className="w-full btn-primary"
            data-ocid="settings.account.save_button"
          >
            {saveProfileMutation.isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Saving…
              </span>
            ) : saveStatus === "saved" ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Saved!
              </span>
            ) : saveStatus === "error" ? (
              <span className="flex items-center gap-2">
                <AlertCircle size={16} />
                Try Again
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={16} />
                Save Changes
              </span>
            )}
          </Button>
        </div>
      </section>

      <Separator className="my-2 mx-4 bg-border/40" />

      {/* ── Privacy Section ──────────────────────────────────────────── */}
      <section data-ocid="settings.privacy.section">
        <SectionHeader
          icon={<Lock size={16} />}
          title="Privacy"
          subtitle="Control who can see your content"
        />

        <div className="mx-4 glass-card divide-y divide-border/50">
          {/* Private account toggle */}
          <div className="flex items-center justify-between px-4 py-4 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Private Account
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Only approved followers can see your posts and profile
              </p>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={handlePrivateToggle}
              disabled={savePrivacyMutation.isPending}
              data-ocid="settings.privacy.private_account.switch"
            />
          </div>

          {/* Who can comment */}
          <div className="px-4 py-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-foreground">
                Who can comment
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose who can comment on your videos
              </p>
            </div>
            <div className="flex gap-2">
              {(["everyone", "followers"] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setWhoCanComment(option)}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-sm font-medium transition-smooth capitalize",
                    whoCanComment === option
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                  data-ocid={`settings.privacy.comment.${option}`}
                >
                  {option === "everyone" ? "Everyone" : "Followers Only"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-2 mx-4 bg-border/40" />

      {/* ── Help & Support Section ───────────────────────────────────── */}
      <section data-ocid="settings.help.section">
        <SectionHeader
          icon={<HelpCircle size={16} />}
          title="Help & Support"
          subtitle="Frequently asked questions"
        />

        <div className="mx-4 glass-card overflow-hidden">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.id} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Contact support link */}
        <div className="mx-4 mt-3">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3.5 glass-card text-sm text-foreground hover:bg-card/80 transition-smooth"
            data-ocid="settings.contact_support.button"
          >
            <span className="font-medium">Contact Support</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </section>

      <Separator className="my-2 mx-4 bg-border/40" />

      {/* ── Sign Out ─────────────────────────────────────────────────── */}
      <section className="px-4 pt-4 pb-2" data-ocid="settings.signout.section">
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2 rounded-xl"
          onClick={handleSignOut}
          data-ocid="settings.signout.button"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          RawatX v1.0 · Built with caffeine.ai
        </p>
      </section>
    </div>
  );
}
