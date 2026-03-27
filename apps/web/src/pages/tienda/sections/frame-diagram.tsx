interface FrameDiagramProps {
  dimensions: {
    calibre?: number;
    puente?: number;
    varilla?: number;
  };
}

export default function FrameDiagram({ dimensions }: FrameDiagramProps) {
  const { calibre, puente, varilla } = dimensions;

  if (!(calibre || puente || varilla)) return null;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h4 className="mb-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
        Dimensiones de montura
      </h4>

      {/* SVG Diagram */}
      <div className="mb-3 flex justify-center">
        <svg
          className="text-gray-400"
          fill="none"
          height="80"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 220 80"
          width="220"
        >
          {/* Left lens */}
          <rect height="40" rx="12" width="60" x="10" y="15" />
          {/* Right lens */}
          <rect height="40" rx="12" width="60" x="100" y="15" />
          {/* Bridge */}
          <path d="M70 35 Q85 30 100 35" />
          {/* Left temple */}
          <line x1="10" x2="0" y1="28" y2="28" />
          {/* Right temple */}
          <line x1="160" x2="220" y1="28" y2="28" />

          {/* Calibre dimension line */}
          <line
            className="text-sky-500"
            stroke="currentColor"
            strokeDasharray="3"
            x1="15"
            x2="65"
            y1="65"
            y2="65"
          />
          <text
            className="fill-sky-600 text-[9px]"
            textAnchor="middle"
            x="40"
            y="76"
          >
            {calibre ?? "—"} mm
          </text>

          {/* Bridge dimension line */}
          <line
            className="text-emerald-500"
            stroke="currentColor"
            strokeDasharray="3"
            x1="72"
            x2="98"
            y1="10"
            y2="10"
          />
          <text
            className="fill-emerald-600 text-[9px]"
            textAnchor="middle"
            x="85"
            y="8"
          >
            {puente ?? "—"} mm
          </text>

          {/* Temple dimension line */}
          <line
            className="text-amber-500"
            stroke="currentColor"
            strokeDasharray="3"
            x1="162"
            x2="218"
            y1="38"
            y2="38"
          />
          <text
            className="fill-amber-600 text-[9px]"
            textAnchor="middle"
            x="190"
            y="48"
          >
            {varilla ?? "—"} mm
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {calibre && (
          <div>
            <span className="font-bold text-sky-600">{calibre}</span>
            <span className="block text-gray-500">Calibre</span>
          </div>
        )}
        {puente && (
          <div>
            <span className="font-bold text-emerald-600">{puente}</span>
            <span className="block text-gray-500">Puente</span>
          </div>
        )}
        {varilla && (
          <div>
            <span className="font-bold text-amber-600">{varilla}</span>
            <span className="block text-gray-500">Varilla</span>
          </div>
        )}
      </div>
    </div>
  );
}
