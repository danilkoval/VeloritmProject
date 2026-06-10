import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt per PRD §5.1:
 *   - Blocks /admin, /checkout, /cart, /account
 *   - Allows /catalog, /product, etc.
 *   - Points to sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin",
          "/admin/",
          "/checkout",
          "/checkout/",
          "/cart",
          "/cart/",
          "/account",
          "/account/",
          "/api/",
          "/login",
          "/register",
          "/search",
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
