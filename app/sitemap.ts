import { MetadataRoute } from "next";
import { courses } from "@/mock/courses";
import { categories } from "@/mock/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://learnhub.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Course pages
  const coursePages = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedAt || course.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Category pages (if you add category pages in future)
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/courses?category=${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages, ...categoryPages];
}
