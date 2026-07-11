import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  size = 14,
  showValue = true,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-amber-accent text-amber-accent" : "fill-ink-300/40 text-ink-300/40"}
            />
          );
        })}
      </div>
      {showValue && <span className="text-sm font-semibold text-ink-800">{value.toFixed(1)}</span>}
    </div>
  );
}
