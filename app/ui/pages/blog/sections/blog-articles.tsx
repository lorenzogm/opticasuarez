import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../components/button';
import Image from '../../../components/image';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter articles by selected category
  const filteredArticles = selectedCategory
    ? articles.filter((article) =>
        article.categories.includes(selectedCategory)
      )
    : articles;

  // Get all unique categories from all articles
  const allCategories = Array.from(
    new Set(articles.flatMap((article) => article.categories))
  );

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Category filter buttons */}
        {allCategories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-800 hover:bg-blue-100'
              }`}
            >
              Todas
            </button>
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-800 hover:bg-blue-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {article.featured_image && (
                <Link to={`/blog/${article.slug}`}>
                  <div className="h-48 bg-gray-200 cursor-pointer">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              )}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.categories.map((category, catIndex) => (
                    <button
                      key={catIndex}
                      onClick={() => setSelectedCategory(category)}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <Link to={`/blog/${article.slug}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide cursor-pointer hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Por {article.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <Button
                  href={`/blog/${article.slug}`}
                  variant="secondary"
                  className="w-full"
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
