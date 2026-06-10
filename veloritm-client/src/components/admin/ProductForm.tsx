"use client";

import { Fragment, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CloseIcon, PlusIcon, TrashIcon } from "@/components/ui/Icon";
import { IconButton } from "./IconButton";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";

type Badge = "hit" | "new" | "sale";

interface FormState {
  brand: string;
  model: string;
  slug: string;
  category: Product["category"];
  shortDescription: string;
  description: string;
  price: string;
  oldPrice: string;
  stock: string;
  threshold: string;
  color: string;
  frameSize: string;
  wheelSize: string;
  images: string[];
  attributes: { name: string; value: string }[];
  badges: Badge[];
}

const empty: FormState = {
  brand: "",
  model: "",
  slug: "",
  category: "girski",
  shortDescription: "",
  description: "",
  price: "",
  oldPrice: "",
  stock: "0",
  threshold: "5",
  color: "",
  frameSize: "",
  wheelSize: "",
  images: [""],
  attributes: [{ name: "", value: "" }],
  badges: [],
};

const composeTitle = (brand: string, model: string) =>
  `${brand} ${model}`.replace(/\s+/g, " ").trim();

const splitModel = (title: string, brand: string) => {
  if (!brand) return title;
  const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return title.replace(new RegExp(`^${escaped}\\s+`, "i"), "").trim();
};

const badgeLabel: Record<Badge, string> = {
  hit: "Хіт продажів",
  new: "Новинка",
  sale: "Знижка",
};

