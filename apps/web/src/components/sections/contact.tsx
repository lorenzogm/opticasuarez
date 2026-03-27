interface ContactProps {
  title: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export default function Contact({
  title,
  phone,
  email,
  address,
  hours,
}: ContactProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission
    alert("Gracias por tu mensaje. Te contactaremos pronto.");
  };

  return (
    <section
      className="bg-gray-900 py-12 text-white sm:py-16 md:py-20"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-12 text-center font-bold text-3xl sm:mb-16 sm:text-4xl md:text-5xl">
          {title}
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="mb-8 font-semibold text-2xl">
              Información de contacto
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 sm:mb-4 sm:h-16 sm:w-16">
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-lg sm:text-xl">
                  Teléfono
                </h4>
                <p className="text-gray-300 text-sm sm:text-base">{phone}</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 sm:mb-4 sm:h-16 sm:w-16">
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-lg sm:text-xl">Email</h4>
                <p className="break-all text-gray-300 text-sm sm:text-base">
                  {email}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 sm:mb-4 sm:h-16 sm:w-16">
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-lg sm:text-xl">
                  Dirección
                </h4>
                <p className="text-gray-300 text-sm sm:text-base">{address}</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 sm:mb-4 sm:h-16 sm:w-16">
                  <svg
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-lg sm:text-xl">
                  Horario
                </h4>
                <p className="text-gray-300 text-sm sm:text-base">{hours}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="mb-8 font-semibold text-2xl">Envíanos un mensaje</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-2 block font-medium text-sm"
                  htmlFor="name"
                >
                  Nombre completo
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="name"
                  placeholder="Tu nombre completo"
                  required
                  type="text"
                />
              </div>

              <div>
                <label
                  className="mb-2 block font-medium text-sm"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="email"
                  placeholder="tu@email.com"
                  required
                  type="email"
                />
              </div>

              <div>
                <label
                  className="mb-2 block font-medium text-sm"
                  htmlFor="phone"
                >
                  Teléfono (opcional)
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="phone"
                  placeholder="+34 XXX XXX XXX"
                  type="tel"
                />
              </div>

              <div>
                <label
                  className="mb-2 block font-medium text-sm"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="message"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  required
                  rows={4}
                />
              </div>

              <button
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                type="submit"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
