"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courses } from "@/mock/courses";
import { toast } from "sonner";

type CourseStatus = "published" | "draft" | "archived";

interface AdminCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  price: number;
  rating: number;
  status: CourseStatus;
  createdAt: string;
}

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Transform courses to admin format
  const [adminCourses, setAdminCourses] = useState<AdminCourse[]>(
    courses.map((course) => ({
      id: course.id,
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      students: course.studentCount,
      price: course.discountPrice || course.price,
      rating: course.rating,
      status: "published" as CourseStatus,
      createdAt: course.createdAt,
    }))
  );

  const filteredCourses = adminCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (courseId: string, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      setAdminCourses((prev) => prev.filter((c) => c.id !== courseId));
      toast.success("Course deleted successfully");
    }
  };

  const handleStatusChange = (courseId: string, newStatus: CourseStatus) => {
    setAdminCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: newStatus } : c))
    );
    toast.success(`Course status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: CourseStatus) => {
    const variants = {
      published: "success",
      draft: "secondary",
      archived: "destructive",
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Course Management</h1>
          <p className="text-muted-foreground">
            Manage all courses, content, and instructor assignments
          </p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Total Courses</p>
          <p className="text-2xl font-bold">{adminCourses.length}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="text-2xl font-bold text-green-600">
            {adminCourses.filter((c) => c.status === "published").length}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="text-2xl font-bold text-orange-600">
            {adminCourses.filter((c) => c.status === "draft").length}
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold">
            {adminCourses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <p className="font-medium line-clamp-1">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Created {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.students.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">
                    ${course.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/courses/${courses.find((c) => c.id === course.id)?.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Course
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Course
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(course.id, "published")}
                        >
                          Set as Published
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(course.id, "draft")}
                        >
                          Set as Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(course.id, "archived")}
                        >
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(course.id, course.title)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredCourses.length > 10 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {adminCourses.length} courses
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
