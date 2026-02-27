import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/auth/signin"],
        // Block all authenticated/private routes from indexing
        disallow: ["/dashboard/", "/projects/", "/clients/", "/api/"],
      },
    ],
    sitemap: "https://focusflowproject.vercel.app/sitemap.xml",
    host: "https://focusflowproject.vercel.app",
  };
}
