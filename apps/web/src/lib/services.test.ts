import { describe, expect, it } from "vitest";
import { servicePages } from "./services";

describe("servicePages", () => {
  it("should contain 8 services", () => {
    expect(servicePages).toHaveLength(8);
  });

  it("should have no duplicate URLs", () => {
    const urls = servicePages.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("should have no duplicate names", () => {
    const names = servicePages.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("should have all URLs starting with /", () => {
    for (const service of servicePages) {
      expect(service.url).toMatch(/^\//);
    }
  });

  it("should have non-empty name for every service", () => {
    for (const service of servicePages) {
      expect(service.name.length).toBeGreaterThan(0);
    }
  });

  it("should have a description for every service", () => {
    for (const service of servicePages) {
      expect(service.description).toBeDefined();
      expect((service.description ?? "").length).toBeGreaterThan(0);
    }
  });

  it("should include known service names", () => {
    const names = servicePages.map((s) => s.name);
    expect(names).toContain("Examen Visual");
    expect(names).toContain("Terapia Visual");
    expect(names).toContain("Contactología");
    expect(names).toContain("Visión Pediátrica");
    expect(names).toContain("Control de Miopía");
    expect(names).toContain("Plan VEO");
  });

  it("should have no trailing slashes in URLs", () => {
    for (const service of servicePages) {
      if (service.url !== "/") {
        expect(service.url).not.toMatch(/\/$/);
      }
    }
  });
});
