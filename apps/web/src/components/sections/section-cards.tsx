import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
function resolveCard(item: any) {
  const ref = item.ref;
  return {
    key: item._key,
    title: item.title || ref?.title || ref?.name || "",
    description: item.description || ref?.description || "",
    image: resolveImage(item.image) || resolveImage(ref?.image) || "",
    link: item.link || (ref?.slug ? `/${ref.slug}` : ref?.mapUrl || ""),
    icon: item.icon || ref?.icon || "",
  };
}

const variantClasses: Record<string, string> = {
  "grid-2": "grid-cols-1 sm:grid-cols-2",
  "grid-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "grid-4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  square: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  landscape: "grid-cols-1 sm:grid-cols-2",
};

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionCards({ section }: { section: any }) {
  const items = (section.items || []).map(resolveCard);
  const variant = section.variant || "grid-3";
  const isLandscape = variant === "landscape";
  const isSquare = variant === "square";

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
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
            className="mb-12 text-center text-gray-600"
            variant="body-md"
          >
            {section.subtitle}
          </Text>
        )}
        <div
          className={`grid gap-8 ${variantClasses[variant] || variantClasses["grid-3"]}`}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic cards */}
          {items.map((card: any) => (
            <CardItem
              isLandscape={isLandscape}
              isSquare={isSquare}
              key={card.key}
              {...card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardItem({
  title,
  description,
  image,
  link,
  icon,
  isLandscape,
  isSquare,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
  isLandscape: boolean;
  isSquare: boolean;
}) {
  const Wrapper = link ? "a" : "div";
  const wrapperProps = link ? { href: link } : {};

  return (
    <Wrapper
      className={`group overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg ${
        isLandscape ? "flex flex-row" : "flex flex-col"
      }`}
      {...wrapperProps}
    >
      {image && (
        <div className={isLandscape ? "w-1/3 flex-shrink-0" : ""}>
          <img
            alt={title}
            className={`w-full object-cover ${
              isSquare
                ? "aspect-square"
                : isLandscape
                  ? "h-full"
                  : "aspect-video"
            }`}
            loading="lazy"
            src={image}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {icon && <span className="mb-2 text-2xl">{icon}</span>}
        {title && (
          <Text
            as="h3"
            className="mb-2 text-gray-900 group-hover:text-blue-600"
            variant="heading-3"
          >
            {title}
          </Text>
        )}
        {description && (
          <Text as="p" className="text-gray-600" variant="body-md">
            {description}
          </Text>
        )}
      </div>
    </Wrapper>
  );
}
