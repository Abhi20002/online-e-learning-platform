"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    comment:
      "The courses here transformed my career. The instructors are knowledgeable and the content is always up-to-date. Highly recommended!",
    courseName: "Complete Web Development Bootcamp",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Data Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    comment:
      "I've tried many online learning platforms, but this one stands out. The quality of education and support is exceptional. Worth every penny!",
    courseName: "Data Science with Python",
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    rating: 5,
    comment:
      "The UI/UX course was exactly what I needed. Practical projects and real-world examples made learning enjoyable and effective.",
    courseName: "UI/UX Design Masterclass",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-primary/20" />

                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-muted-foreground italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                {/* Course */}
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Course:</span>{" "}
                  {testimonial.courseName}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
