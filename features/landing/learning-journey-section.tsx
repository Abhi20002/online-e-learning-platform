import { Search, UserPlus, Play, Award, type LucideIcon } from "lucide-react";
import { LEARNING_JOURNEY_STEPS } from "@/constants";

const iconMap: Record<string, LucideIcon> = {
  Search,
  UserPlus,
  Play,
  Award,
};

export function LearningJourneySection() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-600">How it works</p>
          <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">Your learning journey</h2>
        </div>
        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 left-0 right-0 hidden h-px bg-ink-300/25 lg:block" />
          {LEARNING_JOURNEY_STEPS.map((step) => {
            const Icon = iconMap[step.icon] || Play;
            return (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-card">
                  <Icon size={26} />
                </span>
                <span className="mt-4 text-xs font-bold text-brand-600">STEP {step.step}</span>
                <h3 className="mt-1 font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm text-ink-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
