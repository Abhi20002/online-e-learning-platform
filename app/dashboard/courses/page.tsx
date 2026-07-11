"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";

interface EnrolledCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  totalLectures: number;
  completedLectures: number;
  duration: number;
  status: "in-progress" | "completed" | "not-started";
}

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock enrolled courses with progress
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp 2024",
      slug: "complete-web-development-bootcamp-2024",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      category: "Web Development",
      instructor: "John Smith",
      progress: 65,
      lastAccessed: "2 hours ago",
      totalLectures: 320,
      completedLectures: 208,
      duration: 52,
      status: "in-progress",
    },
    {
      id: "2",
      title: "Advanced React & TypeScript",
      slug: "advanced-react-typescript",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      category: "Frontend Development",
      instructor: "Sarah Johnson",
      progress: 42,
      lastAccessed: "1 day ago",
      totalLectures: 185,
      completedLectures: 78,
      duration: 28,
      status: "in-progress",
    },
    {
      id: "3",
      title: "Data Science with Python",
      slug: "data-science-python",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "Data Science",
      instructor: "Mike Chen",
      progress: 18,
      lastAccessed: "3 days ago",
      totalLectures: 240,
      completedLectures: 43,
      duration: 45,
      status: "in-progress",
    },
    {
      id: "4",
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      category: "Design",
      instructor: "Emily Davis",
      progress: 100,
      lastAccessed: "1 week ago",
      totalLectures: 156,
      completedLectures: 156,
      duration: 22,
      status: "completed",
    },
    {
      id: "5",
      title: "Digital Marketing Fundamentals",
      slug: "digital-marketing-fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      category: "Marketing",
      instructor: "David Wilson",
      progress: 0,
      lastAccessed: "2 weeks ago",
      totalLectures: 120,
      completedLectures: 0,
      duration: 18,
      status: "not-started",
    },
    {
      id: "6",
      title: "Mobile App Development with Flutter",
      slug: "mobile-app-flutter",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      category: "Mobile Development",
      instructor: "Lisa Anderson",
      progress: 100,
      lastAccessed: "2 weeks ago",
      totalLectures: 210,
      completedLectures: 210,
      duration: 38,
      status: "completed",
    },
  ];

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && course.status === "in-progress") ||
      (activeTab === "completed" && course.status === "completed") ||
      (activeTab === "not-started" && course.status === "not-started");
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: enrolledCourses.length,
    inProgress: enrolledCourses.filter((c) => c.status === "in-progress").length,
    completed: enrolledCourses.filter((c) => c.status === "completed").length,
    notStarted: enrolledCourses.filter((c) => c.status === "not-started").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-extrabold text-ink-900">My Courses</h1>
        <p className="mt-1 text-sm text-ink-500">
          Manage and track your learning progress
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search your courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex h-auto w-fit max-w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="all">
            All ({counts.all})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({counts.inProgress})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({counts.completed})
          </TabsTrigger>
          <TabsTrigger value="not-started">
            Not Started ({counts.notStarted})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-ink-300/20 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
                >
                  {/* Thumbnail */}
                  <Link href={`/courses/${course.slug}`} className="block h-36 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge variant="default">{course.category}</Badge>
                      <Badge
                        variant={
                          course.status === "completed"
                            ? "success"
                            : course.status === "in-progress"
                            ? "default"
                            : "secondary"
                        }
                        className="flex-shrink-0"
                      >
                        {course.status === "completed"
                          ? "Completed"
                          : course.status === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                      </Badge>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <h3 className="line-clamp-2 text-sm font-bold text-ink-900 hover:text-brand-600">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-ink-500">{course.instructor}</p>

                    {/* Progress */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
                      <span>{course.progress}% complete</span>
                      <span>
                        {course.completedLectures}/{course.totalLectures} lectures
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-400">
                      Last accessed {course.lastAccessed}
                    </p>

                    {/* Action Buttons */}
                    <Link
                      href={`/courses/${course.slug}`}
                      className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-50 py-2 text-sm font-bold text-brand-700 hover:bg-brand-100"
                    >
                      {course.status === "completed"
                        ? "Review"
                        : course.status === "in-progress"
                        ? "Continue"
                        : "Start"}
                    </Link>
                    {course.status === "completed" && (
                      <Link
                        href="/dashboard/certificates"
                        className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-ink-300/40 bg-surface-alt py-2 text-sm font-bold text-ink-700 hover:bg-brand-100"
                      >
                        Certificate
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No courses found"
              description="Try adjusting your search or filters"
              action={
                <Link href="/courses">
                  <Button>Explore Courses</Button>
                </Link>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
