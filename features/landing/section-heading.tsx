import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-600">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-sm text-ink-500">{description}</p>}
      </div>
      {linkHref && (
        <Link
          href={linkHref}
          className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
        >
          {linkLabel ?? "View all"} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
