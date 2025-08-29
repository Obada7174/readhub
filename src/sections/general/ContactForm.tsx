'use client';
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import emailjs from 'emailjs-com';
import { toast } from 'sonner';
import { useLottieAnimation } from '@/hooks/general/useLottieAnimation';
import { LuSend } from 'react-icons/lu';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export const ContactForm = () => {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const { data: animationData, isLoading, isError } = useLottieAnimation('/animations/contact.json');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loadingToastId = toast.loading(t('sending'));


        try {
            await emailjs.send(
                "service_wpfoxia",
                "template_xnts3qc",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: process.env.CONTACT_EMAIL,
                },
                "occK0R9gQoC6Lfhz4"
            );

            toast.success(t('success'), { id: loadingToastId });

            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            toast.error(t('error'), { id: loadingToastId });
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-10">
            <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-xl p-8 rounded-2xl transition-all">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    {t('title')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">{t('name')}</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={t('name')}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">{t('email')}</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={t('email')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">{t('message')}</label>
                        <textarea
                            name="message"
                            placeholder={t('message')}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 transition resize-none"
                        ></textarea>
                    </div>
                    <Button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 text-sm hover:!bg-gray-900/80 text-white font-medium py-3 rounded-xl transition"
                    >
                        <LuSend className="w-4 h-4" />
                        {t('send')}
                    </Button>


                </form>
            </div>
            <div className="w-full md:w-1/2">
                {/* <Lottie animationData={contactAnimation} loop className="w-full h-auto max-h-[400px] md:-translate-y-12" /> */}
                {/* <div className="w-full md:w-1/2 flex justify-center"> */}
                {isLoading ? (
                    <p>{t('loading')}</p>
                ) : isError ? (
                    <p>{t('animationError')}</p>
                ) : (
                    <Lottie animationData={animationData} loop autoplay className="w-full h-auto max-h-[400px] md:-translate-y-12" />
                )}
                {/* </div> */}
            </div>
        </div>
    );
};
