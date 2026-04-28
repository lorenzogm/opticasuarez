/**
 * Server functions for data fetching.
 *
 * TanStack Start requires loaders that fetch external data to be wrapped
 * in createServerFn so they always execute server-side — both during SSR
 * and on client-side navigation. Without this, client navigations try to
 * call the Sanity API directly from the browser, which fails with a
 * NetworkError (CORS / connectivity).
 */
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import contactoContent from "~/content/contacto.json" with { type: "json" };
import contactologiaContent from "~/content/contactologia.json" with {
  type: "json",
};
import controlMiopiaContent from "~/content/control-de-miopia.json" with {
  type: "json",
};
import ortoqueratologiaContent from "~/content/ortoqueratologia.json" with {
  type: "json",
};
import planVeoContent from "~/content/plan-veo.json" with { type: "json" };
import quienesNosotrosContent from "~/content/quienes-somos.json" with {
  type: "json",
};
import visionDeportivaContent from "~/content/vision-deportiva.json" with {
  type: "json",
};
import visionPediatricaContent from "~/content/vision-pediatrica.json" with {
  type: "json",
};
import { resolveFeatureFlags } from "~/lib/feature-flags";
import {
  getBlogPost,
  getBlogPosts,
  getBrands,
  getHomepage,
  getPage,
  getProduct,
  getProductCategories,
  getProducts,
  getSiteSettings,
} from "~/lib/sanity";

// biome-ignore lint/suspicious/noExplicitAny: Sanity queries return unknown; we use any for server function compatibility
type SanityData = any;

function isPreviewMode(): boolean {
  try {
    return getCookie("__sanity_preview") === "1";
  } catch {
    return false;
  }
}

// ─── Homepage ────────────────────────────────────────────────

export const fetchHomepageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const homepage = await getHomepage(preview);
    return { homepage: homepage as SanityData, isPreview: preview };
  }
);

// ─── Blog ────────────────────────────────────────────────────

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    try {
      const articles = await getBlogPosts(preview);
      return { articles: (articles ?? []) as SanityData[], isPreview: preview };
    } catch {
      return { articles: [] as SanityData[], isPreview: preview };
    }
  }
);

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const preview = isPreviewMode();
    const post = await getBlogPost(slug, preview);
    return { post: post as SanityData, isPreview: preview };
  });

// ─── Tienda ──────────────────────────────────────────────────

export const fetchTiendaData = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const [products, categories, brands] = await Promise.all([
      getProducts(preview),
      getProductCategories(preview),
      getBrands(preview),
    ]);
    return {
      products: products as SanityData[],
      categories: categories as SanityData[],
      brands: brands as SanityData[],
      isPreview: preview,
    };
  }
);

export const fetchProduct = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const preview = isPreviewMode();
    const product = await getProduct(slug, preview);
    return { product: product as SanityData, isPreview: preview };
  });

// ─── Site Settings ──────────────────────────────────────────

export const fetchSiteSettings = createServerFn({ method: "GET" }).handler(
  async () => {
    const preview = isPreviewMode();
    const settings = await getSiteSettings(preview);
    const featureFlags = resolveFeatureFlags(
      (settings as SanityData)?.featureFlags ?? {}
    );
    return {
      settings: { ...(settings as SanityData), featureFlags } as SanityData,
      isPreview: preview,
    };
  }
);

// ─── Catch-all page builder ─────────────────────────────────

