import { useState } from "react";
import { Button } from "../../../components/button";
import { Text } from "../../../components/text";

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
    <section className="bg-gray-900 py-16 text-white sm:py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <Text
            align="center"
            as="h2"
            className="mb-4 uppercase tracking-wide"
            variant="heading-2"
          >
            {title}
          </Text>
          <Text align="center" className="mb-4 text-blue-100">
            {subtitle}
          </Text>
          <Text
            align="center"
            className="mx-auto max-w-2xl text-gray-300"
            variant="body-lg"
          >
            {description}
          </Text>
        </div>

        {isSubmitted ? (
          <div className="rounded-lg bg-green-600 p-6 text-center text-white">
            <svg
              className="mx-auto mb-4 h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <Text>{form.successMessage}</Text>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-300 text-sm"
                  htmlFor="name"
                >
                  {form.nameLabel} *
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="name"
                  placeholder={form.namePlaceholder}
                  required
                  type="text"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-300 text-sm"
                  htmlFor="email"
                >
                  {form.emailLabel} *
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="email"
                  placeholder={form.emailPlaceholder}
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Phone */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-300 text-sm"
                  htmlFor="phone"
                >
                  {form.phoneLabel}
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="phone"
                  placeholder={form.phonePlaceholder}
                  type="tel"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-300 text-sm"
                  htmlFor="subject"
                >
                  {form.subjectLabel} *
                </label>
                <input
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  id="subject"
                  placeholder={form.subjectPlaceholder}
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                className="mb-2 block font-medium text-gray-300 text-sm"
                htmlFor="message"
              >
                {form.messageLabel} *
              </label>
              <textarea
                className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                id="message"
                placeholder={form.messagePlaceholder}
                required
                rows={6}
              />
            </div>

            {/* Privacy Notice */}
            <div className="text-gray-400 text-xs">{form.privacy}</div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                className="bg-blue-600 px-8 hover:bg-blue-700"
                type="submit"
                variant="primary"
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
