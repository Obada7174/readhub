"use client";
import React from "react";
import { useTranslation } from "react-i18next";

import BooksGrid from "@/components/booksui/booksGrid";
import BooksFilters from "@/components/booksui/BooksFilter";
import { useBookData } from "@/hooks/react-query/books/useBooksData";

export default function Page() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const {
    books,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    rating,
    setRating,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useBookData();

  return (
    <div className="min-h-screen py-6 px-4 space-y-6 container mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* فلاتر + مربع بحث */}
      <BooksFilters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        rating={rating}
        setRating={setRating}
      />

      {/* Grid + Pagination */}
      <BooksGrid
        books={books}
        loading={loading}
        error={error}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isRTL={isRTL}
        t={t}
      />
    </div>
  );
}