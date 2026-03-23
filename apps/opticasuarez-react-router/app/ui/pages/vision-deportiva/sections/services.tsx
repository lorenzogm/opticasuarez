interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesProps {
  title: string;
  items: ServiceItem[];
}

export default function Services({ title, items }: ServicesProps) {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20" id="services">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-12 text-center font-bold text-3xl text-gray-900 sm:mb-16 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              className="rounded-xl bg-gray-50 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8"
              key={index}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 sm:mb-6 sm:h-16 sm:w-16">
                <svg
                  className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="mb-3 font-semibold text-gray-900 text-lg sm:mb-4 sm:text-xl">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
