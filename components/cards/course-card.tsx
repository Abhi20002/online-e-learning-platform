"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star, Heart } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CourseCard as CourseCardType } from "@/types";
import { formatPrice, formatDuration, getInitials, getLevelColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
    <Link href={`/courses/${course.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Course Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Wishlist Button */}
          {showWishlist && (
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isInWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                )}
              />
            </button>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
              {course.category}
            </Badge>
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="font-bold">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Course Title */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
              <AvatarFallback className="text-xs">
                {getInitials(course.instructor)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{course.instructor}</span>
          </div>

          {/* Rating & Students */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({course.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.studentCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Course Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration * 60)}</span>
            </div>
            <Badge variant="secondary" className={getLevelColor(course.level)}>
              {course.level}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center space-x-2">
            {course.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(course.price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {formatPrice(course.price)}
              </span>
            )}
          </div>

          {/* Enroll Button */}
          <Button size="sm" className="ml-auto">
            Enroll Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
