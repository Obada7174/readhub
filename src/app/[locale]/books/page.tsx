"use client";
import { useState } from "react";
import FilterSidebar from "@/components/Sidebar";
import BookCardSecond from "@/components/BookCardSecond";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    description: "The Great Gatsby is a timeless classic that explores themes of wealth, love, and the American Dream...",
    author: "F. Scott Fitzgerald",
    price: "$10",
    language: "en",
    discount: "10%",
    image: "/assets/download1.jpg",
    pdf: "https://www.planetebook.com/free-ebooks/the-great-gatsby.pdf",
    category: "Novel",
    rating: 4.5,
  },
  {
    id: 2,
    title: "موسوعة المعرفة",
    description: "تُعد موسوعة المعرفة مرجعًا شاملاً يحتوي على معلومات موسوعية...",
    author: "ف. سكوت فيتزجيرالد",
    price: "$15",
    language: "ar",
    discount: "15%",
    image: "https://upload.wikimedia.org/wikipedia/ar/1/17/المعرفة_العامة.jpg",
    pdf: "https://example.com/maarefa.pdf",
    category: "Science",
    rating: 4.2,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    description: "Harper Lee’s Pulitzer Prize-winning novel delves into issues of race and injustice...",
    author: "Harper Lee",
    price: "$12",
    language: "en",
    discount: "5%",
    image: "/assets/download2.jpg",
    pdf: "https://example.com/mock.pdf",
    category: "Novel",
    rating: 4.8,
  },
  {
    id: 4,
    title: "ألف ليلة وليلة",
    description: "ألف ليلة وليلة هي مجموعة من الحكايات الشعبية التي تتميز بالسحر والمغامرة...",
    author: "غير معروف (تجميع تراثي)",
    price: "$20",
    language: "ar",
    discount: "20%",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Arabian_nights.jpg/800px-Arabian_nights.jpg",
    pdf: "https://example.com/1001nights.pdf",
    category: "Children",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    description: "Jane Austen’s celebrated novel is a brilliant critique of social class...",
    author: "Jane Austen",
    price: "$11",
    language: "en",
    discount: "8%",
    image: "/assets/download3.jpg",
    pdf: "https://www.planetebook.com/free-ebooks/pride-and-prejudice.pdf",
    category: "Novel",
    rating: 4.7,
  },
];
const Page = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language || "en");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredBooks = books.filter((book) => {
    if (selectedLanguage !== book.language) return false;
    if (selectedCategory.length && !selectedCategory.includes(book.category)) return false;
    if (priceRange) {
      const priceValue = book.price === "Free" ? 0 : parseInt(book.price.replace("$", ""));
      if (priceRange === "Free" && priceValue !== 0) return false;
      if (priceRange === "$0 - $10" && (priceValue < 0 || priceValue > 10)) return false;
      if (priceRange === "$10 - $20" && (priceValue < 10 || priceValue > 20)) return false;
      if (priceRange === "$20+" && priceValue <= 20) return false;
    }
    if (rating && book.rating < rating) return false;
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

<button
  onClick={() => setIsSidebarOpen(true)}
  className="sm:hidden fixed top-20 right-4 z-40 bg-white text-black px-3 py-2 rounded shadow"
>
  ☰
</button>

      {isSidebarOpen && (
  <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-white p-4 z-50 overflow-auto">
   <button
  onClick={() => setIsSidebarOpen(false)}
  className="absolute top-4 right-4 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow"
>
  ✕
</button>
    <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            rating={rating}
            setRating={setRating}
          />
        </div>
      )}
  
      {/* المحتوى الرئيسي مع السايدبار لسطح المكتب */}
      <div className="sm:flex sm:gap-6 p-6">
        {/* Sidebar لسطح المكتب */}
        <div className="hidden sm:block sm:w-1/5">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            rating={rating}
            setRating={setRating}
          />
        </div>
  
        {/* Main content */}
        <main className="w-full sm:w-4/5 space-y-4">
          {/* البحث */}
          <div className="w-full max-w-sm px-4 py-2 sm:px-0">
            <TextField
              label={t("search by title")}
              variant="standard"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& label": { color: "black" },
                "& label.Mui-focused": { color: "black" },
                "& input": { color: "black" },
                "& .MuiInput-underline:before": { borderBottomColor: "black" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#8B5E3C" },
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredBooks.map((book) => (
      <div key={book.id} className="flex justify-center">
        <div className="w-full sm:w-fit">
          <BookCardSecond book={book} />
        </div>
      </div>
    ))}
  </div>
</div>

        </main>
      </div>
    </div>
  );
  
};

export default Page;