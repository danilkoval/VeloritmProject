"use client";

import { useState } from "react";
import { EyeIcon } from "../ui/Icon";

export function PasswordField({
  id = "password",
  name = "password",
  placeholder = "Мінімум 8 символів",
  required = true,
  autoComplete = "current-password",
}: {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={8}
        className="field-auth pr-12"
      />
      <button
        type="button"
        aria-label={visible ? "Сховати пароль" : "Показати пароль"}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a82ad] hover:text-white lg:text-slate-400 lg:hover:text-slate-700"
      >
        <EyeIcon size={18} />
      </button>
    </div>
  );
}
