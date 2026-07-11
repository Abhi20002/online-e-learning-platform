"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { Logo } from "@/components/common/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, cn } from "@/lib/utils";
import { toast } from "sonner";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    label: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
  },
  {
    label: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          <p className="text-ink-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Mobile scrim */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-ink-300/20 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Dashboard navigation"
      >
        <div className="flex h-18 items-center justify-between px-5 py-4">
          <Link href="/" className="flex flex-col items-start gap-0.5 pl-2" aria-label="Skillbridge Home">
            <Logo />
            <span className="pl-3 text-xs text-ink-400">Student Dashboard</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-ink-500 lg:hidden"
            aria-label="Close menu"
            type="button"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-500 hover:bg-surface-alt"
                )}
              >
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-ink-300/20 px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Logout"
            type="button"
          >
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex h-18 items-center justify-between gap-4 border-b border-ink-300/20 bg-white/90 px-5 py-3 backdrop-blur-md"
          role="banner"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-ink-500 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-sidebar"
              type="button"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
            <h1 className="text-lg font-extrabold text-ink-900">My Learning</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative rounded-full p-2 text-ink-500 hover:bg-surface-alt"
              aria-label="Notifications"
              type="button"
            >
              <Bell size={19} aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral-accent" />
            </button>
            <div className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-semibold text-ink-800">{user.name}</p>
                <p className="text-xs capitalize text-ink-400">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
