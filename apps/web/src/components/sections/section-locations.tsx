import { Button } from "~/components/button";
import { Text } from "~/components/text";
import { resolveImage } from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
function resolveLocation(item: any) {
  const ref = item.ref;
  return {
    key: item._key,
    name: item.title || ref?.name || ref?.title || "",
    image: resolveImage(item.image) || resolveImage(ref?.image) || "",
    mapLink: item.link || ref?.mapUrl || "",
  };
}

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionLocations({ section }: { section: any }) {
  const items = (section.items || []).map(resolveLocation);

  return (
    <section className="bg-white px-4 py-16 sm:px-6">
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* biome-ignore lint/suspicious/noExplicitAny: dynamic items */}
          {items.map((location: any) => (
            <div className="text-center" key={location.key}>
              {location.image && (
                <figure className="mb-6">
                  <a
                    className="block"
                    href={location.mapLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt={location.name}
                      className="h-64 w-full rounded-lg object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl"
                      loading="lazy"
                      src={location.image}
                    />
                  </a>
                </figure>
              )}
              <div>
                <Text
                  as="h3"
                  className="mb-4 text-gray-900"
                  variant="heading-3"
                >
                  <a
                    className="transition-colors duration-300 hover:text-blue-800"
                    href={location.mapLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {location.name}
                  </a>
                </Text>
                {location.mapLink && (
                  <Button
                    className="mt-4"
                    href={location.mapLink}
                    variant="primary"
                  >
                    Ver en el mapa
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
