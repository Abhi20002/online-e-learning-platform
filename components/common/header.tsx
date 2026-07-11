"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Search, Menu, X, User, LogOut, BookOpen, Heart, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { PUBLIC_NAV_ITEMS, APP_NAME } from "@/constants";
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
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            aria-label="LearnHub Home"
          >
            <GraduationCap className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold hidden sm:inline-block">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center flex-1 max-w-sm mx-6"
            role="search"
            aria-label="Search courses"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
                autoComplete="off"
              />
            </div>
          </form>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-4">
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
                  <DropdownMenuItem asChild>
                    <Link href="/student/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" aria-hidden="true" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/student/courses" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/student/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/student/certificates" className="cursor-pointer">
                      <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                      Certificates
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden md:inline-flex">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="hidden md:inline-flex">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t py-4 animate-fade-in"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="mb-4"
              role="search"
              aria-label="Search courses"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search courses"
                  autoComplete="off"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3" aria-label="Mobile navigation menu">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1.5 rounded-md",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
