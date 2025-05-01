"use client";
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import StarIcon from '@mui/icons-material/Star';

type FilterSidebarProps = {
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  priceRange: string | null;
  setPriceRange: (range: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  rating: number | null;
  setRating: (value: number) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedLanguage,
  setSelectedLanguage,
  rating,
  setRating,
}) => {
  const t = useTranslations("BooksPage");

  const categories = ["Novel", "Science", "Children", "Philosophy"];
  const priceRanges = ["Free", "$0 - $10", "$10 - $20", "$20+"];

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const CustomCheckbox = styled(Checkbox)({
    color: "var(--brown-100)",
    '&.Mui-checked': {
      color: "var(--brown-100)",
    },
  });

  return (
    <div className="w-full sm:w-1/3 p-4 sm:p-6">
     {/* <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {t("categories")}
        </h4>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2 text-sm sm:text-base">
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={selectedCategory.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          </div>
        ))}
      </div>  */}

      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {t("language")}
        </h4>
        {["en", "ar"].map((lang) => (
          <div key={lang} className="flex items-center mb-2 text-sm sm:text-base">
            <FormControlLabel
              control={
                <Radio
                  sx={{ color: "var(--brown-100)", '&.Mui-checked': { color: "var(--brown-100)" } }}
                  checked={selectedLanguage === lang}
                  onChange={() => setSelectedLanguage(lang)}
                  value={lang}
                  name="language"
                />
              }
              label={lang === "en" ? "English" : "العربية"}
            />
          </div>
        ))}
      </div>


      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {t("price")}
        </h4>
        {priceRanges.map((range) => (
          <div key={range} className="flex items-center mb-2 text-sm sm:text-base">
            <FormControlLabel
              control={
                <Radio
                  sx={{ color: "var(--brown-100)", '&.Mui-checked': { color: "var(--brown-100)" } }}
                  checked={priceRange === range}
                  onChange={() => setPriceRange(range)}
                  value={range}
                  name="price"
                />
              }
              label={range}
            />
          </div>
        ))}
      </div>

      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
          {t("rating")}
        </h4>
        <Box display="flex" alignItems="center">
          <Rating
            name="text-feedback"
            value={rating}
            onChange={(_, newValue) => setRating(newValue ?? 0)}
            precision={0.5}
            sx={{
              color: "var(--brown-100)",
              '& .MuiRating-iconEmpty': { color: "var(--beige-200)" },
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 2 }}>{rating || 0}</Box>
        </Box>
      </div>

    </div>
  );
};

export default FilterSidebar;
