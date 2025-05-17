"use client";

import Image from "next/image";
import { Book } from "@/types/book";
import BookCarousel from "@/components/Carousel";
import "swiper/css";
import "swiper/css/pagination";

// البيانات الأصلية للكتب
const booksRaw = [
  {
    id: 1,
    title: "Prisoner of Mirrors",
    description: "A compelling exploration of identity and societal expectations in modern Kuwait.",
    img: "/assets/Prisoner of Mirrors.jpeg",
    price: "12.99",
    rating: 4.2,
    publishedDate: "2010",
  },
  {
    id: 2,
    title: "The Bamboo Stalk",
    description: "A story of a young man caught between cultures, winner of the Arabic Booker Prize.",
    img: "/assets/The Bamboo Stalk.jpeg",
    price: "14.99",
    rating: 4.6,
    publishedDate: "2012",
  },
  {
    id: 3,
    title: "Mama Hissa’s Mice",
    description: "A dystopian novel depicting the consequences of sectarianism and silence.",
    img: "/assets/Mama Hissa’s Mice.jpeg",
    price: "13.49",
    rating: 4.4,
    publishedDate: "2015",
  },
  {
    id: 4,
    title: "Pigeons of the House: The Riddle of Ibn Azraq",
    description: "A mysterious and layered novel about legacy, family, and urban myths.",
    img: "/assets/Pigeons of the House.jpeg",
    price: "15.00",
    rating: 4.1,
    publishedDate: "2017",
  },
  {
    id: 5,
    title: "Saleha’s Camel",
    description: "An allegorical tale exploring generational memory and resilience.",
    img: "/assets/Saleha’s Camel.jpeg",
    price: "11.99",
    rating: 4.0,
    publishedDate: "2019",
  },
  {
    id: 6,
    title: "The Cloak Chronicle",
    description: "Book One of the Mud City Trilogy—introducing the mysterious world of Cloak.",
    img: "/assets/The Cloak Chronicle.jpeg",
    price: "16.99",
    rating: 4.3,
    publishedDate: "2023",
  },
  {
    id: 7,
    title: "The Hill Chronicle",
    description: "Book Two of the Mud City Trilogy—where secrets of the Hill are unveiled.",
    img: "/assets/The Hill Chronicle.jpeg",
    price: "16.99",
    rating: 4.5,
    publishedDate: "2023",
  },
  {
    id: 8,
    title: "The Anfooz Chronicle",
    description: "Final book in the Mud City Trilogy—a climactic conclusion to the saga.",
    img: "/assets/The Anfooz Chronicle.jpeg",
    price: "17.49",
    rating: 4.7,
    publishedDate: "2024",
  },
];

// تحويل البيانات إلى كائنات Book
const convertedBooks: Book[] = booksRaw.map((b) => ({
  id: b.id,
  title: b.title,
  description: b.description,
  img: b.img.startsWith("/") ? b.img : `/${b.img}`,
  author: "Saud Alsanousi",
  price: b.price,
  discount: "0%",
  pdf: "#", // رابط وهمي
  rating: b.rating.toFixed(1),
  rating_count: 0,
  total_pages: 0,
  total_ratings: 0,
  created_at: b.publishedDate,
  categories: [],
}));

export default function AuthorProfile() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-10 text-neutral-900 dark:text-neutral-100">
      {/* القسم العلوي */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <Image
            src="/assets/saud.jpeg"
            alt="Saud Alsanousi"
            width={200}
            height={300}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-1">Saud Alsanousi</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Member Since: April 2011
            </p>
          </div>

          {/* السيرة الذاتية */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Biography</h2>
            <p className="leading-relaxed">
              Saud Alsanousi is a Kuwaiti writer and novelist. His works explore
              identity, society, and history, often reflecting cultural conflicts
              and personal introspection.
            </p>
          </section>

          {/* الأعمال المنشورة */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Published Works</h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li><strong>Prisoner of Mirrors</strong>, 2010</li>
              <li><strong>The Bamboo Stalk</strong>, 2012</li>
              <li><strong>Mama Hissa’s Mice</strong>, 2015</li>
              <li><strong>Pigeons of the House: The Riddle of Ibn Azraq</strong>, 2017</li>
              <li><strong>Saleha’s Camel</strong>, 2019</li>
              <li>
                <strong>Chronicles of the Mud City</strong> (Trilogy):
                <ul className="ml-5 list-disc">
                  <li>The Cloak Chronicle, 2023</li>
                  <li>The Hill Chronicle, 2023</li>
                  <li>The Anfooz Chronicle, 2024</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* الجوائز */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Awards & Recognition
        </h2>
        <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-1 leading-relaxed">
          <li>
            Layla Al-Othman Prize for Youth Creativity in Story and Novel, for <em>Prisoner of Mirrors</em> (2010)
          </li>
          <li>
            First place in “Stories on Air” competition by Al-Arabi Magazine and BBC Arabic for <em>The Bonsai and the Old Man</em> (2011)
          </li>
          <li>
            State Encouragement Prize in Literature for <em>The Bamboo Stalk</em> (2012)
          </li>
          <li>
            International Prize for Arabic Fiction (Arabic Booker) for <em>The Bamboo Stalk</em> (2013)
          </li>
          <li>
            Named Cultural Personality of the Year
          </li>
        </ul>
      </section>

      {/* كتب المؤلف - Swiper */}
      {convertedBooks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Books by the Author</h2>
          <BookCarousel books={convertedBooks} />
        </div>
      )}
    </div>
  );
}
