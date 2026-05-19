import { describe, expect, it } from "vitest";
import { resolveTargetDatasets } from "./sanity-datasets";

describe("resolveTargetDatasets", () => {
  it("returns production and development by default", () => {
    expect(resolveTargetDatasets({})).toEqual(["production", "development"]);
  });

  it("uses SANITY_TARGET_DATASETS as a trimmed unique comma-separated list", () => {
    expect(
      resolveTargetDatasets({
        sanityTargetDatasets: "production, development,production",
      })
    ).toEqual(["production", "development"]);
  });

  it("falls back to SANITY_DATASET when SANITY_TARGET_DATASETS is blank", () => {
    expect(
      resolveTargetDatasets({
        sanityDataset: "staging",
        sanityTargetDatasets: " , ",
      })
    ).toEqual(["staging"]);
  });
});
