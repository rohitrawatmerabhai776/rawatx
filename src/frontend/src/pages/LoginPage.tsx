import RawatXLogo from "@/components/RawatXLogo";
import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface Sparkle {
  id: string;
  top: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface Ray {
  id: string;
  angle: number;
  xStart: number;
  width: number;
  opacity: number;
}

const SPARKLES: Sparkle[] = [
  { id: "s1", top: 8, left: 12, delay: 0.0, duration: 2.8, size: 3 },
  { id: "s2", top: 14, left: 72, delay: 0.6, duration: 3.4, size: 2 },
  { id: "s3", top: 22, left: 38, delay: 1.1, duration: 2.5, size: 4 },
  { id: "s4", top: 30, left: 88, delay: 0.3, duration: 3.1, size: 2 },
  { id: "s5", top: 42, left: 55, delay: 0.9, duration: 2.7, size: 3 },
  { id: "s6", top: 50, left: 18, delay: 1.5, duration: 3.6, size: 2 },
  { id: "s7", top: 58, left: 80, delay: 0.2, duration: 2.9, size: 4 },
  { id: "s8", top: 65, left: 42, delay: 0.7, duration: 3.3, size: 3 },
  { id: "s9", top: 72, left: 9, delay: 1.2, duration: 2.4, size: 2 },
  { id: "s10", top: 78, left: 65, delay: 0.4, duration: 3.0, size: 3 },
  { id: "s11", top: 84, left: 30, delay: 1.8, duration: 2.6, size: 2 },
  { id: "s12", top: 90, left: 91, delay: 0.1, duration: 3.2, size: 4 },
  { id: "s13", top: 18, left: 95, delay: 1.4, duration: 2.8, size: 2 },
  { id: "s14", top: 46, left: 6, delay: 0.8, duration: 3.5, size: 3 },
  { id: "s15", top: 62, left: 98, delay: 1.6, duration: 2.3, size: 2 },
  { id: "s16", top: 35, left: 62, delay: 0.5, duration: 3.8, size: 3 },
];

const RAYS: Ray[] = [
  { id: "r1", angle: 16, xStart: -20, width: 180, opacity: 0.055 },
  { id: "r2", angle: 20, xStart: -10, width: 180, opacity: 0.045 },
  { id: "r3", angle: 24, xStart: 0, width: 175, opacity: 0.06 },
  { id: "r4", angle: 28, xStart: 10, width: 170, opacity: 0.042 },
  { id: "r5", angle: 32, xStart: 20, width: 165, opacity: 0.05 },
  { id: "r6", angle: 36, xStart: 30, width: 155, opacity: 0.038 },
  { id: "r7", angle: 40, xStart: 38, width: 150, opacity: 0.048 },
];

export default function LoginPage() {
  const { login, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <div
      className="relative flex flex-col items-center justify-between min-h-screen px-6 py-12 overflow-hidden"
      style={{ background: "oklch(0.08 0.018 195)" }}
      data-ocid="login.page"
    >
      {/* ── Diagonal light rays ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {RAYS.map((ray) => (
          <div
            key={ray.id}
            className="absolute bottom-0"
            style={{
              left: `${ray.xStart}%`,
              width: `${ray.width}vw`,
              height: "200vh",
              background: `linear-gradient(${ray.angle}deg, oklch(0.75 0.24 195 / ${ray.opacity}) 0%, transparent 60%)`,
              transformOrigin: "bottom left",
            }}
          />
        ))}
      </div>

      {/* ── Sparkle particles ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {SPARKLES.map((sp) => (
          <div
            key={sp.id}
            className="absolute rounded-full"
            style={{
              top: `${sp.top}%`,
              left: `${sp.left}%`,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: "oklch(0.95 0.12 190)",
              boxShadow: `0 0 ${sp.size * 2}px ${sp.size}px oklch(0.82 0.26 190 / 0.6)`,
              animation: `sparkle-twinkle ${sp.duration}s ease-in-out ${sp.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-sm gap-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <RawatXLogo width={300} />
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="w-full grid grid-cols-3 gap-3"
        >
          {[
            { emoji: "🎬", label: "Watch Reels" },
            { emoji: "💰", label: "Earn Coins" },
            { emoji: "🚀", label: "Go Viral" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5"
              style={{
                background: "oklch(0.14 0.025 195 / 0.7)",
                border: "1px solid oklch(0.75 0.24 195 / 0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-2xl">{f.emoji}</span>
              <span
                className="text-xs font-medium text-center"
                style={{ color: "oklch(0.72 0.08 195)" }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Login CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full space-y-4"
        >
          <Button
            className="w-full h-14 text-base font-display font-bold btn-accent border-0"
            style={{
              boxShadow:
                "0 0 24px oklch(0.75 0.24 195 / 0.45), 0 0 60px oklch(0.75 0.24 195 / 0.2)",
            }}
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            data-ocid="login.submit_button"
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Opening Internet Identity...
              </>
            ) : (
              "Sign in with Internet Identity"
            )}
          </Button>

          <p
            className="text-center text-xs px-4 leading-relaxed"
            style={{ color: "oklch(0.5 0.04 195)" }}
          >
            By signing in, you agree to use RawatX responsibly.
            <br />
            Internet Identity keeps your account secure and private.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 text-center"
      >
        <p className="text-xs" style={{ color: "oklch(0.38 0.03 195)" }}>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.65 0.18 195)" }}
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
