import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = configuredUrl?.endsWith("/") ? configuredUrl.slice(0, -1) : configuredUrl;
  if (!siteUrl) return [];
  const routes = ["", "/about", "/services", "/solutions", "/work", "/insights", "/contact"];
  return routes.map((route) => ({
    url: siteUrl + route,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}