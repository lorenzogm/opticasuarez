import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NearVisionTest from "./near-vision-test";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    params?: { _splat?: string };
    to: string;
  }) => (
    <a href={to === "/$" ? `/${params?._splat}` : to} {...props}>
      {children}
    </a>
  ),
}));

describe("NearVisionTest", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("validates age before continuing", () => {
    render(<NearVisionTest />);

    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Indica una edad entre 6 y 99 años."
    );
  });

  it("tests both eyes and offers a visual review after showing an orientative result", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<NearVisionTest />);

    fireEvent.change(screen.getByLabelText("Tu edad"), {
      target: { value: "47" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));

    for (const eye of ["derecho", "izquierdo"]) {
      expect(
        screen.getByRole("heading", {
          name: `Ojo ${eye}${eye === "derecho" ? " (primero)" : ""}`,
        })
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Ya estoy listo" }));

      for (let answer = 0; answer < 16; answer += 1) {
        const test = screen.getByRole("region", {
          name: `Test del ojo ${eye}`,
        });
        const direction = test
          .querySelector("svg")
          ?.getAttribute("data-direction");
        const label = { R: "Derecha", D: "Abajo", L: "Izquierda", U: "Arriba" }[
          direction ?? "R"
        ];
        fireEvent.click(within(test).getByRole("button", { name: label }));
      }
    }

    expect(
      screen.getByRole("heading", { name: "Tu resultado orientativo" })
    ).toBeInTheDocument();
    expect(screen.getByText(/no es un diagnóstico/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Reservar una revisión visual" })
    ).toHaveAttribute("href", "/cita");
    expect(
      screen.getByRole("link", { name: "Contacta con nosotros" })
    ).toHaveAttribute("href", "/contacto");
  });
});
