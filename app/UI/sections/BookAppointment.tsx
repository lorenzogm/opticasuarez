import { Button } from '../components/Button';
import { Text } from '../components/Text';

interface BookAppointmentProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function BookAppointment({ title, description, buttonText }: BookAppointmentProps) {
  const handleBookAppointment = () => {
    // For now, show an alert. Later could integrate with booking system
    alert('Para reservar tu cita, por favor llama al +34 123 456 789 o envía un email a info@opticasuarez.com');
  };

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
          onClick={handleBookAppointment}
          className="min-h-[44px] min-w-[44px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}