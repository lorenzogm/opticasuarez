import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  countWords,
  evaluateReading,
  markerPosition,
  pickPassage,
  type ReadingEvaluation,
  type ReadingLevel,
  type ReadingMode,
  type ReadingPassage,
  validateReaderProfile,
  wordsPerMinute,
} from "~/lib/reading-test";

type Screen = "intro" | "reading" | "questions" | "results";

interface Option {
  correct: boolean;
  label: string;
}

const SYMPTOMS = [
  "Se cansa o le pican/lloran los ojos",
  "Dolor de cabeza tras leer",
  "Se salta líneas, se pierde o usa el dedo",
  "Acerca mucho el texto, guiña o tapa un ojo",
] as const;

const MODES: readonly {
  description: string;
  label: string;
  value: ReadingMode;
}[] = [
  { value: "child", label: "Un niño o niña", description: "De 6 a 12 años" },
  {
    value: "adult",
    label: "Un adolescente o adulto",
    description: "De 13 años en adelante",
  },
];

const RESULT_COPY: Record<
  ReadingLevel,
  { border: string; message: string; title: string }
> = {
  ok: {
    title: "Dentro de lo esperado para tu edad",
    message:
      "Tu ritmo y tu comprensión son adecuados. Aun así, si notas molestias al leer, una revisión visual puede ayudarte.",
    border: "border-green-700 bg-green-50",
  },
  mid: {
    title: "Algún aspecto a vigilar",
    message:
      "Hay un dato algo por debajo de lo habitual. No es concluyente, pero una revisión visual completa te dará tranquilidad.",
    border: "border-amber-600 bg-amber-50",
  },
  bad: {
    title: "Te recomendamos una revisión visual",
    message:
      "Varios datos se alejan de lo habitual para tu edad. Puede haber un motivo visual y es sencillo comprobarlo.",
    border: "border-red-700 bg-red-50",
  },
};

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildOptions(passage: ReadingPassage): Option[][] {
  return passage.questions.map((question) =>
    shuffle<Option>([
      { label: question.correct, correct: true },
      ...question.wrong.map((label) => ({ label, correct: false })),
    ])
  );
}

