import { Link } from "react-router";

interface NewsProps {
  title: string;
  buttonText: string;
  url: string;
}

export default function News({ title, buttonText, url }: NewsProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="mb-8 font-bold text-2xl text-gray-900 uppercase tracking-wide sm:text-3xl">
          {title}
        </h3>
        <Link
          className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-lg text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 hover:shadow-xl"
          to={url}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
