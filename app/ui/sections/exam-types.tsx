import { Text } from '../components/text';

interface ExamType {
  title: string;
  description: string;
  icon: string;
}

interface ExamTypesProps {
  title: string;
  items: ExamType[];
}

export default function ExamTypes({ title, items }: ExamTypesProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          size="3xl"
          weight="bold"
          className="mb-12 text-center text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <Text
                as="h3"
                size="lg"
                weight="bold"
                className="mb-4 text-gray-900 uppercase"
              >
                {item.title}
              </Text>
              <Text
                as="p"
                size="sm"
                className="text-gray-600 leading-relaxed"
              >
                {item.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}