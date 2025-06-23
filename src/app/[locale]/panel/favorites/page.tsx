'use client';

import BookCardSecond from '@/components/booksui/bookcardsecond';
import { useLocale } from 'next-intl';

const mockFavorites = [
  {
    id: 1,
    book: {
      id: 24,
      title: 'The Fault in Our Stars',
      ar_title: 'خطأ في نجومنا',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71hTq4TwxBL.jpg',
      author: 'John Green',
      price: '$8.49',
      rating: '4.5',
      total_pages: 313,
      description: 'A novel about love, life, and dealing with terminal illness.',
    },
  },
  {
    id: 2,
    book: {
      id: 22,
      title: 'The Girl on the Train',
      ar_title: 'الفتاة على القطار',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71hTq4TwxBL.jpg',
      author: 'Paula Hawkins',
      price: '$10.79',
      rating: '4.3',
      total_pages: 336,
      description: 'A psychological thriller that will keep you guessing.',
    },
  },
];

export default function FavoriteBooksUI() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      className={`py-10 px-4 sm:px-8 md:px-12 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
    {/* Favorite Books Grid */}
      {Array.isArray(mockFavorites) && mockFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFavorites.map((fav) => (
            <BookCardSecond key={fav.id} book={fav.book} />
          ))}
        </div>
      ) : (
        // Empty State Message
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          لا توجد كتب مفضلة بعد.
        </div>
      )}
    </section>
  );
}