export const fetchPage = createServerFn({ method: "GET" })
  .inputValidator((path: string) => path ?? "")
  .handler(async ({ data: path }) => {
    const fullPath = path.startsWith("/") ? path : `/${path}`;
    const preview = isPreviewMode();
    let page: SanityData;
    try {
      page = (await getPage(fullPath, preview)) as SanityData;
    } catch {
      // ignore — fall through to fallback logic below
    }

    // Fallback: build Plan VEO page from local JSON when Sanity has no data
    if (!page && fullPath === "/planveo") {
      page = buildPlanVeoFallback();
    }

    // Fallback: build Quiénes Somos page from local JSON when Sanity has no data
    if (!page && fullPath === "/quienes-somos") {
      page = buildQuienesNosotrosFallback();
    }

    // Fallback: build Contacto page from local JSON when Sanity has no data
    if (!page && fullPath === "/contacto") {
      page = buildContactoFallback();
    }

    // Fallback: service pages from local JSON when Sanity has no data
    if (!page && fullPath === "/servicios/contactologia") {
      page = buildContactologiaFallback();
    }
    if (!page && fullPath === "/servicios/vision-pediatrica") {
      page = buildVisionPediatricaFallback();
    }
    if (!page && fullPath === "/servicios/vision-deportiva") {
      page = buildVisionDeportivaFallback();
    }
    if (!page && fullPath === "/servicios/control-de-miopia") {
      page = buildControlMiopiaFallback();
    }
    if (!page && fullPath === "/servicios/ortoqueratologia") {
      page = buildOrtoqueratologiaFallback();
    }

    if (!page) {
      return { page: null as SanityData };
    }

    // Fallback: inject contact form section if Sanity page is missing it
    if (fullPath === "/contacto" && page?.sections) {
      const hasContactForm = page.sections.some(
        (s: SanityData) => s._type === "sectionContactForm"
      );
      if (!hasContactForm) {
        const d = contactoContent;
        page.sections.push({
          _type: "sectionContactForm",
          _key: "fb-ct-form",
          title: d.contactForm.title,
          description: d.contactForm.description,
          nameLabel: d.contactForm.form.nameLabel,
          namePlaceholder: d.contactForm.form.namePlaceholder,
          emailLabel: d.contactForm.form.emailLabel,
          emailPlaceholder: d.contactForm.form.emailPlaceholder,
          phoneLabel: d.contactForm.form.phoneLabel,
          phonePlaceholder: d.contactForm.form.phonePlaceholder,
          messageLabel: d.contactForm.form.messageLabel,
          messagePlaceholder: d.contactForm.form.messagePlaceholder,
          submitButton: d.contactForm.form.submitButton,
          privacy: d.contactForm.form.privacy,
        });
      }
    }

    // Fallback: populate empty timeline sections with JSON content
    if (fullPath === "/quienes-somos" && page?.sections) {
      let hasTimeline = false;
      for (const section of page.sections) {
        if (section._type === "sectionTimeline") {
          hasTimeline = true;
          if (!section.title) {
            section.title = quienesNosotrosContent.history.title;
          }
          if (!section.timelineItems || section.timelineItems.length === 0) {
            section.timelineItems = quienesNosotrosContent.history.timeline.map(
              (
                item: {
                  year: string;
                  title: string;
                  description: string;
                  image: string;
                },
                i: number
              ) => ({
                _key: `fallback-${i}`,
                ...item,
              })
            );
          }
        }
      }
      // Inject a full timeline section if Sanity has none
      if (!hasTimeline) {
        const teamIndex = page.sections.findIndex(
          (s: SanityData) => s._type === "sectionTeam"
        );
        const timelineSection = {
          _type: "sectionTimeline",
          _key: "fallback-timeline",
          title: quienesNosotrosContent.history.title,
          timelineItems: quienesNosotrosContent.history.timeline.map(
            (
              item: {
                year: string;
                title: string;
                description: string;
                image: string;
              },
              i: number
            ) => ({
              _key: `fallback-${i}`,
              ...item,
            })
          ),
        };
        if (teamIndex > 0) {
          page.sections.splice(teamIndex, 0, timelineSection);
        } else {
          page.sections.push(timelineSection);
        }
      }

      // Inject testimonials section if Sanity has none
      const hasTestimonials = page.sections.some(
        (s: SanityData) => s._type === "sectionTestimonials"
      );
      if (!hasTestimonials) {
        page.sections.push({
          _type: "sectionTestimonials",
          _key: "fallback-testimonials",
          title: quienesNosotrosContent.testimonials.title,
          moreReviewsLink: quienesNosotrosContent.testimonials.moreReviewsLink,
          testimonialItems: quienesNosotrosContent.testimonials.items.map(
            (
              item: { rating: number; name: string; review: string },
              i: number
            ) => ({
              _key: `fallback-test-${i}`,
              name: item.name,
              text: item.review,
              rating: item.rating,
            })
          ),
        });
      }

      // Inject social media section if Sanity has none
      const hasSocialMedia = page.sections.some(
        (s: SanityData) => s._type === "sectionSocialMedia"
      );
      if (!hasSocialMedia) {
        page.sections.push({
          _type: "sectionSocialMedia",
          _key: "fallback-social",
          title: "Síguenos en redes sociales",
          items: quienesNosotrosContent.socialMedia.map(
            (
              item: {
                platform: string;
                title: string;
                handle: string;
                url: string;
                icon: string;
              },
              i: number
            ) => ({
              _key: `fallback-sm-${i}`,
              platform: item.icon,
              title: item.title,
              handle: item.handle,
              url: item.url,
            })
          ),
        });
      }
    }

    return { page: page as SanityData, isPreview: preview };
  });

