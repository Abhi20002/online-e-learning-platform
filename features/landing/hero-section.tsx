"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(104,81,247,0.55),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(245,165,36,0.25),transparent_40%)]" />
      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-100">
            Trusted by 200,000+ learners worldwide
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            Learn Anything, Anytime
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-100">
            Join thousands of learners worldwide. Access expert-led courses,
            build in-demand skills, and transform your career with our
            comprehensive online learning platform.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex max-w-md items-center gap-2 rounded-2xl bg-white p-2 shadow-lifted"
          >
            <Search size={18} className="ml-2 text-ink-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn?"
              className="w-full bg-transparent px-1 py-2 text-sm text-ink-900 outline-none"
            />
            <Button type="submit" size="sm">Search</Button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </Button>
            <Link
              href="/signup"
              className="flex items-center gap-2.5 text-sm font-semibold text-white hover:text-brand-100"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <PlayCircle size={20} />
              </span>
              Watch how it works
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -top-6 right-10 z-10 rounded-2xl bg-white p-4 shadow-lifted">
            <p className="text-xs text-ink-400">Course completion</p>
            <p className="text-2xl font-extrabold text-brand-700">92%</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/hero-learning/620/560"
            alt="Student learning online"
            className="ml-auto h-[460px] w-[420px] rounded-3xl object-cover shadow-lifted"
          />
          <div className="absolute -bottom-6 left-0 z-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lifted">
            <div className="flex -space-x-2">
              {[21, 24, 28].map((n) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={n}
                  src={`https://i.pravatar.cc/60?img=${n}`}
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  alt=""
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900">4,800+ enrolled</p>
              <p className="text-xs text-ink-400">this month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
