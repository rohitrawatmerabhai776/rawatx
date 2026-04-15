interface RawatXLogoProps {
  width?: number;
  className?: string;
}

export default function RawatXLogo({
  width = 280,
  className = "",
}: RawatXLogoProps) {
  const fontSize = Math.round(width * 0.22);

  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      style={{ width }}
      aria-label="RawatX"
    >
      <div
        style={{
          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
          fontWeight: 900,
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {/* "Rawat" — teal to cyan gradient */}
        <span
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 195), oklch(0.82 0.26 190))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Rawat
        </span>

        {/* "X" — glowing cyan-white neon */}
        <span
          style={{
            color: "oklch(0.96 0.14 190)",
            textShadow:
              "0 0 8px oklch(0.9 0.22 190 / 0.9), 0 0 24px oklch(0.82 0.26 190 / 0.7), 0 0 56px oklch(0.75 0.24 195 / 0.5)",
            WebkitTextFillColor: "oklch(0.96 0.14 190)",
          }}
        >
          X
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
          fontSize: `${Math.round(fontSize * 0.28)}px`,
          fontWeight: 500,
          letterSpacing: "0.12em",
          color: "oklch(0.65 0.04 195)",
          marginTop: `${Math.round(fontSize * 0.18)}px`,
          textAlign: "center",
        }}
      >
        Short Videos&nbsp;•&nbsp;Earn Coins&nbsp;•&nbsp;Go Viral
      </p>
    </div>
  );
}
