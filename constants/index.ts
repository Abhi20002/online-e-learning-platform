import type { CourseLevel, SortOption, UserRole } from "@/types";

// ============================================
// APPLICATION CONFIG
// ============================================

export const APP_NAME = "Skillbridge";
export const APP_DESCRIPTION = "Learn Anything, Anytime - Online E-Learning Platform";
export const APP_URL = "https://online-e-learning-platform-n1rz.vercel.app";

// ============================================
// PAGINATION
// ============================================

export const ITEMS_PER_PAGE = 12;
export const COURSES_PER_PAGE = 12;
export const REVIEWS_PER_PAGE = 10;
export const USERS_PER_PAGE = 20;

// ============================================
// COURSE CONSTANTS
// ============================================

export const COURSE_LEVELS: Array<{ value: CourseLevel; label: string }> = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
];

export const PRICE_RANGES = [
  { label: "Free", min: 0, max: 0 },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: 999999 },
];

export const RATING_FILTERS = [
  { label: "4.5 & up", value: 4.5 },
  { label: "4.0 & up", value: 4.0 },
  { label: "3.5 & up", value: 3.5 },
  { label: "3.0 & up", value: 3.0 },
];

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES: Array<{ value: UserRole; label: string }> = [
  { value: "student", label: "Student" },
  { value: "instructor", label: "Instructor" },
  { value: "admin", label: "Admin" },
];

// ============================================
// NAVIGATION
// ============================================

export const PUBLIC_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  // { label: "Categories", href: "/categories" },
  // { label: "Become Instructor", href: "/become-instructor" },
  // { label: "About", href: "/about" },
];

export const STUDENT_NAV_ITEMS = [
  { label: "Dashboard", href: "/student/dashboard", icon: "LayoutDashboard" },
  { label: "My Courses", href: "/student/courses", icon: "BookOpen" },
  { label: "Wishlist", href: "/student/wishlist", icon: "Heart" },
  { label: "Certificates", href: "/student/certificates", icon: "Award" },
  { label: "Messages", href: "/student/messages", icon: "MessageSquare" },
  { label: "Settings", href: "/student/settings", icon: "Settings" },
];

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Categories", href: "/admin/categories", icon: "FolderTree" },
  { label: "Reviews", href: "/admin/reviews", icon: "Star" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

// ============================================
// FOOTER LINKS
// ============================================

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  resources: [
    { label: "Become Instructor", href: "/become-instructor" },
    { label: "Teaching Center", href: "/teaching" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Affiliates", href: "/affiliates" },
  ],
};

export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { name: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];

// ============================================
// FAQ DATA
// ============================================

export const FAQ_DATA = [
  {
    id: "1",
    question: "How do I enroll in a course?",
    answer:
      "Browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll need to create an account or sign in to complete the enrollment process.",
  },
  {
    id: "2",
    question: "Are the courses self-paced?",
    answer:
      "Yes, all our courses are self-paced. You can learn at your own speed and access the course materials anytime, anywhere. Once enrolled, you have lifetime access to the course content.",
  },
  {
    id: "3",
    question: "Do I receive a certificate upon completion?",
    answer:
      "Yes, you'll receive a certificate of completion for most of our courses. The certificate can be downloaded and shared on your LinkedIn profile or with potential employers.",
  },
  {
    id: "4",
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all our courses. If you're not satisfied with the course for any reason, you can request a full refund within 30 days of enrollment.",
  },
  {
    id: "5",
    question: "Can I access courses on mobile devices?",
    answer:
      "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, laptops, and desktops.",
  },
  {
    id: "6",
    question: "How do I become an instructor?",
    answer:
      "Click on 'Become Instructor' in the main navigation, fill out the application form with your details and teaching experience, and our team will review your application within 2-3 business days.",
  },
];

// ============================================
// BENEFITS DATA
// ============================================

export const BENEFITS_DATA = [
  {
    id: "1",
    title: "Expert Instructors",
    description: "Learn from industry experts with years of practical experience",
    icon: "GraduationCap",
  },
  {
    id: "2",
    title: "Flexible Learning",
    description: "Study at your own pace, anywhere and anytime that suits you",
    icon: "Clock",
  },
  {
    id: "3",
    title: "Lifetime Access",
    description: "Enroll once and access course materials for lifetime",
    icon: "Infinity",
  },
  {
    id: "4",
    title: "Certification",
    description: "Earn certificates upon completion to showcase your skills",
    icon: "Award",
  },
  {
    id: "5",
    title: "Community Support",
    description: "Connect with peers and instructors in our active community",
    icon: "Users",
  },
  {
    id: "6",
    title: "Affordable Pricing",
    description: "High-quality education at competitive and transparent pricing",
    icon: "DollarSign",
  },
];

// ============================================
// LEARNING JOURNEY STEPS
// ============================================

export const LEARNING_JOURNEY_STEPS = [
  {
    id: "1",
    step: 1,
    title: "Browse Courses",
    description: "Explore our extensive catalog of courses across various categories",
    icon: "Search",
  },
  {
    id: "2",
    step: 2,
    title: "Enroll in Course",
    description: "Sign up and enroll in courses that match your learning goals",
    icon: "UserPlus",
  },
  {
    id: "3",
    step: 3,
    title: "Start Learning",
    description: "Access high-quality video lessons and learning materials",
    icon: "Play",
  },
  {
    id: "4",
    step: 4,
    title: "Earn Certificate",
    description: "Complete the course and receive your certificate of achievement",
    icon: "Award",
  },
];

// ============================================
// TRUSTED COMPANIES (Mock logos)
// ============================================

export const TRUSTED_COMPANIES = [
  { id: "1", name: "Google", logo: "/logos/google.svg" },
  { id: "2", name: "Microsoft", logo: "/logos/microsoft.svg" },
  { id: "3", name: "Amazon", logo: "/logos/amazon.svg" },
  { id: "4", name: "Apple", logo: "/logos/apple.svg" },
  { id: "5", name: "Meta", logo: "/logos/meta.svg" },
  { id: "6", name: "Netflix", logo: "/logos/netflix.svg" },
];

// ============================================
// LANGUAGE OPTIONS
// ============================================

export const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "hi", label: "Hindi" },
];

