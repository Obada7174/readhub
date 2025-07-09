'use client';

import { useTranslations, useLocale } from 'next-intl';
import FavoriteCard from '@/components/panel/favoritecard';
 // ⬅️ استدعاء الـ Skeleton
import { useFavoriteBooks } from '@/hooks/favoritepanel/usefavpanel';
import FavoriteCardSkeleton from '@/components/panel/favcardskelton';

export default function FavoriteBooksUI() {
  const t = useTranslations('Panel.favorites');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { favorites, loading } = useFavoriteBooks();

  return (
    <section
      className={`py-10 px-4 sm:px-8 md:px-12 max-w-xl mx-auto ${
        isRTL ? 'text-right' : 'text-left'
      }`}
    >
      {loading ? (
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, idx) => (
            <FavoriteCardSkeleton key={idx} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="flex flex-col gap-6">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} book={fav.book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          {t('empty')}
        </div>
      )}
    </section>
  );
}
