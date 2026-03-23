interface AboutProps {
  title: string;
  description: string;
  _experience: string;
  _clients: string;
}

export default function About({
  title,
  description,
  _experience,
  _clients,
}: AboutProps) {
  return (
    <section className="bg-blue-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-bold text-3xl text-gray-900 sm:mb-8 sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mb-6 text-gray-700 text-lg leading-relaxed sm:mb-8 sm:text-xl">
              {description}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-2 font-bold text-2xl text-blue-600 sm:text-3xl">
                  35+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  años de experiencia
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center shadow-sm sm:p-6">
                <div className="mb-2 font-bold text-2xl text-blue-600 sm:text-3xl">
                  1000+
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  clientes satisfechos
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
              <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
                <svg
                  className="h-16 w-16 text-blue-600 sm:h-24 sm:w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
