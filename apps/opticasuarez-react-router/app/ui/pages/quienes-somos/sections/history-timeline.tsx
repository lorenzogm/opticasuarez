'use client';

import { useEffect, useRef, useState } from 'react';
import { Text } from '../../../components/text';
import Image from '../../../components/image';

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
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(timeline.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentRefs = itemRefs.current;
    const observers = currentRefs.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px'
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
    <section className="bg-gray-50 py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <Text
          as="h2"
          variant="heading-2"
          align="center"
          className="mb-12 text-gray-900 uppercase tracking-wide"
        >
          {title}
        </Text>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2 hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-20">
            {timeline.map((item, index) => (
              <div
                key={index}
                ref={el => {
                  itemRefs.current[index] = el;
                }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } transition-all duration-1000 ease-out ${
                  visibleItems[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block shadow-lg" />
                
                <div className="lg:w-1/2 flex justify-center">
                  <figure className={`w-64 h-64 rounded-full overflow-hidden shadow-lg transition-all duration-700 delay-300 ${
                    visibleItems[index] ? 'scale-100' : 'scale-75'
                  }`}>
                    <Image
                      src={item.image}
                      alt={`${item.year}: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                </div>

                <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-700 delay-500 ${
                  visibleItems[index] ? 'opacity-100 translate-x-0' : `opacity-0 ${
                    index % 2 === 0 ? 'translate-x-8' : '-translate-x-8'
                  }`
                }`}>
                  <Text
                    as="h3"
                    variant="heading-3"
                    className="mb-4 text-blue-900 uppercase tracking-wide"
                  >
                    {item.year}: {item.title}
                  </Text>
                  <Text
                    variant="body-lg"
                    className="text-gray-700 leading-relaxed"
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
