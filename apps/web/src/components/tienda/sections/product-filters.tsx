interface ProductFiltersProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  categories: any[];
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data
  brands: any[];
  search: {
    categoria?: string;
    marca?: string;
    genero?: string;
    precioMin?: number;
    precioMax?: number;
  };
  updateFilter: (key: string, value: string | number | undefined) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function ProductFilters({
  categories,
  brands,
  search,
  updateFilter,
  clearFilters,
  hasActiveFilters,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            className="text-sky-600 text-xs hover:underline"
            onClick={clearFilters}
            type="button"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categories */}
      <fieldset>
        <legend className="mb-2 font-medium text-gray-700 text-sm">
          Categoría
        </legend>
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900">
            <input
              checked={!search.categoria}
              className="accent-sky-600"
              name="categoria"
              onChange={() => updateFilter("categoria", undefined)}
              type="radio"
            />
            Todas
          </label>
          {categories.map(
            // biome-ignore lint/suspicious/noExplicitAny: Sanity data
            (cat: any) => (
              <label
                className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
                key={cat._id}
              >
                <input
                  checked={search.categoria === cat.slug}
                  className="accent-sky-600"
                  name="categoria"
                  onChange={() => updateFilter("categoria", cat.slug)}
                  type="radio"
                />
                {cat.name}
              </label>
            )
          )}
          <label className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900">
            <input
              checked={search.categoria === "outlet"}
              className="accent-sky-600"
              name="categoria"
              onChange={() => updateFilter("categoria", "outlet")}
              type="radio"
            />
            Outlet
          </label>
        </div>
      </fieldset>

      {/* Brands */}
      <fieldset>
        <legend className="mb-2 font-medium text-gray-700 text-sm">
          Marca
        </legend>
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900">
            <input
              checked={!search.marca}
              className="accent-sky-600"
              name="marca"
              onChange={() => updateFilter("marca", undefined)}
              type="radio"
            />
            Todas
          </label>
          {brands.map(
            // biome-ignore lint/suspicious/noExplicitAny: Sanity data
            (brand: any) => (
              <label
                className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
                key={brand._id}
              >
                <input
                  checked={search.marca === brand.slug}
                  className="accent-sky-600"
                  name="marca"
                  onChange={() => updateFilter("marca", brand.slug)}
                  type="radio"
                />
                {brand.name}
              </label>
            )
          )}
        </div>
      </fieldset>

      {/* Gender */}
      <fieldset>
        <legend className="mb-2 font-medium text-gray-700 text-sm">
          Género
        </legend>
        <div className="space-y-1">
          {[
            { value: undefined, label: "Todos" },
            { value: "hombre", label: "Hombre" },
            { value: "mujer", label: "Mujer" },
            { value: "unisex", label: "Unisex" },
            { value: "infantil", label: "Infantil" },
          ].map((opt) => (
            <label
              className="flex cursor-pointer items-center gap-2 text-gray-600 text-sm hover:text-gray-900"
              key={opt.label}
            >
              <input
                checked={search.genero === opt.value}
                className="accent-sky-600"
                name="genero"
                onChange={() => updateFilter("genero", opt.value)}
                type="radio"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
