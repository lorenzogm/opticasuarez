import { Button } from "../components/button";
import { Text } from "../components/text";

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
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
        key={i}
      >
        ★
      </span>
    ));

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center font-bold text-3xl text-gray-900 uppercase tracking-tight tracking-wide">
          {title}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div className="rounded-lg bg-white p-6 shadow-lg" key={index}>
              <div className="mb-4 flex text-xl">
                {renderStars(testimonial.rating)}
              </div>

              <div className="mb-4 font-semibold text-gray-900 text-lg tracking-tight">
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
