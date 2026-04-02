interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Datos" },
  { number: 2, label: "Envío" },
  { number: 3, label: "Resumen" },
];

export default function ProgressIndicator({
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progreso del checkout" className="mb-8">
      <ol className="flex items-center justify-center gap-8">
        {steps.map((step) => (
          <li className="flex items-center gap-2" key={step.number}>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold text-sm ${
                step.number === currentStep
                  ? "bg-blue-600 text-white"
                  : step.number < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number < currentStep ? "✓" : step.number}
            </span>
            <span
              className={`hidden font-medium text-sm sm:block ${
                step.number === currentStep
                  ? "text-blue-600"
                  : step.number < currentStep
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
