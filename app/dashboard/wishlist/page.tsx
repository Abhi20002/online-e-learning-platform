"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards/course-card";
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
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
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
          <div className="bg-muted/30 border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <Button size="lg">
                Enroll in All Courses
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
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
                className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : wishlistCourses.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding courses you're interested in to keep track of them
            </p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <p className="text-muted-foreground text-lg mb-4">No courses match your search</p>
          <Button onClick={() => setSearchQuery("")} variant="outline">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
