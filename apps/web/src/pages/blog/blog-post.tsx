import { PortableText } from "@portabletext/react";
import { Link } from "@tanstack/react-router";
import { Button } from "../../components/button";
import Image from "../../components/image";
import SocialShare from "../../components/social-share";
import { resolveImage } from "../../lib/sanity";

interface BlogPostProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity data shape is dynamic
  post: any;
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-4 font-bold text-2xl text-gray-900 uppercase tracking-wide">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-3 font-semibold text-gray-800 text-xl uppercase tracking-wide">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-4 mb-2 font-semibold text-gray-700 text-lg">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => (
      <a
        className="text-blue-600 underline transition-colors hover:text-blue-800"
        href={value?.href}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 ml-4 list-inside list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 ml-4 list-inside list-decimal space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-2 text-gray-700">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-2 text-gray-700">{children}</li>
    ),
  },
  types: {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity image block shape
    image: ({ value }: { value: any }) => (
      <div className="my-8">
        <img
          alt={value.alt || ""}
          className="mx-auto h-64 w-full rounded-lg object-cover shadow-lg"
          src={resolveImage(value)}
        />
      </div>
    ),
  },
};

export default function BlogPost({ post }: BlogPostProps) {
  // Get current URL for sharing
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://opticasuarez.com/blog/${post.slug}`;

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-16 text-white sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Link
            className="mb-6 inline-flex items-center text-blue-200 transition-colors hover:text-white"
            to="/blog"
          >
            ← Volver al blog
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category: string) => (
              <Link
                className="cursor-pointer rounded-full bg-blue-600 px-3 py-1 font-semibold text-sm text-white uppercase tracking-wide transition-colors hover:bg-blue-700"
                key={category}
                search={{ category }}
                to="/blog"
              >
                {category}
              </Link>
            ))}
          </div>

          <h1 className="mb-4 font-bold text-4xl uppercase tracking-wide md:text-5xl">
            {post.title}
          </h1>

          <p className="mb-6 text-blue-100 text-xl leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-col gap-4 text-blue-200 text-sm sm:flex-row">
            <span>Por {post.author}</span>
            <span className="hidden sm:block">•</span>
            <span>
              {new Date(post.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                alt={post.title}
                className="h-96 w-full object-cover"
                src={resolveImage(post.featured_image)}
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <div className="leading-relaxed">
              {post.body ? (
                <PortableText
                  components={portableTextComponents}
                  value={post.body}
                />
              ) : null}
            </div>
          </article>
        </div>
      </section>

      {/* Social Share */}
      <SocialShare excerpt={post.excerpt} title={post.title} url={currentUrl} />

      {/* Back to Blog */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-2xl text-gray-900">
            ¿Te gustó este artículo?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
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
