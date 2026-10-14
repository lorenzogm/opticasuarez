import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { buildHeadFromSanitySeo } from "~/lib/seo";

const questions = [
  "¿Sientes cansancio o tensión en los ojos al leer o usar el móvil?",
  "¿Te duele la cabeza después de leer o de usar pantallas?",
  "¿Ves doble o borroso cuando miras de cerca?",
  "¿Se mueven, bailan o se juntan las letras al leer?",
  "¿Pierdes el sitio o te saltas líneas al leer?",
  "¿Te cuesta concentrarte al leer o te entra sueño enseguida?",
  "¿Tienes que releer porque no te enteras de lo que has leído?",
  "¿Cierras o tapas un ojo para ver mejor?",
  "¿Te mareas en coche o con el movimiento de pantallas?",
  "¿Alguien te ha comentado que un ojo se te desvía o se te va?",
];

const answers = ["Nunca", "A veces", "Con frecuencia", "Casi siempre"];

const convergenceAnswers = [
  "Veo la letra única hasta casi tocar la nariz",
  "Se desdobla o un ojo se desvía a menos de 5 cm",
  "Se desdobla o un ojo se desvía entre 5 y 10 cm",
  "Se desdobla o un ojo se desvía a más de 10 cm, o no consigo mantenerla única",
];

type ResultLevel = "ok" | "review" | "recommended";
type ColorFilter = "cyan" | "green";
type Point = { x: number; y: number };

const resultCopy: Record<
  ResultLevel,
  { heading: string; description: string }
> = {
  ok: {
    heading: "Sin señales relevantes en este test",
    description:
      "Tus respuestas no indican problemas llamativos. Aun así, este test no descarta dificultades y no sustituye una revisión visual profesional.",
  },
  review: {
    heading: "Conviene valorar una revisión",
    description:
      "Has indicado algunas señales que merece la pena comentar con un profesional de la visión binocular.",
  },
  recommended: {
    heading: "Te recomendamos una revisión",
    description:
      "Tus respuestas muestran varias señales que conviene valorar en una exploración optométrica completa. Este resultado no es un diagnóstico.",
  },
};

function createAlignmentRound() {
  const ring = {
    x: 120 + Math.random() * 760,
    y: 100 + Math.random() * 400,
  };
  let cross: Point;

  do {
    cross = {
      x: 30 + Math.random() * 940,
      y: 30 + Math.random() * 540,
    };
  } while (Math.hypot(cross.x - ring.x, cross.y - ring.y) < 220);

  return { ring, cross };
}

export const Route = createFileRoute("/test-forias")({
  head: () =>
    buildHeadFromSanitySeo({
      path: "/test-forias",
      fallback: {
        title: "Test de forias y alineamiento ocular | Óptica Suárez",
        description:
          "Haz una prueba orientativa de visión binocular y conoce qué son las forias, sus síntomas y cuándo consultar con un optometrista en Jaén.",
        keywords:
          "test forias, alineamiento ocular, visión binocular, foria, optometría Jaén",
      },
    }),
  component: TestForiasPage,
});

