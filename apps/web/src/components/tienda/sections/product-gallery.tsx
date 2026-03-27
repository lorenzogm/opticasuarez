import { useState } from "react";
import { resolveImage } from "~/lib/sanity";

interface ProductGalleryProps {
  // biome-ignore lint/suspicious/noExplicitAny: Sanity image data
  images: any[];
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: Sanity image data
  selectedColorImage?: any;
}

export default function ProductGallery({
  images,
  name,
  selectedColorImage,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const colorImageUrl = resolveImage(selectedColorImage);
  const allImages = colorImageUrl ? [selectedColorImage, ...images] : images;

  const activeUrl = resolveImage(allImages[activeIndex]) || "";

  return (
    <div>
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        {activeUrl ? (
          <img
            alt={name}
            className="h-full w-full object-cover"
            src={activeUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <svg
              className="h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="mt-3 flex gap-2">
          {allImages.map(
            // biome-ignore lint/suspicious/noExplicitAny: Sanity image data
            (img: any, idx: number) => {
              const thumbUrl = resolveImage(img);
              return (
                <button
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                    idx === activeIndex
                      ? "border-sky-600"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  key={thumbUrl || idx}
                  onClick={() => setActiveIndex(idx)}
                  type="button"
                >
                  {thumbUrl ? (
                    <img
                      alt={`${name} - imagen ${idx + 1}`}
                      className="h-full w-full object-cover"
                      src={thumbUrl}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
