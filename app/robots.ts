import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.provoid.de/sitemap.xml",
    host: "https://www.provoid.de",
  };
}
