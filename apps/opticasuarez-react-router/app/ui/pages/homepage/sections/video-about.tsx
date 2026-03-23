import YouTubeFacade from '../../../components/youtube-facade';

interface VideoAboutProps {
  title: string;
  description: string;
  videoId: string;
}

export default function VideoAbout({
  title,
  description,
  videoId,
}: VideoAboutProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video */}
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <YouTubeFacade
              videoId={videoId}
              title={title}
              className="w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
