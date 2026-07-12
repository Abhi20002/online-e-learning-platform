# 📚 Online E-Learning Platform

> A modern, production-quality e-learning platform built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Shadcn UI

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Latest-black)](https://ui.shadcn.com/)

## 🎯 Overview

A comprehensive frontend-only e-learning platform featuring course browsing, student dashboards, admin panels, and mock authentication. Designed to showcase modern web development practices with enterprise-level code quality.

## ✨ Features

### **For Students**
- 🔐 **Secure Authentication** - Login/signup with React Hook Form + Zod validation
- 🎓 **Course Catalog** - Browse 8+ courses with advanced filtering and search
- 🔍 **Smart Filtering** - Filter by category, level, rating, price range
- 📊 **Personal Dashboard** - Track learning progress, enrolled courses, and stats
- ❤️ **Wishlist** - Save courses for later
- 🏆 **Certificates** - View, download, and share completion certificates
- ⚙️ **Settings** - Customize profile, notifications, privacy, and security

### **For Admins**
- 👨‍💼 **Role-Based Access** - Admin-only protected routes with authentication
- 📈 **Analytics Dashboard** - Platform statistics, revenue, and user metrics
- 📚 **Course Management** - Full CRUD operations for courses and content
- 👥 **User Management** - Manage users, roles, and account status
- 🔧 **Platform Settings** - Configure platform-wide settings

### **Technical Features**
- 🚀 **Performance Optimized** - Static Site Generation (SSG), code splitting, lazy loading
- ♿ **Accessible** - WCAG AA compliant, keyboard navigation, screen reader support
- 🔍 **SEO Optimized** - Dynamic sitemaps, JSON-LD structured data, meta tags
- 🎨 **Clean Design** - Modern, professional light theme
- 📱 **Responsive Design** - Mobile-first approach (375px to 3840px)
- 🎨 **Modern UI** - 25+ Shadcn UI components built on Radix UI primitives

---

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 15** - App Router with Server Components
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Strict mode for type safety

### **Styling & UI**
- **Tailwind CSS v4** - With `@theme` inline directive
- **Shadcn UI** - Copy-paste accessible components
- **Radix UI** - Headless UI primitives (17 packages)
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set

### **Forms & Validation**
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### **State & Data**
- **Context API** - Authentication state management
- **Mock Services** - Simulated backend (localStorage)

### **Utilities**
- **next-themes** - Theme management (configured for light mode)
- **Sonner** - Elegant toast notifications
- **class-variance-authority** - Component variants
- **tailwind-merge** - Merge Tailwind classes

---

## 📦 Getting Started

### Prerequisites
```bash
Node.js 18+ (20+ recommended)
npm 9+ or yarn 1.22+
```

### Installation

```bash
# Clone the repository (if applicable)
git clone https://github.com/Abhi20002/online-e-learning-platform
cd online-e-learning-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 🔑 Login Credentials

### Student Account
```
Email:    john.doe@example.com
Password: Password123
```

### Admin Account
```
Email:    admin@eduplatform.com
Password: Admin@123
```

> **Note:** These are mock credentials. Data is stored in `localStorage` for demo purposes.

---

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages
│   ├── admin/             # Admin panel
│   ├── courses/           # Course pages
│   └── dashboard/         # Student dashboard
├── components/            # React components
│   ├── ui/               # 25+ UI components
│   ├── cards/            # Card components
│   └── common/           # Header, Footer
├── mock/                 # Mock data
├── services/             # Mock services
└── types/                # TypeScript types
```

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📚 Key Pages

- `/` - Landing page
- `/courses` - Course listing
- `/courses/[slug]` - Course details
- `/dashboard` - Student dashboard (protected)
- `/admin` - Admin panel (admin only)

## 🌐 Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

---

**Built with using Next.js 15, React 19, and TypeScript**