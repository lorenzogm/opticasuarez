import { Link } from "@tanstack/react-router";
import { useState } from "react";

const LEVELS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1];
const DIRECTIONS = ["R", "D", "L", "U"] as const;
const EYES = ["derecho", "izquierdo"] as const;
const CARD_WIDTH_MM = 53.98;
const DISTANCE_MM = 400;
const RESULT_TOLERANCE = 0.79;

type Direction = (typeof DIRECTIONS)[number];
type Screen = "intro" | "calibration" | "cover" | "test" | "results";

function acuityFromDefocus(defocus: number) {
  return defocus <= 0.25 ? 1 : 10 ** (-0.3 * (defocus - 0.25));
}

function expectedAcuity(age: number, corrected: boolean) {
  const ageBase = age > 65 ? Math.max(0.6, 1 - 0.015 * (age - 65)) : 1;
  if (corrected) {
    return { expected: ageBase, low: Math.min(0.8, ageBase) };
  }

  const demand = 1000 / DISTANCE_MM;
  const averageAmplitude = Math.max(0, 18.5 - 0.3 * age);
  const minimumAmplitude = Math.max(0, 15 - 0.25 * age);
  return {
    expected:
      acuityFromDefocus(Math.max(0, demand - averageAmplitude)) * ageBase,
    low:
      Math.min(acuityFromDefocus(Math.max(0, demand - minimumAmplitude)), 0.8) *
      ageBase,
  };
}

function nextDirection(previous: Direction | null): Direction {
  const choices = DIRECTIONS.filter((direction) => direction !== previous);
  return choices[Math.floor(Math.random() * choices.length)];
}

function EOptotype({
  direction,
  size,
}: {
  direction: Direction;
  size: number;
}) {
  const rotation = { R: 0, D: 90, L: 180, U: 270 }[direction];

  return (
    <svg
      aria-hidden="true"
      data-direction={direction}
      height={size}
      viewBox="0 0 5 5"
      width={size}
    >
      <g fill="currentColor" transform={`rotate(${rotation} 2.5 2.5)`}>
        <rect height="5" width="1" x="0" y="0" />
        <rect height="1" width="5" x="0" y="0" />
        <rect height="1" width="5" x="0" y="2" />
        <rect height="1" width="5" x="0" y="4" />
      </g>
    </svg>
  );
}

