'use client';

import { useTranslations, useLocale } from 'next-intl';
import FavoriteCard from '@/components/panel/favoritecard';
import { useFavoriteBooks } from '@/hooks/favoritepanel/usefavpanel';
import FavoriteCardSkeleton from '@/components/panel/favcardskelton';

export default function FavoriteBooksUI() {
  const t = useTranslations('Panel.favorites');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { favorites, loading } = useFavoriteBooks();

  if (loading) {
    return (
      <section
        className={`max-w-7xl mx-auto p-6 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-white ">
          {t('title')}
        </h2>

        <ul className="flex flex-col items-center gap-6">
          {[...Array(3)].map((_, idx) => (
            <FavoriteCardSkeleton key={idx} />
          ))}
        </ul>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        {t('empty')}
      </div>
    );
  }

  return (
    <section
      className={`max-w-7xl mx-auto p-6 ${isRTL ? 'text-right' : 'text-left'}`}
    >
      <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-white text-center">
        {t('title')}
      </h2>

      <ul className="flex flex-col items-center gap-6">
        {favorites.map((fav) => (
          <FavoriteCard key={fav.id} book={fav.book} />
        ))}
      </ul>
    </section>
  );
}
