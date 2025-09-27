interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  title?: string;
}

export default function Image({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  priority = false,
  title,
}: ImageProps) {
  // Extract file extension and path
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);

  // Generate responsive image sources
  const generateWebPSources = (basePath: string) => {
    // For homepage services and locations, create multiple responsive sizes
    if (basePath.includes('/homepage/services/') || basePath.includes('/homepage/locations/')) {
      return [
        `${basePath}-320.webp 320w`,
        `${basePath}-640.webp 640w`,
        `${basePath}-800.webp 800w`,
        `${basePath}.webp 1200w`,
      ].join(', ');
    }
    // For partner images, use appropriate sizes for logos
    if (basePath.includes('/homepage/partners/')) {
      return [
        `${basePath}-200.webp 200w`,
        `${basePath}-400.webp 400w`,
        `${basePath}-800.webp 800w`,
        `${basePath}.webp 1200w`,
      ].join(', ');
    }
    // For blog images, use responsive sizes
    if (basePath.includes('/blog/')) {
      return [
        `${basePath}-320.webp 320w`,
        `${basePath}-640.webp 640w`,
        `${basePath}.webp 1000w`,
      ].join(', ');
    }
    // For team images, use smaller responsive sizes
    if (basePath.includes('/team/')) {
      return [
        `${basePath}-320.webp 320w`,
        `${basePath}-640.webp 640w`,
        `${basePath}-800.webp 800w`,
        `${basePath}.webp 800w`,
      ].join(', ');
    }
    // For quienes-somos timeline images, use standard responsive sizes
    if (basePath.includes('/quienes-somos/timeline/')) {
      return [
        `${basePath}-320.webp 320w`,
        `${basePath}-640.webp 640w`,
        `${basePath}-800.webp 800w`,
        `${basePath}.webp 800w`,
      ].join(', ');
    }
    // For control-miopia and vision-pediatrica images, use standard responsive sizes
    if (basePath.includes('/control-miopia/') || basePath.includes('/vision-pediatrica/')) {
      return [
        `${basePath}-320.webp 320w`,
        `${basePath}-640.webp 640w`,
        `${basePath}-800.webp 800w`,
        `${basePath}.webp 1200w`,
      ].join(', ');
    }
    // For other images, just provide the main webp version
    return `${basePath}.webp`;
  };

  const webpSrcSet = generateWebPSources(basePath);
  
  // Default sizes for responsive images
  const defaultSizes = sizes || (() => {
    if (basePath.includes('/homepage/services/')) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    if (basePath.includes('/homepage/locations/')) {
      return '(max-width: 768px) 100vw, 50vw';
    }
    if (basePath.includes('/homepage/partners/')) {
      return '(max-width: 640px) 200px, (max-width: 1024px) 400px, 800px';
    }
    if (basePath.includes('/blog/')) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px';
    }
    if (basePath.includes('/team/')) {
      return '(max-width: 640px) 320px, (max-width: 1024px) 640px, 800px';
    }
    if (basePath.includes('/quienes-somos/timeline/')) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    if (basePath.includes('/control-miopia/') || basePath.includes('/vision-pediatrica/')) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    return '100vw';
  })();

  return (
    <picture>
      {/* WebP sources with responsive sizes */}
      <source
        srcSet={webpSrcSet}
        sizes={defaultSizes}
        type="image/webp"
      />
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        title={title}
      />
    </picture>
  );
}
