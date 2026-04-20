import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildBlogPostBreadcrumbItems,
  buildDynamicPageBreadcrumbItems,
  buildSitemapRoutes,
  createFaqSchema,
  createOpticianSchema,
  createWebsiteSchema,
  extractServiceFaqItems,
} from "./structured-data-helpers";

const baseUrl = "https://opticasuarezjaen.es";

afterEach(() => {
  vi.doUnmock("~/content/contacto.json");
  vi.resetModules();
});

describe("createWebsiteSchema", () => {
  it("omits SearchAction when blog search is not implemented", () => {
    const schema = createWebsiteSchema(baseUrl);

    expect(schema["@type"]).toBe("WebSite");
    expect(schema).not.toHaveProperty("potentialAction");
  });
});

describe("createOpticianSchema", () => {
  it("uses the validated NAP data for both departments", () => {
    const schema = createOpticianSchema(baseUrl);
    const departments = schema.department;

    expect(schema).toMatchObject({
      telephone: "+34-953-09-30-62",
      email: "info@opticasuarezjaen.es",
      address: {
        streetAddress: "C. de Canarias, 6",
        postalCode: "23009",
        addressLocality: "Jaén",
      },
    });

    expect(departments).toHaveLength(2);

    expect(departments[0]).toMatchObject({
      name: "Óptica Suárez Bulevar",
      image: `${baseUrl}/images/homepage/locations/optica-bulevar.webp`,
      priceRange: "$$",
      telephone: "+34-953-09-30-62",
      email: "bulevar@opticasuarezjaen.es",
      hasMap: "https://maps.google.com/maps?q=C.+de+Canarias,+6,+23009+Jaén",
      address: {
        streetAddress: "C. de Canarias, 6",
        postalCode: "23009",
        addressLocality: "Jaén",
      },
      geo: {
        latitude: 37.780_796_2,
        longitude: -3.788_001_8,
      },
    });

    expect(departments[0].openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "13:00",
      },
    ]);

    expect(departments[1]).toMatchObject({
      name: "Óptica Suárez Centro",
      image: `${baseUrl}/images/homepage/locations/optica-centro.webp`,
      priceRange: "$$",
      telephone: "+34-953-22-31-80",
      email: "centro@opticasuarezjaen.es",
      hasMap:
        "https://maps.google.com/maps?q=P.º+de+la+Estación,+12,+23003+Jaén",
      address: {
        streetAddress: "P.º de la Estación, 12",
        postalCode: "23003",
        addressLocality: "Jaén",
      },
      geo: {
        latitude: 37.770_092,
        longitude: -3.788_108,
      },
    });

    expect(departments[1].openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "17:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "13:00",
      },
    ]);
  });

  it("maps each department to the schedule of its matching visible email", async () => {
    vi.doMock("~/content/contacto.json", () => ({
      default: {
        locations: {
          locations: [
            {
              email: "bulevar@opticasuarezjaen.es",
              schedule: {
                weekdaysHours: "8:00 a 12:00",
                saturdayHours: "9:00 a 11:00",
              },
            },
            {
              email: "centro@opticasuarezjaen.es",
              schedule: {
                weekdaysHours: "16:00 a 21:00",
                saturdayHours: "12:00 a 14:00",
              },
            },
          ],
        },
      },
    }));

    const { createOpticianSchema: createOpticianSchemaWithMockedHours } =
      await import("./structured-data-helpers");

    const departments = createOpticianSchemaWithMockedHours(baseUrl).department;

    expect(departments[0].openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "11:00",
      },
    ]);

    expect(departments[1].openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "16:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "12:00",
        closes: "14:00",
      },
    ]);
  });

  it("fails explicitly when visible schedule text stops matching the expected format", async () => {
    vi.doMock("~/content/contacto.json", () => ({
      default: {
        locations: {
          locations: [
            {
              email: "bulevar@opticasuarezjaen.es",
              schedule: {
                weekdaysHours: "8:00 a 12:00",
                saturdayHours: "9:00 a 11:00",
              },
            },
            {
              email: "centro@opticasuarezjaen.es",
              schedule: {
                weekdaysHours: "de tarde",
                saturdayHours: "12:00 a 14:00",
              },
            },
          ],
        },
      },
    }));

    const { createOpticianSchema: createOpticianSchemaWithInvalidHours } =
      await import("./structured-data-helpers");

    expect(() => createOpticianSchemaWithInvalidHours(baseUrl)).toThrow(
      'Invalid visible opening hours format: "de tarde"'
    );
  });
});

