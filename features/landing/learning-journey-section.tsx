import { Search, UserPlus, Play, Award } from "lucide-react";
import { LEARNING_JOURNEY_STEPS } from "@/constants";

const iconMap: Record<string, any> = {
  Search,
  UserPlus,
  Play,
  Award,
};

export function LearningJourneySection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Learning Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple steps to start your learning adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LEARNING_JOURNEY_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || Play;
            const isLast = index === LEARNING_JOURNEY_STEPS.length - 1;

            return (
              <div key={step.id} className="relative">
                <div className="text-center space-y-4">
                  {/* Step Number */}
                  <div className="relative inline-block">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                      {step.step}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Connector Arrow (Desktop) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary/20 border-y-4 border-y-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
