import { GraduationCap, Clock, Infinity, Award, Users, DollarSign, type LucideIcon } from "lucide-react";
import { BENEFITS_DATA } from "@/constants";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Clock,
  Infinity,
  Award,
  Users,
  DollarSign,
};

export function BenefitsSection() {
  return (
    <section className="bg-surface-alt py-20">
      <div className="container-page">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-600">
            Why {process.env.NEXT_PUBLIC_APP_NAME || "Skillbridge"}
          </p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Built around how people actually learn
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS_DATA.map((benefit) => {
            const Icon = iconMap[benefit.icon] || Award;
            return (
              <div key={benefit.id} className="rounded-2xl bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-bold text-ink-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
