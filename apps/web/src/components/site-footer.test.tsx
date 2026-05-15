import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SiteFooter from "./site-footer";

afterEach(() => {
  cleanup();
});

describe("SiteFooter", () => {
  it("shows both stores with their contact links", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("heading", { name: "Óptica Bulevar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Óptica Centro" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "953-093-062" })).toHaveAttribute(
      "href",
      "tel:+34953093062"
    );
    expect(screen.getByRole("link", { name: "953-223-180" })).toHaveAttribute(
      "href",
      "tel:+34953223180"
    );
  });

  it("exposes semantic footer navigation and legal information", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Enlaces del sitio" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute(
      "href",
      "/contacto"
    );

    expect(
      screen.getByText(`© ${new Date().getFullYear()} Óptica Suárez`)
    ).toBeInTheDocument();
  });
});
