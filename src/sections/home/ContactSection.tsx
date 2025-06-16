'use client';
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';
import { useLottieAnimation } from '@/hooks/general/useLottieAnimation';
import { LuSend } from 'react-icons/lu';
import Button from '@/components/ui/Button';

interface FormData {
    email: string;
    message: string;
}

const HomeContactSection = () => {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState<FormData>({
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
        const toastId = toast.loading(t('sending'));

        try {
            await emailjs.send(
                'service_wpfoxia',
                'template_xnts3qc',
                {
                    from_email: formData.email,
                    message: formData.message,
                    to_email: process.env.CONTACT_EMAIL,
                },
                'occK0R9gQoC6Lfhz4'
            );

            toast.success(t('success'), { id: toastId });
            setFormData({ email: '', message: '' });
        } catch (error) {
            toast.error(t('error'), { id: toastId });
            console.error(error);
        }
    };

    return (
        <section className="py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/3 flex justify-center">
                    {isLoading ? (
                        <p className="text-gray-500 dark:text-gray-400">{t('loading')}</p>
                    ) : isError ? (
                        <p className="text-red-500">{t('animationError')}</p>
                    ) : (
                        <Lottie
                            animationData={animationData}
                            loop
                            autoplay
                            className="w-[350px] h-[350px]"
                        />
                    )}
                </div>

                {/* Contact Form Section */}
                <div className="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                        {t('title')}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder={t('email')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />

                        <textarea
                            name="message"
                            placeholder={t('message')}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition"
                        ></textarea>

                        <Button
                            type="submit"
                            variant='outline'
                            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium "
                        >
                            <LuSend className="w-4 h-4" />
                            {t('send')}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HomeContactSection;
