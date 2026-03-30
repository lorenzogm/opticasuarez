import { describe, expect, it } from "vitest";
import { cn, getBaseUrl } from "./utils";

describe("cn", () => {
  it("should merge simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes via clsx", () => {
    expect(cn("base", false, "extra")).toBe("base extra");
  });

  it("should merge conflicting Tailwind classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should merge conflicting text colors", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should handle undefined and null", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
  });

  it("should handle array inputs", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("getBaseUrl", () => {
  it("should return default URL when env not set", () => {
    const original = import.meta.env.VITE_BASE_URL;
    import.meta.env.VITE_BASE_URL = "";
    expect(getBaseUrl()).toBe("https://opticasuarezjaen.es");
    import.meta.env.VITE_BASE_URL = original;
  });

  it("should strip trailing slashes", () => {
    const original = import.meta.env.VITE_BASE_URL;
    import.meta.env.VITE_BASE_URL = "https://example.com///";
    expect(getBaseUrl()).toBe("https://example.com");
    import.meta.env.VITE_BASE_URL = original;
  });

  it("should return env URL when set", () => {
    const original = import.meta.env.VITE_BASE_URL;
    import.meta.env.VITE_BASE_URL = "https://staging.example.com";
    expect(getBaseUrl()).toBe("https://staging.example.com");
    import.meta.env.VITE_BASE_URL = original;
  });
});
