import { Text } from '../components/text';
import { Button } from '../components/button';

interface SocialMediaItem {
  title: string;
  handle: string;
  url: string;
}

interface ContactSocialMediaProps {
  title: string;
  subtitle: string;
  instagram: SocialMediaItem;
  facebook: SocialMediaItem;
  youtube: SocialMediaItem;
}

export default function ContactSocialMedia({
  title,
  subtitle,
  instagram,
  facebook,
  youtube,
}: ContactSocialMediaProps) {
  return (
    <section className="py-16 sm:py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <Text
            as="h2"
            variant="heading-2"
            align="center"
            className="mb-4 uppercase tracking-wide"
          >
            {title}
          </Text>
          <Text
            variant="body-lg"
            colour="muted"
            align="center"
            className="max-w-2xl mx-auto"
          >
            {subtitle}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Instagram */}
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <Text as="h3" align="center" className="mb-2">
              {instagram.title}
            </Text>
            <Text variant="body-lg" colour="muted" align="center" className="mb-4">
              {instagram.handle}
            </Text>
            <Button
              variant="primary"
              href={instagram.url}
              className="w-full"
            >
              Seguir
            </Button>
          </div>

          {/* Facebook */}
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <Text as="h3" align="center" className="mb-2">
              {facebook.title}
            </Text>
            <Text variant="body-lg" colour="muted" align="center" className="mb-4">
              {facebook.handle}
            </Text>
            <Button
              variant="primary"
              href={facebook.url}
              className="w-full"
            >
              Seguir
            </Button>
          </div>

          {/* YouTube */}
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <Text as="h3" align="center" className="mb-2">
              {youtube.title}
            </Text>
            <Text variant="body-lg" colour="muted" align="center" className="mb-4">
              {youtube.handle}
            </Text>
            <Button
              variant="primary"
              href={youtube.url}
              className="w-full"
            >
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}