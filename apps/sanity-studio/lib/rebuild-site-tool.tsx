import { useCallback, useState } from "react";

type Status = "idle" | "confirming" | "loading" | "success" | "error";

export default function RebuildSiteTool() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // biome-ignore lint/suspicious/noExplicitAny: Sanity Studio injects env vars at build time
  const githubToken = (import.meta as any).env
    ?.SANITY_STUDIO_GITHUB_DEPLOY_TOKEN;

  const handleRebuild = useCallback(async () => {
    if (!githubToken) {
      setStatus("error");
      setErrorMessage(
        "SANITY_STUDIO_GITHUB_DEPLOY_TOKEN no está configurado. Contacta con el administrador."
      );
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(
        "https://api.github.com/repos/lorenzogm/opticasuarez/actions/workflows/web-vercel-deploy.yml/dispatches",
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${githubToken}`,
          },
          body: JSON.stringify({ ref: "main" }),
        }
      );
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido");
    }
  }, [githubToken]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Reconstruir sitio web
        </h1>
        <p
          style={{
            color: "#666",
            marginBottom: "2rem",
            fontSize: "0.95rem",
          }}
        >
          Esto lanza una nueva compilación completa del sitio web en Vercel.
          Todos los contenidos publicados se regenerarán. El proceso puede
          tardar unos minutos.
        </p>

        {status === "idle" && (
          <button
            onClick={() => setStatus("confirming")}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
            type="button"
          >
            Reconstruir sitio
          </button>
        )}

        {status === "confirming" && (
          <div>
            <p
              style={{
                color: "#b45309",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ¿Estás seguro? Se reconstruirán todas las páginas del sitio web.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                onClick={handleRebuild}
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#dc2626",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                type="button"
              >
                Sí, reconstruir
              </button>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#374151",
                  backgroundColor: "#e5e7eb",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {status === "loading" && (
          <p style={{ color: "#2563eb", fontWeight: 600 }}>
            Enviando solicitud de reconstrucción…
          </p>
        )}

        {status === "success" && (
          <div>
            <p
              style={{
                color: "#16a34a",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              ✓ Reconstrucción iniciada. El sitio se actualizará en unos
              minutos.
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.9rem",
                color: "#374151",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
              type="button"
            >
              Aceptar
            </button>
          </div>
        )}

        {status === "error" && (
          <div>
            <p
              style={{
                color: "#dc2626",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              ✗ Error al reconstruir
            </p>
            <p
              style={{
                color: "#666",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              {errorMessage}
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "0.9rem",
                color: "#374151",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
              type="button"
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
