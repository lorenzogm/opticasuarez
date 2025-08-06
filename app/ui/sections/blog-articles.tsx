import { Button } from '../components/button';

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
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {article.featured_image && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">Por {article.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <Button
                  onClick={() => alert(`Artículo completo: ${article.title}`)}
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