'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useTranslations}  from 'next-intl';

const books = [
    {
        id: 1,
        title: 'The Midnight Library',
        author: 'Matt Haig',
        cover: 'https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg',
        rating: 4.6,
    },
    {
        id: 2,
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        cover: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg',
        rating: 4.8,
    },
    {
        id: 3,
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        cover: 'https://m.media-amazon.com/images/I/81BE7eeKzAL.jpg',
        rating: 4.7,
    },
    {
        id: 4,
        title: 'Can’t Hurt Me',
        author: 'David Goggins',
        cover: 'https://m.media-amazon.com/images/I/61x1FQq8G+L.jpg',
        rating: 4.9,
    },
    {
        id: 5,
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        cover: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg',
        rating: 4.4,
    },
    {
        id: 6,
        title: 'Deep Work',
        author: 'Cal Newport',
        cover: 'https://m.media-amazon.com/images/I/71UgkB9E+PL.jpg',
        rating: 4.5,
    },
    {
        id: 7,
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        cover: 'https://m.media-amazon.com/images/I/71HMyqG6MRL.jpg',
        rating: 4.3,
    },
];

const TopRatedBooks = () => {
    const t = useTranslations();


    return (
        <section className="px-6 md:px-16 py-16 transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t('topRatedBooks')}
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
                    <SwiperSlide key={book.id}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-3 flex flex-col items-center text-center scale-95 hover:scale-100">
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="w-[100px] h-[150px] object-cover rounded-md mb-3 shadow-sm"
                            />
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{book.author}</p>
                            <span className="text-yellow-500 text-xs font-medium">⭐ {book.rating}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TopRatedBooks;
