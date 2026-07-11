import type { Metadata } from "next";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/features/landing/hero-section";
import { TrustedBySection } from "@/features/landing/trusted-by-section";
import { PopularCoursesSection } from "@/features/landing/popular-courses-section";
import { CategoriesSection } from "@/features/landing/categories-section";
import { BenefitsSection } from "@/features/landing/benefits-section";
import { LearningJourneySection } from "@/features/landing/learning-journey-section";
import { FeaturedInstructorsSection } from "@/features/landing/featured-instructors-section";
import { TestimonialsSection } from "@/features/landing/testimonials-section";
import { FAQSection } from "@/features/landing/faq-section";
import { NewsletterSection } from "@/features/landing/newsletter-section";

export const metadata: Metadata = {
  title: "LearnHub - Online Courses & Professional Skills Training",
  description: "Learn new skills with LearnHub. Access 1000+ courses in web development, data science, design, marketing and more. Expert instructors, lifetime access, certificates included.",
  keywords: ["online courses", "e-learning", "web development", "data science", "professional training", "skill development", "online education"],
  authors: [{ name: "LearnHub" }],
  openGraph: {
    title: "LearnHub - Online Courses & Professional Skills Training",
    description: "Learn new skills with LearnHub. Access 1000+ courses taught by expert instructors.",
    type: "website",
    locale: "en_US",
    url: "https://learnhub.com",
    siteName: "LearnHub",
    images: [
      {
        url: "https://learnhub.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LearnHub - Online Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnHub - Online Courses & Professional Skills Training",
    description: "Learn new skills with LearnHub. Access 1000+ courses taught by expert instructors.",
    images: ["https://learnhub.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <TrustedBySection />
        <PopularCoursesSection />
        <CategoriesSection />
        <BenefitsSection />
        <LearningJourneySection />
        <FeaturedInstructorsSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