const fromProduct = (p: Product): FormState => ({
  brand: p.brand,
  model: splitModel(p.title, p.brand),
  slug: p.slug,
  category: p.category,
  shortDescription: p.shortDescription,
  description: p.description,
  price: String(p.price),
  oldPrice: p.oldPrice != null ? String(p.oldPrice) : "",
  stock: String(p.stock),
  threshold: "5",
  color: p.color ?? "",
  frameSize: p.frameSize ?? "",
  wheelSize: p.wheelSize ?? "",
  images: p.images.length > 0 ? [...p.images] : [""],
  attributes:
    p.attributes.length > 0
      ? p.attributes.map((a) => ({ ...a }))
      : [{ name: "", value: "" }],
  badges: [...(p.badges ?? [])],
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9Ѐ-ӿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

interface Props {
  mode: "create" | "edit";
  product?: Product;
}

export function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    product ? fromProduct(product) : empty,
  );
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setImage = (i: number, v: string) =>
    update(
      "images",
      form.images.map((img, idx) => (idx === i ? v : img)),
    );

  const addImage = () => update("images", [...form.images, ""]);
  const removeImage = (i: number) =>
    update(
      "images",
      form.images.filter((_, idx) => idx !== i),
    );

  const setAttr = (i: number, field: "name" | "value", v: string) =>
    update(
      "attributes",
      form.attributes.map((a, idx) =>
        idx === i ? { ...a, [field]: v } : a,
      ),
    );

  const addAttr = () =>
    update("attributes", [...form.attributes, { name: "", value: "" }]);
  const removeAttr = (i: number) =>
    update(
      "attributes",
      form.attributes.filter((_, idx) => idx !== i),
    );

  const toggleBadge = (b: Badge) =>
    update(
      "badges",
      form.badges.includes(b)
        ? form.badges.filter((x) => x !== b)
        : [...form.badges, b],
    );

  const title = composeTitle(form.brand, form.model);

  const onIdentityBlur = () => {
    if (mode === "create" && !form.slug && title) {
      update("slug", slugify(title));
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Mock save — у проді тут буде POST/PUT /api/admin/products
    setTimeout(() => {
      router.push("/admin/products");
    }, 300);
  };

  const onDelete = () => {
    if (!product) return;
    if (!confirm(`Видалити «${title || product.title}»?`)) return;
    router.push("/admin/products");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <section className="card p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-white">Зображення</h3>
          <button
            type="button"
            onClick={addImage}
            className="btn btn-secondary !py-2 !text-xs"
          >
            <PlusIcon size={14} /> Додати посилання
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {form.images.map((img, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-[#1f2750] p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0a0e23]">
                {img && (
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => setImage(i, e.target.value)}
                  placeholder="https://images.unsplash.com/…"
                  className="field-dark"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="self-start text-xs font-semibold text-[#ef4444] hover:text-[#ff7a3d]"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
          {form.images.length === 0 && (
            <p className="text-sm text-[#7a82ad]">Зображень не додано.</p>
          )}
        </div>
      </section>

      <section className="card p-6">
        <h3 className="text-base font-semibold text-white">Основна інформація</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Бренд
            </span>
            <input
              required
              type="text"
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
              onBlur={onIdentityBlur}
              placeholder="Trek"
              className="field-dark mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Модель
            </span>
            <input
              required
              type="text"
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
              onBlur={onIdentityBlur}
              placeholder="Marlin 7 (2026)"
              className="field-dark mt-1"
            />
          </label>
          <div className="sm:col-span-2 rounded-xl border border-dashed border-[#1f2750] bg-[#0a0e23]/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Назва картки (формується автоматично)
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {title || "—"}
            </p>
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Категорія
            </span>
            <select
              value={form.category}
              onChange={(e) =>
                update("category", e.target.value as Product["category"])
              }
              className="field-dark mt-1"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Артикул (slug)
            </span>
            <input
              required
              type="text"
              value={form.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              placeholder="trek-marlin-7-2026"
              disabled={mode === "edit"}
              className="field-dark mt-1 disabled:opacity-60"
            />
            <span className="mt-1 block text-xs text-[#7a82ad]">
              URL: /product/{form.slug || "…"}
            </span>
          </label>
          <label className="sm:col-span-2 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Короткий опис
            </span>
            <textarea
              required
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              rows={3}
              placeholder="Універсальний гірський велосипед для крос-кантрі та щоденних поїздок."
              className="field-dark mt-1 resize-y"
            />
          </label>
          <label className="sm:col-span-2 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Повний опис
            </span>
            <textarea
              required
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={5}
              placeholder="Алюмінієва рама Alpha Silver, повітряна вилка RockShox Judy SL…"
              className="field-dark mt-1 resize-y"
            />
          </label>
        </div>
      </section>

      {form.category !== "zapchastyny" && form.category !== "aksesuary" && (
        <section className="card p-6">
          <h3 className="text-base font-semibold text-white">Параметри</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
                Колір
              </span>
              <input
                type="text"
                value={form.color}
                onChange={(e) => update("color", e.target.value)}
                placeholder="Matte Black"
                className="field-dark mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
                Розмір рами
              </span>
              <input
                type="text"
                value={form.frameSize}
                onChange={(e) => update("frameSize", e.target.value)}
                placeholder='M (17.5")'
                className="field-dark mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
                Розмір колеса
              </span>
              <input
                type="text"
                value={form.wheelSize}
                onChange={(e) => update("wheelSize", e.target.value)}
                placeholder='29"'
                className="field-dark mt-1"
              />
            </label>
          </div>
        </section>
      )}

      <section className="card p-6">
        <h3 className="text-base font-semibold text-white">Характеристики</h3>
        <div className="mt-4">
          {form.attributes.map((a, i) => (
            <Fragment key={i}>
              {i > 0 && (
                <div
                  aria-hidden
                  className="my-3 h-px bg-[#1f2750] sm:my-2 sm:bg-transparent"
                />
              )}
              <div
                className="rounded-xl border border-[#1f2750] p-3 sm:flex sm:items-start sm:gap-2 sm:border-0 sm:p-0"
              >
              <div className="flex items-center gap-2 sm:flex-1">
                <input
                  type="text"
                  value={a.name}
                  onChange={(e) => setAttr(i, "name", e.target.value)}
                  placeholder="Назва (напр. Матеріал рами)"
                  className="field-dark flex-1"
                />
                <div className="sm:hidden">
                  <IconButton
                    label="Видалити характеристику"
                    variant="danger"
                    onClick={() => removeAttr(i)}
                  >
                    <CloseIcon size={14} />
                  </IconButton>
                </div>
              </div>
              <input
                type="text"
                value={a.value}
                onChange={(e) => setAttr(i, "value", e.target.value)}
                placeholder="Значення (напр. Alpha Silver Aluminium)"
                className="field-dark mt-2 w-full sm:mt-0 sm:flex-1"
              />
              <div className="hidden sm:block">
                <IconButton
                  label="Видалити характеристику"
                  variant="danger"
                  onClick={() => removeAttr(i)}
                >
                  <CloseIcon size={14} />
                </IconButton>
              </div>
            </div>
            </Fragment>
          ))}
          {form.attributes.length === 0 && (
            <p className="text-sm text-[#7a82ad]">Характеристики не додані.</p>
          )}
        </div>
        <button
          type="button"
          onClick={addAttr}
          className="btn btn-secondary mt-4 w-full justify-center !py-2.5 text-sm sm:w-auto"
        >
          <PlusIcon size={14} /> Додати характеристику
        </button>
      </section>

      <section className="card p-6">
        <h3 className="text-base font-semibold text-white">Ціна та склад</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Ціна, ₴
            </span>
            <input
              required
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="field-dark mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Стара ціна, ₴
            </span>
            <input
              type="number"
              min={0}
              value={form.oldPrice}
              onChange={(e) => update("oldPrice", e.target.value)}
              placeholder="—"
              className="field-dark mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Залишок, шт.
            </span>
            <input
              required
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
              className="field-dark mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7a82ad]">
              Індикатор залишку
            </span>
            <input
              type="number"
              min={0}
              value={form.threshold}
              onChange={(e) => update("threshold", e.target.value)}
              className="field-dark mt-1"
            />
          </label>
        </div>
      </section>

      <section className="card p-6">
        <h3 className="text-base font-semibold text-white">Бейджі</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["hit", "new", "sale"] as Badge[]).map((b) => {
            const active = form.badges.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => toggleBadge(b)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#ff3d8b]/40 bg-[#ff3d8b]/10 text-white"
                    : "border-[#1f2750] text-[#cfd3ef] hover:border-[#2c356b] hover:text-white"
                }`}
              >
                {badgeLabel[b]}
              </button>
            );
          })}
        </div>
      </section>

      <footer className="space-y-3 border-t border-[#1f2750] pt-5 sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:gap-3">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:order-2 sm:items-center sm:gap-3">
          <Link
            href="/admin/products"
            className="btn btn-ghost w-full justify-center sm:w-auto"
          >
            Скасувати
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full justify-center disabled:opacity-60 sm:w-auto"
          >
            {saving
              ? "Збереження…"
              : mode === "create"
                ? "Створити товар"
                : "Зберегти зміни"}
          </button>
        </div>
        {mode === "edit" && (
          <div className="sm:order-1">
            <button
              type="button"
              onClick={onDelete}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-4 py-2.5 text-sm font-semibold text-[#ef4444] transition-colors hover:bg-[#ef4444]/15 sm:w-auto"
            >
              <TrashIcon size={14} /> Видалити товар
            </button>
          </div>
        )}
      </footer>
    </form>
  );
}
