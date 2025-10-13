import { Text } from '../../../components/text';

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
      case 'focus':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        );
      case 'tracking':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        );
      case 'alignment':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4a1 1 0 011-1h4m5 0h4a1 1 0 011 1v4m0 5v4a1 1 0 01-1 1h-4m-5 0H5a1 1 0 01-1-1v-4"
          />
        );
      case 'lazy-eye':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-7a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9z"
          />
        );
      case 'perception':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        );
      case 'fatigue':
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        );
      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        );
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Text
          as="p"
          variant="heading-2"
          align="center"
          className="mb-4 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>
        <Text
          variant="body-lg"
          align="center"
          className="mb-12 text-gray-600 max-w-3xl mx-auto"
        >
          {subtitle}
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300 text-center hover:scale-105"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {getIcon(item.icon)}
                </svg>
              </div>
              <Text as="p" className="mb-3 text-gray-900 text-2xl font-semibold tracking-tight">
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
