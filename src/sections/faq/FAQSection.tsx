"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FaqSection({ faqPath }: { faqPath: string }) {
    const t = useTranslations(faqPath);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = t.raw('faqs') as Array<{ question: string; answer: string }>;

    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-700">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {t('sectionTitle')}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        {t('sectionDescription')}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
                        >
                            <button
                                onClick={() => toggleAnswer(index)}
                                className="cursor-pointer w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-medium">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-90'
                                    }`}
                            >
                                <div className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-300">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}