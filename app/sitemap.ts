import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/coverage", "/pricing", "/faq", "/contact"].map((path) => ({ url: new URL(path || "/", siteUrl).toString(), lastModified: new Date() }));
}
