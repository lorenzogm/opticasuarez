export type ReadingMode = "child" | "adult";
export type ReadingLevel = "ok" | "mid" | "bad";

export interface ReadingQuestion {
  correct: string;
  prompt: string;
  wrong: readonly [string, string];
}

export interface ReadingPassage {
  fontSize: string;
  questions: readonly [ReadingQuestion, ReadingQuestion];
  text: string;
}

export const MIN_CHILD_AGE = 6;
export const MAX_CHILD_AGE = 12;
export const MIN_ADULT_AGE = 13;
export const MAX_AGE = 99;

// Palabras por minuto orientativas en lectura silenciosa en español.
const CHILD_WPM: Record<number, number> = {
  6: 40,
  7: 65,
  8: 85,
  9: 105,
  10: 120,
  11: 135,
  12: 150,
  13: 165,
  14: 175,
  15: 190,
  16: 190,
  17: 190,
};

const MIN_READING_MINUTES = 0.05;

export const PASSAGES = {
  young: {
    fontSize: "28px",
    text: "Luna es una gatita blanca que vive en una casa con jardín. Por las mañanas, salta a la ventana y mira los pájaros. Un día, un pájaro azul se posó cerca de ella. Luna no se movió. Se quedó quieta y sonrió, porque había hecho un nuevo amigo.",
    questions: [
      {
        prompt: "¿De qué color es Luna?",
        correct: "Blanca",
        wrong: ["Negra", "Gris"],
      },
      {
        prompt: "¿Qué hizo Luna al ver al pájaro azul?",
        correct: "Se quedó quieta",
        wrong: ["Salió corriendo", "Maulló muy fuerte"],
      },
    ],
  },
  child: {
    fontSize: "22px",
    text: "En lo alto de un acantilado había un faro muy antiguo. Cada noche, el farero subía los ciento veinte escalones para encender la gran lámpara. Su luz ayudaba a los barcos a no chocar contra las rocas. Una noche de niebla espesa, un pequeño pesquero se perdió en el mar. El farero hizo sonar la campana y encendió la lámpara con más fuerza. Poco a poco, el barco se acercó siguiendo el sonido y la luz. Los pescadores llegaron al puerto sanos y salvos. Al día siguiente, todo el pueblo fue a darle las gracias al farero, que solo dijo: «Es mi trabajo».",
    questions: [
      {
        prompt: "¿Cuántos escalones subía el farero?",
        correct: "120",
        wrong: ["210", "100"],
      },
      {
        prompt: "¿Cómo encontró el barco el camino?",
        correct: "Siguiendo la campana y la luz",
        wrong: ["Con un mapa", "Con una radio"],
      },
    ],
  },
  adult: {
    fontSize: "18px",
    text: "La lectura es una de las tareas visuales más exigentes que realizamos a diario. Mientras leemos, los ojos no se deslizan de forma continua por la línea: avanzan a pequeños saltos, llamados sacádicos, y se detienen unos instantes para captar las palabras. Entre un salto y otro, el cerebro integra lo que ha visto y prepara el siguiente movimiento. Para que todo ello resulte cómodo, ambos ojos deben enfocar y alinearse con precisión a la distancia de lectura durante periodos prolongados. Cuando alguno de estos mecanismos no funciona bien, pueden aparecer señales como cansancio, dolor de cabeza, visión borrosa al final del día, pérdida de la línea o necesidad de releer. Por eso, una persona puede leer con corrección y, aun así, hacerlo con un esfuerzo mayor del necesario. Una revisión visual completa permite detectar estas diferencias y, si hace falta, corregirlas con gafas, ejercicios o terapia visual.",
    questions: [
      {
        prompt: "¿Cómo se mueven los ojos al leer?",
        correct: "A pequeños saltos",
        wrong: ["De forma continua y suave", "Permanecen inmóviles"],
      },
      {
        prompt: "¿Qué puede ayudar a corregir las diferencias detectadas?",
        correct: "Gafas, ejercicios o terapia visual",
        wrong: ["Solo descansar más", "Nada, no tienen solución"],
      },
    ],
  },
} as const satisfies Record<string, ReadingPassage>;

export function validateReaderProfile(
  mode: ReadingMode | null,
  age: number
): string {
  if (!mode) {
    return "Elige quién va a leer.";
  }
  if (!Number.isInteger(age) || age < MIN_CHILD_AGE || age > MAX_AGE) {
    return "Indica una edad entre 6 y 99 años.";
  }
  if (mode === "child" && age > MAX_CHILD_AGE) {
    return "Para niños, el test es de 6 a 12 años. Para otras edades elige «Un adolescente o adulto».";
  }
  if (mode === "adult" && age < MIN_ADULT_AGE) {
    return "Para menores de 13 años elige «Un niño o niña».";
  }
  return "";
}

export function pickPassage(mode: ReadingMode, age: number): ReadingPassage {
  if (mode === "adult") {
    return PASSAGES.adult;
  }
  return age <= 7 ? PASSAGES.young : PASSAGES.child;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

export function referenceWpm(age: number): number {
  if (age <= 17) {
    return CHILD_WPM[age] ?? CHILD_WPM[MIN_CHILD_AGE];
  }
  return age < 60 ? 210 : 190;
}

export function wordsPerMinute(words: number, elapsedMs: number): number {
  const minutes = elapsedMs / 60_000;
  return Math.round(words / Math.max(minutes, MIN_READING_MINUTES));
}

export interface ReadingEvaluation {
  level: ReadingLevel;
  ratio: number;
  reference: number;
  score: number;
}

export function evaluateReading(input: {
  age: number;
  correctAnswers: number;
  symptoms: number;
  wpm: number;
}): ReadingEvaluation {
  const reference = referenceWpm(input.age);
  const ratio = input.wpm / reference;

  let speedPenalty = 2;
  if (ratio >= 0.8) {
    speedPenalty = 0;
  } else if (ratio >= 0.6) {
    speedPenalty = 1;
  }

  // Un ritmo muy superior al esperado suele indicar lectura por encima, no fluida.
  const score =
    speedPenalty +
    (input.correctAnswers === 0 ? 1 : 0) +
    (input.symptoms >= 2 ? 1 : 0) +
    (ratio > 2 ? 1 : 0);

  let level: ReadingLevel = "bad";
  if (score === 0) {
    level = "ok";
  } else if (score === 1) {
    level = "mid";
  }

  return { level, ratio, reference, score };
}

// La marca de «esperado» está al 60 % de la barra.
export function markerPosition(ratio: number): number {
  return Math.max(3, Math.min(97, ratio * 75));
}
