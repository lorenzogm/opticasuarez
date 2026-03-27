import { PortableText } from "@portabletext/react";
import { Link } from "@tanstack/react-router";
import { resolveImage } from "~/lib/sanity";

interface PortableTextBlockProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text blocks
  blocks: any[];
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-6 mb-3 font-bold text-gray-900 text-xl">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-4 mb-2 font-semibold text-gray-800 text-lg">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      const isExternal = href.startsWith("http") || href.startsWith("//");
      if (isExternal) {
        return (
          <a
            className="text-blue-600 underline hover:text-blue-800"
            href={href}
          >
            {children}
          </a>
        );
      }
      return (
        <Link className="text-blue-600 underline hover:text-blue-800" to={href}>
          {/* biome-ignore lint/suspicious/noExplicitAny: React 18 ReactNode vs TanStack Router children type */}
          {children as any}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-4 list-inside list-disc space-y-1">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  types: {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity image block shape
    image: ({ value }: { value: any }) => (
      <div className="my-4">
        <img
          alt={value.alt || ""}
          className="w-full rounded-lg"
          src={resolveImage(value)}
        />
      </div>
    ),
  },
};

export default function PortableTextBlock({ blocks }: PortableTextBlockProps) {
  if (!blocks?.length) return null;

  return (
    <div className="prose-sm">
      <PortableText components={components} value={blocks} />
    </div>
  );
}
