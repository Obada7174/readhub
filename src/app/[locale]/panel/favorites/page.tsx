'use client';

import { useEffect, useState } from 'react';
import BookCardSecond from '@/components/booksui/bookcardsecond';
import { useLocale } from 'next-intl';
import { useUser } from '@/hooks/userContext';
import axios from 'axios';

interface Favorite {
  id: number;
  book: {
    id: number;
    title: string;
    ar_title: string;
    img: string;
    author: string;
    price: string;
    rating: string;
    total_pages: number;
    discounted_price?: string;
    discount?: string;
    description?: string;
    categories?: { id: number; title: string }[];
  };
}

export default function FavoriteBooksUI() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://127.0.0.1:5000/favorite/user/${user.id}`)
        .then((res) => setFavorites(res.data.data))
        .catch((err) => {
          console.error('❌ Failed to fetch favorites:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        {isRTL ? 'جاري التحميل...' : 'Loading...'}
      </div>
    );
  }

  return (
    <section
      className={`py-10 px-4 sm:px-8 md:px-12 ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <BookCardSecond key={fav.id} book={fav.book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          {isRTL ? 'لا توجد كتب مفضلة بعد.' : 'No favorite books yet.'}
        </div>
      )}
    </section>
  );
}
