import { Text } from "../../../components/text";

interface ConditionItem {
  title: string;
  description: string;
  icon: string;
}

interface TerapiaVisualConditionsProps {
  title: string;
  subtitle: string;
  items: ConditionItem[];
}

export default function TerapiaVisualConditions({
  title,
  subtitle,
  items,
}: TerapiaVisualConditionsProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "focus":
        return (
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      case "tracking":
        return (
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      case "alignment":
        return (
          <path
            d="M4 8V4a1 1 0 011-1h4m5 0h4a1 1 0 011 1v4m0 5v4a1 1 0 01-1 1h-4m-5 0H5a1 1 0 01-1-1v-4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      case "lazy-eye":
        return (
          <path
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-7a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      case "perception":
        return (
          <path
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      case "fatigue":
        return (
          <path
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
      default:
        return (
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        );
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Text
          align="center"
          as="p"
          className="mb-4 text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {title}
        </Text>
        <Text
          align="center"
          className="mx-auto mb-12 max-w-3xl text-gray-600"
          variant="body-lg"
        >
          {subtitle}
        </Text>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              className="rounded-xl bg-gray-50 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8"
              key={index}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 sm:mb-6 sm:h-16 sm:w-16">
                <svg
                  className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {getIcon(item.icon)}
                </svg>
              </div>
              <Text
                as="p"
                className="mb-3 font-semibold text-2xl text-gray-900 tracking-tight"
              >
                {item.title}
              </Text>
              <Text className="text-gray-600 leading-relaxed">
                {item.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
