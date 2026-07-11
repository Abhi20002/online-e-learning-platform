import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards/course-card";
import { courses } from "@/mock/courses";
import type { CourseCard as CourseCardType } from "@/types";

export function PopularCoursesSection() {
  // Get first 6 courses as popular courses
  const popularCourses: CourseCardType[] = courses.slice(0, 6).map((course) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    thumbnail: course.thumbnail,
    category: course.category,
    price: course.price,
    discountPrice: course.discountPrice,
    instructor: course.instructor,
    instructorAvatar: course.instructorAvatar,
    rating: course.rating,
    reviewCount: course.reviewCount,
    studentCount: course.studentCount,
    duration: course.duration,
    level: course.level,
  }));

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Popular Courses
            </h2>
            <p className="text-muted-foreground">
              Most popular courses among our students
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/courses">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
