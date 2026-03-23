import { Link } from 'react-router';

interface NewsProps {
  title: string;
  buttonText: string;
  url: string;
}

export default function News({ title, buttonText, url }: NewsProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
        <Link
          to={url}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