export default function NearVisionTest() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [age, setAge] = useState("");
  const [corrected, setCorrected] = useState(false);
  const [error, setError] = useState("");
  const [cardWidth, setCardWidth] = useState(280);
  const [eye, setEye] = useState(0);
  const [level, setLevel] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [lastPassed, setLastPassed] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("R");
  const [previousDirection, setPreviousDirection] = useState<Direction | null>(
    null
  );
  const [results, setResults] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const pxPerMm = cardWidth / CARD_WIDTH_MM;
  const expected = expectedAcuity(Number(age) || 0, corrected);

  function showCover(nextEye: number) {
    setEye(nextEye);
    setScreen("cover");
  }

  function startEyeTest() {
    const firstDirection = nextDirection(null);
    setLevel(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setLastPassed(null);
    setPreviousDirection(firstDirection);
    setDirection(firstDirection);
    setScreen("test");
  }

  function finishEye(result: number) {
    const nextResults: [number | null, number | null] = [...results];
    nextResults[eye] = result;
    setResults(nextResults);

    if (eye === 0) {
      showCover(1);
    } else {
      setScreen("results");
    }
  }

  function answer(answerDirection: Direction | "X") {
    if (answerDirection === direction) {
      const nextCorrect = correctAnswers + 1;
      if (nextCorrect === 2) {
        const passed = LEVELS[level];
        const nextLevel = level + 1;
        setLastPassed(passed);
        setCorrectAnswers(0);
        setWrongAnswers(0);
        if (nextLevel === LEVELS.length) {
          finishEye(passed);
        } else {
          setLevel(nextLevel);
          showNextDirection();
        }
        return;
      }
      setCorrectAnswers(nextCorrect);
    } else {
      const nextWrong = wrongAnswers + 1;
      if (nextWrong === 2) {
        finishEye(lastPassed ?? 0.05);
        return;
      }
      setWrongAnswers(nextWrong);
    }

    showNextDirection();
  }

  function showNextDirection() {
    const next = nextDirection(previousDirection);
    setPreviousDirection(next);
    setDirection(next);
  }

  function startFromIntro() {
    const numericAge = Number(age);
    if (!Number.isInteger(numericAge) || numericAge < 6 || numericAge > 99) {
      setError("Indica una edad entre 6 y 99 años.");
      return;
    }
    setError("");
    setScreen("calibration");
  }

  function resetTest() {
    setResults([null, null]);
    setAge("");
    setCorrected(false);
    setError("");
    setScreen("intro");
  }

  const expectedResult = (result: number) => {
    if (result >= expected.expected * RESULT_TOLERANCE) {
      return { label: "Acorde a la estimación", color: "text-green-700" };
    }
    if (result >= expected.low * RESULT_TOLERANCE) {
      return {
        label: "Algo por debajo de la estimación",
        color: "text-amber-700",
      };
    }
    return { label: "Por debajo de la estimación", color: "text-red-700" };
  };

  const worstResult = Math.min(results[0] ?? 0, results[1] ?? 0);
  const generalResult = expectedResult(worstResult);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 text-center">
        <p className="mb-2 font-semibold text-blue-700 text-sm uppercase tracking-wide">
          Óptica Suárez · Jaén
        </p>
        <h1 className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl">
          Test de visión de cerca
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
          La agudeza visual es la capacidad de distinguir detalles. Si está
          disminuida, puedes notar borrosidad al leer o diferencias entre los
          ojos. Puede deberse a cambios de graduación, de enfoque o de
          coordinación entre ambos ojos; este test no permite identificar la
          causa ni sustituye una revisión visual completa.
        </p>
      </header>

      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {screen === "intro" && (
          <section>
            <h2 className="mb-2 font-semibold text-2xl text-gray-900">
              Una prueba rápida, ojo por ojo
            </h2>
            <p className="mb-6 text-gray-600">
              El test dura unos minutos. Necesitarás una tarjeta bancaria y
              mantener la pantalla a unos 40 cm. Puedes hacerlo con o sin tus
              gafas de cerca.
            </p>
            <label
              className="mb-2 block font-medium text-gray-900"
              htmlFor="age"
            >
              Tu edad
            </label>
            <input
              className="mb-5 w-full rounded-lg border border-gray-300 px-3 py-3 text-lg"
              id="age"
              inputMode="numeric"
              max="99"
              min="6"
              onChange={(event) => setAge(event.target.value)}
              placeholder="Ej.: 47"
              type="number"
              value={age}
            />
            <fieldset>
              <legend className="mb-2 font-medium text-gray-900">
                ¿Cómo harás el test?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Sin gafas", value: false },
                  { label: "Con mis gafas de cerca", value: true },
                ].map((option) => (
                  <label
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${
                      corrected === option.value
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    key={option.label}
                  >
                    <input
                      checked={corrected === option.value}
                      name="correction"
                      onChange={() => setCorrected(option.value)}
                      type="radio"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
            {error && (
              <p className="mt-4 text-red-700" role="alert">
                {error}
              </p>
            )}
            <button
              className="mt-6 min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              onClick={startFromIntro}
              type="button"
            >
              Continuar
            </button>
          </section>
        )}

        {screen === "calibration" && (
          <section>
            <h2 className="mb-2 font-semibold text-2xl text-gray-900">
              Ajusta el tamaño
            </h2>
            <p className="mb-4 text-gray-600">
              Coloca el lado corto de una tarjeta bancaria sobre la barra y
              mueve el control hasta que coincidan.
            </p>
            <div className="flex justify-center">
              <div
                className="flex h-9 items-center justify-center rounded-md border-2 border-blue-700 bg-blue-50 text-blue-800 text-sm"
                style={{ width: cardWidth }}
              >
                lado corto de la tarjeta (54 mm)
              </div>
            </div>
            <input
              aria-label="Ajustar barra al tamaño de la tarjeta"
              className="my-4 w-full"
              max="360"
              min="140"
              onChange={(event) => setCardWidth(Number(event.target.value))}
              type="range"
              value={cardWidth}
            />
            <p className="text-gray-600 text-sm">
              Pon el brillo de la pantalla al máximo y sujeta el dispositivo a
              unos 40 cm (aproximadamente la longitud del antebrazo con el codo
              doblado). Usa una pantalla de buena resolución.
            </p>
            <button
              className="mt-6 min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              onClick={() => showCover(0)}
              type="button"
            >
              Empezar
            </button>
          </section>
        )}

        {screen === "cover" && (
          <section>
            <h2 className="mb-3 font-semibold text-2xl text-gray-900">
              Ojo {EYES[eye]} {eye === 0 ? "(primero)" : ""}
            </h2>
            <p className="mb-4 text-gray-700">
              Tápate el ojo {eye === 0 ? "izquierdo" : "derecho"} y mira la
              pantalla con el ojo {EYES[eye]}.
            </p>
            <p className="text-gray-600 text-sm">
              Cúbrete con la palma de la mano, sin presionar el ojo. Si usas
              gafas de cerca, déjalas puestas.
            </p>
            <button
              className="mt-6 min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              onClick={startEyeTest}
              type="button"
            >
              Ya estoy listo
            </button>
          </section>
        )}

        {screen === "test" && (
          <section aria-label={`Test del ojo ${EYES[eye]}`}>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Ojo {EYES[eye]}</span>
              <span>
                Paso {level + 1} de {LEVELS.length}
              </span>
            </div>
            <div
              aria-label={`Progreso: ${level} de ${LEVELS.length} pasos`}
              aria-valuemax={LEVELS.length}
              aria-valuemin={0}
              aria-valuenow={level}
              className="my-2 h-1.5 overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-blue-700"
                style={{ width: `${(level / LEVELS.length) * 100}%` }}
              />
            </div>
            <div className="my-4 flex h-48 items-center justify-center rounded-lg border border-gray-200">
              <EOptotype
                direction={direction}
                size={Math.max(2, (0.5818 / LEVELS[level]) * pxPerMm)}
              />
            </div>
            <p className="mb-4 text-center text-gray-600 text-sm">
              Toca hacia dónde apuntan los dientes de la E.
            </p>
            <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">
              <span />
              <DirectionButton direction="U" label="Arriba" onClick={answer} />
              <span />
              <DirectionButton
                direction="L"
                label="Izquierda"
                onClick={answer}
              />
              <span />
              <DirectionButton direction="R" label="Derecha" onClick={answer} />
              <span />
              <DirectionButton direction="D" label="Abajo" onClick={answer} />
              <span />
              <button
                className="col-span-3 min-h-11 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                onClick={() => answer("X")}
                type="button"
              >
                No la veo
              </button>
            </div>
          </section>
        )}

        {screen === "results" && (
          <section>
            <h2 className="mb-4 font-semibold text-2xl text-gray-900">
              Tu resultado orientativo
            </h2>
            {results.map((result, index) => {
              const status = expectedResult(result ?? 0.05);
              const decimal = (result ?? 0.05).toString().replace(".", ",");
              return (
                <div
                  className="mb-3 rounded-lg border border-gray-200 p-4"
                  key={EYES[index]}
                >
                  <p className="text-gray-600 text-sm">Ojo {EYES[index]}</p>
                  <p className="font-semibold text-2xl text-gray-900">
                    {decimal}
                  </p>
                  <p className={`font-medium text-sm ${status.color}`}>
                    {status.label}
                  </p>
                </div>
              );
            })}
            <p className="mb-4 text-gray-700">
              {generalResult.label === "Acorde a la estimación"
                ? "El resultado está dentro de la estimación orientativa para tu edad y las condiciones del test. Aun así, no descarta otros problemas visuales."
                : "El resultado queda por debajo de la estimación orientativa. Puede relacionarse con cambios de graduación, enfoque, coordinación entre los ojos u otros factores; el test no identifica la causa."}
            </p>
            <p className="mb-6 text-gray-600 text-sm">
              Este test no es un diagnóstico ni sustituye a un examen visual
              completo. El resultado puede variar según el tamaño y la
              resolución de la pantalla, la distancia y la iluminación.
            </p>
            <Link
              className="block min-h-12 rounded-lg bg-blue-700 px-5 py-3 text-center font-semibold text-white hover:bg-blue-800"
              to="/cita"
            >
              Reservar una revisión visual
            </Link>
            <p className="mt-4 text-center text-gray-600 text-sm">
              ¿Tienes dudas?{" "}
              <Link
                className="font-medium text-blue-700 underline"
                params={{ _splat: "contacto" }}
                to="/$"
              >
                Contacta con nosotros
              </Link>
            </p>
            <button
              className="mt-3 min-h-12 w-full rounded-lg border border-blue-700 px-5 py-3 font-semibold text-blue-800 hover:bg-blue-50"
              onClick={resetTest}
              type="button"
            >
              Repetir el test
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function DirectionButton({
  direction,
  label,
  onClick,
}: {
  direction: Direction;
  label: string;
  onClick: (direction: Direction) => void;
}) {
  const arrow = { R: "→", D: "↓", L: "←", U: "↑" }[direction];

  return (
    <button
      aria-label={label}
      className="h-14 rounded-lg border-2 border-blue-700 bg-white text-2xl text-blue-800 hover:bg-blue-50"
      onClick={() => onClick(direction)}
      type="button"
    >
      {arrow}
    </button>
  );
}
