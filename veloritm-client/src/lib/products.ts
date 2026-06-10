import type { Product } from "./types";

/**
 * Mock product catalogue for the MVP.
 * Replace with calls to /api/catalog/products once the Spring Boot backend is wired up.
 */
export const products: Product[] = [
  {
    slug: "trek-marlin-7-2026",
    title: "Trek Marlin 7 (2026)",
    shortDescription:
      "Універсальний гірський велосипед для крос-кантрі та щоденних поїздок.",
    description:
      "Trek Marlin 7 2026 — найпопулярніша модель у лінійці. Алюмінієва рама Alpha Silver, повітряна вилка RockShox Judy SL з ходом 100 мм, трансмісія Shimano Deore 1×12, гідравлічні гальма Shimano MT200. Підходить для трейлів, крос-кантрі та довгих поїздок містом.",
    brand: "Trek",
    category: "girski",
    price: 38990,
    oldPrice: 42990,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200",
    ],
    rating: 4.8,
    reviewCount: 47,
    availability: "InStock",
    stock: 12,
    badges: ["hit", "sale"],
    color: "Matte Black",
    frameSize: "M (17.5\")",
    wheelSize: "29\"",
    attributes: [
      { name: "Матеріал рами", value: "Alpha Silver Aluminium" },
      { name: "Вилка", value: "RockShox Judy SL, 100 мм" },
      { name: "Трансмісія", value: "Shimano Deore 1×12" },
      { name: "Гальма", value: "Shimano MT200, гідравлічні" },
      { name: "Колеса", value: "Bontrager Connection, 29\"" },
      { name: "Вага", value: "13.6 кг" },
    ],
  },
  {
    slug: "giant-talon-2-2026",
    title: "Giant Talon 2 (2026)",
    shortDescription:
      "Надійний гірський велосипед для початківців з якісною трансмісією.",
    description:
      "Giant Talon 2 2026 — стійкий старт у MTB. ALUXX-рама, гідравлічні гальма Tektro, 1×10 Shimano Deore.",
    brand: "Giant",
    category: "girski",
    price: 31500,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200",
    ],
    rating: 4.6,
    reviewCount: 22,
    availability: "InStock",
    stock: 7,
    badges: ["new"],
    color: "Blue",
    frameSize: "L (19\")",
    wheelSize: "29\"",
    attributes: [
      { name: "Матеріал рами", value: "ALUXX-Grade Aluminium" },
      { name: "Трансмісія", value: "Shimano Deore 1×10" },
      { name: "Гальма", value: "Tektro гідравлічні" },
    ],
  },
  {
    slug: "merida-scultura-400",
    title: "Merida Scultura 400",
    shortDescription:
      "Шосейний велосипед на алюмінієвій рамі з карбоновою вилкою.",
    description:
      "Шосейник Merida Scultura 400 — баланс жорсткості та комфорту. Shimano 105 2×11, дискові гальма, аеродинамічна посадка.",
    brand: "Merida",
    category: "shoseini",
    price: 54900,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=1200",
    ],
    rating: 4.9,
    reviewCount: 18,
    availability: "LimitedAvailability",
    stock: 3,
    badges: ["hit"],
    color: "Silk Black",
    frameSize: "M/L (54)",
    wheelSize: "28\"",
    attributes: [
      { name: "Матеріал рами", value: "Scultura Lite" },
      { name: "Трансмісія", value: "Shimano 105 2×11" },
      { name: "Гальма", value: "Дискові гідравлічні" },
      { name: "Вилка", value: "Carbon" },
    ],
  },
  {
    slug: "cannondale-quick-4",
    title: "Cannondale Quick 4",
    shortDescription:
      "Міський велосипед для швидких поїздок містом і фітнес-катання.",
    description:
      "Cannondale Quick 4 — швидкий гібрид із прямою посадкою. SmartForm C2 Alloy, Shimano Acera, V-brake.",
    brand: "Cannondale",
    category: "miski",
    price: 27990,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1505705694340-019e1e335916?w=1200",
    ],
    rating: 4.7,
    reviewCount: 31,
    availability: "InStock",
    stock: 9,
    color: "Sage Gray",
    frameSize: "M",
    wheelSize: "700C",
    attributes: [
      { name: "Матеріал рами", value: "SmartForm C2 Alloy" },
      { name: "Трансмісія", value: "Shimano Acera 3×8" },
      { name: "Гальма", value: "Tektro V-Brake" },
    ],
  },
  {
    slug: "specialized-riprock-24",
    title: "Specialized Riprock 24\"",
    shortDescription:
      "Дитячий гірський велосипед від 8 років, легкий і безпечний.",
    description:
      "Riprock 24 — модель для активних дітей. A1 Aluminium-рама, амортизатор SR Suntour, дискові гальма.",
    brand: "Specialized",
    category: "dytiachi",
    price: 22500,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=1200",
    ],
    rating: 4.5,
    reviewCount: 12,
    availability: "InStock",
    stock: 4,
    color: "Red",
    frameSize: "One Size",
    wheelSize: "24\"",
    attributes: [
      { name: "Матеріал рами", value: "A1 Aluminium" },
      { name: "Вилка", value: "SR Suntour XCT-Jr" },
    ],
  },
  {
    slug: "haibike-trekking-4",
    title: "Haibike Trekking 4",
    shortDescription:
      "Електровелосипед із мотором Yamaha PW-ST 250 W для далеких поїздок.",
    description:
      "Електровелосипед із туристичним характером: батарея 500 Wh, дальність до 90 км, Shimano Deore 1×10.",
    brand: "Haibike",
    category: "elektro",
    price: 89990,
    oldPrice: 99990,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200",
    ],
    rating: 4.9,
    reviewCount: 9,
    availability: "InStock",
    stock: 2,
    badges: ["new", "sale"],
    color: "Deep Blue",
    frameSize: "L",
    wheelSize: "28\"",
    attributes: [
      { name: "Мотор", value: "Yamaha PW-ST 250 W" },
      { name: "Батарея", value: "500 Wh Yamaha" },
      { name: "Дальність", value: "до 90 км" },
    ],
  },
  {
    slug: "shimano-deore-cassette",
    title: "Касета Shimano Deore CS-M6100 12s",
    shortDescription: "12-швидкісна касета 10-51T для MTB-трансмісії Deore.",
    description:
      "Оригінальна 12-швидкісна касета Shimano Deore CS-M6100. Сумісна з усіма групами Deore 12-speed.",
    brand: "Shimano",
    category: "zapchastyny",
    price: 3490,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1605731414532-6b26976cc153?w=1200",
    ],
    rating: 4.9,
    reviewCount: 64,
    availability: "InStock",
    stock: 24,
    attributes: [
      { name: "Швидкості", value: "12" },
      { name: "Діапазон", value: "10-51T" },
    ],
  },
  {
    slug: "kask-mojito-3",
    title: "Шолом Kask Mojito³",
    shortDescription: "Легкий вентильований шолом для шосе та міста.",
    description:
      "Kask Mojito³ — універсальний шолом 230 г. 24 вентиляційні отвори, Octo Fit-система регулювання.",
    brand: "Kask",
    category: "aksesuary",
    price: 5990,
    currency: "UAH",
    images: [
      "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=1200",
    ],
    rating: 4.8,
    reviewCount: 38,
    availability: "InStock",
    stock: 15,
    badges: ["hit"],
    color: "White",
    attributes: [
      { name: "Вага", value: "230 г" },
      { name: "Розмір", value: "M, L" },
    ],
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const featuredProducts = () => products.filter((p) => p.badges?.includes("hit"));
export const saleProducts = () => products.filter((p) => p.badges?.includes("sale"));
export const newProducts = () => products.filter((p) => p.badges?.includes("new"));

export const allBrands = () =>
  Array.from(new Set(products.map((p) => p.brand))).sort();
