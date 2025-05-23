// hooks/useBookData.ts
import { useState, useEffect } from "react";
import { ApiResponse, Book, CategoryOption } from "@/types/book";

export function useBookData() {
  // States
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [newest, setNewest] = useState(false);
  const [highestRated, setHighestRated] = useState(false);
  const [lang, setLang] = useState<string | null>(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const langFromUrl = params.get("lang");
    if (langFromUrl) {
      setLang(langFromUrl);
    } else {
      const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";
      setLang(browserLang);
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        if (priceRange === "Free") {
          params.append("maxPrice", "0");
        } else if (priceRange === "$0 - $10") {
          params.append("minPrice", "0");
          params.append("maxPrice", "10");
        } else if (priceRange === "$10 - $20") {
          params.append("minPrice", "10");
          params.append("maxPrice", "20");
        } else if (priceRange === "$20+") {
          params.append("minPrice", "20");
        }

        if (minPrice !== null) params.append("minPrice", minPrice.toString());
        if (maxPrice !== null) params.append("maxPrice", maxPrice.toString());

        if (rating) params.append("minRating", rating.toString());
        if (selectedCategory.length) params.append("categoryIds", selectedCategory.join(","));
        if (newest) params.append("newest", "true");
        if (highestRated) params.append("highestRated", "true");
        if (lang) params.append("lang", lang); 
        params.append("page", currentPage.toString());
        params.append("limit", "12");
        window.history.replaceState(null, "", `?${params.toString()}`);
        const res = await fetch(`http://127.0.0.1:5000/books?${params.toString()}`, {
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch books");

        const json: ApiResponse = await res.json();

        let filteredBooks = [...json.data];

        if (selectedCategory.length) {
          filteredBooks = filteredBooks.filter(book =>
            book.categories.some(cat => selectedCategory.includes(cat.id.toString()))
          );
        }

        setBooks(filteredBooks);
        setTotalPages(json.meta.total_pages);

        if (json.data.length > 0 && !categories.length) {
          const categoryMap = new Map<number, string>();
          json.data.forEach(book => {
            book.categories.forEach(cat => {
              if (!categoryMap.has(cat.id)) {
                categoryMap.set(cat.id, cat.title);
              }
            });
          });

          const categoryList = Array.from(categoryMap, ([id, title]) => ({ id, title }));
          setCategories(categoryList);
        }

      } catch (e: any) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const handler = setTimeout(fetchBooks, 400);
    return () => clearTimeout(handler);
  }, [
    searchQuery,
    priceRange,
    minPrice,
    maxPrice,
    rating,
    selectedCategory,
    newest,
    highestRated,
    currentPage,
    lang, 
  ]);

  return {
    books,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    selectedCategory,
    setSelectedCategory,
    newest,
    setNewest,
    highestRated,
    setHighestRated,
    lang,
    setLang, 
    currentPage,
    setCurrentPage,
    totalPages,
  };
}