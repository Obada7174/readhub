"use client";
import React from "react";
import FilterHorizontal from "@/components/booksui/filterbooks";
import { Input } from "@/components/ui/Input";
import { LuSearch } from "react-icons/lu";

interface Props {
  categories: { id: number; title: string }[];
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: string | null;
  setPriceRange: (range: string) => void;
  rating: number | null;
  setRating: (value: number | null) => void;
  lang: string | null;
  setLang: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function BooksFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  lang,
  setLang,


  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between rounded-lg shadow p-4">
      {/* Search Bar */}
      <div className="min-w-[250px]">
        <div className="relative">
          <Input
            type="search"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          />
          <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {/* FilterHorizontal */}
      <div className="flex-1 min-w-[300px] overflow-x-auto">
        <FilterHorizontal
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
          selectedLanguage={lang || "en"}
          setSelectedLanguage={setLang}
        />
      </div>
    </div>
  );
}