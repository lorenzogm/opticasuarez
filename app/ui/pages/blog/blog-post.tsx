import { Link } from 'react-router';
import { Button } from '../../components/button';
import Image from '../../components/image';
import SocialShare from '../../components/social-share';
import type { BlogPost as BlogPostType } from '../../lib/blog';

interface BlogPostProps {
  post: BlogPostType;
}

function parseMarkdownToHTML(markdown: string): string {
  const basePath =
    typeof window !== 'undefined' &&
    window.location.origin.includes('github.io')
      ? '/opticasuarez-new'
      : '';

  return (
    markdown
      .replace(/^# .+$/gm, '') // Remove h1 headers since we have title in hero
      .replace(
        /^## (.+)$/gm,
        '<div class="text-2xl font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">$1</div>'
      )
      .replace(
        /^### (.+)$/gm,
        '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3 uppercase tracking-wide">$1</h3>'
      )
      .replace(
        /^#### (.+)$/gm,
        '<h4 class="text-lg font-semibold text-gray-700 mt-4 mb-2">$1</h4>'
      )
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="font-bold text-gray-900">$1</strong>'
      )
      // Handle inline images first
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        const imageSrc = src.startsWith('/') ? `${basePath}${src}` : src;
        return `<div class="my-8"><img src="${imageSrc}" alt="${alt}" class="w-full h-64 object-cover rounded-lg shadow-lg mx-auto" /></div>`;
      })
      // Handle links (exclude image patterns by using a more specific pattern)
      .replace(/(?:^|[^!])\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        // If the match starts with a character other than !, preserve that character
        const prefix = match.charAt(0) === '[' ? '' : match.charAt(0);
        return `${prefix}<a href="${url}" class="text-blue-600 hover:text-blue-800 underline transition-colors">${text}</a>`;
      })
      .replace(/^- (.+)$/gm, '<li class="mb-2 text-gray-700">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="mb-2 text-gray-700">$2</li>')
      .split('\n')
      .map((line) => {
        const trimmedLine = line.trim();
        // Handle inline images
        if (trimmedLine.startsWith('<div class="my-8"><img')) {
          return line;
        }
        // Handle list items
        if (trimmedLine.startsWith('<li')) {
          return line;
        }
        // Handle headings (including divs that replaced h2)
        if (trimmedLine.startsWith('<h') || trimmedLine.startsWith('<div class="text-2xl')) {
          return line;
        }
        // Handle horizontal rules
        if (trimmedLine === '---') {
          return '<hr class="my-8 border-gray-300">';
        }
        // Handle empty lines
        if (trimmedLine === '') {
          return '';
        }
        // Regular paragraphs
        return `<p class="mb-4 text-gray-700 leading-relaxed">${line}</p>`;
      })
      .join('\n')
      .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
        return `<ul class="list-disc list-inside space-y-2 mb-6 ml-4">${match}</ul>`;
      })
      .replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/g, '')
  );
}

export default function BlogPost({ post }: BlogPostProps) {
  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://opticasuarez.com/blog/${post.slug}`;

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            ← Volver al blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Link
                key={category}
                to={`/blog?category=${encodeURIComponent(category)}`}
                className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full uppercase tracking-wide hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {category}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">
            {post.title}
          </h1>

          <p className="text-xl text-blue-100 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-blue-200">
            <span>Por {post.author}</span>
            <span className="hidden sm:block">•</span>
            <span>
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={post.featured_image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: parseMarkdownToHTML(post.content),
              }}
            />
          </article>
        </div>
      </section>

      {/* Social Share */}
      <SocialShare 
        title={post.title}
        url={currentUrl}
        excerpt={post.excerpt}
      />

      {/* Back to Blog */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre más artículos sobre salud visual, cuidado de los ojos y
            novedades en óptica en nuestro blog.
          </p>
          <Link to="/blog">
            <Button variant="primary">Ver más artículos</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
