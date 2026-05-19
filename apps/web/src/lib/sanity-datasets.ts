interface ResolveTargetDatasetsInput {
  sanityDataset?: string;
  sanityTargetDatasets?: string;
}

function parseDatasets(value: string): string[] {
  return [
    ...new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    ),
  ];
}

export function resolveTargetDatasets({
  sanityDataset,
  sanityTargetDatasets,
}: ResolveTargetDatasetsInput): string[] {
  if (sanityTargetDatasets) {
    const parsed = parseDatasets(sanityTargetDatasets);
    if (parsed.length > 0) {
      return parsed;
    }
  }

  if (sanityDataset) {
    return [sanityDataset];
  }

  return ["production", "development"];
}
