'use client';

import { LuStar, LuBookOpen, LuDownload } from 'react-icons/lu';
import { useLocale } from 'next-intl';

interface Props {
  book: {
    id: number;
    title: string;
    ar_title?: string;
    img: string;
    author: string;
    rating: string;
    total_pages: number;
    file_url: string;
    description?: string;
  };
}

const PurchasedBookCard = ({ book }: Props) => {
  const locale = useLocale();

  return (
    <div className="relative w-[220px] h-[500px] rounded-[10px] border border-gray-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
      {/* Cover Image */}
      <div className="relative w-full h-[330px] overflow-hidden">
  <img
    src={book.img}
    alt={book.title}
    className="w-full h-full object-cover"
  />
</div>


      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 hover:underline mb-1">
            {locale === 'ar' && book.ar_title ? book.ar_title : book.title}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 text-xs font-medium mb-1">
            {book.author}
          </p>

          {book.description && (
            <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3 mb-2">
              {book.description}
            </p>
          )}
        </div>

        <div>
          {/* Rating and Pages */}
          <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <span className="flex items-center gap-1 text-yellow-500">
              {book.rating}
              <LuStar size={16} />
            </span>
            <span className="text-xs">
              {book.total_pages} pages
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center gap-2">
            <a
              href={book.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex-1 flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition"
            >
              <LuBookOpen size={14} />
              Read
            </a>
            <a
              href={book.file_url}
              download
              className="text-xs flex-1 flex items-center justify-center gap-1 text-blue-600 border border-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded transition"
            >
              <LuDownload size={14} />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedBookCard;