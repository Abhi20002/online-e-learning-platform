import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, Globe, Award, PlayCircle, FileText, Infinity, ChevronRight, Share2, Heart } from "lucide-react";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/cards/course-card";

import { courses } from "@/mock/courses";
import { reviews } from "@/mock/reviews";
import { formatPrice, formatDuration, getInitials, formatRelativeTime, getLevelColor } from "@/lib/utils";
import type { CourseCard as CourseCardType } from "@/types";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const courseReviews = reviews.filter((r) => r.courseId === course.id);
  const relatedCourses: CourseCardType[] = courses
    .filter((c) => c.categoryId === course.categoryId && c.id !== course.id)
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      thumbnail: c.thumbnail,
      category: c.category,
      price: c.price,
      discountPrice: c.discountPrice,
      instructor: c.instructor,
      instructorAvatar: c.instructorAvatar,
      rating: c.rating,
      reviewCount: c.reviewCount,
      studentCount: c.studentCount,
      duration: c.duration,
      level: c.level,
    }));

  const discountPercentage = course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;

  const ratingBreakdown = {
    5: Math.round(course.reviewCount * 0.7),
    4: Math.round(course.reviewCount * 0.2),
    3: Math.round(course.reviewCount * 0.07),
    2: Math.round(course.reviewCount * 0.02),
    1: Math.round(course.reviewCount * 0.01),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero/Banner Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm mb-4 text-gray-300">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/courses" className="hover:text-white">Courses</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/courses?category=${course.categoryId}`} className="hover:text-white">
                  {course.category}
                </Link>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>

              {/* Short Description */}
              <p className="text-lg text-gray-300 mb-6">{course.shortDescription}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-gray-300">
                    ({course.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <Users className="h-5 w-5" />
                  <span>{course.studentCount.toLocaleString()} students</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-300">Created by</span>
                <Link href={`/instructors/${course.instructorId}`} className="flex items-center gap-2 hover:text-primary">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{course.instructor}</span>
                </Link>
              </div>

              {/* Additional Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{course.language === "en" ? "English" : course.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} hours total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* What You'll Learn */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content/Curriculum */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Course content</h2>
                <div className="mb-4 text-sm text-muted-foreground">
                  {course.curriculum.length} sections • {course.totalLectures} lectures •{" "}
                  {course.duration}h total length
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {course.curriculum.map((section, index) => (
                    <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold">
                            Section {index + 1}: {section.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {section.lessons.length} lectures
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between py-2 px-3 hover:bg-muted/50 rounded"
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">Preview</Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}min
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{course.description}</p>
              </div>

              {/* Target Audience */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Who this course is for</h2>
                <ul className="space-y-2">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                        <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link href={`/instructors/${course.instructorId}`} className="text-xl font-semibold hover:text-primary">
                          {course.instructor}
                        </Link>
                        <p className="text-muted-foreground text-sm mb-3">Senior Web Developer</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{course.rating} rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentCount.toLocaleString()} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Student Reviews */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Student feedback</h2>

                {/* Rating Overview */}
                <div className="grid md:grid-cols-[200px_1fr] gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{course.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(course.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.reviewCount.toLocaleString()} ratings
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingBreakdown[stars as keyof typeof ratingBreakdown];
                      const percentage = (count / course.reviewCount) * 100;
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-20">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{stars}</span>
                          </div>
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-12">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                  {courseReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={review.userAvatar} alt={review.userName} />
                            <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold">{review.userName}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {formatRelativeTime(review.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                            <div className="mt-3 text-sm text-muted-foreground">
                              Helpful? ({review.helpful})
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Related Courses */}
              {relatedCourses.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">More courses in {course.category}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedCourses.map((relatedCourse) => (
                      <CourseCard key={relatedCourse.id} course={relatedCourse} showWishlist={false} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sticky Purchase Card */}
            <div>
              <div className="sticky top-20">
                <Card>
                  <div className="relative aspect-video">
                    <Image
                      src={course.banner || course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    {/* Price */}
                    <div className="flex items-center gap-3">
                      {course.discountPrice ? (
                        <>
                          <span className="text-3xl font-bold">
                            {formatPrice(course.discountPrice)}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(course.price)}
                          </span>
                          <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                        </>
                      ) : (
                        <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <Heart className="mr-2 h-4 w-4" />
                        Add to Wishlist
                      </Button>
                      <Button variant="ghost" className="w-full" size="lg">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Course
                      </Button>
                    </div>

                    <Separator />

                    {/* This course includes */}
                    <div>
                      <h3 className="font-semibold mb-3">This course includes:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration} hours on-demand video</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{course.totalLectures} lectures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Infinity className="h-4 w-4 text-muted-foreground" />
                          <span>Full lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-4 w-4 text-muted-foreground" />
                          <span>Access on mobile and desktop</span>
                        </div>
                        {course.hasCertificate && (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span>Certificate of completion</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Level & Category */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
