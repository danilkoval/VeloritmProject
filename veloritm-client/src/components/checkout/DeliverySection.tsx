"use client";

import { useState } from "react";
import { Section, Field, Select } from "./FormPrimitives";

export function DeliverySection() {
  const [method, setMethod] = useState("np");
  const needsAddress = method !== "pickup";

  return (
    <Section title="Доставка" description="Оберіть зручний спосіб">
      <label className="block">
        <span className="sr-only">Спосіб доставки</span>
        <Select
          name="delivery"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="np">Нова Пошта — відділення</option>
          <option value="np-courier">Нова Пошта — кур&apos;єр</option>
          <option value="pickup">
            Самовивіз — Кременчук, проспект Свободи, 7
          </option>
        </Select>
      </label>
      {needsAddress && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Місто" name="city" placeholder="Київ" required />
          <Field
            label={method === "np-courier" ? "Адреса доставки" : "Відділення / адреса"}
            name="branch"
            placeholder={method === "np-courier" ? "вул. ..., буд. ..." : "№ 42, вул. ..."}
            required
          />
        </div>
      )}
    </Section>
  );
}
