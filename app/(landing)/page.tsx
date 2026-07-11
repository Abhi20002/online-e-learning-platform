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

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
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
