// components/BooksGrid.tsx
import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import BookCardSecond from "@/components/booksui/bookcardsecond";
import BookCardSkeleton from "@/components/booksui/bookskeleton";
import { Book } from "@/types/book";

interface Props {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

export default function BooksGrid({
  books,
  loading,
  error,
  totalPages,
  currentPage,
  setCurrentPage,
  isRTL,
  t,
}: Props) {
  return (
    <>
      {/* عرض الكتب أو skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Loading Skeleton */}
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))
        }

        {/* خطأ */}
        {!loading && error && (
          <p className="col-span-full text-red-500 text-center">{error}</p>
        )}

        {/* لا يوجد كتب */}
        {!loading && !error && books.length === 0 && (
          <p className="col-span-full text-center">{t("no_books_found")}</p>
        )}

        {/* عرض الكتب الفعلية */}
        {!loading && !error && books.length > 0 && books.map(book => (
          <BookCardSecond key={book.id} book={book} />
        ))}
      </div>

      {/* Material UI Pagination */}
      {!loading && !error && books.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
              shape="rounded"
              size="medium"
              dir={isRTL ? "rtl" : "ltr"}
            />
          </Stack>
        </div>
      )}
    </>
  );
}