export default function ReadingTest() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [mode, setMode] = useState<ReadingMode | null>(null);
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [passage, setPassage] = useState<ReadingPassage | null>(null);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [options, setOptions] = useState<Option[][]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null]);
  const [symptoms, setSymptoms] = useState<boolean[]>(
    SYMPTOMS.map(() => false)
  );
  const [questionsError, setQuestionsError] = useState("");
  const [evaluation, setEvaluation] = useState<
    (ReadingEvaluation & { correctAnswers: number; symptoms: number }) | null
  >(null);
  const startedAt = useRef(0);

  function startFromIntro() {
    const numericAge = Number.parseInt(age, 10);
    const validation = validateReaderProfile(mode, numericAge);
    setError(validation);
    if (validation || !mode) {
      return;
    }
    setPassage(pickPassage(mode, numericAge));
    setStarted(false);
    setScreen("reading");
  }

  function startReading() {
    startedAt.current = Date.now();
    setStarted(true);
  }

  function finishReading() {
    if (!passage) {
      return;
    }
    setWpm(
      wordsPerMinute(countWords(passage.text), Date.now() - startedAt.current)
    );
    setOptions(buildOptions(passage));
    setAnswers([null, null]);
    setSymptoms(SYMPTOMS.map(() => false));
    setQuestionsError("");
    setScreen("questions");
  }

  function showResult() {
    if (answers.some((answer) => answer === null)) {
      setQuestionsError("Responde las dos preguntas para ver el resultado.");
      return;
    }
    const correctAnswers = answers.filter(
      (answer, index) => answer !== null && options[index][answer].correct
    ).length;
    const symptomCount = symptoms.filter(Boolean).length;
    setEvaluation({
      ...evaluateReading({
        age: Number.parseInt(age, 10),
        correctAnswers,
        symptoms: symptomCount,
        wpm,
      }),
      correctAnswers,
      symptoms: symptomCount,
    });
    setScreen("results");
  }

  function reset() {
    setMode(null);
    setAge("");
    setError("");
    setPassage(null);
    setEvaluation(null);
    setScreen("intro");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 text-center">
        <p className="mb-2 font-semibold text-blue-700 text-sm uppercase tracking-wide">
          Óptica Suárez · Jaén
        </p>
        <h1 className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl">
          Test de lectura
        </h1>
        <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
          Leer es una de las tareas que más exige a nuestro sistema visual: los
          ojos deben enfocar, alinearse y moverse con precisión durante largos
          periodos. Cuando alguna de estas funciones falla, la lectura se vuelve
          lenta, cansada o poco comprensiva, y es fácil confundirlo con falta de
          atención o de interés. Este test breve te da una referencia
          orientativa y no sustituye una revisión visual completa.
        </p>
      </header>

      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {screen === "intro" && (
          <section>
            <h2 className="mb-2 font-semibold text-2xl text-gray-900">
              Test de lectura rápido
            </h2>
            <p className="mb-6 text-gray-600">
              Dura 2 minutos. Es orientativo: no sustituye a un examen visual.
            </p>
            <fieldset className="mb-5">
              <legend className="mb-2 font-medium text-gray-900">
                ¿Quién va a leer?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {MODES.map((option) => (
                  <label
                    className={`flex cursor-pointer flex-col rounded-lg border p-3 ${
                      mode === option.value
                        ? "border-blue-700 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    key={option.value}
                  >
                    <span className="flex items-center gap-2 font-medium text-gray-900">
                      <input
                        checked={mode === option.value}
                        name="reader"
                        onChange={() => setMode(option.value)}
                        type="radio"
                      />
                      {option.label}
                    </span>
                    <span className="ml-6 text-gray-600 text-sm">
                      {option.description}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label
              className="mb-2 block font-medium text-gray-900"
              htmlFor="reader-age"
            >
              Edad
            </label>
            <input
              className="mb-5 w-28 rounded-lg border border-gray-300 px-3 py-3 text-lg"
              id="reader-age"
              inputMode="numeric"
              max="99"
              min="6"
              onChange={(event) => setAge(event.target.value)}
              placeholder="Ej.: 9"
              type="number"
              value={age}
            />
            {error && (
              <p className="mb-4 text-red-700" role="alert">
                {error}
              </p>
            )}
            <p className="mb-6 text-gray-600 text-sm">
              Si usa gafas o lentillas, que las lleve puestas. Lee en silencio y
              a tu ritmo habitual.
            </p>
            <button
              className="min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              onClick={startFromIntro}
              type="button"
            >
              Continuar
            </button>
          </section>
        )}

        {screen === "reading" && passage && (
          <section>
            <p className="mb-4 text-gray-600 text-sm">
              Pulsa «Empezar», lee en silencio con normalidad y pulsa «He
              terminado» al acabar.
            </p>
            <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-5">
              <p
                aria-hidden={!started}
                className={`max-w-[60ch] leading-relaxed transition-[filter] ${
                  started ? "" : "select-none blur-[7px]"
                }`}
                data-testid="reading-text"
                style={{ fontSize: passage.fontSize }}
              >
                {passage.text}
              </p>
              {!started && (
                <button
                  className="absolute inset-0 m-auto h-fit w-fit rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
                  onClick={startReading}
                  type="button"
                >
                  Empezar
                </button>
              )}
            </div>
            {started && (
              <button
                className="mt-6 min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                onClick={finishReading}
                type="button"
              >
                He terminado
              </button>
            )}
          </section>
        )}

        {screen === "questions" && (
          <section>
            <h2 className="mb-1 font-semibold text-2xl text-gray-900">
              Dos preguntas rápidas
            </h2>
            <p className="mb-5 text-gray-600 text-sm">
              Comprueban que has leído con atención (sin volver al texto).
            </p>
            {options.map((questionOptions, questionIndex) => (
              <fieldset
                className="mb-5"
                key={passage?.questions[questionIndex].prompt}
              >
                <legend className="mb-2 font-medium text-gray-900">
                  {passage?.questions[questionIndex].prompt}
                </legend>
                <div className="grid gap-2">
                  {questionOptions.map((option, optionIndex) => (
                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${
                        answers[questionIndex] === optionIndex
                          ? "border-blue-700 bg-blue-50"
                          : "border-gray-300"
                      }`}
                      key={option.label}
                    >
                      <input
                        checked={answers[questionIndex] === optionIndex}
                        name={`question-${questionIndex}`}
                        onChange={() =>
                          setAnswers((current) =>
                            current.map((answer, index) =>
                              index === questionIndex ? optionIndex : answer
                            )
                          )
                        }
                        type="radio"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <fieldset className="mb-5">
              <legend className="mb-2 font-medium text-gray-900">
                ¿Se nota alguno de estos síntomas al leer?
              </legend>
              {SYMPTOMS.map((symptom, index) => (
                <label className="mb-2 flex items-start gap-2" key={symptom}>
                  <input
                    checked={symptoms[index]}
                    className="mt-1.5"
                    onChange={() =>
                      setSymptoms((current) =>
                        current.map((value, i) =>
                          i === index ? !value : value
                        )
                      )
                    }
                    type="checkbox"
                  />
                  {symptom}
                </label>
              ))}
            </fieldset>
            {questionsError && (
              <p className="mb-4 text-red-700" role="alert">
                {questionsError}
              </p>
            )}
            <button
              className="min-h-12 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              onClick={showResult}
              type="button"
            >
              Ver resultado
            </button>
          </section>
        )}

        {screen === "results" && evaluation && (
          <section>
            <h2 className="mb-4 font-semibold text-2xl text-gray-900">
              Tu resultado orientativo
            </h2>
            <div
              className={`mb-6 rounded-lg border-l-8 p-4 ${RESULT_COPY[evaluation.level].border}`}
              role="status"
            >
              <p className="font-semibold text-gray-900">
                {RESULT_COPY[evaluation.level].title}
              </p>
              <p className="text-gray-700">
                {RESULT_COPY[evaluation.level].message}
              </p>
            </div>
            <div
              aria-hidden="true"
              className="relative mt-8 mb-2 h-3.5 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg,#e9c4bc 0 40%,#f1dfb7 40% 60%,#c9e4d3 60%)",
              }}
            >
              <span
                className="-top-5 -translate-x-1/2 absolute whitespace-nowrap text-gray-600 text-xs"
                style={{ left: "60%" }}
              >
                esperado
              </span>
              <span
                className="-top-1.5 -translate-x-1/2 absolute h-6 w-1 rounded bg-gray-900"
                style={{ left: `${markerPosition(evaluation.ratio)}%` }}
              />
            </div>
            <p className="mb-4 text-gray-600 text-sm">
              Velocidad: {wpm} palabras/min (orientativo a tu edad: unas{" "}
              {evaluation.reference}). Comprensión: {evaluation.correctAnswers}{" "}
              de 2. Síntomas marcados: {evaluation.symptoms}.
            </p>
            <p className="mb-6 text-gray-600 text-sm">
              Este test es solo una referencia general y no es un diagnóstico.
              Una lectura lenta o con esfuerzo puede tener muchas causas, y la
              visión es una de las que se pueden revisar fácilmente.
            </p>
            <Link
              className="block min-h-12 rounded-lg bg-blue-700 px-5 py-3 text-center font-semibold text-white hover:bg-blue-800"
              to="/cita"
            >
              Pedir revisión visual
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
              onClick={reset}
              type="button"
            >
              Repetir test
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
