import { CourseCard } from "@/components/cards/course-card";
import { SectionHeading } from "./section-heading";
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
    <section className="bg-surface py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Handpicked for you"
          title="Popular Courses"
          description="The courses our learners are enrolling in most this month."
          linkHref="/courses"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
