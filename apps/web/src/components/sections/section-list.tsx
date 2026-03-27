import { Text } from "~/components/text";

const variantIcons: Record<string, (index: number) => React.ReactNode> = {
  checkmark: () => (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  warning: () => (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  bullet: () => (
    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
  ),
  numbered: (index: number) => (
    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-sm text-white">
      {index + 1}
    </span>
  ),
};

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionList({ section }: { section: any }) {
  const items: string[] = section.listItems || section.items || [];
  const variant: string = section.variant || "bullet";
  const getIcon = variantIcons[variant] || variantIcons.bullet;

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        {section.title && (
          <Text
            as="h2"
            className="mb-4 text-center text-gray-900"
            variant="heading-2"
          >
            {section.title}
          </Text>
        )}
        {section.subtitle && (
          <Text
            as="p"
            className="mb-4 text-center text-gray-600"
            variant="body-md"
          >
            {section.subtitle}
          </Text>
        )}
        {section.description && (
          <Text
            as="p"
            className="mb-8 text-center text-gray-600"
            variant="body-md"
          >
            {section.description}
          </Text>
        )}
        <ul className="space-y-4">
          {items.map((item: string, index: number) => (
            <li className="flex items-start gap-3" key={item}>
              {getIcon(index)}
              <Text as="span" className="text-gray-700" variant="body-md">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
