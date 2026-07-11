"use client";

import { CourseCard } from "@/components/cards/course-card";
import type { CourseCard as CourseCardType } from "@/types";

interface RelatedCoursesProps {
  courses: CourseCardType[];
  categoryName: string;
}

export function RelatedCourses({ courses, categoryName }: RelatedCoursesProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">More courses in {categoryName}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} showWishlist={false} />
        ))}
      </div>
    </div>
  );
}
