"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, User, LogOut, BookOpen, Heart, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth.context";
import { PUBLIC_NAV_ITEMS } from "@/constants";
import { Logo } from "@/components/common/logo";
// import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn, getInitials } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-ink-300/20 bg-white/90 backdrop-blur-md shadow-soft"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center pl-2"
            aria-label="Skillbridge Home"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 pl-6" aria-label="Main navigation">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors whitespace-nowrap",
                  pathname === item.href
                    ? "font-bold text-brand-600"
                    : "font-medium text-ink-700 hover:text-brand-600"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xs items-center rounded-full border border-ink-300/20 bg-white px-4 py-2 shadow-soft ml-auto"
            role="search"
            aria-label="Search courses"
          >
            <Search className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-ink-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search courses"
              autoComplete="off"
            />
          </form>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" aria-hidden="true" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" aria-hidden="true" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/courses" className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                          My Courses
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/wishlist" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/certificates" className="cursor-pointer">
                          <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                          Certificates
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden rounded-full bg-white px-7 shadow-soft hover:bg-surface-alt md:inline-flex"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="hidden rounded-full px-7 md:inline-flex">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-ink-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-[22px] w-[22px]" aria-hidden="true" />
              ) : (
                <Menu className="h-[22px] w-[22px]" aria-hidden="true" />
              )}
            </button>
          </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-ink-300/20 bg-white px-5 py-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center rounded-xl border border-ink-300/40 bg-surface-alt px-3.5 py-2.5"
            role="search"
            aria-label="Search courses"
          >
            <Search className="h-4 w-4 text-ink-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-ink-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search courses"
              autoComplete="off"
            />
          </form>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation menu">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3.5 py-2.5 text-sm font-semibold",
                  pathname === item.href
                    ? "text-brand-600 bg-brand-50"
                    : "text-ink-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          {!isAuthenticated && (
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="secondary" className="w-full rounded-full">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
