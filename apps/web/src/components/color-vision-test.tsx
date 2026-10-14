import { useEffect, useRef, useState } from "react";
import {
  COLOR_PLATES,
  drawColorPlate,
  evaluateColorVisionAnswers,
} from "~/lib/color-vision-test";
import { Button } from "./button";

export default function ColorVisionTest() {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<"intro" | "test" | "result">("intro");
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [canvasAvailable, setCanvasAvailable] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const plate = COLOR_PLATES[answers.length];

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (phase === "test" && canvasRef.current && plate) {
      setCanvasAvailable(drawColorPlate(canvasRef.current, plate));
      inputRef.current?.focus();
    } else if (phase === "result") {
      headingRef.current?.focus();
    }
  }, [phase, plate]);

  function submit(value: string) {
    if (!canvasAvailable || phase !== "test") {
      return;
    }
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);
    setAnswer("");
    if (nextAnswers.length === COLOR_PLATES.length) {
      setPhase("result");
    }
  }

  function restart() {
    setAnswers([]);
    setAnswer("");
    setCanvasAvailable(true);
    setPhase("test");
  }

  const result =
    phase === "result" ? evaluateColorVisionAnswers(answers) : null;

  return (
    <section
      aria-labelledby="color-test-heading"
      className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <h2
        className="font-bold text-2xl text-gray-900"
        id="color-test-heading"
        ref={headingRef}
        tabIndex={-1}
      >
        {phase === "result"
          ? "Tu resultado"
          : "Test rápido de visión del color"}
      </h2>

      {phase === "intro" && (
        <div className="mt-4 space-y-4 text-gray-700">
          <p>
            Verás seis láminas hechas de puntos de colores. Escribe las cifras
            que distingas o pulsa «No veo ningún número». No se trata de
            adivinar.
          </p>
          <h3 className="font-semibold text-gray-900">Antes de empezar</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ajusta el brillo de la pantalla para verla con comodidad.</li>
            <li>Desactiva el modo noche y los filtros de color o luz azul.</li>
            <li>Utiliza luz natural o blanca y evita los reflejos.</li>
            <li>
              Si usas gafas o lentillas, déjatelas puestas, salvo que tengan
              filtros de color.
            </li>
            <li>Responde sin acercarte a la pantalla.</li>
          </ul>
          <Button disabled={!ready} onClick={restart} size="lg" type="button">
            Empezar el test
          </Button>
          <noscript>
            <p>
              Activa JavaScript para realizar el test o contacta con nosotros
              para una revisión profesional.
            </p>
          </noscript>
        </div>
      )}

      {phase === "test" && (
        <div className="mt-4">
          <p aria-live="polite" className="text-gray-600 text-sm">
            Lámina {answers.length + 1} de {COLOR_PLATES.length}
          </p>
          <progress
            aria-label="Progreso del test"
            className="mt-2 h-2 w-full accent-blue-900"
            max={COLOR_PLATES.length}
            value={answers.length}
          />
          <div className="my-4 flex justify-center rounded-xl bg-[#e6e6e4] p-3">
            <canvas
              aria-label={`Lámina ${answers.length + 1}: puntos de colores con números escondidos`}
              className="aspect-square h-auto w-full max-w-80"
              height={320}
              ref={canvasRef}
              role="img"
              width={320}
            />
          </div>
          {canvasAvailable ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (answer) {
                  submit(answer);
                } else {
                  inputRef.current?.focus();
                }
              }}
            >
              <label
                className="block font-semibold text-gray-900"
                htmlFor="color-test-answer"
              >
                ¿Qué número ves?
              </label>
              <input
                aria-describedby="color-test-hint"
                autoComplete="off"
                className="mt-2 w-full rounded-lg border-2 border-gray-300 p-3 text-center text-2xl focus-visible:outline-2 focus-visible:outline-blue-900"
                id="color-test-answer"
                inputMode="numeric"
                maxLength={2}
                onChange={(event) =>
                  setAnswer(event.target.value.replace(/\D/g, "").slice(0, 2))
                }
                pattern="[0-9]*"
                ref={inputRef}
                type="text"
                value={answer}
              />
              <p className="mt-2 text-gray-600 text-sm" id="color-test-hint">
                Escribe solo las cifras que veas (una o dos).
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button size="lg" type="submit">
                  Responder
                </Button>
                <Button
                  className="h-auto min-h-11 whitespace-normal"
                  onClick={() => submit("")}
                  type="button"
                  variant="outline"
                >
                  No veo ningún número
                </Button>
              </div>
            </form>
          ) : (
            <p role="alert">
              No se pueden mostrar las láminas en este navegador. Prueba con
              otro navegador o pide una revisión en Óptica Suárez.
            </p>
          )}
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-4 text-gray-700">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900">{result.title}</h3>
            <p className="mt-2">{result.text}</p>
            <p className="mt-2">
              Coincidencias: {result.score} de {COLOR_PLATES.length}.
            </p>
          </div>
          <p>
            {result.level === "complete"
              ? "Si te pica la curiosidad o tienes dudas sobre cómo percibes los colores, podemos ayudarte."
              : "Si has tenido dificultades, te recomendamos comprobar tu visión del color con pruebas profesionales en Óptica Suárez."}
          </p>
          <Button onClick={restart} size="lg" type="button" variant="outline">
            Repetir el test
          </Button>
          <h3 className="font-semibold text-gray-900">Tus respuestas</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-gray-200 border-b">
                <th className="py-2" scope="col">
                  Lámina
                </th>
                <th scope="col">Tu respuesta</th>
                <th scope="col">Esperada</th>
              </tr>
            </thead>
            <tbody>
              {COLOR_PLATES.map((item, index) => (
                <tr className="border-gray-200 border-b" key={item.answer}>
                  <th className="py-2 font-normal" scope="row">
                    {index + 1}
                  </th>
                  <td>{answers[index] || "No veo ningún número"}</td>
                  <td>{item.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 rounded-lg border-amber-600 border-l-4 bg-amber-50 p-4 text-gray-800 text-sm">
        Esta actividad utiliza láminas generadas inspiradas en Ishihara, no
        láminas clínicas validadas. Es orientativa: no diagnostica ni descarta
        daltonismo, no determina su tipo o grado y no evalúa todas las
        alteraciones del color. La pantalla y la iluminación pueden cambiar los
        resultados. No sustituye un examen profesional.
      </p>
      <p className="mt-3 text-gray-600 text-sm">
        Tus respuestas se procesan solo en tu dispositivo: no se guardan ni se
        envían.
      </p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a
          className="inline-flex min-h-11 items-center rounded-md bg-blue-900 px-4 py-2 font-semibold text-sm text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-blue-900 focus-visible:outline-offset-2"
          href="/cita"
        >
          Pedir cita para una revisión
        </a>
        <a
          className="inline-flex min-h-11 items-center text-blue-900 underline underline-offset-4"
          href="/contacto"
        >
          Contactar con Óptica Suárez
        </a>
      </div>
    </section>
  );
}
