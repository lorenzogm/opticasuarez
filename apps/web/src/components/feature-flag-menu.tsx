import { useEffect, useState } from "react";
import type { FeatureFlags } from "~/lib/feature-flags";

const FLAG_LABELS: Record<keyof FeatureFlags, string> = {
  shopEnabled: "Tienda habilitada",
  ecommerce: "Ecommerce (carrito, checkout, pagos)",
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string) {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not available in all browsers; direct cookie access is intentional for feature flag overrides
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not available in all browsers; direct cookie access is intentional for feature flag overrides
  document.cookie = `${name}=; path=/; max-age=0`;
}

function getEffectiveValue(
  flagName: keyof FeatureFlags,
  sanityDefault: boolean
): boolean {
  const cookie = getCookie(`__ff_${flagName}`);
  if (cookie === "1") return true;
  if (cookie === "0") return false;
  return sanityDefault;
}

export default function FeatureFlagMenu({
  featureFlags,
}: {
  featureFlags: FeatureFlags;
}) {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "true") {
      localStorage.setItem("__ff_preview_enabled", "true");
      // Remove query param from URL without reload
      params.delete("preview");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "") +
        window.location.hash;
      window.history.replaceState({}, "", newUrl);
    }
    setEnabled(localStorage.getItem("__ff_preview_enabled") === "true");
  }, []);

  if (!enabled) return null;

  const flagNames = Object.keys(featureFlags) as (keyof FeatureFlags)[];

  function handleToggle(flagName: keyof FeatureFlags) {
    const current = getEffectiveValue(flagName, featureFlags[flagName]);
    setCookie(`__ff_${flagName}`, current ? "0" : "1");
    window.location.reload();
  }

  function handleReset() {
    for (const name of flagNames) {
      deleteCookie(`__ff_${name}`);
    }
    window.location.reload();
  }

  function handleExit() {
    localStorage.removeItem("__ff_preview_enabled");
    for (const name of flagNames) {
      deleteCookie(`__ff_${name}`);
    }
    window.location.reload();
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        aria-label="Abrir menú de feature flags"
        className="fixed right-4 bottom-4 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white text-xl shadow-lg transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        type="button"
      >
        ⚙️
      </button>

      {/* Panel */}
      {open && (
        <div
          aria-label="Feature flags"
          className="fixed right-4 bottom-20 z-[9999] w-80 rounded-lg border border-gray-200 bg-white shadow-2xl"
          role="dialog"
        >
          <div className="border-gray-200 border-b px-4 py-3">
            <h2 className="font-semibold text-gray-900 text-sm">
              Feature Flags
            </h2>
            <p className="text-gray-500 text-xs">
              Los cambios recargan la página
            </p>
          </div>

          <div className="divide-y divide-gray-100 px-4 py-2">
            {flagNames.map((name) => {
              const effective = getEffectiveValue(name, featureFlags[name]);
              const hasOverride = getCookie(`__ff_${name}`) !== undefined;
              return (
                <div
                  className="flex items-center justify-between py-3"
                  key={name}
                >
                  <div>
                    <span className="block font-medium text-gray-800 text-sm">
                      {FLAG_LABELS[name] ?? name}
                    </span>
                    {hasOverride && (
                      <span className="text-amber-600 text-xs">
                        override activo
                      </span>
                    )}
                  </div>
                  <button
                    aria-checked={effective}
                    aria-label={`${effective ? "Desactivar" : "Activar"} ${FLAG_LABELS[name] ?? name}`}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${effective ? "bg-blue-600" : "bg-gray-200"}`}
                    onClick={() => handleToggle(name)}
                    role="switch"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ${effective ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 border-gray-200 border-t px-4 py-3">
            <button
              className="flex-1 rounded bg-gray-100 px-3 py-1.5 font-medium text-gray-700 text-xs transition hover:bg-gray-200"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
            <button
              className="flex-1 rounded bg-red-100 px-3 py-1.5 font-medium text-red-700 text-xs transition hover:bg-red-200"
              onClick={handleExit}
              type="button"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </>
  );
}
