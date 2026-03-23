'use client';

import { useState, useEffect, useRef } from 'react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubeFacade({ videoId, title, className = '' }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // Intersection Observer to detect when video comes into view
  useEffect(() => {
    const currentContainer = containerRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        root: null,
        rootMargin: '50px', // Load when 50px before entering viewport
        threshold: 0.1,
      }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  const handleClick = () => {
    setIsLoaded(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsLoaded(true);
    }
  };

  if (isLoaded) {
    return (
      <div className={className} ref={containerRef}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} relative cursor-pointer group`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${title}`}
    >
      {/* Thumbnail Background */}
      <img
        src={thumbnailUrl}
        alt={`Video thumbnail: ${title}`}
        className="w-full h-full object-cover"
        loading={isIntersecting ? 'eager' : 'lazy'}
      />
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Preconnect hint when hovering */}
      {isIntersecting && (
        <>
          <link rel="preconnect" href="https://www.youtube.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </>
      )}
    </div>
  );
}