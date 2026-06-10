import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "girski",
    title: "Гірські велосипеди",
    shortTitle: "Гірські",
    description:
      "MTB-моделі для бездоріжжя, крос-кантрі: алюмінієві та сталеві рами, повітряні вилки, гідравлічні гальма.",
    icon: "mountain",
  },
  {
    slug: "shoseini",
    title: "Шосейні велосипеди",
    shortTitle: "Шосейні",
    description:
      "Швидкі шосейники для тренувань та довгих заїздів. 22-30 швидкостей, аеродинамічні рами.",
    icon: "road",
  },
  {
    slug: "miski",
    title: "Міські велосипеди",
    shortTitle: "Міські",
    description:
      "Зручні моделі для щоденних поїздок містом: посадка, багажник, крила, освітлення.",
    icon: "city",
  },
  {
    slug: "dytiachi",
    title: "Дитячі велосипеди",
    shortTitle: "Дитячі",
    description:
      "Безпечні дитячі велосипеди від 16\" з ростом дитини. Легкі рами.",
    icon: "kids",
  },
  {
    slug: "elektro",
    title: "Електровелосипеди",
    shortTitle: "Електро",
    description:
      "E-bike з мотор-колесом 250–1000 W та літієвими батареями. Запас ходу до 90 км.",
    icon: "bolt",
  },
  {
    slug: "zapchastyny",
    title: "Запчастини",
    shortTitle: "Запчастини",
    description:
      "Трансмісія, гальма, колеса, рами, керма та інші компоненти провідних брендів.",
    icon: "wrench",
  },
  {
    slug: "aksesuary",
    title: "Аксесуари",
    shortTitle: "Аксесуари",
    description:
      "Шоломи, замки, насоси, сумки, велокомп'ютери, ліхтарі — все для зручної їзди.",
    icon: "helmet",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
