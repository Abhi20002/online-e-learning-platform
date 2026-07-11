import { GraduationCap, Clock, Infinity, Award, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BENEFITS_DATA } from "@/constants";

const iconMap: Record<string, any> = {
  GraduationCap,
  Clock,
  Infinity,
  Award,
  Users,
  DollarSign,
};

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose {process.env.NEXT_PUBLIC_APP_NAME || "EduPlatform"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits that make us the preferred choice for online learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS_DATA.map((benefit) => {
            const Icon = iconMap[benefit.icon] || Award;
            return (
              <Card key={benefit.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
