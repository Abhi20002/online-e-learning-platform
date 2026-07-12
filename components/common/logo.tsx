import { cn } from "@/lib/utils";
import { APP_NAME } from "@/constants";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-2 top-1/2 h-8 w-8 -translate-y-1/2 rotate-45 rounded-[10px]",
          dark ? "bg-brand-500/80" : "bg-brand-200"
        )}
      />
      <span
        className={cn(
          "relative z-10 pl-3 text-lg font-extrabold tracking-tight",
          dark ? "text-white" : "text-ink-900"
        )}
      >
        {APP_NAME}
      </span>
    </span>
  );
}
