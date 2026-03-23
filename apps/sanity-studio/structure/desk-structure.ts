import type { StructureBuilder } from "sanity/structure";

export function structure(S: StructureBuilder) {
  return S.list()
    .title("Contenido")
    .items([
      // Singletons
      S.listItem()
        .title("Página de inicio")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),

      S.listItem()
        .title("Quiénes somos")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

      S.listItem()
        .title("Contacto")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),

      S.listItem()
        .title("Servicios (vista general)")
        .id("serviciosOverview")
        .child(
          S.document()
            .schemaType("serviciosOverview")
            .documentId("serviciosOverview")
        ),

      S.listItem()
        .title("Plan VEO")
        .id("planVeoPage")
        .child(
          S.document().schemaType("planVeoPage").documentId("planVeoPage")
        ),

      S.listItem()
        .title("Configuración del sitio")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),

      S.divider(),

      // Collections
      S.listItem()
        .title("Páginas de servicio")
        .child(S.documentTypeList("servicePage").title("Páginas de servicio")),

      S.listItem()
        .title("Blog")
        .child(S.documentTypeList("blogPost").title("Artículos del blog")),

      S.divider(),

      // Reusable content
      S.listItem()
        .title("Ubicaciones")
        .child(S.documentTypeList("location").title("Ubicaciones")),

      S.listItem()
        .title("Equipo")
        .child(S.documentTypeList("teamMember").title("Miembros del equipo")),
    ]);
}
