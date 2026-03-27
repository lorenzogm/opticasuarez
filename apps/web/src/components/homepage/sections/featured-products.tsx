import { Link } from "@tanstack/react-router";
import { resolveImage } from "~/lib/sanity";

interface FeaturedProductsProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  products: any[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products?.length) return null;

  const displayed = products.slice(0, 4);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-bold text-3xl text-gray-900 tracking-tight">
            Productos Destacados
          </h2>
          <p className="mt-2 text-gray-600">
            Descubre nuestra selección de productos
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayed.map(
            // biome-ignore lint/suspicious/noExplicitAny: Sanity data
            (product: any) => {
              const imageUrl = resolveImage(product.images?.[0]);
              const hasDiscount = product.salePrice != null;
              const discountPercent = hasDiscount
                ? Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )
                : 0;

              return (
                <Link
                  className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
                  key={product._id}
                  params={{ slug: product.slug }}
                  to="/tienda/$slug"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <img
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                        src={imageUrl}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-300">
                        <svg
                          className="h-12 w-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </div>
                    )}
                    {hasDiscount && (
                      <span className="absolute top-2 left-2 rounded bg-red-600 px-2 py-0.5 font-semibold text-white text-xs">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    {product.brand?.name && (
                      <p className="font-medium text-gray-500 text-xs uppercase tracking-wide">
                        {product.brand.name}
                      </p>
                    )}
                    <h3 className="mt-1 line-clamp-2 font-medium text-gray-900 text-sm">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="font-bold text-lg text-red-600">
                            {product.salePrice.toFixed(2)} €
                          </span>
                          <span className="text-gray-400 text-sm line-through">
                            {product.price.toFixed(2)} €
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-900 text-lg">
                          {product.price.toFixed(2)} €
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-blue-800"
            to="/tienda"
          >
            Ver toda la tienda
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
