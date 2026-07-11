"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { CourseCard } from "@/components/cards/course-card";
import { CourseFilters } from "@/components/filters/course-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { courses } from "@/mock/courses";
import { categories } from "@/mock/categories";
import { SORT_OPTIONS, COURSES_PER_PAGE } from "@/constants";
import type { CourseLevel, SortOption, CourseCard as CourseCardType } from "@/types";

function getInitialCategories(categoryParam: string | null): string[] {
  if (!categoryParam) return [];
  const match = categories.find(
    (c) => c.id === categoryParam || c.slug === categoryParam
  );
  return match ? [match.id] : [];
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    getInitialCategories(searchParams.get("category"))
  );
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.map((course): CourseCardType => ({
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

    // Search
    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) => {
        const fullCourse = courses.find((c) => c.id === course.id);
        return fullCourse && selectedCategories.includes(fullCourse.categoryId);
      });
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) => selectedLevels.includes(course.level));
    }

    // Rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter((course) => course.rating >= selectedRating);
    }

    // Price filter
    if (selectedPriceRange) {
      filtered = filtered.filter((course) => {
        const price = course.discountPrice || course.price;
        return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      });
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const courseA = courses.find((c) => c.id === a.id);
          const courseB = courses.find((c) => c.id === b.id);
          return (
            new Date(courseB?.createdAt || 0).getTime() -
            new Date(courseA?.createdAt || 0).getTime()
          );
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // popular
        filtered.sort((a, b) => b.studentCount - a.studentCount);
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedLevels, selectedRating, selectedPriceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const handleLevelToggle = (level: CourseLevel) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedRating(null);
    setSelectedPriceRange(null);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedLevels.length > 0 ||
    selectedRating !== null ||
    selectedPriceRange !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Page Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Courses</h1>
            <p className="text-muted-foreground">
              {filteredAndSortedCourses.length} courses available
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <CourseFilters
                  selectedCategories={selectedCategories}
                  selectedLevels={selectedLevels}
                  selectedRating={selectedRating}
                  selectedPriceRange={selectedPriceRange}
                  sortBy={sortBy}
                  onCategoryChange={handleCategoryToggle}
                  onLevelChange={handleLevelToggle}
                  onRatingChange={setSelectedRating}
                  onPriceRangeChange={setSelectedPriceRange}
                  onSortChange={setSortBy}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Search & Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Sort (Desktop) */}
                <div className="hidden lg:block w-64">
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="destructive" className="ml-2">
                          {[selectedCategories, selectedLevels].flat().length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <CourseFilters
                        selectedCategories={selectedCategories}
                        selectedLevels={selectedLevels}
                        selectedRating={selectedRating}
                        selectedPriceRange={selectedPriceRange}
                        sortBy={sortBy}
                        onCategoryChange={handleCategoryToggle}
                        onLevelChange={handleLevelToggle}
                        onRatingChange={setSelectedRating}
                        onPriceRangeChange={setSelectedPriceRange}
                        onSortChange={setSortBy}
                        onClearFilters={handleClearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary">
                      Search: {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-destructive h-6 px-2"
                  >
                    Clear all
                  </Button>
                </div>
              )}

              {/* Course Grid */}
              {paginatedCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No courses found</p>
                  <Button onClick={handleClearFilters} className="mt-4">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
