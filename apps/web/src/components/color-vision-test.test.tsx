import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { COLOR_PLATES, drawColorPlate } from "~/lib/color-vision-test";
import ColorVisionTest from "./color-vision-test";

vi.mock("~/lib/color-vision-test", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("~/lib/color-vision-test")>();
  return { ...original, drawColorPlate: vi.fn() };
});

beforeEach(() => {
  vi.mocked(drawColorPlate).mockReturnValue(true);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function startTest() {
  render(<ColorVisionTest />);
  fireEvent.click(screen.getByRole("button", { name: "Empezar el test" }));
}

describe("ColorVisionTest", () => {
  it("disables start in server HTML until the client is ready", () => {
    const html = renderToString(<ColorVisionTest />);
    expect(html).toMatch(/<button[^>]*disabled=""/);
    render(<ColorVisionTest />);
    expect(
      screen.getByRole("button", { name: "Empezar el test" })
    ).toBeEnabled();
  });

  it("explains the limitations and links to appointment and contact pages", () => {
    render(<ColorVisionTest />);
    expect(screen.getByText(/no diagnostica ni descarta/)).toBeTruthy();
    expect(screen.getByText(/no se guardan ni se envían/)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Pedir cita para una revisión" })
    ).toHaveAttribute("href", "/cita");
    expect(
      screen.getByRole("link", { name: "Contactar con Óptica Suárez" })
    ).toHaveAttribute("href", "/contacto");
  });

  it("draws the first plate and prevents an empty response from advancing", () => {
    startTest();
    expect(drawColorPlate).toHaveBeenCalledWith(
      screen.getByRole("img"),
      COLOR_PLATES[0]
    );
    expect(screen.getByLabelText("¿Qué número ves?")).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Responder" }));
    expect(screen.getByText("Lámina 1 de 6")).toBeTruthy();
    expect(drawColorPlate).toHaveBeenCalledTimes(1);
  });

  it("accepts only two digits and advances through form submission", () => {
    startTest();
    const input = screen.getByLabelText("¿Qué número ves?");
    fireEvent.change(input, { target: { value: "a123" } });
    expect(input).toHaveValue("12");
    const form = screen
      .getByRole("button", { name: "Responder" })
      .closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);
    expect(screen.getByText("Lámina 2 de 6")).toBeTruthy();
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "1");
  });

  it("completes six plates, shows the answers, and resets on repeat", () => {
    startTest();
    for (const plate of COLOR_PLATES) {
      fireEvent.change(screen.getByLabelText("¿Qué número ves?"), {
        target: { value: plate.answer },
      });
      fireEvent.click(screen.getByRole("button", { name: "Responder" }));
    }
    expect(
      screen.getByRole("heading", {
        name: "Has identificado todas las láminas",
      })
    ).toBeTruthy();
    expect(screen.getByText("Coincidencias: 6 de 6.")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tu resultado" })).toHaveFocus();
    expect(screen.getAllByRole("row")).toHaveLength(7);

    fireEvent.click(screen.getByRole("button", { name: "Repetir el test" }));
    expect(screen.getByText("Lámina 1 de 6")).toBeTruthy();
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "0");
    expect(screen.getByLabelText("¿Qué número ves?")).toHaveValue("");
    for (const _plate of COLOR_PLATES) {
      fireEvent.click(
        screen.getByRole("button", { name: "No veo ningún número" })
      );
    }
    expect(screen.getByText("Resultado no válido")).toBeTruthy();
    expect(screen.getByText("Coincidencias: 0 de 6.")).toBeTruthy();
  });

  it("recommends a professional review for differing responses", () => {
    startTest();
    fireEvent.change(screen.getByLabelText("¿Qué número ves?"), {
      target: { value: "12" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Responder" }));
    for (const _plate of COLOR_PLATES.slice(1)) {
      fireEvent.click(
        screen.getByRole("button", { name: "No veo ningún número" })
      );
    }
    expect(
      screen.getByText("Has identificado algunas láminas de forma diferente")
    ).toBeTruthy();
    expect(screen.getByText(/comprobar tu visión del color/)).toBeTruthy();
  });

  it("does not score a test when canvas rendering is unavailable", () => {
    vi.mocked(drawColorPlate).mockReturnValue(false);
    startTest();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "No se pueden mostrar las láminas"
    );
    expect(screen.queryByRole("button", { name: "Responder" })).toBeNull();
    expect(
      screen.getByRole("link", { name: "Pedir cita para una revisión" })
    ).toHaveAttribute("href", "/cita");
  });
});
