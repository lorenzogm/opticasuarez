import { afterEach, describe, expect, it, vi } from "vitest";
import {
  COLOR_PLATES,
  drawColorPlate,
  evaluateColorVisionAnswers,
} from "./color-vision-test";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const correctAnswers = COLOR_PLATES.map((plate) => plate.answer);

describe("evaluateColorVisionAnswers", () => {
  it("preserves the six original answers and seeds", () => {
    expect(correctAnswers).toEqual(["12", "74", "29", "5", "45", "26"]);
    expect(COLOR_PLATES.map((plate) => plate.seed)).toEqual([
      11, 23, 37, 41, 53, 67,
    ]);
  });

  it("counts all six correct answers without a diagnostic conclusion", () => {
    const result = evaluateColorVisionAnswers(correctAnswers);
    expect(result).toMatchObject({
      level: "complete",
      score: 6,
      title: "Has identificado todas las láminas",
    });
    expect(result.text).toContain("no están validadas clínicamente");
  });

  it("invalidates a failed control even when all other answers are correct", () => {
    expect(
      evaluateColorVisionAnswers(["", ...correctAnswers.slice(1)])
    ).toMatchObject({
      level: "invalid",
      score: 5,
      title: "Resultado no válido",
    });
  });

  it("returns review for mixed answers with a valid control", () => {
    expect(
      evaluateColorVisionAnswers(["12", "70", "29", "8", "45", "26"])
    ).toMatchObject({
      level: "review",
      score: 4,
      title: "Has identificado algunas láminas de forma diferente",
    });
  });

  it("treats explicitly unseen plates as incorrect completed answers", () => {
    expect(
      evaluateColorVisionAnswers(["12", "", "", "", "", ""])
    ).toMatchObject({
      level: "review",
      score: 1,
    });
    expect(evaluateColorVisionAnswers(["", "", "", "", "", ""])).toMatchObject({
      level: "invalid",
      score: 0,
    });
  });

  it.each(["6", "2", ""])("does not classify a last answer of %j", (last) => {
    const result = evaluateColorVisionAnswers([
      ...correctAnswers.slice(0, 5),
      last,
    ]);
    expect(result).toMatchObject({ level: "review", score: 5 });
    expect(`${result.title} ${result.text}`).not.toMatch(
      /protán|deután|visión normal/i
    );
  });

  it("rejects missing, sparse, and excess answers", () => {
    for (const answers of [
      [],
      ["12"],
      correctAnswers.slice(0, 5),
      [...correctAnswers, "1"],
    ]) {
      expect(evaluateColorVisionAnswers(answers).level).toBe("invalid");
    }
    const sparse = new Array<string>(6);
    for (const [index, answer] of correctAnswers.entries()) {
      if (index !== 2) {
        sparse[index] = answer;
      }
    }
    expect(evaluateColorVisionAnswers(sparse)).toMatchObject({
      level: "invalid",
      score: 5,
    });
  });

  it("does not mutate answers", () => {
    const answers = Object.freeze([...correctAnswers]);
    evaluateColorVisionAnswers(answers);
    expect(answers).toEqual(correctAnswers);
  });
});

function drawingContext() {
  return {
    scale: vi.fn(),
    clearRect: vi.fn(),
    strokeText: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    getImageData: vi.fn(() => ({
      data: new Uint8ClampedArray(320 * 320 * 4),
    })),
    fillStyle: "",
  };
}

function mockCanvas(context: ReturnType<typeof drawingContext> | null) {
  return {
    width: 0,
    height: 0,
    getContext: vi.fn(() => context),
  } as unknown as HTMLCanvasElement;
}

describe("drawColorPlate", () => {
  it("returns false when the visible canvas context is unavailable", () => {
    expect(drawColorPlate(mockCanvas(null), COLOR_PLATES[0])).toBe(false);
  });

  it("returns false when a numeral mask context is unavailable", () => {
    const context = drawingContext();
    vi.spyOn(document, "createElement").mockReturnValue(mockCanvas(null));
    expect(drawColorPlate(mockCanvas(context), COLOR_PLATES[0])).toBe(false);
    expect(context.arc).not.toHaveBeenCalled();
  });

  it("returns false when accessing a context throws", () => {
    const canvas = mockCanvas(null);
    vi.spyOn(canvas, "getContext").mockImplementation(() => {
      throw new Error("Canvas unavailable");
    });
    expect(drawColorPlate(canvas, COLOR_PLATES[0])).toBe(false);
  });

  it("reproduces seeded circles, mask typography, and capped pixel density", () => {
    const context = drawingContext();
    const maskContext = drawingContext();
    const canvas = mockCanvas(context);
    const colors: string[] = [];
    context.fill.mockImplementation(() => {
      colors.push(context.fillStyle);
    });
    vi.stubGlobal("window", { devicePixelRatio: 3 });
    vi.spyOn(document, "createElement").mockReturnValue(
      mockCanvas(maskContext)
    );
    expect(drawColorPlate(canvas, COLOR_PLATES[5])).toBe(true);
    const firstDrawing = [...context.arc.mock.calls];
    expect(firstDrawing).toHaveLength(456);
    expect(firstDrawing[0]).toEqual([
      257.716_281_806_940_1, 148.914_719_920_700_63, 7, 0, 6.2832,
    ]);
    const firstColors = [...colors];
    expect(firstColors[0]).toBe("rgb(168,176,157)");
    expect(canvas.width).toBe(640);
    expect(canvas.height).toBe(640);
    expect(context.scale).toHaveBeenCalledWith(2, 2);
    expect(maskContext.strokeText).toHaveBeenNthCalledWith(1, "2", 96, 172.8);
    expect(maskContext.fillText).toHaveBeenNthCalledWith(2, "6", 224, 172.8);
    expect(maskContext).toMatchObject({
      font: "bold 210px Arial,Helvetica,sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      lineJoin: "round",
      lineWidth: 19,
    });
    context.arc.mockClear();
    colors.length = 0;
    expect(drawColorPlate(canvas, COLOR_PLATES[5])).toBe(true);
    expect(context.arc.mock.calls).toEqual(firstDrawing);
    expect(colors).toEqual(firstColors);
  });

  it.each([128, 129])(
    "uses the original mask alpha threshold of %i",
    (alpha) => {
      const context = drawingContext();
      const maskContext = drawingContext();
      maskContext.getImageData.mockReturnValue({
        data: new Uint8ClampedArray(320 * 320 * 4).fill(alpha),
      });
      vi.spyOn(document, "createElement").mockReturnValue(
        mockCanvas(maskContext)
      );
      const colors: string[] = [];
      context.fill.mockImplementation(() => {
        colors.push(context.fillStyle);
      });
      expect(drawColorPlate(mockCanvas(context), COLOR_PLATES[5])).toBe(true);
      expect(colors[0]).toBe(
        alpha === 128 ? "rgb(168,176,157)" : "rgb(214,92,69)"
      );
    }
  );

  it("can import and evaluate without browser globals", async () => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
    vi.resetModules();
    const module = await import("./color-vision-test");
    expect(module.evaluateColorVisionAnswers(correctAnswers).score).toBe(6);
    expect(
      module.drawColorPlate(mockCanvas(null), module.COLOR_PLATES[0])
    ).toBe(false);
  });
});
