import { Text } from "~/components/text";

// biome-ignore lint/suspicious/noExplicitAny: Sanity section data
export default function SectionContactForm({ section }: { section: any }) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-2xl">
        {section.title && (
          <Text as="h2" className="mb-4 text-center text-gray-900" variant="heading-2">
            {section.title}
          </Text>
        )}
        {section.description && (
          <Text as="p" className="mx-auto mb-8 max-w-xl text-center text-gray-600" variant="body-md">
            {section.description}
          </Text>
        )}
        <form
          action={`mailto:${section.email || "bulevar@opticasuarezjaen.es"}`}
          className="space-y-6 rounded-lg bg-white p-8 shadow-md"
          method="POST"
          encType="text/plain"
        >
          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm" htmlFor="contact-name">
              {section.nameLabel || "Nombre completo"}
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="contact-name"
              name="nombre"
              placeholder={section.namePlaceholder || "Tu nombre completo"}
              required
              type="text"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm" htmlFor="contact-email">
              {section.emailLabel || "Email"}
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="contact-email"
              name="email"
              placeholder={section.emailPlaceholder || "tu@email.com"}
              required
              type="email"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm" htmlFor="contact-phone">
              {section.phoneLabel || "Teléfono (opcional)"}
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="contact-phone"
              name="telefono"
              placeholder={section.phonePlaceholder || "+34 XXX XXX XXX"}
              type="tel"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm" htmlFor="contact-message">
              {section.messageLabel || "Mensaje"}
            </label>
            <textarea
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="contact-message"
              name="mensaje"
              placeholder={section.messagePlaceholder || "Cuéntanos en qué podemos ayudarte..."}
              required
              rows={4}
            />
          </div>

          <button
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            type="submit"
          >
            {section.submitButton || "Enviar mensaje"}
          </button>

          {section.privacy && (
            <p className="text-center text-gray-500 text-xs">
              {section.privacy}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
