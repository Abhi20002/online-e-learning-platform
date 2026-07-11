import { BookOpen, Users } from "lucide-react";
import { Rating } from "@/components/ui/rating";
import { SectionHeading } from "./section-heading";
import { instructors } from "@/mock/users";

export function FeaturedInstructorsSection() {
  // Get first 4 instructors
  const featuredInstructors = instructors.slice(0, 4);

  return (
    <section className="bg-surface-alt py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Meet the teachers"
          title="Featured Instructors"
          description="Learn directly from people doing the work today."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredInstructors.map((instructor) => (
            <div
              key={instructor.id}
              className="flex flex-col items-center rounded-2xl border border-ink-300/20 bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-brand-50"
              />
              <h3 className="mt-4 font-bold text-ink-900">{instructor.name}</h3>
              <p className="text-sm text-ink-500">{instructor.designation}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
                <Rating value={instructor.rating} size={12} />
                <span className="flex items-center gap-1">
                  <BookOpen size={12} /> {instructor.totalCourses} courses
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {(instructor.totalStudents / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