function TestForiasPage() {
  const [screen, setScreen] = useState<
    | "intro"
    | "questions"
    | "convergence"
    | "symptom-result"
    | "alignment-prep"
    | "alignment"
    | "alignment-result"
  >("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [symptomScore, setSymptomScore] = useState(0);
  const [reportedEyeTurn, setReportedEyeTurn] = useState(false);
  const [resultLevel, setResultLevel] = useState<ResultLevel>("ok");
  const [colorFilter, setColorFilter] = useState<ColorFilter>("cyan");
  const [roundNumber, setRoundNumber] = useState(0);
  const [alignmentRound, setAlignmentRound] = useState({
    ring: { x: 720, y: 300 },
    cross: { x: 220, y: 300 },
  });
  const [unableToSeeFigures, setUnableToSeeFigures] = useState(false);
  const [dragging, setDragging] = useState(false);

  function beginSymptoms() {
    setQuestionIndex(0);
    setSymptomScore(0);
    setReportedEyeTurn(false);
    setScreen("questions");
  }

  function answerSymptom(answerIndex: number) {
    const nextScore = symptomScore + answerIndex;
    const nextReportedEyeTurn =
      reportedEyeTurn || (questionIndex === 9 && answerIndex > 0);

    setSymptomScore(nextScore);
    setReportedEyeTurn(nextReportedEyeTurn);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreen("convergence");
    }
  }

  function showSymptomResult(convergenceIndex: number) {
    const level =
      symptomScore >= 17 ||
      convergenceIndex === 3 ||
      (reportedEyeTurn && symptomScore >= 9)
        ? "recommended"
        : symptomScore >= 9 || reportedEyeTurn || convergenceIndex === 2
          ? "review"
          : "ok";

    setResultLevel(level);
    setScreen("symptom-result");
  }

  function startAlignment() {
    setRoundNumber(0);
    setUnableToSeeFigures(false);
    setAlignmentRound(createAlignmentRound());
    setScreen("alignment");
  }

  function updateCross(clientX: number, clientY: number, svg: SVGSVGElement) {
    const bounds = svg.getBoundingClientRect();
    setAlignmentRound((current) => ({
      ...current,
      cross: {
        x: Math.max(
          0,
          Math.min(1000, ((clientX - bounds.left) / bounds.width) * 1000)
        ),
        y: Math.max(
          0,
          Math.min(600, ((clientY - bounds.top) / bounds.height) * 600)
        ),
      },
    }));
  }

  function finishAlignment(unableToSee = false) {
    setUnableToSeeFigures(unableToSee);
    setScreen("alignment-result");
  }

  function moveCross(direction: "up" | "down" | "left" | "right") {
    const movement = {
      up: { x: 0, y: -20 },
      down: { x: 0, y: 20 },
      left: { x: -20, y: 0 },
      right: { x: 20, y: 0 },
    }[direction];

    setAlignmentRound((current) => ({
      ...current,
      cross: {
        x: Math.max(0, Math.min(1000, current.cross.x + movement.x)),
        y: Math.max(0, Math.min(600, current.cross.y + movement.y)),
      },
    }));
  }

  function nextAlignmentRound() {
    if (roundNumber === 5) {
      finishAlignment();
      return;
    }

    setRoundNumber(roundNumber + 1);
    setAlignmentRound(createAlignmentRound());
  }

  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-semibold text-blue-700 text-sm uppercase tracking-widest">
          Salud visual · Visión binocular
        </p>
        <h1 className="mt-3 font-bold text-3xl text-gray-900 sm:text-4xl">
          Test de forias y alineamiento ocular
        </h1>
        <p className="mt-4 max-w-3xl text-gray-700 text-lg">
          Comprueba de forma orientativa cómo trabajan tus ojos en equipo. La
          prueba dura unos minutos y no guarda ni envía tus respuestas.
        </p>
      </section>

      <section className="mx-auto grid max-w-4xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <article className="space-y-5 text-gray-700">
          <div>
            <h2 className="font-semibold text-gray-900 text-xl">
              ¿Qué es una foria?
            </h2>
            <p className="mt-2">
              Una foria es una tendencia de un ojo a desviarse cuando ambos ojos
              no están fusionando una imagen. Normalmente, el sistema visual
              compensa esa tendencia para mantener una visión única y cómoda.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-xl">
              Síntomas y revisión
            </h2>
            <p className="mt-2">
              Cuando la coordinación resulta difícil pueden aparecer cansancio
              visual, dolor de cabeza, visión doble o molestias al leer. En
              niños, las dificultades visuales pueden afectar a la comodidad al
              leer y aprender; una valoración profesional ayuda a entender su
              causa.
            </p>
          </div>
          <p className="rounded-xl bg-blue-50 p-4 text-sm">
            Este test es solo orientativo: no diagnostica ni sustituye una
            exploración visual. Si tienes síntomas, consulta con un profesional
            de la visión.
          </p>
        </article>

        <div className="rounded-2xl border border-gray-200 p-5 shadow-sm sm:p-7">
          {screen === "intro" && (
            <div>
              <h2 className="font-semibold text-2xl text-gray-900">
                Test visual rápido
              </h2>
              <p className="mt-3 text-gray-700">
                ¿Tienes gafas con un filtro rojo y otro cian o verde? Si no,
                responde unas preguntas sobre tus síntomas.
              </p>
              <div className="mt-5 space-y-3">
                <button
                  className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
                  onClick={beginSymptoms}
                  type="button"
                >
                  No tengo gafas de colores
                </button>
                <button
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    setColorFilter("cyan");
                    setScreen("alignment-prep");
                  }}
                  type="button"
                >
                  Tengo gafas rojo/cian
                </button>
                <button
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    setColorFilter("green");
                    setScreen("alignment-prep");
                  }}
                  type="button"
                >
                  Tengo gafas rojo/verde
                </button>
              </div>
              <p className="mt-4 text-gray-600 text-sm">
                En las gafas con filtro de color, el rojo debe quedar en el ojo
                derecho.
              </p>
            </div>
          )}

          {screen === "questions" && (
            <div>
              <Progress value={(questionIndex / questions.length) * 100} />
              <p className="mt-4 text-gray-600 text-sm">
                Pregunta {questionIndex + 1} de {questions.length}
              </p>
              <h2 className="mt-3 font-semibold text-gray-900 text-xl">
                {questions[questionIndex]}
              </h2>
              <div className="mt-5 space-y-2">
                {answers.map((answer, index) => (
                  <button
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-gray-900 hover:bg-gray-50"
                    key={answer}
                    onClick={() => answerSymptom(index)}
                    type="button"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen === "convergence" && (
            <div>
              <Progress value={95} />
              <h2 className="mt-4 font-semibold text-gray-900 text-xl">
                Prueba de convergencia
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-gray-700">
                <li>Sostén el móvil con el brazo estirado.</li>
                <li>Mira fijamente la letra y acércala despacio a tu nariz.</li>
                <li>
                  Detente cuando la veas doble o notes que un ojo se desvía.
                </li>
              </ol>
              <p className="my-4 rounded-lg border border-gray-300 border-dashed py-3 text-center font-bold text-3xl text-gray-900">
                A
              </p>
              <p className="text-gray-600 text-sm">
                Si usas gafas o lentillas, haz la prueba con ellas puestas. ¿Qué
                has notado?
              </p>
              <div className="mt-4 space-y-2">
                {convergenceAnswers.map((answer, index) => (
                  <button
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-gray-900 hover:bg-gray-50"
                    key={answer}
                    onClick={() => showSymptomResult(index)}
                    type="button"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen === "symptom-result" && (
            <div aria-live="polite">
              <div
                className={`rounded-xl p-4 ${
                  resultLevel === "ok"
                    ? "bg-green-50 text-green-900"
                    : resultLevel === "review"
                      ? "bg-amber-50 text-amber-900"
                      : "bg-red-50 text-red-900"
                }`}
              >
                <h2 className="font-semibold text-xl">
                  {resultCopy[resultLevel].heading}
                </h2>
              </div>
              <p className="mt-4 text-gray-700">
                {resultCopy[resultLevel].description}
              </p>
              {resultLevel !== "ok" && <AppointmentLink />}
              <button
                className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  setScreen("intro");
                  setQuestionIndex(0);
                }}
                type="button"
              >
                Volver al inicio
              </button>
            </div>
          )}

          {screen === "alignment-prep" && (
            <div>
              <h2 className="font-semibold text-2xl text-gray-900">
                Prueba de alineamiento con gafas
              </h2>
              <p className="mt-3 text-gray-700">
                Ponte las gafas con el filtro rojo delante del ojo derecho.
                Mantén el móvil a unos 40 cm y en vertical. Durante seis rondas
                verás un aro {colorFilter === "cyan" ? "cian" : "verde"} y una
                cruz roja: intenta unir el centro de ambas figuras.
              </p>
              <p className="mt-3 text-gray-600 text-sm">
                El tamaño y la distancia de la pantalla pueden cambiar lo que
                percibes. La prueba no calcula una graduación ni diagnostica.
              </p>
              <button
                className="mt-5 w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
                onClick={startAlignment}
                type="button"
              >
                Comenzar prueba
              </button>
              <button
                className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                onClick={beginSymptoms}
                type="button"
              >
                Continuar sin gafas de colores
              </button>
            </div>
          )}

          {screen === "alignment" && (
            <div>
              <p className="font-medium text-gray-900">
                Ronda {roundNumber + 1} de 6
              </p>
              <p className="mt-2 text-gray-700 text-sm">
                Arrastra la cruz roja hasta el centro del aro{" "}
                {colorFilter === "cyan" ? "cian" : "verde"}.
              </p>
              <svg
                aria-label={`Ronda ${roundNumber + 1}: arrastra la cruz roja al centro del aro`}
                className="mt-4 h-64 w-full touch-none rounded-lg bg-black sm:h-80"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setDragging(true);
                  updateCross(
                    event.clientX,
                    event.clientY,
                    event.currentTarget
                  );
                }}
                onPointerMove={(event) => {
                  if (dragging) {
                    updateCross(
                      event.clientX,
                      event.clientY,
                      event.currentTarget
                    );
                  }
                }}
                onPointerUp={() => setDragging(false)}
                role="img"
                viewBox="0 0 1000 600"
              >
                <circle
                  cx={alignmentRound.ring.x}
                  cy={alignmentRound.ring.y}
                  fill="none"
                  r="48"
                  stroke={colorFilter === "cyan" ? "#00e5ff" : "#43f26f"}
                  strokeWidth="8"
                />
                <circle
                  cx={alignmentRound.ring.x}
                  cy={alignmentRound.ring.y}
                  fill={colorFilter === "cyan" ? "#00e5ff" : "#43f26f"}
                  r="5"
                />
                <path
                  d={`M ${alignmentRound.cross.x - 28} ${alignmentRound.cross.y} h 56 M ${alignmentRound.cross.x} ${alignmentRound.cross.y - 28} v 56`}
                  fill="none"
                  stroke="#ff334f"
                  strokeWidth="7"
                />
              </svg>
              <p className="mt-2 text-gray-600 text-sm">
                También puedes usar los controles para mover la cruz.
              </p>
              <div className="mx-auto mt-3 grid w-36 grid-cols-3 gap-2">
                <span />
                <MoveButton
                  direction="up"
                  label="Mover cruz arriba"
                  onClick={moveCross}
                />
                <span />
                <MoveButton
                  direction="left"
                  label="Mover cruz a la izquierda"
                  onClick={moveCross}
                />
                <MoveButton
                  direction="down"
                  label="Mover cruz abajo"
                  onClick={moveCross}
                />
                <MoveButton
                  direction="right"
                  label="Mover cruz a la derecha"
                  onClick={moveCross}
                />
              </div>
              <button
                className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
                onClick={nextAlignmentRound}
                type="button"
              >
                Listo
              </button>
              <button
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                onClick={() => finishAlignment(true)}
                type="button"
              >
                No veo las dos figuras a la vez
              </button>
            </div>
          )}

          {screen === "alignment-result" && (
            <div aria-live="polite">
              <h2 className="font-semibold text-2xl text-gray-900">
                {unableToSeeFigures
                  ? "Conviene valorar una revisión"
                  : "Prueba completada"}
              </h2>
              <p className="mt-3 text-gray-700">
                {unableToSeeFigures
                  ? "Si no consigues percibir las dos figuras a la vez, coméntalo con un profesional. Esta prueba por sí sola no permite saber la causa."
                  : "Has completado la prueba. La posición que has marcado no mide ni diagnostica una foria; una exploración profesional es necesaria para valorar la coordinación ocular."}
              </p>
              {unableToSeeFigures && <AppointmentLink />}
              <button
                className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 hover:bg-gray-50"
                onClick={() => setScreen("intro")}
                type="button"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <h2 className="font-semibold text-2xl text-gray-900">
          ¿Quieres consultar tus resultados?
        </h2>
        <p className="mt-3 max-w-3xl text-gray-700">
          Si el test te ha generado dudas o notas molestias al leer, podemos
          orientarte y ayudarte a pedir una revisión de la visión binocular.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            className="font-semibold text-blue-700 underline underline-offset-4"
            href="/cita"
          >
            Pedir una cita
          </a>
          <a
            className="font-semibold text-blue-700 underline underline-offset-4"
            href="/centro"
          >
            Contactar con Óptica Suárez Centro
          </a>
          <a
            className="font-semibold text-blue-700 underline underline-offset-4"
            href="/bulevar"
          >
            Contactar con Óptica Suárez Bulevar
          </a>
        </div>
      </section>
    </main>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <progress
      aria-label="Progreso del test"
      className="h-2 w-full accent-blue-700"
      max={100}
      value={value}
    />
  );
}

function AppointmentLink() {
  return (
    <a
      className="mt-5 block w-full rounded-lg bg-blue-700 px-4 py-3 text-center font-semibold text-white hover:bg-blue-800"
      href="/cita"
    >
      Pedir cita de revisión
    </a>
  );
}

function MoveButton({
  direction,
  label,
  onClick,
}: {
  direction: "up" | "down" | "left" | "right";
  label: string;
  onClick: (direction: "up" | "down" | "left" | "right") => void;
}) {
  const symbol = { up: "↑", down: "↓", left: "←", right: "→" }[direction];

  return (
    <button
      aria-label={label}
      className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 text-lg hover:bg-gray-50"
      onClick={() => onClick(direction)}
      type="button"
    >
      {symbol}
    </button>
  );
}
