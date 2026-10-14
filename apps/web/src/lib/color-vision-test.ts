export interface ColorPlate {
  readonly answer: string;
  readonly seed: number;
  readonly size: number;
  readonly background: readonly string[];
  readonly parts: readonly {
    readonly text: string;
    readonly x: number;
    readonly palette: readonly string[];
  }[];
}

export const COLOR_PLATES: readonly ColorPlate[] = [
  {
    answer: "12",
    seed: 11,
    size: 250,
    background: ["#a9bcc0", "#bccacc", "#98aeb3"],
    parts: [{ text: "12", x: 0.5, palette: ["#b5472b", "#c9603a", "#a33d28"] }],
  },
  {
    answer: "74",
    seed: 23,
    size: 205,
    background: ["#e0864a", "#d9743c", "#eca25e", "#cf6b3b", "#e8a36b"],
    parts: [
      {
        text: "74",
        x: 0.5,
        palette: ["#8fae5a", "#a3bb6e", "#7c9c4d", "#b2c47a", "#93a860"],
      },
    ],
  },
  {
    answer: "29",
    seed: 37,
    size: 205,
    background: ["#9bb06b", "#8ba05c", "#a8b97a", "#b3c285", "#7f9852"],
    parts: [
      {
        text: "29",
        x: 0.5,
        palette: ["#dc7a48", "#cf6b3b", "#e6935f", "#d9743c"],
      },
    ],
  },
  {
    answer: "5",
    seed: 41,
    size: 270,
    background: ["#9aae6a", "#8ba05c", "#a8b97a", "#b5c487"],
    parts: [
      {
        text: "5",
        x: 0.5,
        palette: ["#d1503f", "#c4463a", "#dd6a52", "#cc5a45"],
      },
    ],
  },
  {
    answer: "45",
    seed: 53,
    size: 205,
    background: ["#d98a7a", "#e29b8a", "#cf7d6f", "#e8ad9a", "#d4857a"],
    parts: [
      {
        text: "45",
        x: 0.5,
        palette: ["#7fae6b", "#6f9f5e", "#90b87c", "#82a86e"],
      },
    ],
  },
  {
    answer: "26",
    seed: 67,
    size: 210,
    background: ["#b8bfae", "#a9b09d", "#c4c9b9", "#b0b8a4"],
    parts: [
      { text: "2", x: 0.3, palette: ["#d8503f", "#c9402f", "#e06048"] },
      { text: "6", x: 0.7, palette: ["#6a5fb0", "#7a6fc0", "#5b52a3"] },
    ],
  },
];

const SIZE = 320;

// biome-ignore-start lint/suspicious/noBitwiseOperators: Mulberry32 requires the original signed overflow and bit shifts.
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d_2b_79_f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}
// biome-ignore-end lint/suspicious/noBitwiseOperators: Mulberry32 implementation ends here.

function tone(color: string, random: () => number) {
  const factor = 0.92 + 0.16 * random();
  const channels = [1, 3, 5].map((start) =>
    Math.max(
      0,
      Math.min(
        255,
        Math.round(Number.parseInt(color.slice(start, start + 2), 16) * factor)
      )
    )
  );
  return `rgb(${channels.join(",")})`;
}

interface Circle {
  x: number;
  y: number;
  r: number;
}

function generateCircles(random: () => number) {
  const circles: Circle[] = [];
  for (const r of [7, 6, 5, 4.2, 3.5, 2.8, 2.2]) {
    for (let attempt = 0; attempt < 3000; attempt++) {
      const angle = random() * 6.2832;
      const distance = Math.sqrt(random()) * (SIZE / 2 - 3 - r);
      const x = SIZE / 2 + Math.cos(angle) * distance;
      const y = SIZE / 2 + Math.sin(angle) * distance;
      if (
        circles.every((circle) => {
          const gap = circle.r + r + 0.9;
          return (circle.x - x) ** 2 + (circle.y - y) ** 2 >= gap ** 2;
        })
      ) {
        circles.push({ x, y, r });
      }
    }
  }
  return circles;
}

