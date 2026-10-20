import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { comparisons } from "@/data/comparisons";
import { states } from "@/data/states";

const base = siteConfig.siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/find-my-plans", priority: 0.9, freq: "monthly" },
    { path: "/compare", priority: 0.8, freq: "monthly" },
    { path: "/states", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "yearly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
    { path: "/disclosures", priority: 0.3, freq: "yearly" },
    { path: "/do-not-sell", priority: 0.3, freq: "yearly" },
  ];

  return [
    ...core.map((e) => ({
      url: `${base}${e.path}`,
      lastModified: now,
      changeFrequency: e.freq,
      priority: e.priority,
    })),
    ...comparisons.map((c) => ({
      url: `${base}/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...states.map((s) => ({
      url: `${base}/states/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
