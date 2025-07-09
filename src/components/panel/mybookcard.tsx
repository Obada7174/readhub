'use client';

import { LuStar, LuBookOpen, LuDownload } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

interface MyBookCardProps {
  book: {
    id: number;
    title: string;
    img: string;
    author: string;
    description?: string;
    price: string;
    discounted_price?: string;
    rating: string;
    total_pages?: number;
    file_url?: string;
    categories?: { id: number; title: string }[];
  };
}

export default function MyBookCard({ book }: MyBookCardProps) {
  const t = useTranslations('Panel.MyBooks');

  const {
    title,
    img,
    author,
    description,
    price,
    discounted_price,
    rating,
    total_pages,
    file_url,
    categories = [],
  } = book;

  const hasDiscount = discounted_price && discounted_price !== price;

  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all max-w-xl w-full mx-auto">
      <div className="min-w-[100px] h-[150px] rounded-xl overflow-hidden bg-gray-100">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{author}</p>

          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
          )}

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-[11px] bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded-full"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col text-sm font-medium">
            {hasDiscount ? (
              <div className="flex gap-2 items-center">
                <span className="line-through text-red-500">{price}</span>
                <span className="text-green-600 font-semibold">{discounted_price}</span>
              </div>
            ) : (
              <span className="text-[#36419B] font-semibold">{price}</span>
            )}
            {total_pages && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t('pages', { count: total_pages })}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              {rating}
              <LuStar size={16} />
            </div>

            {file_url && (
              <a
                href={file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-[#36419B] hover:underline"
                title={t('download')}
              >
                <LuDownload size={18} />
                {t('download')}
              </a>
            )}

            <button
              className="flex items-center gap-1 text-sm text-[#36419B] hover:underline"
              title={t('read')}
              onClick={() => {
                alert(t('openReading'));
              }}
            >
              <LuBookOpen size={18} />
              {t('read')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
