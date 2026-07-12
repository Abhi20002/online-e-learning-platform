import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneStyles = {
  primary: "bg-brand-100 text-brand-600",
  brand: "bg-brand-100 text-brand-600",
  amber: "bg-amber-50 text-amber-accent",
  green: "bg-emerald-50 text-emerald-600",
  coral: "bg-orange-50 text-coral-accent",
  blue: "bg-sky-100 text-sky-600",
  purple: "bg-violet-100 text-violet-600",
} as const;

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: keyof typeof toneStyles;
  trend?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, tone = "brand", trend, className }: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-center justify-between">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", toneStyles[tone])}>
          <Icon size={20} aria-hidden="true" />
        </span>
        {trend && <span className="text-xs font-semibold text-emerald-600">{trend}</span>}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
    </Card>
  );
}
