'use client';

import { LuStar, LuBookOpen } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Category {
  id: number;
  title: string;
}

interface FavoriteCardProps {
  book: {
    id: number;
    title: string;
    img: string;
    author: string;
    description?: string;
    price: string;
    rating: string;
    total_pages?: number;
    discounted_price?: string;
    categories?: Category[];
  };
}

export default function FavoriteCard({ book }: FavoriteCardProps) {
  const t = useTranslations('Panel.favorites');

  const {
    title,
    img,
    author,
    description,
    price,
    rating,
    total_pages,
    discounted_price,
    categories = [],
  } = book;

  const hasDiscount = !!discounted_price && discounted_price !== price;

  return (
    <Link href={`/books/${book.id}`} className="cursor-pointer flex gap-4 p-4 rounded-2xl border border-gray-200 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md duration-200 transition-all max-w-xl w-full mx-auto">
      {/* Book Image */}
      <div className="min-w-[96px] h-36 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Book Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{author}</p>

          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-[11px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          {/* Price & Pages */}
          <div className="flex flex-col text-sm font-medium">
            <div className="flex gap-2 items-center">
              {hasDiscount ? (
                <>
                  <span className="line-through text-red-600 dark:text-red-400">
                    {price}
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    {discounted_price}
                  </span>
                </>
              ) : (
                <span className="text-[#36419B]">{price}</span>
              )}
            </div>

            {total_pages && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t('pages')} {total_pages}
              </span>
            )}
          </div>

          {/* Rating & Read Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {rating}
              <LuStar size={16} />
            </div>
            <button
              className="flex items-center gap-1 text-sm text-[#36419B] hover:underline"
              title={t('read')}
            >
              <LuBookOpen size={18} />
              {t('read')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
