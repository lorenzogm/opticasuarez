interface SocialMediaItem {
  title: string;
  handle: string;
  url: string;
}

interface SocialMediaProps {
  instagram: SocialMediaItem;
  facebook: SocialMediaItem;
}

export default function SocialMedia({ instagram, facebook }: SocialMediaProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Instagram */}
          <div className="text-center">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.987-5.366 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                {instagram.title}
              </h3>
              <p className="text-gray-600">{instagram.handle}</p>
            </a>
          </div>

          {/* Facebook */}
          <div className="text-center">
            <a
              href={facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {facebook.title}
              </h3>
              <p className="text-gray-600">{facebook.handle}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
