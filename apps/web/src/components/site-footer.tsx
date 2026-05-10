import contactContent from "~/content/contacto.json" with { type: "json" };

const footerLinks = [
  { label: "Inicio", to: "/" },
  { label: "Quiénes somos", to: "/quienes-somos" },
  { label: "Contacto", to: "/contacto" },
  { label: "Blog", to: "/blog" },
  { label: "Pedir cita", to: "/cita" },
] as const;

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <section aria-labelledby="footer-brand-heading" className="space-y-4">
            <h2 className="font-semibold text-2xl" id="footer-brand-heading">
              Óptica Suárez
            </h2>
            <p className="text-gray-300 text-sm">
              Más de 80 años cuidando tu visión en Jaén.
            </p>
            <nav aria-label="Enlaces del sitio">
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.to}>
                    <a className="text-sm text-white hover:text-gray-200" href={link.to}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {contactContent.locations.locations.map((location) => (
            <section aria-labelledby={`footer-${location.name}`} key={location.name}>
              <h2 className="font-semibold text-xl" id={`footer-${location.name}`}>
                {location.name}
              </h2>
              <address className="mt-4 not-italic">
                <p className="text-gray-300 text-sm">{location.address}</p>
                <p className="mt-2 text-gray-300 text-sm">
                  {location.schedule.weekdays}: {location.schedule.weekdaysHours}
                </p>
                <p className="text-gray-300 text-sm">
                  {location.schedule.saturday}: {location.schedule.saturdayHours}
                </p>
                <p className="mt-3">
                  <a className="text-sm hover:text-gray-200" href={location.phoneUrl}>
                    {location.phone}
                  </a>
                </p>
                <p>
                  <a className="text-sm hover:text-gray-200" href={`mailto:${location.email}`}>
                    {location.email}
                  </a>
                </p>
              </address>
            </section>
          ))}
        </div>
      </div>
      <div className="border-gray-800 border-t px-4 py-4">
        <p className="text-center text-gray-400 text-sm">
          © {currentYear} Óptica Suárez
        </p>
      </div>
    </footer>
  );
}
