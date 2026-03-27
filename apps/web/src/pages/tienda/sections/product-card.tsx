import { resolveImage } from "~/lib/sanity";

interface ProductCardProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0];
  const imageUrl = resolveImage(mainImage);
  const hasDiscount = product.salePrice != null;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {/* Image */}
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
        {product.availability === "agotado" && (
          <span className="absolute top-2 right-2 rounded bg-gray-700 px-2 py-0.5 text-white text-xs">
            Agotado
          </span>
        )}
      </div>

      {/* Info */}
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
    </article>
  );
}
