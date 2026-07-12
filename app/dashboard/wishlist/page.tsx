"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Trash2, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards/course-card";
import { EmptyState } from "@/components/common/empty-state";
import { courses } from "@/mock/courses";
import type { CourseCard as CourseCardType } from "@/types";
import { toast } from "sonner";

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock wishlist (first 4 courses for demo)
  const [wishlistCourses, setWishlistCourses] = useState<CourseCardType[]>(
    courses.slice(4, 8).map((course) => ({
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
    }))
  );

  const filteredCourses = wishlistCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFromWishlist = (courseId: string) => {
    setWishlistCourses((prev) => prev.filter((c) => c.id !== courseId));
    toast.success("Removed from wishlist");
  };

  const handleClearWishlist = () => {
    setWishlistCourses([]);
    toast.success("Wishlist cleared");
  };

  const totalPrice = wishlistCourses.reduce(
    (sum, course) => sum + (course.discountPrice || course.price),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-ink-900">My Wishlist</h1>
          <p className="mt-1 text-sm text-ink-500">
            {wishlistCourses.length} courses saved for later
          </p>
        </div>
        {wishlistCourses.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearWishlist}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {wishlistCourses.length > 0 && (
        <>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search wishlist..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                <p className="text-3xl font-extrabold">${totalPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2 sm:hidden">
                  Save ${(wishlistCourses.reduce((sum, c) => sum + c.price, 0) - totalPrice).toFixed(2)} with current discounts
                </p>
              </div>
              <Button size="lg" className="w-full sm:w-auto shrink-0">
                Enroll in All Courses
              </Button>
            </div>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Save ${(wishlistCourses.reduce((sum, c) => sum + c.price, 0) - totalPrice).toFixed(2)} with current discounts
            </p>
          </div>
        </>
      )}

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="relative">
              <CourseCard course={course} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFromWishlist(course.id)}
                className="absolute top-2 right-2 bg-background/90 shadow-soft hover:bg-background"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : wishlistCourses.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Start adding courses you're interested in to keep track of them"
          action={
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          }
        />
      ) : (
        <EmptyState
          icon={Search}
          title="No courses match your search"
          action={
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          }
        />
      )}
    </div>
  );
}