// ============================================
// STATUS OPTIONS
// ============================================

export const COURSE_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export const USER_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

// ============================================
// FILE UPLOAD
// ============================================

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// ============================================
// VALIDATION
// ============================================

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
export const MOBILE_REGEX = /^[0-9]{10}$/;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  required: "This field is required",
  email: "Please enter a valid email address",
  password:
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  passwordMatch: "Passwords do not match",
  mobile: "Please enter a valid 10-digit mobile number",
  agreeToTerms: "You must agree to the terms and conditions",
  fileSize: "File size must be less than 5MB",
  fileType: "Please upload a valid image file (JPEG, PNG, or WebP)",
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection.",
  unauthorized: "You are not authorized to perform this action",
  notFound: "Resource not found",
};

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  login: "Successfully logged in!",
  logout: "Successfully logged out!",
  signup: "Account created successfully!",
  courseEnrolled: "Successfully enrolled in the course!",
  courseAdded: "Course added successfully!",
  courseUpdated: "Course updated successfully!",
  courseDeleted: "Course deleted successfully!",
  userAdded: "User added successfully!",
  userUpdated: "User updated successfully!",
  userDeleted: "User deleted successfully!",
  profileUpdated: "Profile updated successfully!",
  passwordReset: "Password reset link sent to your email!",
  passwordChanged: "Password changed successfully!",
  wishlistAdded: "Added to wishlist!",
  wishlistRemoved: "Removed from wishlist!",
  reviewSubmitted: "Review submitted successfully!",
};

// ============================================
// API ENDPOINTS (Mock)
// ============================================

export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
  },
  courses: {
    list: "/api/courses",
    get: (id: string) => `/api/courses/${id}`,
    create: "/api/courses",
    update: (id: string) => `/api/courses/${id}`,
    delete: (id: string) => `/api/courses/${id}`,
    enroll: (id: string) => `/api/courses/${id}/enroll`,
  },
  users: {
    list: "/api/users",
    get: (id: string) => `/api/users/${id}`,
    create: "/api/users",
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
  categories: {
    list: "/api/categories",
    get: (id: string) => `/api/categories/${id}`,
  },
  reviews: {
    list: (courseId: string) => `/api/courses/${courseId}/reviews`,
    create: (courseId: string) => `/api/courses/${courseId}/reviews`,
  },
  wishlist: {
    list: "/api/wishlist",
    add: "/api/wishlist",
    remove: (id: string) => `/api/wishlist/${id}`,
  },
};

// ============================================
// LOCAL STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  authToken: "auth_token",
  user: "user",
  theme: "theme",
  wishlist: "wishlist",
  recentlyViewed: "recently_viewed",
  searchHistory: "search_history",
};

// ============================================
// DEBOUNCE DELAYS
// ============================================

export const DEBOUNCE_DELAY = {
  search: 300,
  filter: 500,
  input: 300,
};

// ============================================
// ANIMATION DURATIONS
// ============================================

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};
