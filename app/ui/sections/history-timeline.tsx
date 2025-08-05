import { Text } from '../components/text';
import Image from '../components/image';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

interface HistoryTimelineProps {
  title: string;
  timeline: TimelineItem[];
}

export default function HistoryTimeline({
  title,
  timeline,
}: HistoryTimelineProps) {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          size="3xl"
          weight="bold"
          align="center"
          className="mb-12 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:w-1/2">
                <figure className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={item.image}
                    alt={`${item.year}: ${item.title}`}
                    className="w-full h-64 object-cover"
                  />
                </figure>
              </div>

              <div className="lg:w-1/2 text-center lg:text-left">
                <Text
                  as="h3"
                  size="2xl"
                  weight="bold"
                  className="mb-4 text-blue-900 uppercase tracking-wide"
                >
                  {item.year}: {item.title}
                </Text>
                <Text size="lg" className="text-gray-700 leading-relaxed">
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
