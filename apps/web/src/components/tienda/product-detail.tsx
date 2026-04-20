import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import BookAppointment from "~/components/sections/book-appointment";
import StructuredData from "~/components/structured-data";
import type { CartItem } from "~/lib/cart";
import { useCart } from "~/lib/cart";
import { resolveImage } from "~/lib/sanity";
import { getBaseUrl } from "~/lib/utils";
import FrameDiagram from "./sections/frame-diagram";
import PortableTextBlock from "./sections/portable-text-block";
import ProductCard from "./sections/product-card";
import ProductGallery from "./sections/product-gallery";
import ProductInquiryForm from "./sections/product-inquiry-form";

interface ProductDetailProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  product: any;
}

const genderLabels: Record<string, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  unisex: "Unisex",
  infantil: "Infantil",
};

const availabilityConfig: Record<string, { label: string; className: string }> =
  {
    disponible: {
      label: "Disponible",
      className: "bg-green-100 text-green-800",
    },
    "bajo-pedido": {
      label: "Bajo pedido",
      className: "bg-amber-100 text-amber-800",
    },
    agotado: { label: "Agotado", className: "bg-gray-100 text-gray-500" },
  };

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const hasDiscount = product.salePrice != null;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const availability =
    availabilityConfig[product.availability] ?? availabilityConfig.disponible;

  const mainImage = resolveImage(product.images?.[0]);

  const isInStock = product.availability !== "agotado";

  const handleAddToCart = () => {
    const selectedColorData = product.colors?.[selectedColor];
    const cartItem: CartItem = {
      productId: product._id,
      slug: product.slug,
      name: product.name,
      image: mainImage || "",
      price: product.salePrice ?? product.price,
      quantity: 1,
      brand: product.brand?.name,
      ...(selectedColorData
        ? {
            color: { name: selectedColorData.name, hex: selectedColorData.hex },
          }
        : {}),
    };
    addItem(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: mainImage || `${getBaseUrl()}/og-image.jpg`,
    description:
      product.description?.[0]?.children?.[0]?.text ??
      `${product.name} en Óptica Suárez`,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    offers: {
      "@type": "Offer",
      price: product.salePrice ?? product.price,
      priceCurrency: "EUR",
      availability:
        product.availability === "agotado"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${getBaseUrl()}/tienda/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Óptica Suárez",
      },
    },
  };

  return (
    <main>
      <StructuredData schema={productSchema} />

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-gray-500 text-sm">
          <Link className="hover:text-sky-600" to="/">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link className="hover:text-sky-600" to="/tienda">
            Tienda
          </Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link
                className="hover:text-sky-600"
                search={{ categoria: product.category.slug }}
                to="/tienda"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <ProductGallery
            images={product.images ?? []}
            name={product.name}
            selectedColorImage={product.colors?.[selectedColor]?.image}
          />

          {/* Product info */}
          <div>
            {/* Brand */}
            {product.brand?.name && (
              <Link
                className="font-medium text-gray-500 text-sm uppercase tracking-wide hover:text-sky-600"
                search={{ marca: product.brand.slug }}
                to="/tienda"
              >
                {product.brand.name}
              </Link>
            )}

            <h1 className="mt-1 font-bold text-2xl text-gray-900 md:text-3xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              {hasDiscount ? (
                <>
                  <span className="font-bold text-3xl text-red-600">
                    {product.salePrice.toFixed(2)} €
                  </span>
                  <span className="text-gray-400 text-xl line-through">
                    {product.price.toFixed(2)} €
                  </span>
                  <span className="rounded bg-red-100 px-2 py-0.5 font-semibold text-red-700 text-sm">
                    -{discountPercent}%
                  </span>
                </>
              ) : (
                <span className="font-bold text-3xl text-gray-900">
                  {product.price.toFixed(2)} €
                </span>
              )}
            </div>

            {/* Availability */}
            <div className="mt-3">
              <span
                className={`inline-block rounded-full px-3 py-1 font-medium text-xs ${availability.className}`}
              >
                {availability.label}
              </span>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 text-sm">
                  Color:{" "}
                  <span className="text-gray-900">
                    {product.colors[selectedColor]?.name}
                  </span>
                </h3>
                <div className="mt-2 flex gap-2">
                  {product.colors.map(
                    // biome-ignore lint/suspicious/noExplicitAny: Sanity data
                    (color: any, idx: number) => (
                      <button
                        aria-label={`Color: ${color.name}`}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          idx === selectedColor
                            ? "border-sky-600 ring-2 ring-sky-200"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        key={color.hex}
                        onClick={() => setSelectedColor(idx)}
                        style={{
                          backgroundColor: color.hex,
                        }}
                        type="button"
                      />
                    )
                  )}
                </div>
              </div>
            )}

            {/* Specs */}
            {product.specs && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  Especificaciones
                </h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  {product.specs.material && (
                    <>
                      <dt className="text-gray-500">Material</dt>
                      <dd className="text-gray-900">
                        {product.specs.material}
                      </dd>
                    </>
                  )}
                  {product.specs.gender && (
                    <>
                      <dt className="text-gray-500">Género</dt>
                      <dd className="text-gray-900">
                        {genderLabels[product.specs.gender] ??
                          product.specs.gender}
                      </dd>
                    </>
                  )}
                </dl>
                {product.specs.frameDimensions && (
                  <FrameDiagram dimensions={product.specs.frameDimensions} />
                )}
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 text-xs"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 space-y-3">
              {isInStock ? (
                <button
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors ${
                    addedToCart
                      ? "bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleAddToCart}
                  type="button"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {addedToCart ? "¡Añadido al carrito!" : "Añadir al carrito"}
                </button>
              ) : (
                <button
                  className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 font-medium text-gray-500"
                  disabled
                  type="button"
                >
                  Agotado
                </button>
              )}
              <button
                className="w-full rounded-lg border border-sky-600 px-6 py-3 font-medium text-sky-600 transition-colors hover:bg-sky-50"
                onClick={() => setShowInquiry(!showInquiry)}
                type="button"
              >
                Consultar sobre este producto
              </button>
            </div>

            {showInquiry && (
              <ProductInquiryForm
                productName={product.name}
                productSlug={product.slug}
              />
            )}
          </div>
        </div>

        {/* Description */}
        {product.description && product.description.length > 0 && (
          <section className="mt-12 border-gray-200 border-t pt-8">
            <h2 className="mb-4 font-bold text-gray-900 text-xl">
              Descripción
            </h2>
            <div className="prose max-w-none text-gray-600">
              <PortableTextBlock blocks={product.description} />
            </div>
          </section>
        )}

        {/* Related products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="mt-12 border-gray-200 border-t pt-8">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {product.relatedProducts.map(
                // biome-ignore lint/suspicious/noExplicitAny: Sanity data
                (related: any) => (
                  <ProductCard key={related._id} product={related} />
                )
              )}
            </div>
          </section>
        )}
      </div>

      <BookAppointment
        buttonText="Reservar Cita"
        description="¿Necesitas asesoramiento personalizado? Visítanos en nuestra óptica en Jaén."
        title="Visítanos en nuestra óptica"
      />
    </main>
  );
}
