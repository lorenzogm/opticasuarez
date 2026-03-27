import type { StructureBuilder } from "sanity/structure";

export function structure(S: StructureBuilder) {
  return S.list()
    .title("Contenido")
    .items([
      // Pages (composable)
      S.listItem()
        .title("Páginas")
        .child(S.documentTypeList("page").title("Páginas")),

      S.divider(),

      // Structured data
      S.listItem()
        .title("Servicios")
        .child(S.documentTypeList("service").title("Servicios")),

      S.listItem()
        .title("Artículos")
        .child(S.documentTypeList("blogPost").title("Artículos del blog")),

      S.listItem()
        .title("Ubicaciones")
        .child(S.documentTypeList("location").title("Ubicaciones")),

      S.listItem()
        .title("Equipo")
        .child(S.documentTypeList("teamMember").title("Miembros del equipo")),

      S.divider(),

      // Global settings
      S.listItem()
        .title("Configuración del sitio")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),

      S.divider(),

      // Legacy (hidden from main nav after migration)
      S.listItem()
        .title("⚠️ Legacy")
        .child(
          S.list()
            .title("Contenido antiguo")
            .items([
              S.listItem()
                .title("Página de inicio (legacy)")
                .id("homepage")
                .child(
                  S.document().schemaType("homepage").documentId("homepage")
                ),
              S.listItem()
                .title("Quiénes somos (legacy)")
                .id("aboutPage")
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage")
                ),
              S.listItem()
                .title("Contacto (legacy)")
                .id("contactPage")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                ),
              S.listItem()
                .title("Servicios vista general (legacy)")
                .id("serviciosOverview")
                .child(
                  S.document()
                    .schemaType("serviciosOverview")
                    .documentId("serviciosOverview")
                ),
              S.listItem()
                .title("Plan VEO (legacy)")
                .id("planVeoPage")
                .child(
                  S.document()
                    .schemaType("planVeoPage")
                    .documentId("planVeoPage")
                ),
              S.listItem()
                .title("Páginas de servicio (legacy)")
                .child(
                  S.documentTypeList("servicePage").title(
                    "Páginas de servicio (legacy)"
                  )
                ),
            ])
        ),
    ]);
}
