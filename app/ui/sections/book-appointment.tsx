import { Button } from '../components/button';
import { Text } from '../components/text';

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
  whatsappMessage = 'Hola, me gustaría reservar una cita',
}: BookAppointmentProps) {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=34953093062&text=${encodeURIComponent(whatsappMessage)}`;
  
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Text as="h2" variant="heading-2" align="center" className="mb-6">
          {title}
        </Text>
        <Text
          variant="body-lg"
          align="center"
          className="mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </Text>
        <Button
          variant="primary"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] min-w-[44px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
