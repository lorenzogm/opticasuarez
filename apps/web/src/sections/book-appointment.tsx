import { Button } from "../components/button";
import { Text } from "../components/text";

interface BookAppointmentProps {
  title: string;
  description: string;
  buttonText: string;
  whatsappMessage?: string;
}

export default function BookAppointment({
  title,
  description,
  buttonText,
  whatsappMessage = "Hola, me gustaría reservar una cita",
}: BookAppointmentProps) {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=34953093062&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text align="center" as="h2" className="mb-6" variant="heading-2">
          {title}
        </Text>
        <Text
          align="center"
          className="mx-auto mb-8 max-w-2xl leading-relaxed"
          variant="body-lg"
        >
          {description}
        </Text>
        <Button
          className="min-h-[44px] min-w-[44px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
          variant="primary"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
