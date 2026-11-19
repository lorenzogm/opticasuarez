import { describe, expect, it } from "vitest";
import migrationHomepage from "../../../../content/json/homepage.json" with {
  type: "json",
};
import homepage from "./homepage.json" with { type: "json" };
import editorialContent from "./homepage-editorial.json" with { type: "json" };

describe("homepage content", () => {
  it("does not include the deprecated top-level contact block", () => {
    expect(homepage).not.toHaveProperty("contact");
  });

  it("adds enough relevant editorial content to the homepage", () => {
    const words = [
      editorialContent.title,
      ...editorialContent.sections.flatMap((section) => [
        section.title,
        ...section.paragraphs,
      ]),
    ]
      .join(" ")
      .split(/\s+/).length;

    expect(words).toBeGreaterThanOrEqual(520);
  });

  it("uses the correctly accented spelling of visión in image text", () => {
    const imageText = homepage.servicesGrid.items
      .flatMap(({ alt, imageTitle }) => [alt, imageTitle])
      .join(" ");

    expect(imageText).not.toMatch(/\bvision\b/i);
  });

  it("uses correct service alt text and spelling in homepage sources", () => {
    const expectedServiceAltByTitle = {
      CONTACTOLOGÍA: "Contactología avanzada y lentes de contacto en Jaén",
      "VISIÓN PEDIÁTRICA": "Optometría y visión pediátrica en Jaén",
      "CONTROL DE MIOPÍA": "Control de miopía infantil en Jaén",
    };

    for (const content of [homepage, migrationHomepage]) {
      const serviceAltByTitle = Object.fromEntries(
        content.servicesGrid.items.map(({ title, alt }) => [title, alt])
      );

      expect(serviceAltByTitle).toMatchObject(expectedServiceAltByTitle);
      expect(content.hero.subtitle).toBe("BIENVENIDOS A ÓPTICA SUÁREZ");
      expect(content.bookAppointment.description).toMatch(/^Contáctanos\b/);
    }
  });
});
