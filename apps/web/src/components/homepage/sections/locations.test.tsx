import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Locations from "./locations";

afterEach(() => {
  cleanup();
});

describe("Locations", () => {
  it("links both store email addresses to mailto URLs", () => {
    render(
      <Locations
        locations={[
          {
            name: "Óptica Bulevar",
            image: "/images/homepage/locations/optica-bulevar.webp",
            address: "C. de Canarias, 6, 23009 Jaén",
            mapUrl: "https://maps.app.goo.gl/2G1sP6A3NzBFR9ZJ8",
            schedule: {
              weekdays: "Lunes a Viernes",
              weekdaysHours: "9:30 a 13:30 y 17:00 a 20:30",
              saturday: "Sábados",
              saturdayHours: "10:00 a 13:00",
            },
            phone: "953-093-062",
            phoneUrl: "tel:+34953093062",
            email: "bulevar@opticasuarezjaen.es",
            contactUrl: "/contacto",
          },
          {
            name: "Óptica Centro",
            image: "/images/homepage/locations/optica-centro.webp",
            address: "P.º de la Estación, 12, 23003 Jaén",
            mapUrl: "https://maps.app.goo.gl/akCsZJdQJUhNx6EP8",
            schedule: {
              weekdays: "Lunes a Viernes",
              weekdaysHours: "9:30 a 13:30 y 17:00 a 20:30",
              saturday: "Sábados",
              saturdayHours: "10:00 a 13:00",
            },
            phone: "953-223-180",
            phoneUrl: "tel:+34953223180",
            email: "centro@opticasuarezjaen.es",
            contactUrl: "/contacto",
          },
        ]}
        title="¿DÓNDE ESTAMOS?"
      />
    );

    expect(
      screen
        .getByRole("link", { name: "bulevar@opticasuarezjaen.es" })
        .getAttribute("href")
    ).toBe("mailto:bulevar@opticasuarezjaen.es");
    expect(
      screen
        .getByRole("link", { name: "centro@opticasuarezjaen.es" })
        .getAttribute("href")
    ).toBe("mailto:centro@opticasuarezjaen.es");
  });
});
