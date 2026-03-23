import { Text } from "../../../components/text";

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
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          className="mb-12 text-center text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {title}
        </Text>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              className="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              key={index}
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <Text
                as="h3"
                className="mb-4 text-gray-900 uppercase"
                variant="heading-5"
              >
                {item.title}
              </Text>
              <Text
                as="p"
                className="text-gray-600 leading-relaxed"
                variant="body-sm"
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
