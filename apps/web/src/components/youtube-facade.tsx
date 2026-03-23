"use client";

import { useEffect, useRef, useState } from "react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubeFacade({
  videoId,
  title,
  className = "",
}: YouTubeFacadeProps) {
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
        rootMargin: "50px", // Load when 50px before entering viewport
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
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsLoaded(true);
    }
  };

  if (isLoaded) {
    return (
      <div className={className} ref={containerRef}>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
          frameBorder="0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`Play video: ${title}`}
      className={`${className} group relative cursor-pointer`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      role="button"
      tabIndex={0}
    >
      {/* Thumbnail Background */}
      <img
        alt={`Video thumbnail: ${title}`}
        className="h-full w-full object-cover"
        loading={isIntersecting ? "eager" : "lazy"}
        src={thumbnailUrl}
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-all duration-300 group-hover:bg-opacity-30">
        <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg
            className="ml-1 h-6 w-6 text-white md:h-8 md:w-8"
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
          <link href="https://www.youtube.com" rel="preconnect" />
          <link href="https://www.google.com" rel="preconnect" />
        </>
      )}
    </div>
  );
}
