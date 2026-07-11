import type { Metadata } from "next";
import { APP_URL } from "@/constants";

const siteConfig = {
  name: "Skillbridge",
  description: "Learn new skills with Skillbridge. Access 1000+ courses in web development, data science, design, marketing and more.",
  url: APP_URL,
  ogImage: `${APP_URL}/og-image.jpg`,
  links: {
    twitter: "https://twitter.com/skillbridge",
    github: "https://github.com/skillbridge",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      "online courses",
      "e-learning",
      "web development",
      "data science",
      "professional training",
      "skill development",
      "online education",
      "certifications",
      "programming",
      "design",
    ],
    authors: [
      {
        name: "Skillbridge",
      },
    ],
    creator: "Skillbridge",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@skillbridge",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export { siteConfig };
