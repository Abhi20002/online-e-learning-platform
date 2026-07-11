// ============================================
// USER & AUTHENTICATION TYPES
// ============================================

export type UserRole = "student" | "instructor" | "admin";

export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  mobile?: string;
  address?: string;
  joinedDate: string;
  lastLogin?: string;
  enrolledCourses?: string[]; // Course IDs
  completedCourses?: string[]; // Course IDs
  certificates?: string[]; // Certificate IDs
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// ============================================
// COURSE TYPES
// ============================================

export type CourseLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type CourseStatus = "draft" | "published" | "archived";

export interface CourseLesson {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl?: string;
  resources?: string[];
  isPreview?: boolean;
  completed?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  banner?: string;
  category: string;
  categoryId: string;
  level: CourseLevel;
  price: number;
  discountPrice?: number;
  duration: number; // in hours
  totalLectures: number;
  language: string;
  instructorId: string;
  instructor: string;
  instructorAvatar?: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  curriculum: CourseSection[];
  createdAt: string;
  updatedAt: string;
  status: CourseStatus;
  hasCertificate: boolean;
  isPublished: boolean;
  isFeatured?: boolean;
}

export interface CourseCard {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  price: number;
  discountPrice?: number;
  instructor: string;
  instructorAvatar?: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: number;
  level: CourseLevel;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  courseCount: number;
  description?: string;
}

// ============================================
// INSTRUCTOR TYPES
// ============================================

export interface Instructor extends User {
  role: "instructor";
  designation: string;
  expertise: string[];
  totalCourses: number;
  totalStudents: number;
  rating: number;
  reviewCount: number;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: string;
  updatedAt?: string;
}

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

// ============================================
// ENROLLMENT TYPES
// ============================================

export type EnrollmentStatus = "active" | "completed" | "dropped";

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100
  status: EnrollmentStatus;
  lastAccessedAt?: string;
  completedLessons: string[]; // Lesson IDs
}

// ============================================
// CERTIFICATE TYPES
// ============================================

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  studentName: string;
  instructorName: string;
  issuedDate: string;
  certificateUrl: string;
  verificationCode: string;
}

// ============================================
// ACTIVITY TYPES
// ============================================

export type ActivityType =
  | "enrolled"
  | "completed"
  | "certificate_earned"
  | "review_posted"
  | "lesson_completed"
  | "course_started";

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  courseId?: string;
  courseName?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  icon?: string;
}

// ============================================
// WISHLIST TYPES
// ============================================

export interface WishlistItem {
  id: string;
  userId: string;
  courseId: string;
  addedAt: string;
}

// ============================================
// STATISTICS TYPES
// ============================================

export interface StudentStatistics {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLearningHours: number;
  certificatesEarned: number;
  currentStreak: number;
}

export interface AdminStatistics {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  totalRevenue: number;
  activeCourses: number;
  pendingReviews: number;
  monthlyGrowth: {
    students: number;
    courses: number;
    revenue: number;
  };
}

// ============================================
// FILTER & SEARCH TYPES
// ============================================

export interface CourseFilters {
  search?: string;
  categories?: string[];
  levels?: CourseLevel[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number; // minimum rating
  duration?: {
    min: number;
    max: number;
  };
  isFree?: boolean;
  hasCertificate?: boolean;
}

export type SortOption =
  | "popular"
  | "newest"
  | "rating"
  | "price-low"
  | "price-high"
  | "title-asc"
  | "title-desc";

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface CourseFormData {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  level: CourseLevel;
  language: string;
  price: number;
  discountPrice?: number;
  duration: number;
  totalLectures: number;
  thumbnail?: File;
  banner?: File;
  instructorId: string;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  hasCertificate: boolean;
  status: CourseStatus;
}

export interface UserFormData {
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  address?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationParams;
}

// ============================================
// THEME TYPES
// ============================================

export type Theme = "light" | "dark" | "system";

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

// ============================================
// BREADCRUMB TYPES
// ============================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

// ============================================
// TABLE TYPES
// ============================================

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon?: string;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
}

// ============================================
// TESTIMONIAL TYPES
// ============================================

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  comment: string;
  courseName?: string;
  date: string;
}

// ============================================
// FAQ TYPES
// ============================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// ============================================
// COMPANY TYPES
// ============================================

export interface Company {
  id: string;
  name: string;
  logo: string;
}

// ============================================
// BENEFIT TYPES
// ============================================

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ============================================
// LEARNING JOURNEY TYPES
// ============================================

export interface JourneyStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}
