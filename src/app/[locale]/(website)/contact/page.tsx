import { ContactForm } from "@/sections/general/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <ContactForm />
      </div>
    </div>
  );
}