function buildPlanVeoFallback(): SanityData {
  const d = planVeoContent;
  return {
    _id: "fallback-planveo",
    _type: "page",
    title: "Plan VEO",
    path: "/planveo",
    seo: {
      title: "Plan VEO en Jaén | Óptica Suárez",
      description: d.hero.description,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        description: d.hero.description,
        image: { url: d.hero.image },
        imageAlt: d.hero.imageAlt,
      },
      {
        _type: "sectionText",
        _key: "fb-intro",
        title: d.introduction.title,
        content: [
          {
            _type: "block",
            _key: "fb-intro-block",
            children: [
              {
                _type: "span",
                _key: "fb-intro-span",
                text: d.introduction.content,
                marks: [],
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      },
      {
        _type: "sectionCards",
        _key: "fb-benefits",
        title: d.benefits.title,
        subtitle: d.benefits.subtitle,
        variant: "grid-3",
        items: d.benefits.items.map(
          (
            b: {
              title: string;
              description: string;
              icon: string;
              image: string;
              imageAlt: string;
            },
            i: number
          ) => ({
            _key: `fb-card-${i}`,
            title: b.title,
            description: b.description,
            image: { url: b.image },
          })
        ),
      },
      {
        _type: "sectionFeatures",
        _key: "fb-requirements",
        title: d.requirements.title,
        subtitle: d.requirements.subtitle,
        items: d.requirements.items.map(
          (r: { title: string; description: string }, i: number) => ({
            _key: `fb-req-${i}`,
            title: r.title,
            description: r.description,
          })
        ),
      },
      {
        _type: "sectionProcessSteps",
        _key: "fb-steps",
        title: d.howItWorks.title,
        subtitle: d.howItWorks.subtitle,
        items: d.howItWorks.steps.map(
          (
            s: { number: string; title: string; description: string },
            i: number
          ) => ({
            _type: "processStep",
            _key: `fb-step-${i}`,
            stepNumber: Number(s.number),
            title: s.title,
            description: s.description,
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-faq",
        title: d.faq.title,
        items: d.faq.items.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-cta",
        title: d.cta.title,
        description: d.cta.description,
        buttonText: d.cta.buttonText,
        buttonUrl: d.cta.buttonLink,
      },
    ],
  };
}

function buildQuienesNosotrosFallback(): SanityData {
  const d = quienesNosotrosContent;
  return {
    _id: "fallback-quienes-somos",
    _type: "page",
    title: "Quiénes Somos",
    path: "/quienes-somos",
    seo: {
      title: "Quiénes Somos | Óptica Suárez",
      description:
        "Conoce la historia de Óptica Suárez en Jaén. Más de 80 años cuidando tu visión.",
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-qs-hero",
        title: "Quiénes Somos",
        subtitle: "Más de 80 años cuidando tu visión en Jaén",
      },
      {
        _type: "sectionTimeline",
        _key: "fb-qs-timeline",
        title: d.history.title,
        timelineItems: d.history.timeline.map(
          (
            item: {
              year: string;
              title: string;
              description: string;
              image: string;
            },
            i: number
          ) => ({
            _key: `fb-tl-${i}`,
            ...item,
          })
        ),
      },
      {
        _type: "sectionCards",
        _key: "fb-qs-team",
        title: d.team.title,
        variant: "profile",
        items: d.team.members.map(
          (
            m: { name: string; role: string; image: string; details: string[] },
            i: number
          ) => ({
            _key: `fb-tm-${i}`,
            title: m.name,
            subtitle: m.role,
            details: m.details,
            image: { url: m.image },
          })
        ),
      },
      {
        _type: "sectionTestimonials",
        _key: "fb-qs-testimonials",
        title: d.testimonials.title,
        moreReviewsLink: d.testimonials.moreReviewsLink,
        testimonialItems: d.testimonials.items.map(
          (
            item: { rating: number; name: string; review: string },
            i: number
          ) => ({
            _key: `fb-test-${i}`,
            name: item.name,
            text: item.review,
            rating: item.rating,
          })
        ),
      },
      {
        _type: "sectionLocations",
        _key: "fb-qs-locations",
        title: "Nuestros Centros",
        items: d.locations.map(
          (
            loc: { name: string; image: string; mapLink: string },
            i: number
          ) => ({
            _key: `fb-loc-${i}`,
            title: loc.name,
            image: { url: loc.image },
            link: loc.mapLink,
          })
        ),
      },
      {
        _type: "sectionSocialMedia",
        _key: "fb-qs-social",
        title: "Síguenos en redes sociales",
        items: d.socialMedia.map(
          (
            item: {
              platform: string;
              title: string;
              handle: string;
              url: string;
              icon: string;
            },
            i: number
          ) => ({
            _key: `fb-sm-${i}`,
            platform: item.icon,
            title: item.title,
            handle: item.handle,
            url: item.url,
          })
        ),
      },
    ],
  };
}

function buildContactoFallback(): SanityData {
  const d = contactoContent;
  return {
    _id: "fallback-contacto",
    _type: "page",
    title: "Contacto",
    path: "/contacto",
    seo: {
      title: "Contacto | Óptica Suárez",
      description:
        "Contacta con Óptica Suárez en Jaén. Estamos aquí para ayudarte.",
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-ct-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        image: d.hero.image ? { url: d.hero.image } : undefined,
        imageAlt: d.hero.imageAlt,
      },
      {
        _type: "sectionLocations",
        _key: "fb-ct-locations",
        title: d.locations.title,
        subtitle: d.locations.subtitle,
        items: d.locations.locations.map(
          (
            loc: {
              name: string;
              image: string;
              address: string;
              phone: string;
              phoneUrl: string;
              whatsappUrl: string;
              whatsappNumber?: string;
              email: string;
              mapUrl: string;
              schedule: {
                weekdays: string;
                weekdaysHours: string;
                saturday: string;
                saturdayHours: string;
              };
            },
            i: number
          ) => ({
            _key: `fb-loc-${i}`,
            name: loc.name,
            image: { url: loc.image },
            address: loc.address,
            phone: loc.phone,
            phoneUrl: loc.phoneUrl,
            whatsappUrl: loc.whatsappUrl,
            whatsappNumber: loc.whatsappNumber || loc.phone,
            email: loc.email,
            mapUrl: loc.mapUrl,
            schedule: loc.schedule,
          })
        ),
      },
      {
        _type: "sectionContactForm",
        _key: "fb-ct-form",
        title: d.contactForm.title,
        description: d.contactForm.description,
        nameLabel: d.contactForm.form.nameLabel,
        namePlaceholder: d.contactForm.form.namePlaceholder,
        emailLabel: d.contactForm.form.emailLabel,
        emailPlaceholder: d.contactForm.form.emailPlaceholder,
        phoneLabel: d.contactForm.form.phoneLabel,
        phonePlaceholder: d.contactForm.form.phonePlaceholder,
        messageLabel: d.contactForm.form.messageLabel,
        messagePlaceholder: d.contactForm.form.messagePlaceholder,
        submitButton: d.contactForm.form.submitButton,
        privacy: d.contactForm.form.privacy,
      },
      {
        _type: "sectionSocialMedia",
        _key: "fb-ct-social",
        title: d.socialMedia.title,
        items: [
          d.socialMedia.instagram,
          d.socialMedia.facebook,
          d.socialMedia.twitter,
          d.socialMedia.youtube,
        ]
          .filter(Boolean)
          .map(
            (
              item: { title: string; handle: string; url: string },
              i: number
            ) => ({
              _key: `fb-sm-${i}`,
              platform: item.title.toLowerCase(),
              title: item.title,
              handle: item.handle,
              url: item.url,
            })
          ),
      },
    ],
  };
}

function makeTextBlock(text: string, key: string) {
  return [
    {
      _type: "block",
      _key: key,
      children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
      markDefs: [],
      style: "normal",
    },
  ];
}

function buildContactologiaFallback(): SanityData {
  const d = contactologiaContent;
  return {
    _id: "fallback-contactologia",
    _type: "page",
    title: d.mainTitle,
    path: "/servicios/contactologia",
    seo: {
      title: `${d.mainTitle} | Óptica Suárez`,
      description: d.textSection?.description || d.intro.title,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-cl-hero",
        title: d.intro.title,
        image: d.heroImage ? { url: d.heroImage } : undefined,
        imageAlt: d.heroImageAlt,
      },
      ...(d.textSection
        ? [
            {
              _type: "sectionText",
              _key: "fb-cl-text",
              title: d.textSection.title,
              content: makeTextBlock(d.textSection.description, "fb-cl-text-b"),
            },
          ]
        : []),
      {
        _type: "sectionCards",
        _key: "fb-cl-services",
        title: d.services.title,
        variant: "grid-4",
        items: d.services.items.map(
          (
            s: { title: string; description: string; icon: string },
            i: number
          ) => ({
            _key: `fb-cl-srv-${i}`,
            title: s.title,
            description: s.description,
            icon: s.icon,
          })
        ),
      },
      {
        _type: "sectionCards",
        _key: "fb-cl-types",
        title: d.types.title,
        variant: "landscape",
        items: d.types.items.map(
          (
            t: { name: string; description: string; image: string },
            i: number
          ) => ({
            _key: `fb-cl-type-${i}`,
            title: t.name,
            description: t.description,
            image: { url: t.image },
          })
        ),
      },
      {
        _type: "sectionFeatures",
        _key: "fb-cl-adv",
        title: d.advantages.title,
        items: d.advantages.items.map(
          (a: { title: string; description: string }, i: number) => ({
            _key: `fb-cl-adv-${i}`,
            title: a.title,
            description: a.description,
          })
        ),
      },
      {
        _type: "sectionProcessSteps",
        _key: "fb-cl-process",
        title: d.process.title,
        items: d.process.steps.map(
          (
            s: { step: string; title: string; description: string },
            i: number
          ) => ({
            _type: "processStep",
            _key: `fb-cl-step-${i}`,
            stepNumber: Number(s.step),
            title: s.title,
            description: s.description,
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-cl-faq",
        title: d.faq.title,
        items: d.faq.questions.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-cl-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-cl-cta",
        title: d.cta.title,
        description: d.cta.description,
        buttonText: d.cta.buttonText,
        buttonUrl: d.cta.buttonLink,
      },
    ],
  };
}

function buildVisionPediatricaFallback(): SanityData {
  const d = visionPediatricaContent;
  return {
    _id: "fallback-vision-pediatrica",
    _type: "page",
    title: d.mainTitle,
    path: "/servicios/vision-pediatrica",
    seo: {
      title: `${d.hero.title} | Óptica Suárez`,
      description: d.introduction.content,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-vp-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        image: d.hero.image ? { url: d.hero.image } : undefined,
        imageAlt: d.hero.imageAlt,
      },
      {
        _type: "sectionText",
        _key: "fb-vp-intro",
        title: d.introduction.title,
        content: makeTextBlock(d.introduction.content, "fb-vp-intro-b"),
      },
      {
        _type: "sectionCards",
        _key: "fb-vp-services",
        title: d.services.title,
        subtitle: d.services.subtitle,
        variant: "grid-3",
        items: d.services.items.map(
          (
            s: {
              title: string;
              description: string;
              image: string;
              imageAlt: string;
              link?: string;
            },
            i: number
          ) => ({
            _key: `fb-vp-srv-${i}`,
            title: s.title,
            description: s.description,
            image: { url: s.image },
            link: s.link,
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-vp-faq",
        title: d.faq.title,
        items: d.faq.items.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-vp-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-vp-cta",
        title: d.cta.title,
        description: d.cta.description,
        buttonText: d.cta.buttonText,
        buttonUrl: d.cta.buttonLink,
      },
    ],
  };
}

function buildVisionDeportivaFallback(): SanityData {
  const d = visionDeportivaContent;
  return {
    _id: "fallback-vision-deportiva",
    _type: "page",
    title: d.mainTitle,
    path: "/servicios/vision-deportiva",
    seo: {
      title: `${d.hero.title} | Óptica Suárez`,
      description: d.introduction.description,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-vd-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        image: d.hero.image ? { url: d.hero.image } : undefined,
        imageAlt: d.hero.imageAlt,
      },
      {
        _type: "sectionText",
        _key: "fb-vd-intro",
        title: d.introduction.title,
        content: makeTextBlock(d.introduction.description, "fb-vd-intro-b"),
      },
      {
        _type: "sectionCards",
        _key: "fb-vd-services",
        title: d.services.title,
        variant: "grid-4",
        items: d.services.items.map(
          (s: { title: string; description: string }, i: number) => ({
            _key: `fb-vd-srv-${i}`,
            title: s.title,
            description: s.description,
          })
        ),
      },
      {
        _type: "sectionText",
        _key: "fb-vd-perf",
        title: d.visualTherapy.improvements?.title || "Mejora tu rendimiento",
        content: makeTextBlock(
          d.visualTherapy.improvements?.items?.join(". ") || "",
          "fb-vd-perf-b"
        ),
        image: d.visualTherapy.improvements?.image
          ? { url: d.visualTherapy.improvements.image }
          : d.visualTherapy.images?.[1]
            ? { url: d.visualTherapy.images[1].src }
            : undefined,
        imageAlt: d.visualTherapy.improvements?.imageAlt,
      },
      {
        _type: "sectionTestimonials",
        _key: "fb-vd-test",
        title: d.testimonials.title,
        testimonialItems: d.testimonials.items.map(
          (t: { rating: number; name: string; review: string }, i: number) => ({
            _key: `fb-vd-test-${i}`,
            name: t.name,
            text: t.review,
            rating: t.rating,
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-vd-faq",
        title: d.faq.title,
        items: d.faq.items.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-vd-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-vd-cta",
        title: d.cta.title,
        description: d.cta.description,
        buttonText: d.cta.buttonText,
        buttonUrl: d.cta.buttonUrl,
      },
    ],
  };
}

function buildControlMiopiaFallback(): SanityData {
  const d = controlMiopiaContent;
  return {
    _id: "fallback-control-miopia",
    _type: "page",
    title: d.mainTitle,
    path: "/servicios/control-de-miopia",
    seo: {
      title: `${d.hero.title} | Óptica Suárez`,
      description: d.info.description,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-cm-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        image: d.hero.image ? { url: d.hero.image } : undefined,
        imageAlt: d.hero.imageAlt,
      },
      {
        _type: "sectionFeatures",
        _key: "fb-cm-info",
        title: d.info.title,
        subtitle: d.info.description,
        items: d.info.features.map(
          (
            f: { title: string; description: string; icon: string },
            i: number
          ) => ({
            _key: `fb-cm-feat-${i}`,
            title: f.title,
            description: f.description,
            icon: f.icon,
          })
        ),
      },
      {
        _type: "sectionCards",
        _key: "fb-cm-treatments",
        title: d.treatments.title,
        variant: "grid-3",
        items: d.treatments.items.map(
          (
            t: {
              title: string;
              description: string;
              image: string;
              imageAlt: string;
            },
            i: number
          ) => ({
            _key: `fb-cm-treat-${i}`,
            title: t.title,
            description: t.description,
            image: { url: t.image },
          })
        ),
      },
      {
        _type: "sectionStats",
        _key: "fb-cm-science",
        title: d.science.title,
        subtitle: d.science.description,
        items: d.science.studies.map(
          (
            s: {
              title: string;
              description: string;
              percentage: string;
            },
            i: number
          ) => ({
            _key: `fb-cm-stat-${i}`,
            label: s.title,
            description: s.description,
            value: s.percentage,
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-cm-faq",
        title: d.faq.title,
        items: d.faq.items.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-cm-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-cm-cta",
        title: d.bookAppointment.title,
        description: d.bookAppointment.description,
        buttonText: d.bookAppointment.buttonText,
        buttonUrl: `https://api.whatsapp.com/send?phone=34953093062&text=${encodeURIComponent(d.bookAppointment.whatsappMessage)}`,
      },
    ],
  };
}

function buildOrtoqueratologiaFallback(): SanityData {
  const d = ortoqueratologiaContent;
  return {
    _id: "fallback-ortoqueratologia",
    _type: "page",
    title: d.mainTitle,
    path: "/servicios/ortoqueratologia",
    seo: {
      title: `${d.hero.title} | Óptica Suárez`,
      description: d.intro.description,
    },
    sections: [
      {
        _type: "sectionHero",
        _key: "fb-ok-hero",
        title: d.hero.title,
        subtitle: d.hero.subtitle,
        image: d.hero.image ? { url: d.hero.image } : undefined,
      },
      {
        _type: "sectionText",
        _key: "fb-ok-intro",
        title: d.intro.title,
        content: makeTextBlock(d.intro.description, "fb-ok-intro-b"),
      },
      {
        _type: "sectionFeatures",
        _key: "fb-ok-benefits",
        title: d.benefits.title,
        items: d.benefits.items.map(
          (b: { title: string; description: string }, i: number) => ({
            _key: `fb-ok-ben-${i}`,
            title: b.title,
            description: b.description,
          })
        ),
      },
      {
        _type: "sectionProcessSteps",
        _key: "fb-ok-process",
        title: d.process.title,
        items: d.process.steps.map(
          (
            s: {
              step: string;
              title: string;
              description: string;
              image: string;
            },
            i: number
          ) => ({
            _type: "processStep",
            _key: `fb-ok-step-${i}`,
            stepNumber: Number(s.step),
            title: s.title,
            description: s.description,
            image: { url: s.image },
          })
        ),
      },
      {
        _type: "sectionAccordion",
        _key: "fb-ok-faq",
        title: d.faq.title,
        items: d.faq.items.map(
          (q: { question: string; answer: string }, i: number) => ({
            _key: `fb-ok-faq-${i}`,
            title: q.question,
            content: q.answer,
          })
        ),
      },
      {
        _type: "sectionCTA",
        _key: "fb-ok-cta",
        title: d.cta.title,
        description: d.cta.description,
        buttonText: d.cta.buttonText,
        buttonUrl: d.cta.buttonLink,
      },
    ],
  };
}
