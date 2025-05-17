"use client";

import  BookCard  from "@/components/booksui/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Book } from "@/types/book";

interface Props {
    books: Book[];
}

export default function BookCarousel({ books }: Props) {
    return (
        <div
            className="relative group w-full overflow-hidden py-4"
            onMouseEnter={() => {
                const swiperEl = document.querySelector(".swiper") as any;
                swiperEl?.swiper?.autoplay?.stop();
            }}
            onMouseLeave={() => {
                const swiperEl = document.querySelector(".swiper") as any;
                swiperEl?.swiper?.autoplay?.start();
            }}
        >
            <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={16}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}
                className="swiper"
            >
              {Array.isArray(books) && books.map((book) => (
  <SwiperSlide
    key={book.id}
    className="w-[200px] md:w-[240px] lg:w-[280px] shrink-0"
    style={{ width: "auto" }}
  >
    <BookCard book={book} />
  </SwiperSlide>
))}

            </Swiper>
        </div>
    );
}
