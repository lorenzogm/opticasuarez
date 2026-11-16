import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ReadingTest from "./reading-test";

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

function startAdultReading(age = "40") {
  fireEvent.click(screen.getByLabelText(/Un adolescente o adulto/));
  fireEvent.change(screen.getByLabelText("Edad"), { target: { value: age } });
  fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
}

describe("ReadingTest", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("asks who reads before continuing", () => {
    render(<ReadingTest />);

    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Elige quién va a leer."
    );
  });

  it("rejects an age outside the chosen range", () => {
    render(<ReadingTest />);

    fireEvent.click(screen.getByLabelText(/Un niño o niña/));
    fireEvent.change(screen.getByLabelText("Edad"), {
      target: { value: "30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("6 a 12 años");
  });

  it("hides the text until the reader starts", () => {
    render(<ReadingTest />);
    startAdultReading();

    const text = screen.getByTestId("reading-text");
    expect(text).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.queryByRole("button", { name: "He terminado" })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));

    expect(text).toHaveAttribute("aria-hidden", "false");
    expect(
      screen.getByRole("button", { name: "He terminado" })
    ).toBeInTheDocument();
  });

  it("shows an orientative result and offers a visual review", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const now = vi.spyOn(Date, "now");
    render(<ReadingTest />);
    startAdultReading();

    now.mockReturnValue(0);
    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));
    now.mockReturnValue(30_000);
    fireEvent.click(screen.getByRole("button", { name: "He terminado" }));

    fireEvent.click(
      screen.getByLabelText("A pequeños saltos", { selector: "input" })
    );
    fireEvent.click(
      screen.getByLabelText("Gafas, ejercicios o terapia visual", {
        selector: "input",
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));

    expect(
      screen.getByRole("heading", { name: "Tu resultado orientativo" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Comprensión: 2 de 2/)).toBeInTheDocument();
    expect(screen.getByText(/no es un diagnóstico/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Pedir revisión visual" })
    ).toHaveAttribute("href", "/cita");
    expect(
      screen.getByRole("link", { name: "Contacta con nosotros" })
    ).toHaveAttribute("href", "/contacto");
  });

  it("requires both comprehension answers", () => {
    render(<ReadingTest />);
    startAdultReading();
    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));
    fireEvent.click(screen.getByRole("button", { name: "He terminado" }));

    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));

    expect(
      within(screen.getByRole("alert")).getByText(/Responde las dos preguntas/)
    ).toBeInTheDocument();
  });

  it("lets the reader repeat the test", () => {
    render(<ReadingTest />);
    startAdultReading();
    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));
    fireEvent.click(screen.getByRole("button", { name: "He terminado" }));
    for (const input of screen
      .getAllByRole("radio")
      .filter((_, i) => i % 3 === 0)) {
      fireEvent.click(input);
    }
    fireEvent.click(screen.getByRole("button", { name: "Ver resultado" }));

    fireEvent.click(screen.getByRole("button", { name: "Repetir test" }));

    expect(
      screen.getByRole("heading", { name: "Test de lectura rápido" })
    ).toBeInTheDocument();
  });
});
