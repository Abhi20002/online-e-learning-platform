"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Users } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import type { CourseCard as CourseCardType } from "@/types";
import { formatPrice, formatDuration } from "@/lib/utils";

interface CourseCardProps {
  course: CourseCardType;
  showWishlist?: boolean;
}

export function CourseCard({ course, showWishlist = true }: CourseCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsInWishlist(!isInWishlist);
    toast.success(
      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      {
        description: isInWishlist
          ? `"${course.title}" removed from your wishlist`
          : `"${course.title}" added to your wishlist`,
      }
    );
  };

  const discountPercentage = course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink-300/20 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
      <Link
        href={`/courses/${course.slug}`}
        className="relative block h-44 overflow-hidden"
        aria-label={`View course: ${course.title}`}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="default">{course.category}</Badge>
          {discountPercentage > 0 && (
            <Badge variant="warning">{discountPercentage}% OFF</Badge>
          )}
        </div>
        {showWishlist && (
          <button
            onClick={handleWishlistToggle}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-soft hover:text-coral-accent"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            type="button"
          >
            <Heart
              size={15}
              className={isInWishlist ? "fill-coral-accent text-coral-accent" : ""}
              aria-hidden="true"
            />
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/courses/${course.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-snug text-ink-900 hover:text-brand-600">
            {course.title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-xs font-medium text-ink-500">{course.instructor}</span>
        </div>

        <div className="mb-3 flex items-center gap-3 text-xs text-ink-500">
          <Rating value={course.rating} size={12} />
          <span className="flex items-center gap-1">
            <Users size={12} /> {course.studentCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {formatDuration(course.duration * 60)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-ink-300/15 pt-3">
          <div className="flex items-baseline gap-2">
            {course.discountPrice ? (
              <>
                <span className="text-base font-extrabold text-ink-900">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="text-xs text-ink-400 line-through">
                  {formatPrice(course.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-ink-900">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100"
          >
            Enroll
          </Link>
        </div>
      </div>
    </div>
  );
}
