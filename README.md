# 📚 Online E-Learning Platform

> A modern, production-quality e-learning platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

## 🎯 Overview

A comprehensive frontend-only e-learning platform featuring course browsing, student dashboards, admin panels, and mock authentication. Designed to showcase modern web development practices with enterprise-level code quality.

## ✨ Features

### **For Students**
- 🔐 Secure login/signup with validation
- 🎓 Browse 8+ courses with advanced filtering
- 🔍 Search by title, category, level, rating, price
- 📊 Personal dashboard with progress tracking
- ❤️ Wishlist management
- 🏆 Certificate viewing and sharing
- ⚙️ Profile and notification settings

### **For Admins**
- 👨‍💼 Admin-only access control
- 📈 Platform statistics and analytics
- 📚 Course management (CRUD operations)
- 👥 User management with role/status control
- 🔧 Platform settings configuration

### **General**
- 🌓 Light/Dark mode support
- 📱 Fully responsive (mobile-first)
- 🚀 Fast performance
- 🎨 Modern UI with Shadcn components

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (Strict mode)
- **Tailwind CSS v4** with @theme inline
- **Shadcn UI** + Radix UI
- **React Hook Form** + Zod
- **Sonner** (Toast notifications)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Login Credentials

### Student Account
```
Email: john.doe@example.com
Password: Password123
```

### Admin Account
```
Email: admin@eduplatform.com
Password: Admin@123
```

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