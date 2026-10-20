import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const base = siteConfig.siteUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* The thank-you page is a post-submission state, not a landing page. */
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
