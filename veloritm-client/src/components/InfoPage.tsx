import { Breadcrumbs, type BreadcrumbItem } from "./ui/Breadcrumbs";

interface InfoPageProps {
  title: string;
  lead?: string;
  kicker?: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export function InfoPage({ title, lead, kicker, breadcrumbs, children }: InfoPageProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container-app pb-16">
        <header className="mb-10 max-w-3xl">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff3d8b]">
              {kicker}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {lead && <p className="mt-4 text-lg text-[#b9bee0]">{lead}</p>}
        </header>
        <div className="prose prose-invert max-w-none space-y-5 text-[#cfd3ef] [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-[#ff3d8b] hover:[&_a]:text-[#ff7a3d] [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul>li]:list-disc [&_strong]:text-white">
          {children}
        </div>
      </div>
    </>
  );
}
