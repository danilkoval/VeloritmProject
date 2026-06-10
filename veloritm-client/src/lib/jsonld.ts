import { site } from "./site";
import type { Product } from "./types";

/**
 * Schema.org JSON-LD helpers. All values returned as plain objects ready to be
 * embedded via <script type="application/ld+json">.
 * Required by PRD §5.4.
 */

const orgUrl = `${site.url}/`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  email: site.organization.email,
  telephone: site.organization.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.organization.address.streetAddress,
    addressLocality: site.organization.address.addressLocality,
    addressCountry: site.organization.address.addressCountry,
    postalCode: site.organization.address.postalCode,
  },
  sameAs: [
    site.organization.social.telegram,
    site.organization.social.instagram,
  ],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: orgUrl,
  name: site.name,
  inLanguage: "uk-UA",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const productLd = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.title,
  image: product.images,
  description: product.description,
  sku: product.slug,
  brand: {
    "@type": "Brand",
    name: product.brand,
  },
  category: product.category,
  offers: {
    "@type": "Offer",
    url: `${site.url}/product/${product.slug}`,
    priceCurrency: product.currency,
    price: product.price.toString(),
    availability: `https://schema.org/${product.availability}`,
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: site.name,
    },
  },
  ...(product.rating && product.reviewCount
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : {}),
});

export const breadcrumbLd = (
  items: { name: string; href: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${site.url}${item.href}`,
  })),
});

export const faqLd = (entries: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
});
