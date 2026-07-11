"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/mock/categories";
import { COURSE_LEVELS, RATING_FILTERS, PRICE_RANGES, SORT_OPTIONS } from "@/constants";
import type { CourseLevel, SortOption } from "@/types";

interface CourseFiltersProps {
  selectedCategories: string[];
  selectedLevels: CourseLevel[];
  selectedRating: number | null;
  selectedPriceRange: { min: number; max: number } | null;
  sortBy: SortOption;
  onCategoryChange: (categoryId: string) => void;
  onLevelChange: (level: CourseLevel) => void;
  onRatingChange: (rating: number | null) => void;
  onPriceRangeChange: (range: { min: number; max: number } | null) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
}

export function CourseFilters({
  selectedCategories,
  selectedLevels,
  selectedRating,
  selectedPriceRange,
  sortBy,
  onCategoryChange,
  onLevelChange,
  onRatingChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
}: CourseFiltersProps) {
  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    levels: true,
    rating: true,
    price: true,
  });

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedLevels.length > 0 ||
    selectedRating !== null ||
    selectedPriceRange !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Sort By (Mobile) */}
      <div className="lg:hidden">
        <Label className="text-sm font-medium mb-2 block">Sort By</Label>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
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

      <Separator />

      {/* Categories */}
      <div>
        <button
          onClick={() => setIsExpanded({ ...isExpanded, categories: !isExpanded.categories })}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-medium">Categories</h4>
          <span className="text-sm text-muted-foreground">
            {selectedCategories.length > 0 && `(${selectedCategories.length})`}
          </span>
        </button>
        {isExpanded.categories && (
          <div className="space-y-3">
            {categories.slice(0, 8).map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category.name}
                </Label>
                <span className="text-xs text-muted-foreground">
                  {category.courseCount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Levels */}
      <div>
        <button
          onClick={() => setIsExpanded({ ...isExpanded, levels: !isExpanded.levels })}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-medium">Level</h4>
          <span className="text-sm text-muted-foreground">
            {selectedLevels.length > 0 && `(${selectedLevels.length})`}
          </span>
        </button>
        {isExpanded.levels && (
          <div className="space-y-3">
            {COURSE_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level.value}`}
                  checked={selectedLevels.includes(level.value)}
                  onCheckedChange={() => onLevelChange(level.value)}
                />
                <Label
                  htmlFor={`level-${level.value}`}
                  className="text-sm font-normal cursor-pointer capitalize"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <button
          onClick={() => setIsExpanded({ ...isExpanded, rating: !isExpanded.rating })}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-medium">Rating</h4>
        </button>
        {isExpanded.rating && (
          <div className="space-y-3">
            {RATING_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  onRatingChange(selectedRating === filter.value ? null : filter.value)
                }
                className={`flex items-center space-x-2 w-full text-left transition-colors ${
                  selectedRating === filter.value
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-sm">{filter.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Price */}
      <div>
        <button
          onClick={() => setIsExpanded({ ...isExpanded, price: !isExpanded.price })}
          className="flex items-center justify-between w-full mb-3"
        >
          <h4 className="font-medium">Price</h4>
        </button>
        {isExpanded.price && (
          <div className="space-y-3">
            {PRICE_RANGES.map((range, index) => (
              <button
                key={index}
                onClick={() =>
                  onPriceRangeChange(
                    selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                      ? null
                      : { min: range.min, max: range.max }
                  )
                }
                className={`flex items-center space-x-2 w-full text-left transition-colors ${
                  selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-sm">{range.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
