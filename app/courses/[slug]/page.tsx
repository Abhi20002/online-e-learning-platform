import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Clock, Users, Globe, Award, PlayCircle, FileText, Infinity, ChevronRight, Share2, Heart, BadgeCheck, Signal } from "lucide-react";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseSchema, BreadcrumbSchema, ReviewSchema } from "@/components/seo/structured-data";
import { CourseReviewsSkeleton } from "@/components/loading/course-reviews-skeleton";

import { courses } from "@/mock/courses";
import { reviews } from "@/mock/reviews";
import { formatPrice, getInitials } from "@/lib/utils";
import { APP_URL } from "@/constants";
import type { CourseCard as CourseCardType } from "@/types";

// Dynamic imports for below-the-fold components (Performance optimization)
const CourseReviews = dynamic(
  () => import("@/components/course/course-reviews").then((mod) => ({ default: mod.CourseReviews })),
  {
    loading: () => <CourseReviewsSkeleton />,
    ssr: true,
  }
);

const RelatedCourses = dynamic(
  () => import("@/components/course/related-courses").then((mod) => ({ default: mod.RelatedCourses })),
  {
    ssr: true,
  }
);

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.shortDescription,
    keywords: [course.category, course.level, "online course", "learning", ...course.tags],
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      type: "website",
      url: `${APP_URL}/courses/${course.slug}`,
      images: [
        {
          url: course.thumbnail,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnail],
    },
  };
}

/**
 * Static Site Generation (SSG)
 * Pre-renders all course pages at build time for optimal performance
 */
