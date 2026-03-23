"use client";

import { useEffect, useRef, useState } from "react";
import Image from "../../../components/image";
import { Text } from "../../../components/text";

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
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(timeline.length).fill(false)
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentRefs = itemRefs.current;
    const observers = currentRefs.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && currentRefs[index]) {
          observer.disconnect();
        }
      });
    };
  }, [timeline.length]);

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          align="center"
          as="h2"
          className="mb-12 text-gray-900 uppercase tracking-wide"
          variant="heading-2"
        >
          {title}
        </Text>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="-translate-x-1/2 absolute top-0 bottom-0 left-1/2 hidden w-1 transform bg-blue-200 lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {timeline.map((item, index) => (
              <div
                className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } transition-all duration-1000 ease-out ${
                  visibleItems[index]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                {/* Timeline dot */}
                <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 hidden h-4 w-4 transform rounded-full bg-blue-600 shadow-lg lg:block" />

                <div className="flex justify-center lg:w-1/2">
                  <figure
                    className={`h-64 w-64 overflow-hidden rounded-full shadow-lg transition-all delay-300 duration-700 ${
                      visibleItems[index] ? "scale-100" : "scale-75"
                    }`}
                  >
                    <Image
                      alt={`${item.year}: ${item.title}`}
                      className="h-full w-full object-cover"
                      src={item.image}
                    />
                  </figure>
                </div>

                <div
                  className={`text-center transition-all delay-500 duration-700 lg:w-1/2 lg:text-left ${
                    visibleItems[index]
                      ? "translate-x-0 opacity-100"
                      : `opacity-0 ${
                          index % 2 === 0 ? "translate-x-8" : "-translate-x-8"
                        }`
                  }`}
                >
                  <Text
                    as="h3"
                    className="mb-4 text-blue-900 uppercase tracking-wide"
                    variant="heading-3"
                  >
                    {item.year}: {item.title}
                  </Text>
                  <Text
                    className="text-gray-700 leading-relaxed"
                    variant="body-lg"
                  >
                    {item.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
