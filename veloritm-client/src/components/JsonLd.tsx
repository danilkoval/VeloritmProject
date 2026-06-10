interface JsonLdProps {
  data: unknown;
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // Schema.org payload — escaping handled by JSON.stringify; never embed user content here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
