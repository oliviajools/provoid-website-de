import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.provoid.de";
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/company`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sports`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ueber-uns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes;
}
