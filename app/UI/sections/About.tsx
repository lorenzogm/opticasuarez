interface AboutProps {
  title: string;
  description: string;
  experience: string;
  clients: string;
}

export default function About({ title, description, experience, clients }: AboutProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-gray-900">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
              {description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  35+
                </div>
                <div className="text-sm sm:text-base text-gray-600">años de experiencia</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  1000+
                </div>
                <div className="text-sm sm:text-base text-gray-600">clientes satisfechos</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <svg className="w-16 h-16 sm:w-24 sm:h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}