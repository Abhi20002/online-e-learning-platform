"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart3, CheckCircle2, Mail, Play, Search, Users } from "lucide-react";
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
    <section className="relative overflow-hidden bg-brand-50">
      {/* Soft radial tints */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(104,81,247,0.14),transparent_45%),radial-gradient(circle_at_8%_85%,rgba(245,165,36,0.12),transparent_40%)]" />

      <div className="container-page relative grid gap-14 pb-24 pt-14 lg:grid-cols-2 lg:gap-8 lg:pb-36 lg:pt-20">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-soft">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Trusted by 200,000+ learners worldwide
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.12] text-ink-900 sm:text-5xl xl:text-[3.4rem]">
            <span className="text-brand-600">Learning</span> Online is now much easier
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
            Skillbridge is an interesting platform that will teach you in a more
            interactive way — expert-led courses, real projects, and skills that
            move your career forward.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/signup">Join for free</Link>
            </Button>
            <Link href="/courses" className="group flex items-center gap-3.5 text-sm font-semibold text-ink-700 hover:text-brand-600">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-card transition-transform group-hover:scale-105">
                <Play size={18} className="ml-0.5 fill-current" />
              </span>
              Watch how it works
            </Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-10 flex w-full max-w-md items-center gap-2 rounded-full bg-white p-2 shadow-card"
            role="search"
            aria-label="Search courses"
          >
            <Search size={18} className="ml-3 shrink-0 text-ink-400" aria-hidden="true" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn?"
              className="w-full bg-transparent px-1 py-2 text-sm text-ink-900 outline-none placeholder:text-ink-400"
              aria-label="Search courses"
            />
            <Button type="submit" size="sm" className="rounded-full px-5">
              Search
            </Button>
          </form>
        </div>

        {/* Right Illustration */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto h-[520px] w-[400px]">
            {/* Hero image */}
            <Image
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=620&h=780&fit=crop"
              alt="Student learning online with books"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 400px"
              className="rounded-[2.5rem] object-cover shadow-lifted ring-8 ring-white/60"
            />

            {/* Floating: assisted students stat */}
            <div className="animate-float absolute -left-6 top-10 xl:-left-16 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lifted">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <Users size={20} />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-extrabold text-ink-900">250k</p>
                <p className="text-xs text-ink-400">Assisted Students</p>
              </div>
            </div>

            {/* Floating: chart chip */}
            <div className="animate-float-delayed absolute -right-2 top-2 xl:-right-8 rounded-2xl bg-white p-3.5 shadow-lifted">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-coral-accent">
                <BarChart3 size={20} />
              </span>
            </div>

            {/* Floating: congratulations toast */}
            <div className="animate-float absolute -right-6 top-1/2 xl:-right-20 flex items-start gap-3 rounded-2xl bg-white p-4 shadow-lifted">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-accent">
                <Mail size={20} />
              </span>
              <div className="leading-tight">
                <p className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
                  Congratulations
                  <CheckCircle2 size={15} className="text-emerald-500" />
                </p>
                <p className="mt-0.5 text-xs text-ink-400">Your admission completed</p>
              </div>
            </div>

            {/* Floating: live class card */}
            <div className="animate-float-delayed absolute -bottom-8 -left-6 xl:-left-20 rounded-2xl bg-white p-4 shadow-lifted">
              <div className="flex items-center gap-3">
                <span className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-ink-900">User Experience Class</p>
                  <p className="mt-0.5 text-xs text-ink-400">Today at 12.00 PM</p>
                </div>
              </div>
              <Link
                href="/courses"
                className="mt-3 inline-flex rounded-full bg-coral-accent px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <svg
        className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-20"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,0 C480,110 960,110 1440,0 L1440,120 L0,120 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
