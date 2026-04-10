import { MetadataRoute } from "next";
import { getAllGuias } from "@/lib/mdx";

const BASE = "https://iaempresa.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const guias = getAllGuias();

  const guiaUrls = guias.map((g) => ({
    url: `${BASE}/guias/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/guias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/ferramentas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/sobre`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...guiaUrls,
  ];
}
