"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth.context";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, GraduationCap, Users, Award } from "lucide-react";

export default function Home() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">EduPlatform</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.name}!
                  </span>
                  <Button onClick={handleLogout} variant="outline">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Learn Anything,{" "}
              <span className="text-gradient">Anytime</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners worldwide. Access expert-led courses and
              transform your career with EduPlatform.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm text-muted-foreground">Instructors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">30K+</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Auth Status Card */}
        {isAuthenticated && (
          <Card className="max-w-2xl mx-auto mt-12">
            <CardHeader>
              <CardTitle>Welcome back, {user?.name}! 👋</CardTitle>
              <CardDescription>
                You are logged in as <strong>{user?.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{user?.status}</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/student/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Development Notice */}
        <Card className="max-w-2xl mx-auto mt-12 border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚧 Development Preview
            </CardTitle>
            <CardDescription>
              Authentication system is complete! Try logging in with test credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Test Credentials:</p>
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm font-mono">
                <div>
                  <strong>Email:</strong> john.doe@example.com
                </div>
                <div>
                  <strong>Password:</strong> (any password 6+ characters)
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Next up:</strong> Landing page with hero, courses, categories,
              and more!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
