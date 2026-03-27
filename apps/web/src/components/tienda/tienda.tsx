import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import BookAppointment from "~/components/sections/book-appointment";
import ProductCard from "./sections/product-card";
import ProductFilters from "./sections/product-filters";

interface TiendaProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  products: any[];
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  categories: any[];
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  brands: any[];
}

export default function Tienda({ products, categories, brands }: TiendaProps) {
  const search = useSearch({ from: "/tienda/" });
  const navigate = useNavigate({ from: "/tienda/" });

  const [query, setQuery] = useState(search.q ?? "");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Text search
    const q = (search.q ?? "").toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const name = (p.name ?? "").toLowerCase();
        const brandName = (p.brand?.name ?? "").toLowerCase();
        const tags = (p.tags ?? []).map((t: string) => t.toLowerCase());
        return (
          name.includes(q) ||
          brandName.includes(q) ||
          tags.some((t: string) => t.includes(q))
        );
      });
    }

    // Category filter (outlet = has salePrice)
    if (search.categoria === "outlet") {
      result = result.filter((p) => p.salePrice != null);
    } else if (search.categoria) {
      result = result.filter((p) => p.category?.slug === search.categoria);
    }

    // Brand filter
    if (search.marca) {
      result = result.filter((p) => p.brand?.slug === search.marca);
    }

    // Gender filter
    if (search.genero) {
      // search by specs.gender not available in listing projection, filter by tags
      result = result.filter((p) =>
        (p.tags ?? []).some((t: string) => t.toLowerCase() === search.genero)
      );
    }

    // Price range
    if (search.precioMin != null) {
      result = result.filter(
        (p) => (p.salePrice ?? p.price) >= (search.precioMin ?? 0)
      );
    }
    if (search.precioMax != null) {
      result = result.filter(
        (p) =>
          (p.salePrice ?? p.price) <=
          (search.precioMax ?? Number.POSITIVE_INFINITY)
      );
    }

    return result;
  }, [products, search]);

  function updateFilter(key: string, value: string | number | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value || undefined,
      }),
      replace: true,
    });
  }

  function handleSearch(value: string) {
    setQuery(value);
    updateFilter("q", value || undefined);
  }

  function clearFilters() {
    setQuery("");
    navigate({ search: {}, replace: true });
  }

  const hasActiveFilters =
    search.q ||
    search.categoria ||
    search.marca ||
    search.genero ||
    search.precioMin != null ||
    search.precioMax != null;

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-50 to-white px-4 py-12 text-center md:py-16">
        <h1 className="font-bold text-3xl text-gray-900 md:text-4xl">
          Tienda Online
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-lg">
          Encuentra monturas, gafas de sol, lentillas y productos de salud
          ocular de las mejores marcas.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-sm transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nombre, marca, etiqueta..."
              type="search"
              value={query}
            />
            <svg
              className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 md:w-60">
            <ProductFilters
              brands={brands}
              categories={categories}
              clearFilters={clearFilters}
              hasActiveFilters={!!hasActiveFilters}
              search={search}
              updateFilter={updateFilter}
            />
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            {hasActiveFilters && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "producto" : "productos"}
                </p>
                <button
                  className="text-sky-600 text-sm hover:underline"
                  onClick={clearFilters}
                  type="button"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map(
                  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
                  (product: any) => (
                    <ProductCard key={product._id} product={product} />
                  )
                )}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-500 text-lg">
                  No se encontraron productos
                </p>
                <p className="mt-2 text-gray-400 text-sm">
                  Prueba con otros filtros o términos de búsqueda
                </p>
                {hasActiveFilters && (
                  <button
                    className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700"
                    onClick={clearFilters}
                    type="button"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <BookAppointment
        buttonText="Reservar Cita"
        description="¿Necesitas asesoramiento personalizado? Visítanos en nuestra óptica en Jaén."
        title="Visítanos en nuestra óptica"
      />
    </main>
  );
}
