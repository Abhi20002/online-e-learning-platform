"use client";

import { Quote } from "lucide-react";
import { Rating } from "@/components/ui/rating";
import { SectionHeading } from "./section-heading";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    comment:
      "The courses here transformed my career. The instructors are knowledgeable and the content is always up-to-date. Highly recommended!",
    courseName: "Complete Web Development Bootcamp",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Data Analyst",
    avatar: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    comment:
      "I've tried many online learning platforms, but this one stands out. The quality of education and support is exceptional. Worth every penny!",
    courseName: "Data Science with Python",
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/150?img=16",
    rating: 5,
    comment:
      "The UI/UX course was exactly what I needed. Practical projects and real-world examples made learning enjoyable and effective.",
    courseName: "UI/UX Design Masterclass",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Student stories"
          title="What our learners say"
          description="Real outcomes from people who finished what they started."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex h-full flex-col rounded-2xl border border-ink-300/20 bg-white p-6 shadow-soft"
            >
              <Quote size={28} className="mb-3 text-brand-200" />
              <p className="flex-1 text-sm leading-relaxed text-ink-700">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-ink-300/15 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink-900">{testimonial.name}</p>
                  <p className="text-xs text-ink-500">{testimonial.role}</p>
                </div>
                <Rating value={testimonial.rating} showValue={false} size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
