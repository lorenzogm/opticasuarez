interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

export default function Testimonials({
  title,
  testimonials,
}: TestimonialsProps) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="mb-12 text-center font-bold text-3xl text-gray-900 sm:mb-16 sm:text-4xl md:text-5xl">
          {title}
        </p>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8"
              key={index}
            >
              <div className="mb-4 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    key={i}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-700 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <span className="font-semibold text-blue-600 text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">Cliente verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
