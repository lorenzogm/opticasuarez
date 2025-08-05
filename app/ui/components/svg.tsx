interface SvgProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function Svg({ src, alt, className, width, height }: SvgProps) {
  // Get the base path from the environment
  const basePath = import.meta.env.PROD ? '/opticasuarez-new' : '';
  
  // Handle relative paths that start with '/'
  const svgSrc = src.startsWith('/') ? `${basePath}${src}` : src;

  return (
    <img
      src={svgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  );
}