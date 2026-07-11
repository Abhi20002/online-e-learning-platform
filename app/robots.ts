import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://learnhub.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/*",
          "/admin/*",
          "/api/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/dashboard/*",
          "/admin/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
