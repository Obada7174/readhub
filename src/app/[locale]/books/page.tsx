"use client";
import { useState } from "react";
import FilterSidebar from "@/components/Sidebar";
import BookCard from "@/components/bookCard";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    description: "The Great Gatsby is a timeless classic that explores themes of wealth, love, and the American Dream. Set in the Jazz Age, the story follows Jay Gatsby and his unrelenting passion for Daisy Buchanan.",
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
    description: "تُعد موسوعة المعرفة مرجعًا شاملاً يحتوي على معلومات موسوعية تغطي مختلف مجالات العلوم والثقافة، ما يجعلها أداة مثالية للباحثين والطلاب.",
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
    description: "Harper Lee’s Pulitzer Prize-winning novel delves into issues of race and injustice in the Deep South, told through the innocent eyes of young Scout Finch.",
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
    description: "ألف ليلة وليلة هي مجموعة من الحكايات الشعبية التي تتميز بالسحر والمغامرة والحكمة، وتحمل طابعًا تراثيًا يعكس عمق الثقافة العربية.",
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
    description: "Jane Austen’s celebrated novel is a brilliant critique of social class, marriage, and morality in 19th-century England. Elizabeth Bennet's wit and spirit shine throughout.",
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
  const [value, setValue] = useState("all");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filteredBooks = books.filter((book) => {
    if (selectedLanguage !== book.language) return false;
    if (value !== "all" && book.category !== value) return false;
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

  const topBooks = filteredBooks.filter((book) => book.rating >= 4.5).sort((a, b) => b.rating - a.rating).slice(0, 2);
  const newBooks = [...filteredBooks].sort((a, b) => b.id - a.id).slice(0, 2);
  const filteredBooksWithoutNew = filteredBooks.filter((book) => !newBooks.find((b) => b.id === book.id));

  return (
    <div className="flex">
      <div className="w-1/6">
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

      <div className="w-5/6 p-6">
        <div className="mb-6 w-[300px]">
          <TextField
            label={t("search_by_title")}
            variant="standard"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& label": { color: "var(--brown-100)" },
              "& label.Mui-focused": { color: "var(--brown-100)" },
              "& input": { color: "black" },
              "& .MuiInput-underline:before": { borderBottomColor: "var(--brown-100)" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "var(--brown-100)" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "var(--brown-100)" }} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {newBooks.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-brown-100 mb-4">🆕 {t("new_arrivals")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {newBooks.map((book) => (
                <div key={book.id}>
                  <BookCard book={book} large detailed />
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs
          value={value}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          className="mb-6"
          sx={{
            justifyContent: "flex-end",
            "& .MuiTabs-flexContainer": { justifyContent: "flex-end" },
            "& .MuiTab-root": { color: "black" },
            "& .Mui-selected": { color: "var(--brown-100)" },
            "& .MuiTabs-indicator": { backgroundColor: "var(--brown-100)" },
          }}
        >
          <Tab value="all" label={t("all")} />
          <Tab value="Novel" label={t("Novel")} />
          <Tab value="Science" label={t("Science")} />
          <Tab value="Children" label={t("Children")} />
          <Tab value="History" label={t("History")} />
          <Tab value="Biography" label={t("Biography")} />
          <Tab value="Religion" label={t("Religion")} />
          <Tab value="Fantasy" label={t("Fantasy")} />
          <Tab value="Education" label={t("Education")} />
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooksWithoutNew.map((book) => (
            <div key={book.id} className="bg-beige-200 shadow-md hover:shadow-xl transition-shadow duration-300 p-4 rounded-xl">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;