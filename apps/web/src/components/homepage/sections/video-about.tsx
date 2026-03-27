import YouTubeFacade from "~/components/youtube-facade";

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
    <section className="bg-gray-50 px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Video */}
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-200 shadow-lg">
            <YouTubeFacade
              className="h-full w-full"
              title={title}
              videoId={videoId}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h1 className="font-bold text-3xl text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
