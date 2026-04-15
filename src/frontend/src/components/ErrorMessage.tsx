import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  compact?: boolean;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
  compact = false,
}: ErrorMessageProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-destructive text-sm",
          className,
        )}
        data-ocid="error_state"
        role="alert"
      >
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span className="min-w-0 break-words">{message}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 text-center",
        className,
      )}
      data-ocid="error_state"
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2"
          data-ocid="error_state.retry_button"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
