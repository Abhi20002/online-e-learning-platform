import Script from "next/script";
import type { Course } from "@/types";
import { APP_URL } from "@/constants";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LearnHub",
    "description": "Online learning platform offering professional courses in web development, data science, design, and more.",
    "url": APP_URL,
    "logo": `${APP_URL}/logo.png`,
    "sameAs": [
      "https://twitter.com/learnhub",
      "https://facebook.com/learnhub",
      "https://linkedin.com/company/learnhub"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "Customer Service",
      "email": "support@learnhub.com"
    }
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Course Schema
interface CourseSchemaProps {
  course: Course;
}

export function CourseSchema({ course }: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "LearnHub",
      "sameAs": APP_URL
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": course.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": course.discountPrice || course.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${APP_URL}/courses/${course.slug}`
    },
    "educationalLevel": course.level,
    "inLanguage": course.language === "en" ? "English" : course.language,
    "numberOfLessons": course.totalLectures,
    "timeRequired": `PT${course.duration}H`,
    "coursePrerequisites": course.requirements.join(", ")
  };

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Review Schema
interface ReviewSchemaProps {
  reviews: Array<{
    rating: number;
    comment: string;
    userName: string;
    createdAt: string;
  }>;
  itemName: string;
}

export function ReviewSchema({ reviews, itemName }: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": itemName,
    "review": reviews.map((review) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "author": {
        "@type": "Person",
        "name": review.userName
      },
      "reviewBody": review.comment,
      "datePublished": review.createdAt
    }))
  };

  return (
    <Script
      id="review-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
