import { describe, expect, it } from "vitest";
import homepage from "./homepage.json" with { type: "json" };

describe("homepage content", () => {
  it("does not include the deprecated top-level contact block", () => {
    expect(homepage).not.toHaveProperty("contact");
  });
});
