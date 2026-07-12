"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast.success("Success!", {
        description: "You've been subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="bg-brand-700 py-16">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-brand-600 px-8 py-12 text-center shadow-lifted">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
            <Mail size={22} />
          </span>
          <h2 className="text-2xl font-extrabold text-white">Get course updates in your inbox</h2>
          <p className="mt-2 max-w-md text-sm text-brand-100">
            Subscribe to our newsletter and get the latest courses, updates, and special offers
            delivered directly to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-sm items-center gap-2 rounded-xl bg-white p-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full bg-transparent px-3 py-2 text-sm text-ink-900 outline-none"
            />
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>

          <p className="mt-4 text-xs text-brand-100/80">
            By subscribing, you agree to receive emails from us. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
