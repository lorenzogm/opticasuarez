import { useState } from 'react';
import { Text } from '../../../components/text';
import { Button } from '../../../components/button';

interface FormData {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  successMessage: string;
  privacy: string;
}

interface ContactFormProps {
  title: string;
  subtitle: string;
  description: string;
  form: FormData;
}

export default function ContactForm({
  title,
  subtitle,
  description,
  form,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-900 text-white">
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
          <Text align="center" className="mb-4 text-blue-100">
            {subtitle}
          </Text>
          <Text
            variant="body-lg"
            align="center"
            className="text-gray-300 max-w-2xl mx-auto"
          >
            {description}
          </Text>
        </div>

        {isSubmitted ? (
          <div className="bg-green-600 text-white p-6 rounded-lg text-center">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <Text>{form.successMessage}</Text>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  {form.nameLabel} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder={form.namePlaceholder}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  {form.emailLabel} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder={form.emailPlaceholder}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  {form.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder={form.phonePlaceholder}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  {form.subjectLabel} *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder={form.subjectPlaceholder}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                {form.messageLabel} *
              </label>
              <textarea
                id="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
                placeholder={form.messagePlaceholder}
              />
            </div>

            {/* Privacy Notice */}
            <div className="text-xs text-gray-400">{form.privacy}</div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                {form.submitButton}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
