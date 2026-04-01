import { describe, expect, it } from "vitest";
import { resolveFeatureFlags } from "./feature-flags";

function mockCookieReader(
  cookies: Record<string, string>
): (name: string) => string | undefined {
  return (name: string) => cookies[name];
}

describe("resolveFeatureFlags", () => {
  const noCookies = mockCookieReader({});

  it("returns Sanity defaults when no cookies are set", () => {
    const result = resolveFeatureFlags(
      { shopEnabled: true, ecommerce: false },
      noCookies
    );
    expect(result).toEqual({ shopEnabled: true, ecommerce: false });
  });

  it("defaults to false when Sanity values are missing", () => {
    const result = resolveFeatureFlags({}, noCookies);
    expect(result).toEqual({ shopEnabled: false, ecommerce: false });
  });

  it("overrides shopEnabled to true via cookie", () => {
    const reader = mockCookieReader({ __ff_shopEnabled: "1" });
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: false },
      reader
    );
    expect(result.shopEnabled).toBe(true);
  });

  it("overrides shopEnabled to false via cookie", () => {
    const reader = mockCookieReader({ __ff_shopEnabled: "0" });
    const result = resolveFeatureFlags(
      { shopEnabled: true, ecommerce: false },
      reader
    );
    expect(result.shopEnabled).toBe(false);
  });

  it("overrides ecommerce to true via cookie", () => {
    const reader = mockCookieReader({ __ff_ecommerce: "1" });
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: false },
      reader
    );
    expect(result.ecommerce).toBe(true);
  });

  it("overrides ecommerce to false via cookie", () => {
    const reader = mockCookieReader({ __ff_ecommerce: "0" });
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: true },
      reader
    );
    expect(result.ecommerce).toBe(false);
  });

  it("applies dependency: ecommerce true forces shopEnabled true", () => {
    const reader = mockCookieReader({ __ff_ecommerce: "1" });
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: false },
      reader
    );
    expect(result.ecommerce).toBe(true);
    expect(result.shopEnabled).toBe(true);
  });

  it("applies both cookie overrides with dependency logic", () => {
    const reader = mockCookieReader({
      __ff_shopEnabled: "0",
      __ff_ecommerce: "1",
    });
    // shopEnabled cookie says "0" but ecommerce dependency overrides it to true
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: false },
      reader
    );
    expect(result.ecommerce).toBe(true);
    expect(result.shopEnabled).toBe(true);
  });

  it("ignores invalid cookie values", () => {
    const reader = mockCookieReader({ __ff_shopEnabled: "yes" });
    const result = resolveFeatureFlags(
      { shopEnabled: false, ecommerce: false },
      reader
    );
    expect(result.shopEnabled).toBe(false);
  });
});
