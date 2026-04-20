import { useEffect, useRef } from "react";
import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    const items = el.querySelectorAll("[data-reveal]");
    for (const item of items) {
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionTimeline({ section }: { section: any }) {
  const items = section.timelineItems || section.items || [];
  const containerRef = useScrollReveal();

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl" ref={containerRef}>
        {section.title && (
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {section.title}
          </Text>
        )}
        <div className="relative">
          {/* Vertical line */}
          <div className="-translate-x-1/2 absolute top-0 left-1/2 hidden h-full w-0.5 bg-blue-200 md:block" />

          <div className="space-y-12">
            {/* biome-ignore lint/suspicious/noExplicitAny: dynamic timeline items */}
            {items.map((item: any, index: number) => {
              const image = resolveImage(item.image);
              const isEven = index % 2 === 0;

              return (
                <div
                  className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  data-reveal
                  key={item._key || index}
                  style={{
                    opacity: 0,
                    transform: "translateY(2rem)",
                    transition:
                      "opacity 0.6s ease-out, transform 0.6s ease-out",
                  }}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    {item.year && (
                      <Text
                        as="p"
                        className="mb-1 font-bold text-blue-600"
                        variant="body-lg"
                      >
                        {item.year}
                      </Text>
                    )}
                    {item.title && (
                      <Text
                        as="h3"
                        className="mb-2 text-gray-900"
                        variant="heading-3"
                      >
                        {item.title}
                      </Text>
                    )}
                    {item.description && (
                      <Text as="p" className="text-gray-600" variant="body-md">
                        {item.description}
                      </Text>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="-translate-x-1/2 absolute left-1/2 hidden h-4 w-4 rounded-full border-2 border-blue-600 bg-white md:block" />

                  {/* Image or spacer */}
                  <div className="flex-1">
                    {image && (
                      <img
                        alt={item.title || ""}
                        className="mx-auto h-48 w-48 rounded-full object-cover shadow-lg"
                        loading="lazy"
                        src={image}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
