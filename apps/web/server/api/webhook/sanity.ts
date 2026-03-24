// Nitro auto-imports: defineEventHandler, createError, getHeader
// biome-ignore lint/correctness/noUndeclaredVariables: Nitro auto-import
const handler = defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return { error: "Method not allowed" };
  }

  const token = process.env.GITHUB_DEPLOY_TOKEN;
  if (!token) {
    // biome-ignore lint/correctness/noUndeclaredVariables: Nitro auto-import
    throw createError({
      statusCode: 500,
      message: "GITHUB_DEPLOY_TOKEN not configured",
    });
  }

  // biome-ignore lint/correctness/noUndeclaredVariables: Nitro auto-import
  const secret = getHeader(event, "x-webhook-secret");
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    // biome-ignore lint/correctness/noUndeclaredVariables: Nitro auto-import
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const res = await fetch(
    "https://api.github.com/repos/lorenzogm/opticasuarez/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ event_type: "sanity-content-update" }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    // biome-ignore lint/correctness/noUndeclaredVariables: Nitro auto-import
    throw createError({
      statusCode: res.status,
      message: `GitHub dispatch failed: ${text}`,
    });
  }

  return { ok: true, message: "Deploy triggered" };
});

export default handler;