function hitsMask(circle: Circle, mask: Uint8ClampedArray) {
  const offset = circle.r * 0.55;
  const points = [
    [0, 0],
    [offset, 0],
    [-offset, 0],
    [0, offset],
    [0, -offset],
  ];
  let hits = 0;
  for (const [dx, dy] of points) {
    const x = Math.max(0, Math.min(SIZE - 1, Math.round(circle.x + dx)));
    const y = Math.max(0, Math.min(SIZE - 1, Math.round(circle.y + dy)));
    if (mask[(y * SIZE + x) * 4 + 3] > 128) {
      hits++;
    }
  }
  return hits >= 3;
}

export function drawColorPlate(
  canvas: HTMLCanvasElement,
  plate: ColorPlate
): boolean {
  try {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    const context = canvas.getContext("2d");
    if (!context) {
      return false;
    }
    context.scale(dpr, dpr);
    const masks: Uint8ClampedArray[] = [];
    for (const part of plate.parts) {
      const mask = document.createElement("canvas");
      mask.width = SIZE;
      mask.height = SIZE;
      const maskContext = mask.getContext("2d");
      if (!maskContext) {
        return false;
      }
      maskContext.fillStyle = "#000";
      maskContext.textAlign = "center";
      maskContext.textBaseline = "middle";
      maskContext.font = `bold ${plate.size}px Arial,Helvetica,sans-serif`;
      maskContext.lineJoin = "round";
      maskContext.lineWidth = Math.round(plate.size * 0.09);
      maskContext.strokeStyle = "#000";
      maskContext.strokeText(part.text, SIZE * part.x, SIZE / 2 + SIZE * 0.04);
      maskContext.fillText(part.text, SIZE * part.x, SIZE / 2 + SIZE * 0.04);
      masks.push(maskContext.getImageData(0, 0, SIZE, SIZE).data);
    }
    const random = seededRandom(plate.seed);
    const circles = generateCircles(random);
    context.clearRect(0, 0, SIZE, SIZE);
    for (const circle of circles) {
      const index = masks.findIndex((mask) => hitsMask(circle, mask));
      const palette = index < 0 ? plate.background : plate.parts[index].palette;
      context.fillStyle = tone(
        palette[Math.floor(random() * palette.length)],
        random
      );
      context.beginPath();
      context.arc(circle.x, circle.y, circle.r, 0, 6.2832);
      context.fill();
    }
    return true;
  } catch {
    return false;
  }
}

export interface ColorVisionResult {
  title: string;
  text: string;
  score: number;
  level: "invalid" | "complete" | "review";
}

const DISCLAIMER =
  "Estas láminas generadas no están validadas clínicamente y no permiten diagnosticar ni descartar una alteración de la visión del color. La pantalla y la iluminación pueden influir en las respuestas.";

export function evaluateColorVisionAnswers(
  answers: readonly string[]
): ColorVisionResult {
  const score = COLOR_PLATES.filter(
    (plate, index) => answers[index] === plate.answer
  ).length;
  if (
    answers.length !== COLOR_PLATES.length ||
    COLOR_PLATES.some((_, index) => typeof answers[index] !== "string") ||
    answers[0] !== COLOR_PLATES[0].answer
  ) {
    return {
      title: "Resultado no válido",
      text: `Completa todas las láminas e identifica la lámina de control para obtener un resultado orientativo. Puedes repetir la actividad con las condiciones recomendadas. ${DISCLAIMER}`,
      score,
      level: "invalid",
    };
  }
  if (score === COLOR_PLATES.length) {
    return {
      title: "Has identificado todas las láminas",
      text: `Tus respuestas coinciden con los números previstos en las seis láminas. ${DISCLAIMER}`,
      score,
      level: "complete",
    };
  }
  return {
    title: "Has identificado algunas láminas de forma diferente",
    text: `Algunas respuestas no coinciden con los números previstos. Si tienes dudas sobre tu percepción del color, solicita una revisión profesional. ${DISCLAIMER}`,
    score,
    level: "review",
  };
}
