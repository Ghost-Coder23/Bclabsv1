import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = configuredUrl?.endsWith("/") ? configuredUrl.slice(0, -1) : configuredUrl;
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: siteUrl + "/sitemap.xml" } : {}),
  };
}