export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Structured Data */}
      <CourseSchema course={course} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: APP_URL },
          { name: "Courses", url: `${APP_URL}/courses` },
          { name: course.category, url: `${APP_URL}/courses?category=${course.categoryId}` },
          { name: course.title, url: `${APP_URL}/courses/${course.slug}` },
        ]}
      />
      {courseReviews.length > 0 && (
        <ReviewSchema
          reviews={courseReviews}
          itemName={course.title}
        />
      )}

      <Header />

      <main className="flex-1 bg-surface pb-20">
        {/* Hero/Banner Section */}
        <div className="bg-ink-900">
          <div className="container-page grid gap-8 pt-12 pb-12 lg:grid-cols-[1fr_360px] lg:pb-44">
            <div className="text-white">
              {/* Breadcrumb */}
              <div className="mb-4 flex items-center gap-2 text-sm text-ink-300">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/courses" className="hover:text-white">Courses</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/courses?category=${course.categoryId}`} className="hover:text-white">
                  {course.category}
                </Link>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Badge variant="default">{course.category}</Badge>
              </div>

              {/* Course Title */}
              <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">{course.title}</h1>

              {/* Short Description */}
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300">{course.shortDescription}</p>

              {/* Meta Info */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-300">
                <Rating value={course.rating} size={14} />
                <span>({course.reviewCount.toLocaleString()} ratings)</span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} /> {course.studentCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5 capitalize">
                  <Signal size={14} /> {course.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe size={14} /> {course.language === "en" ? "English" : course.language}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {course.duration} hours total
                </span>
              </div>

              {/* Instructor */}
              <Link
                href={`/instructors/${course.instructorId}`}
                className="mt-5 flex w-fit items-center gap-3"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                  <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-ink-300">Created by</p>
                  <p className="text-sm font-semibold text-white">{course.instructor}</p>
                </div>
              </Link>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Main Content */}
        <div className="container-page grid gap-8 pt-8 lg:-mt-32 lg:pt-0 lg:grid-cols-[1fr_360px]">
            {/* Left Column - Content */}
            <div className="space-y-10">
              {/* Mobile banner */}
              <Card className="overflow-hidden p-0 lg:hidden">
                <div className="relative h-56 w-full">
                  <Image
                    src={course.banner || course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>

              {/* What You'll Learn */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-ink-900">What You&apos;ll Learn</h2>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <BadgeCheck size={17} className="mt-0.5 shrink-0 text-brand-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content/Curriculum */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-ink-900">Course Curriculum</h2>
                <div className="mb-4 text-sm text-ink-500">
                  {course.curriculum.length} sections • {course.totalLectures} lectures •{" "}
                  {course.duration}h total length
                </div>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={course.curriculum[0]?.id}
                  className="divide-y divide-ink-300/20 rounded-2xl border border-ink-300/20 bg-white"
                >
                  {course.curriculum.map((section, index) => (
                    <AccordionItem key={section.id} value={section.id} className="border-b-0">
                      <AccordionTrigger className="px-5 hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold text-ink-800">
                            Section {index + 1}: {section.title}
                          </span>
                          <span className="text-xs font-normal text-ink-400">
                            {section.lessons.length} lectures
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-5">
                        <ul className="space-y-2.5">
                          {section.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="flex items-center justify-between gap-4 text-sm text-ink-700"
                            >
                              <span className="flex items-center gap-2.5">
                                <PlayCircle size={15} className="shrink-0 text-ink-400" />
                                {lesson.title}
                                {lesson.isPreview && (
                                  <Badge variant="success" className="ml-1">Preview</Badge>
                                )}
                              </span>
                              <span className="shrink-0 text-xs text-ink-400">
                                {lesson.duration}min
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-ink-900">Requirements</h2>
                <ul className="space-y-2 text-sm text-ink-700">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-ink-400">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-ink-900">Description</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink-500">{course.description}</p>
              </div>

              {/* Target Audience */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-ink-900">Who this course is for</h2>
                <ul className="space-y-2 text-sm text-ink-700">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-ink-400">•</span>
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <Card className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <Avatar className="h-20 w-20 shrink-0">
                    <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                    <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Instructor</p>
                    <Link
                      href={`/instructors/${course.instructorId}`}
                      className="mt-1 block text-lg font-bold text-ink-900 hover:text-brand-600"
                    >
                      {course.instructor}
                    </Link>
                    <p className="text-sm text-ink-500">Senior Web Developer</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink-500">
                      <Rating value={course.rating} size={13} />
                      <span>{course.studentCount.toLocaleString()} students</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Student Reviews - Dynamically Loaded */}
              <CourseReviews
                reviews={courseReviews}
                rating={course.rating}
                reviewCount={course.reviewCount}
              />

              {/* Related Courses - Dynamically Loaded */}
              <RelatedCourses courses={relatedCourses} categoryName={course.category} />
            </div>

            {/* Right Column - Sticky Purchase Card */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="overflow-hidden">
                <div className="relative hidden h-44 w-full lg:block">
                  <Image
                    src={course.banner || course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    {course.discountPrice ? (
                      <>
                        <span className="text-2xl font-extrabold text-ink-900">
                          {formatPrice(course.discountPrice)}
                        </span>
                        <span className="text-sm text-ink-400 line-through">
                          {formatPrice(course.price)}
                        </span>
                        <Badge variant="warning">{discountPercentage}% OFF</Badge>
                      </>
                    ) : (
                      <span className="text-2xl font-extrabold text-ink-900">
                        {formatPrice(course.price)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <Button className="mt-5 w-full" size="lg">
                    Enroll Now
                  </Button>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary" className="w-full">
                      <Heart className="h-[15px] w-[15px]" />
                      Wishlist
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Share2 className="h-[15px] w-[15px]" />
                      Share
                    </Button>
                  </div>

                  {/* This course includes */}
                  <div className="mt-6 space-y-3 border-t border-ink-300/15 pt-5 text-sm text-ink-700">
                    <p className="font-semibold text-ink-900">This course includes:</p>
                    <div className="flex items-center gap-2.5">
                      <Clock size={14} className="shrink-0 text-ink-400" />
                      {course.duration} hours on-demand video
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FileText size={14} className="shrink-0 text-ink-400" />
                      {course.totalLectures} lectures
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Infinity size={14} className="shrink-0 text-ink-400" />
                      Full lifetime access
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe size={14} className="shrink-0 text-ink-400" />
                      Access on mobile and desktop
                    </div>
                    {course.hasCertificate && (
                      <div className="flex items-center gap-2.5">
                        <Award size={14} className="shrink-0 text-ink-400" />
                        Certificate of completion
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-ink-300/15 pt-3">
                      <span className="text-ink-500">Level</span>
                      <Badge variant="default" className="capitalize">{course.level}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
              <Link
                href="/courses"
                className="mt-4 block text-center text-sm font-semibold text-brand-600 hover:underline"
              >
                ← Back to all courses
              </Link>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
