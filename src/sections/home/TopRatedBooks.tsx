'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useTranslations}  from 'next-intl';


const TopRatedBooks = () => {
    const t = useTranslations("HomePage.topRatedSection");
    const books = [1];

    return (
        <section className="px-6 md:px-16 py-16 transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t("topRatedBooks")}
            </h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={2.2}
                navigation
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 3.2 },
                    768: { slidesPerView: 4.2 },
                    1024: { slidesPerView: 5.2 },
                    1280: { slidesPerView: 6.2 },
                }}
                className="group"
            >
                {books.map((book) => (
                    <SwiperSlide key={book}>
                        BookCard
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TopRatedBooks;
