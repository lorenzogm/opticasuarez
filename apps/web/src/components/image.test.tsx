import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Image from "./image";

describe("Image", () => {
  it("renders an img element with lazy loading by default", () => {
    const { container } = render(<Image alt="test" src="/images/test.jpg" />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("loading")).toBe("lazy");
  });

  it("renders with eager loading when priority is true", () => {
    const { container } = render(
      <Image alt="test" priority src="/images/test.jpg" />
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("loading")).toBe("eager");
  });

  it("sets fetchpriority=high when priority is true", () => {
    const { container } = render(
      <Image alt="test" priority src="/images/test.jpg" />
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("fetchpriority")).toBe("high");
  });

  it("does not set fetchpriority when priority is false", () => {
    const { container } = render(<Image alt="test" src="/images/test.jpg" />);
    const img = container.querySelector("img");
    expect(img?.getAttribute("fetchpriority")).toBeNull();
  });

  it("sets fetchpriority=high on external URL images when priority is true", () => {
    const { container } = render(
      <Image alt="test" priority src="https://cdn.example.com/image.jpg" />
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("fetchpriority")).toBe("high");
  });
});