describe("createFaqSchema", () => {
  it("creates FAQPage markup from question and answer pairs", () => {
    const schema = createFaqSchema([
      {
        question: "¿Qué incluye el examen visual?",
        answer: "Incluye una evaluación completa de tu visión.",
      },
    ]);

    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué incluye el examen visual?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Incluye una evaluación completa de tu visión.",
          },
        },
      ],
    });
  });
});

describe("extractServiceFaqItems", () => {
  it("extracts FAQ items only from service pages with FAQ-labelled accordion sections", () => {
    const items = extractServiceFaqItems("/servicios/examen-visual", [
      {
        _type: "sectionAccordion",
        title: "Preguntas Frecuentes sobre el Examen Visual",
        accordionItems: [
          {
            title: "¿Cada cuánto debo revisarme?",
            content:
              "Depende de tu caso, pero conviene revisarlo periódicamente.",
          },
        ],
      },
    ]);

    expect(items).toEqual([
      {
        question: "¿Cada cuánto debo revisarme?",
        answer: "Depende de tu caso, pero conviene revisarlo periódicamente.",
      },
    ]);
  });

  it("ignores generic accordions and non-service pages", () => {
    expect(
      extractServiceFaqItems("/contacto", [
        {
          _type: "sectionAccordion",
          title: "Preguntas frecuentes",
          accordionItems: [{ title: "A", content: "B" }],
        },
      ])
    ).toEqual([]);

    expect(
      extractServiceFaqItems("/servicios/terapia-visual", [
        {
          _type: "sectionAccordion",
          title: "Cómo trabajamos",
          accordionItems: [{ title: "A", content: "B" }],
        },
      ])
    ).toEqual([]);
  });
});

describe("breadcrumb builders", () => {
  it("builds service page breadcrumbs with the Servicios parent", () => {
    expect(
      buildDynamicPageBreadcrumbItems({
        path: "/servicios/examen-visual",
        title: "Examen Visual",
        baseUrl,
      })
    ).toEqual([
      { name: "Inicio", url: `${baseUrl}/` },
      { name: "Servicios", url: `${baseUrl}/servicios` },
      { name: "Examen Visual", url: `${baseUrl}/servicios/examen-visual` },
    ]);
  });

  it("builds first-level page breadcrumbs without adding extra hierarchy", () => {
    expect(
      buildDynamicPageBreadcrumbItems({
        path: "/contacto",
        title: "Contacto",
        baseUrl,
      })
    ).toEqual([
      { name: "Inicio", url: `${baseUrl}/` },
      { name: "Contacto", url: `${baseUrl}/contacto` },
    ]);
  });

  it("builds blog post breadcrumbs under Blog", () => {
    expect(
      buildBlogPostBreadcrumbItems({
        slug: "control-miopia-ninos-adolescentes",
        title: "Control de miopía en niños",
        baseUrl,
      })
    ).toEqual([
      { name: "Inicio", url: `${baseUrl}/` },
      { name: "Blog", url: `${baseUrl}/blog` },
      {
        name: "Control de miopía en niños",
        url: `${baseUrl}/blog/control-miopia-ninos-adolescentes`,
      },
    ]);
  });
});

describe("buildSitemapRoutes", () => {
  const staticRoutes = ["/", "/contacto", "/blog"];
  const pages = [{ path: "planveo" }, { path: "/quienes-somos" }];
  const blogSlugs = [{ slug: "control-miopia" }];
  const productSlugs = [{ slug: "gafa-premium" }];

  it("omits shop routes when the shop is disabled", () => {
    expect(
      buildSitemapRoutes({
        staticRoutes,
        pages,
        blogSlugs,
        productSlugs,
        shopEnabled: false,
      })
    ).toEqual([
      "/",
      "/contacto",
      "/blog",
      "/planveo",
      "/quienes-somos",
      "/blog/control-miopia",
    ]);
  });

  it("includes shop routes when the shop is enabled", () => {
    expect(
      buildSitemapRoutes({
        staticRoutes,
        pages,
        blogSlugs,
        productSlugs,
        shopEnabled: true,
      })
    ).toEqual([
      "/",
      "/contacto",
      "/blog",
      "/planveo",
      "/quienes-somos",
      "/blog/control-miopia",
      "/tienda",
      "/tienda/gafa-premium",
    ]);
  });
});
