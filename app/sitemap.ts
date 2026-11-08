import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/internet", "/pricing", "/where-we-are", "/coverage", "/support", "/contact", "/business-institutions", "/cctv", "/for-isps", "/about", "/partners", "/advertise", "/faq", "/terms", "/privacy"].map((path) => ({ url: new URL(path || "/", siteUrl).toString(), lastModified: new Date() }));
}
