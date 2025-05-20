"use client";
import React from "react";
import FilterHorizontal from "@/components/booksui/filterbooks";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/Input";
import { LuSearch } from "react-icons/lu";

interface Props {
  categories: { id: number; title: string }[];
  selectedCategory: string[];            
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;  
  priceRange: string | null;
  setPriceRange: (range: string) => void;
  rating: number | null;
  setRating: (value: number | null) => void;
}

export default function BooksFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  rating,
  setRating,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between rounded-lg shadow p-4">
      {/* Search Bar */}
      <div className="min-w-[250px]">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search..."
            value={priceRange || ""}
            onChange={e => setPriceRange(e.target.value)}
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
          selectedLanguage="en"
          setSelectedLanguage={() => {}}
        />
      </div>
    </div>
  );
}