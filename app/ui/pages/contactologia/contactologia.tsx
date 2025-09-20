import { Text } from '../../components/text';
import { Button } from '../../components/button';
import Image from '../../components/image';
import content from '../../../content/contactologia.json';
import { useEffect } from 'react';

export default function Contactologia() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.parallax-element') as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <main>
      {/* Main heading with background image and parallax */}
      <section className="relative py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 parallax-element">
          <Image
            src="/images/homepage/services/contactologia.webp"
            alt="Contactología - Lentes de contacto"
            className="w-full h-full object-cover transform scale-110"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto max-w-6xl text-center z-10">
          <Text
            as="h1"
            variant="heading-1"
            className="mb-8 text-white uppercase tracking-wide drop-shadow-lg"
          >
            {content.mainTitle}
          </Text>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" variant="heading-2" className="mb-6 text-gray-900">
            {content.intro.title}
          </Text>
          <Text
            as="p"
            variant="body-lg"
            className="text-gray-600 leading-relaxed"
          >
            {content.intro.description}
          </Text>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-gray-900">
            {content.services.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.services.items.map((item, index) => (
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Contact Lenses */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content.types.title}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.types.items.map((type, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <Text
                  as="h3"
                  variant="heading-4"
                  className="mb-4 text-gray-900"
                >
                  {type.name}
                </Text>
                <Text as="p" variant="body-md" className="mb-4 text-gray-600">
                  {type.description}
                </Text>
                <ul className="list-disc list-inside space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-blue-50 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content.advantages.title}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.advantages.items.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <Text
                  as="h3"
                  variant="heading-5"
                  className="mb-3 text-gray-900"
                >
                  {advantage.title}
                </Text>
                <Text as="p" variant="body-sm" className="text-gray-600">
                  {advantage.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Text
            as="h2"
            variant="heading-2"
            className="mb-12 text-gray-900 text-center"
          >
            {content.process.title}
          </Text>
          <div className="space-y-8">
            {content.process.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <Text
                    as="h3"
                    variant="heading-5"
                    className="mb-2 text-gray-900"
                  >
                    {step.title}
                  </Text>
                  <Text as="p" variant="body-md" className="text-gray-600">
                    {step.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Text as="h2" variant="heading-2" className="mb-6 text-white">
            {content.cta.title}
          </Text>
          <Text as="p" variant="body-lg" className="mb-8 text-blue-100">
            {content.cta.description}
          </Text>
          <Button
            variant="primary"
            href={content.cta.buttonLink}
            target={
              content.cta.buttonLink.startsWith('http') ? '_blank' : undefined
            }
            rel={
              content.cta.buttonLink.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
          >
            {content.cta.buttonText}
          </Button>
        </div>
      </section>
    </main>
  );
}
