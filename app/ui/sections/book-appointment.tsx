import { Button } from '../components/button';
import { Text } from '../components/text';

interface BookAppointmentProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function BookAppointment({
  title,
  description,
  buttonText,
}: BookAppointmentProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text
          as="h2"
          size="3xl"
          weight="bold"
          variant="primary"
          align="center"
          className="mb-6"
        >
          {title}
        </Text>
        <Text
          size="lg"
          variant="light"
          align="center"
          className="mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </Text>
        <Button
          size="lg"
          variant="default"
          href="/book"
          className="min-h-[44px] min-w-[44px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
