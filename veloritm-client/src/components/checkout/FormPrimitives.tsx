import type { SelectHTMLAttributes } from "react";

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6">
      <header className="mb-5">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-[#7a82ad]">{description}</p>}
      </header>
      {children}
    </section>
  );
}

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a82ad]">
        {label}
        {optional && (
          <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-[#5a6190]">
            (необов&apos;язково)
          </span>
        )}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="field-dark mt-1.5"
      />
    </label>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={`field-dark w-full appearance-none pr-10 ${className ?? ""}`}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a82ad]"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
