import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export default function LoadingSpinner({
  size = "md",
  message,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      data-ocid="loading_state"
      aria-label={message ?? "Loading"}
      aria-live="polite"
    >
      <div
        className={cn(
          "rounded-full border-border border-t-accent animate-spin",
          sizeMap[size],
        )}
      />
      {message && (
        <p className="text-sm text-muted-foreground font-body animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
