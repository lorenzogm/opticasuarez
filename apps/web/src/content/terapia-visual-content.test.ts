import { describe, expect, it } from "vitest";
import terapiaVisual from "../../../../content/json/terapia-visual.json" with {
  type: "json",
};

describe("terapia visual content", () => {
  it("includes a home and school warning signs section for parents and teachers", () => {
    expect(terapiaVisual.symptoms.title).toBe(
      "SÍNTOMAS DETECTABLES EN CASA Y EL COLEGIO"
    );
    expect(terapiaVisual.symptoms.items).toEqual(
      expect.arrayContaining([
        "Se acerca demasiado al papel al leer o escribir.",
        "Se salta líneas o usa el dedo para no perderse al leer.",
        "Termina el día con fatiga visual, irritación o picor de ojos.",
        "Presenta dolores de cabeza durante o después del estudio.",
        "Baja su rendimiento escolar pese a dedicar tiempo al estudio.",
      ])
    );
  });

  it("details the key visual problems treated with dedicated blocks", () => {
    expect(terapiaVisual.conditions.title).toBe(
      "PROBLEMAS VISUALES QUE TRATAMOS"
    );
    expect(terapiaVisual.conditions.items).toHaveLength(4);
    expect(terapiaVisual.conditions.items.map((item) => item.title)).toEqual([
      "Ambliopía (Ojo Vago)",
      "Estrabismos y microestrabismos",
      "Problemas de acomodación (enfoque)",
      "Disfunciones binoculares y de motilidad ocular",
    ]);
    for (const item of terapiaVisual.conditions.items) {
      expect(item.description.length).toBeGreaterThan(80);
    }
  });

  it("includes the specialized facilities section for the Bulevar center", () => {
    expect(terapiaVisual.installations.title).toBe("INSTALACIONES");
    expect(terapiaVisual.installations.description).toContain(
      "sala especializada de más de 40m²"
    );
    expect(terapiaVisual.installations.description).toContain("Bulevar");
    expect(terapiaVisual.installations.description).toContain(
      "tecnología de vanguardia"
    );
  });
});
