"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/cards/course-card";
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
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Hours Learned",
      value: "48",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Certificates",
      value: "5",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      label: "Avg Progress",
      value: "68%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      title: "Completed: Advanced React Patterns",
      type: "completed",
      time: "2 hours ago",
    },
    {
      id: "2",
      title: "Started: Data Science with Python",
      type: "started",
      time: "1 day ago",
    },
    {
      id: "3",
      title: "Certificate earned: Web Development Bootcamp",
      type: "certificate",
      time: "3 days ago",
    },
    {
      id: "4",
      title: "Added to wishlist: Machine Learning A-Z",
      type: "wishlist",
      time: "5 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-muted-foreground">
          Continue your learning journey and achieve your goals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Continue Learning</CardTitle>
          <Link href="/dashboard/courses">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Course Progress Items */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-24 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 truncate">Complete Web Development Bootcamp 2024</h4>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress value={65} className="flex-1" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">65%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next: Building Responsive Layouts with CSS Grid
                  </p>
                </div>
                <Link href="/courses/complete-web-development-bootcamp-2024">
                  <Button size="sm">Continue</Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-24 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-md"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 truncate">Advanced React & TypeScript</h4>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress value={42} className="flex-1" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">42%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next: Advanced Hooks - useReducer & useContext
                  </p>
                </div>
                <Link href="/courses/advanced-react-typescript">
                  <Button size="sm">Continue</Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-24 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-md"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 truncate">Data Science with Python</h4>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress value={18} className="flex-1" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">18%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next: Introduction to NumPy Arrays
                  </p>
                </div>
                <Link href="/courses/data-science-python">
                  <Button size="sm">Continue</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === "completed"
                        ? "bg-green-500"
                        : activity.type === "certificate"
                        ? "bg-purple-500"
                        : activity.type === "started"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Complete 5 lessons</span>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Study 10 hours</span>
                  <span className="text-sm text-muted-foreground">6.5/10</span>
                </div>
                <Progress value={65} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Earn 1 certificate</span>
                  <span className="text-sm text-muted-foreground">0/1</span>
                </div>
                <Progress value={85} className="[&>div]:bg-orange-500" />
                <p className="text-xs text-muted-foreground mt-1">Almost there! 15% remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link href="/courses">
            <Button variant="outline">
              Explore More
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
