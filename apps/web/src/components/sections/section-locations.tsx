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
    whatsappUrl: item.whatsappUrl || ref?.whatsappUrl || "",
    whatsappNumber: item.whatsappNumber || ref?.whatsappNumber || "",
    email: item.email || ref?.email || "",
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
                <div className="mt-4 flex items-center justify-center gap-4">
                  {location.whatsappUrl && (
                    <a
                      aria-label={`WhatsApp ${location.name}`}
                      className="inline-flex items-center gap-2 text-green-600 transition-colors hover:text-green-700"
                      href={location.whatsappUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="text-sm">{location.whatsappNumber}</span>
                    </a>
                  )}
                  {location.email && (
                    <a
                      aria-label={`Email ${location.name}`}
                      className="inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700"
                      href={`mailto:${location.email}`}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm">{location.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
