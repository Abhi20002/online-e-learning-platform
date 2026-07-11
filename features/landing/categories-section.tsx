import Link from "next/link";
import { Code, Smartphone, BarChart, Palette, Briefcase, TrendingUp, Camera, Music, type LucideIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { categories } from "@/mock/categories";

const iconMap: Record<string, LucideIcon> = {
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
    <section className="bg-white py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Explore"
          title="Browse by Category"
          description="Find the right path for wherever you're headed next."
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {displayCategories.map((category) => {
            const Icon = iconMap[category.icon] || Code;
            return (
              <Link
                key={category.id}
                href={`/courses?category=${category.slug}`}
                className="flex cursor-pointer flex-col items-start gap-4 rounded-2xl border border-ink-300/20 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-bold text-ink-900">{category.name}</h3>
                  <p className="text-sm text-ink-500">{category.courseCount} courses</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
