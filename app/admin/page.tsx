"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Users, DollarSign, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/common/stat-card";

export default function AdminDashboardPage() {
  // Mock statistics
  const stats = [
    {
      label: "Total Courses",
      value: "48",
      change: "+12%",
      icon: BookOpen,
      tone: "brand" as const,
    },
    {
      label: "Total Students",
      value: "2,847",
      change: "+18%",
      icon: Users,
      tone: "green" as const,
    },
    {
      label: "Revenue",
      value: "$84,250",
      change: "+23%",
      icon: DollarSign,
      tone: "coral" as const,
    },
    {
      label: "Enrollments",
      value: "1,234",
      change: "+8%",
      icon: TrendingUp,
      tone: "amber" as const,
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "course",
      action: "New course published",
      detail: "Machine Learning Advanced",
      user: "Sarah Johnson",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "user",
      action: "New student enrolled",
      detail: "Complete Web Development Bootcamp",
      user: "Mike Chen",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "course",
      action: "Course updated",
      detail: "React & TypeScript Masterclass",
      user: "Emily Davis",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "user",
      action: "New instructor joined",
      detail: "Dr. James Wilson - Data Science",
      user: "Admin",
      time: "2 days ago",
    },
  ];

  // Mock top courses
  const topCourses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp 2024",
      students: 1245,
      rating: 4.8,
      revenue: "$24,900",
      status: "active",
    },
    {
      id: "2",
      title: "Advanced React & TypeScript",
      students: 892,
      rating: 4.9,
      revenue: "$17,840",
      status: "active",
    },
    {
      id: "3",
      title: "Data Science with Python",
      students: 756,
      rating: 4.7,
      revenue: "$15,120",
      status: "active",
    },
    {
      id: "4",
      title: "UI/UX Design Masterclass",
      students: 634,
      rating: 4.6,
      revenue: "$12,680",
      status: "active",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-ink-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">
          Overview of platform performance and activity
        </p>
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
            trend={`${stat.change} vs last month`}
          />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === "course"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">by {activity.user}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/courses/new">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-sm">Add Course</span>
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Manage Users</span>
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">View Analytics</span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm">Settings</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Courses */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-bold text-ink-900">Top Performing Courses</CardTitle>
          <Link href="/admin/courses">
            <Button variant="ghost" size="sm">
              View All Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCourses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-surface-alt transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100">
                  <span className="text-sm font-bold text-brand-600">#{index + 1}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-0.5 truncate text-sm font-semibold text-ink-900">{course.title}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-500">
                    <span>{course.students.toLocaleString()} students</span>
                    <span className="hidden sm:inline">•</span>
                    <span>⭐ {course.rating}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="font-medium text-emerald-600">{course.revenue}</span>
                  </div>
                </div>
                <Badge variant="success" className="shrink-0">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
