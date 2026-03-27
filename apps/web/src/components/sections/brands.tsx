interface BrandsProps {
  title: string;
  description: string;
  brands: string[];
}

export default function Brands({ title, description, brands }: BrandsProps) {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-6 font-bold text-3xl text-gray-900 sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-lg sm:text-xl">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <div
              className="flex min-h-[80px] items-center justify-center rounded-lg bg-gray-50 p-4 transition-shadow duration-300 hover:shadow-md sm:p-6"
              key={index}
            >
              <span className="text-center font-semibold text-gray-700 text-sm sm:text-base">
                {brand}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:mt-12">
          <p className="text-gray-500 text-sm">
            Y muchas marcas más disponibles en nuestra tienda
          </p>
        </div>
      </div>
    </section>
  );
}
