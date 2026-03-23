import { Text } from '../components/text';
import { Button } from '../components/button';

interface Testimonial {
  rating: number;
  name: string;
  review: string;
}

interface CustomerTestimonialsProps {
  title: string;
  testimonials: Testimonial[];
  moreReviewsLink: string;
}

export default function CustomerTestimonials({
  title,
  testimonials,
  moreReviewsLink,
}: CustomerTestimonialsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-3xl font-bold tracking-tight text-center mb-12 text-gray-900 uppercase tracking-wide">
          {title}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4 text-xl">
                {renderStars(testimonial.rating)}
              </div>

              <div className="text-lg font-semibold tracking-tight mb-4 text-gray-900">
                {testimonial.name}
              </div>

              <Text className="text-gray-700 leading-relaxed">
                {testimonial.review}
              </Text>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href={moreReviewsLink} variant="primary">
            Ver más reseñas
          </Button>
        </div>
      </div>
    </section>
  );
}
