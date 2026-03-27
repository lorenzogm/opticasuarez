import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionTestimonials({ section }: { section: any }) {
  const items = section.testimonialItems || section.items || [];

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {section.title && (
          <Text
            as="h2"
            className="mb-12 text-center text-gray-900"
            variant="heading-2"
          >
            {section.title}
          </Text>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic testimonial items */}
          {items.map((item: any, index: number) => (
            <div
              className="rounded-xl bg-white p-6 shadow-sm"
              key={item._key || index}
            >
              {item.rating && (
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      className={`h-5 w-5 ${i < item.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      key={`star-${item._key || index}-${i}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              {item.text && (
                <Text as="p" className="mb-4 text-gray-600" variant="body-md">
                  {item.text}
                </Text>
              )}
              {item.name && (
                <Text
                  as="p"
                  className="font-semibold text-gray-900"
                  variant="body-sm"
                >
                  — {item.name}
                </Text>
              )}
            </div>
          ))}
        </div>
        {section.moreReviewsLink && (
          <div className="mt-8 text-center">
            <a
              className="text-blue-600 hover:text-blue-800 hover:underline"
              href={section.moreReviewsLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver más opiniones
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
