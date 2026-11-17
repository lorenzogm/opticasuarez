import { describe, expect, it } from "vitest";
import {
  countWords,
  evaluateReading,
  markerPosition,
  PASSAGES,
  pickPassage,
  referenceWpm,
  validateReaderProfile,
  wordsPerMinute,
} from "./reading-test";

describe("validateReaderProfile", () => {
  it("requires choosing who reads and a valid age", () => {
    expect(validateReaderProfile(null, 8)).toBe("Elige quién va a leer.");
    expect(validateReaderProfile("child", Number.NaN)).toBe(
      "Indica una edad entre 6 y 99 años."
    );
    expect(validateReaderProfile("adult", 120)).toBe(
      "Indica una edad entre 6 y 99 años."
    );
  });

  it("keeps each mode within its age range", () => {
    expect(validateReaderProfile("child", 13)).toContain("6 a 12 años");
    expect(validateReaderProfile("adult", 12)).toContain("menores de 13");
    expect(validateReaderProfile("child", 12)).toBe("");
    expect(validateReaderProfile("adult", 13)).toBe("");
  });
});

describe("pickPassage", () => {
  it("adapts the passage to the reader", () => {
    expect(pickPassage("child", 7)).toBe(PASSAGES.young);
    expect(pickPassage("child", 8)).toBe(PASSAGES.child);
    expect(pickPassage("adult", 40)).toBe(PASSAGES.adult);
  });
});

describe("reading speed", () => {
  it("counts words and computes words per minute", () => {
    expect(countWords(" uno  dos tres ")).toBe(3);
    expect(wordsPerMinute(120, 60_000)).toBe(120);
  });

  it("ignores implausibly short reading times", () => {
    expect(wordsPerMinute(60, 0)).toBe(1200);
  });

  it("gives age based references", () => {
    expect(referenceWpm(6)).toBe(40);
    expect(referenceWpm(17)).toBe(190);
    expect(referenceWpm(30)).toBe(210);
    expect(referenceWpm(70)).toBe(190);
  });
});

describe("evaluateReading", () => {
  const base = { age: 30, correctAnswers: 2, symptoms: 0 };

  it("is ok when speed and comprehension are as expected", () => {
    expect(evaluateReading({ ...base, wpm: 200 }).level).toBe("ok");
  });

  it("flags one slightly low indicator as something to watch", () => {
    expect(evaluateReading({ ...base, wpm: 140 }).level).toBe("mid");
    expect(
      evaluateReading({ ...base, wpm: 200, symptoms: 0, correctAnswers: 0 })
        .level
    ).toBe("mid");
  });

  it("recommends a review when several indicators add up", () => {
    expect(evaluateReading({ ...base, wpm: 80 }).level).toBe("bad");
    expect(
      evaluateReading({ ...base, wpm: 200, symptoms: 2, correctAnswers: 0 })
        .level
    ).toBe("bad");
  });

  it("penalises skimming far above the expected pace", () => {
    expect(evaluateReading({ ...base, wpm: 500 }).level).toBe("mid");
  });
});

describe("markerPosition", () => {
  it("keeps the marker inside the bar", () => {
    expect(markerPosition(0)).toBe(3);
    expect(markerPosition(0.8)).toBe(60);
    expect(markerPosition(5)).toBe(97);
  });
});
