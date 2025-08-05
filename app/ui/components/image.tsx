interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Image({ src, alt, className, width, height }: ImageProps) {
  // Get the base path from the environment
  const basePath = import.meta.env.PROD ? '/opticasuarez-new' : '';
  
  // Handle relative paths that start with '/'
  const imageSrc = src.startsWith('/') ? `${basePath}${src}` : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}