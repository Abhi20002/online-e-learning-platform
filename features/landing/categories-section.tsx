import Link from "next/link";
import { Code, Smartphone, BarChart, Palette, Briefcase, TrendingUp, Camera, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/mock/categories";

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  BarChart,
  Palette,
  Briefcase,
  TrendingUp,
  Camera,
  Music,
};

export function CategoriesSection() {
  // Get first 8 categories
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse courses by category and find the perfect learning path for you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <Link key={category.id} href={`/courses?category=${category.slug}`}>
                <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.courseCount} courses
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
