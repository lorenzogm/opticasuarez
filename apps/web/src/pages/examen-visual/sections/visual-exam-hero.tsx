import { useEffect } from "react";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

interface VisualExamHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function VisualExamHero({
  title,
  subtitle,
  backgroundImage,
}: VisualExamHeroProps) {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(
        ".parallax-element"
      ) as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-32 sm:px-6">
      <div className="parallax-element absolute inset-0">
        <Image
          alt={title}
          className="h-full w-full scale-110 transform object-cover"
          priority
          sizes="100vw"
          src={backgroundImage}
        />
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl text-center">
        <Text
          as="h1"
          className="mb-8 text-white uppercase tracking-wide drop-shadow-lg"
          variant="heading-1"
        >
          {title}
        </Text>
        <Text
          as="p"
          className="mx-auto max-w-3xl text-white drop-shadow-lg"
          variant="body-lg"
        >
          {subtitle}
        </Text>
      </div>
    </section>
  );
}
