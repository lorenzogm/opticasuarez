import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "../../../components/button";
import Image from "../../../components/image";

interface BlogArticle {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  featured_image?: string;
  categories: string[];
}

interface BlogArticlesProps {
  articles: BlogArticle[];
}

export default function BlogArticles({ articles }: BlogArticlesProps) {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.category || null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl
  );

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Filter articles by selected category
  const filteredArticles = selectedCategory
    ? articles.filter((article) =>
        article.categories.includes(selectedCategory)
      )
    : articles;

  // Get all unique categories from all articles
  const allCategories = Array.from(
    new Set(articles.flatMap((article) => article.categories))
  ).sort();

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Category filter - Desktop buttons */}
        {allCategories.length > 0 && (
          <>
            {/* Mobile dropdown */}
            <div className="mb-8 md:hidden">
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => {
                  const category = e.target.value || null;
                  setSelectedCategory(category);
                  if (category) {
                    navigate({ to: "/blog", search: { category } });
                  } else {
                    navigate({ to: "/blog", search: {} });
                  }
                }}
                value={selectedCategory || ""}
              >
                <option value="">Todas las categorías</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop buttons */}
            <div className="mb-8 hidden flex-wrap justify-center gap-2 md:flex">
              <button
                className={`rounded-full px-4 py-2 font-semibold text-sm uppercase tracking-wide transition-colors ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-800 hover:bg-blue-100"
                }`}
                onClick={() => {
                  setSelectedCategory(null);
                  navigate({ to: "/blog", search: {} });
                }}
              >
                Todas
              </button>
              {allCategories.map((category) => (
                <button
                  className={`rounded-full px-4 py-2 font-semibold text-sm uppercase tracking-wide transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-800 hover:bg-blue-100"
                  }`}
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    navigate({ to: "/blog", search: { category } });
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
              key={article.slug}
            >
              {article.featured_image && (
                <Link params={{ slug: article.slug }} to="/blog/$slug">
                  <div className="h-48 cursor-pointer bg-gray-200">
                    <Image
                      alt={article.title}
                      className="h-full w-full object-cover"
                      src={article.featured_image}
                    />
                  </div>
                </Link>
              )}
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {article.categories.map((category) => (
                    <button
                      className="cursor-pointer rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-800 text-xs uppercase tracking-wide transition-colors hover:bg-blue-200"
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        navigate({ to: "/blog", search: { category } });
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <Link params={{ slug: article.slug }} to="/blog/$slug">
                  <h2 className="mb-3 cursor-pointer font-bold text-gray-900 text-xl uppercase tracking-wide transition-colors hover:text-blue-600">
                    {article.title}
                  </h2>
                </Link>
                <p className="mb-4 text-gray-600 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    Por {article.author}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(article.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Button
                  className="w-full"
                  href={`/blog/${article.slug}`}
                  variant="secondary"
                >
                  Leer más
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
