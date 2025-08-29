"use client";
import Link from "next/link";
import { LuStar, LuShoppingCart } from "react-icons/lu";
import { useLocale } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookCardSecond = ({ book }: any) => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}/book/${book.id}`} passHref>
      <div className="relative rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer h-full">
        <div className="relative w-full min-h-[420px]">
          <img
            src={book.img}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm line-clamp-2 hover:underline">
              {book.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-xs font-medium">
              {book.author}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
              {book.description}
            </p>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-900 dark:text-gray-100">
              <span>{book.price}</span>
              <span className="flex items-center gap-1 text-[#36419B]">
                {book.rating}
                <LuStar size={16} />
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <span>{book.total_pages} pages</span>
              <button
                className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                aria-label="Add to cart"
              >
                <LuShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCardSecond;
