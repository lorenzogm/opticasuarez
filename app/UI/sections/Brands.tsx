interface BrandsProps {
  title: string;
  description: string;
  brands: string[];
}

export default function Brands({ title, description, brands }: BrandsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow duration-300 min-h-[80px]"
            >
              <span className="text-gray-700 font-semibold text-sm sm:text-base text-center">
                {brand}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-500 text-sm">
            Y muchas marcas más disponibles en nuestra tienda
          </p>
        </div>
      </div>
    </section>
  );
}