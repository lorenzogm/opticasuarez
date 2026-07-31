import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to: _to,
    search: _search,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
    search?: unknown;
  }) => <a {...props}>{children}</a>,
}));


vi.mock("@portabletext/react", () => ({
  PortableText: ({
    components,
    value,
  }: {
    components: {
      types?: {
        image?: ({ value }: { value: Record<string, unknown> }) => ReactNode;
      };
    };
    value: Array<Record<string, unknown>>;
  }) => (
    <>
      {value.map((block, index) => {
        if ((block as { _type?: string })._type === "image" && components.types?.image) {
          return <div key={index}>{components.types.image({ value: block })}</div>;
        }
        return null;
      })}
    </>
  ),
}));

vi.mock("~/components/button", () => ({
  Button: ({ children }: { children?: ReactNode }) => (
    <button type="button">{children}</button>
  ),
}));

vi.mock("~/components/image", () => ({
  default: ({
    alt,
    src,
    title,
    className,
  }: {
    alt: string;
    src: string;
    title?: string;
    className?: string;
  }) => (
    <img
      alt={alt}
      className={className}
      data-image-component="true"
      src={src}
      title={title}
    />
  ),
}));

vi.mock("~/components/social-share", () => ({
  default: () => null,
}));

vi.mock("~/components/structured-data", () => ({
  default: () => null,
}));

vi.mock("~/lib/sanity", () => ({
  resolveImage: () => "https://cdn.example.com/eclipse.webp",
}));

vi.mock("~/lib/utils", () => ({
  getBaseUrl: () => "https://opticasuarezjaen.es",
}));

import BlogPost from "./blog-post";

describe("BlogPost", () => {
  it("renders portable text images through the shared Image component with title and caption", () => {
    render(
      <BlogPost
        post={{
          title: "Eclipse solar en Jaén",
          excerpt: "Guía rápida",
          author: "Óptica Suárez",
          slug: "eclipse-solar-como-verlo-correctamente",
          date: "2026-07-30",
          categories: ["Salud Visual"],
          featured_image: { asset: { url: "https://cdn.example.com/featured.webp" } },
          body: [
            {
              _type: "image",
              asset: { _ref: "image-1" },
              alt: "Gafas homologadas para eclipse solar",
              caption: "Observación segura del eclipse solar",
            },
          ],
        }}
      />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    const portableImage = screen.getByAltText("Gafas homologadas para eclipse solar");
    expect(portableImage).toHaveAttribute("data-image-component", "true");
    expect(portableImage).toHaveAttribute(
      "title",
      "Observación segura del eclipse solar"
    );
    expect(
      screen.getByText("Observación segura del eclipse solar")
    ).toBeVisible();
  });
});
