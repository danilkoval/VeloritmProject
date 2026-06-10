export type Availability = "InStock" | "OutOfStock" | "LimitedAvailability";

export type CategorySlug =
  | "girski"
  | "shoseini"
  | "miski"
  | "dytiachi"
  | "elektro"
  | "zapchastyny"
  | "aksesuary";

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  parent?: CategorySlug;
}

export interface Product {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  brand: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  currency: "UAH";
  images: string[];
  rating?: number;
  reviewCount?: number;
  availability: Availability;
  stock: number;
  badges?: ("hit" | "new" | "sale")[];
  attributes: { name: string; value: string }[];
  color?: string;
  frameSize?: string;
  wheelSize?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}
