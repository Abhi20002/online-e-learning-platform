"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  PlayCircle,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards/course-card";
import { StatCard } from "@/components/common/stat-card";
import { courses } from "@/mock/courses";
import type { CourseCard as CourseCardType } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock enrolled courses (first 3 for demo)
  const enrolledCourses: CourseCardType[] = courses.slice(0, 3).map((course) => ({
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
  }));

  // Mock stats
  const stats = [
    {
      label: "Enrolled Courses",
      value: "12",
      icon: BookOpen,
      tone: "brand" as const,
    },
    {
      label: "Hours Learned",
      value: "48",
      icon: Clock,
      tone: "green" as const,
      trend: "+6h this week",
    },
    {
      label: "Certificates",
      value: "5",
      icon: Award,
      tone: "amber" as const,
      trend: "+1 this month",
    },
    {
      label: "Avg Progress",
      value: "68%",
      icon: TrendingUp,
      tone: "coral" as const,
    },
  ];

  // Mock continue-learning progress rows
  const continueLearning = [
    {
      title: "Complete Web Development Bootcamp 2024",
      slug: "complete-web-development-bootcamp-2024",
      progress: 65,
      next: "Building Responsive Layouts with CSS Grid",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Advanced React & TypeScript",
      slug: "advanced-react-typescript",
      progress: 42,
      next: "Advanced Hooks - useReducer & useContext",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Data Science with Python",
      slug: "data-science-python",
      progress: 18,
      next: "Introduction to NumPy Arrays",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      title: "Completed: Advanced React Patterns",
      icon: CheckCircle2,
      tone: "text-emerald-600 bg-emerald-50",
      time: "2 hours ago",
    },
    {
      id: "2",
      title: "Started: Data Science with Python",
      icon: PlayCircle,
      tone: "text-brand-600 bg-brand-100",
      time: "1 day ago",
    },
    {
      id: "3",
      title: "Certificate earned: Web Development Bootcamp",
      icon: Award,
      tone: "text-amber-accent bg-amber-50",
      time: "3 days ago",
    },
    {
      id: "4",
      title: "Added to wishlist: Machine Learning A-Z",
      icon: Heart,
      tone: "text-coral-accent bg-orange-50",
      time: "5 days ago",
    },
  ];

  // Mock weekly goals
  const weeklyGoals = [
    { label: "Complete 5 lessons", progressLabel: "3/5", progress: 60 },
    { label: "Study 10 hours", progressLabel: "6.5/10", progress: 65 },
    { label: "Earn 1 certificate", progressLabel: "0/1", progress: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-700 p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(245,165,36,0.3),transparent_45%)]" />
        <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-100">
              <Sparkles size={16} /> Welcome back
            </p>
            <h2 className="mt-1.5 text-xl font-extrabold text-white sm:text-2xl">
              Good to see you, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-brand-100">
              Continue your learning journey and achieve your goals.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0 bg-white text-brand-700 hover:bg-brand-50">
            <Link href="/dashboard/courses">Resume Learning</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            tone={stat.tone}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-ink-900">Continue Learning</h3>
              <Link
                href="/dashboard/courses"
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
              >
                View All <ArrowRight size={15} />
              </Link>
            </div>
            <div className="space-y-4">
              {continueLearning.map((item) => (
                <Link
                  key={item.slug}
                  href={`/courses/${item.slug}`}
                  className="flex items-center gap-4 rounded-xl p-2 hover:bg-surface-alt"
                >
                  <div className={`h-16 w-24 shrink-0 rounded-lg bg-gradient-to-br ${item.gradient}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{item.title}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-ink-500">
                      {item.progress}% complete • Next: {item.next}
                    </p>
                  </div>
                  <PlayCircle size={22} className="shrink-0 text-brand-600" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-5">
            <h3 className="mb-4 font-bold text-ink-900">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.tone}`}
                    >
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm text-ink-800">{activity.title}</p>
                      <p className="text-xs text-ink-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* This Week's Goals */}
        <Card className="h-fit p-5">
          <h3 className="mb-4 font-bold text-ink-900">This Week&apos;s Goals</h3>
          <div className="space-y-5">
            {weeklyGoals.map((goal) => (
              <div key={goal.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-800">{goal.label}</span>
                  <span className="text-xs text-ink-400">{goal.progressLabel}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommended Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink-900">Recommended for You</h2>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
          >
            Explore More <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
