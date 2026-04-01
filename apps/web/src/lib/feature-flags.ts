import { getCookie } from "@tanstack/react-start/server";

export type FeatureFlags = {
  shopEnabled: boolean;
  ecommerce: boolean;
};

type CookieReader = (name: string) => string | undefined;

function readCookie(name: string): string | undefined {
  try {
    return getCookie(name) ?? undefined;
  } catch {
    return;
  }
}

export function resolveFeatureFlags(
  sanityFlags: Partial<FeatureFlags>,
  cookieReader: CookieReader = readCookie
): FeatureFlags {
  const resolved: FeatureFlags = {
    shopEnabled: sanityFlags.shopEnabled ?? false,
    ecommerce: sanityFlags.ecommerce ?? false,
  };

  const shopCookie = cookieReader("__ff_shopEnabled");
  if (shopCookie === "1") resolved.shopEnabled = true;
  else if (shopCookie === "0") resolved.shopEnabled = false;

  const ecommerceCookie = cookieReader("__ff_ecommerce");
  if (ecommerceCookie === "1") resolved.ecommerce = true;
  else if (ecommerceCookie === "0") resolved.ecommerce = false;

  if (resolved.ecommerce) {
    resolved.shopEnabled = true;
  }

  return resolved;
}
