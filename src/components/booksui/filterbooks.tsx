"use client";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

type FilterProps = {
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  priceRange: string | null;
  setPriceRange: (range: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  rating: number | null;
  setRating: (value: number) => void;
};

const FilterHorizontal: React.FC<FilterProps> = ({
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

  const categories = [
    "all", "Novel", "Science", "Children", "Philosophy",
    "History", "Biography", "Religion", "Fantasy", "Education"
  ];

  const priceRanges = ["Free", "$0 - $10", "$10 - $20", "$20+"];

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCategory(value as string[]);
  };
  

  return (
    <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" padding={2}>

      {/* اللغة */}
      <FormControl size="small" sx={{ minWidth: 100, maxWidth: 130 }}>
        <InputLabel>{t("language")}</InputLabel>
        <Select
          value={selectedLanguage}
          label={t("language")}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </FormControl>

      {/* السعر */}
      <FormControl size="small"sx={{ minWidth: 100, maxWidth: 130 }}>
        <InputLabel>{t("price")}</InputLabel>
        <Select
          value={priceRange || ""}
          label={t("price")}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          {priceRanges.map((range) => (
            <MenuItem key={range} value={range}>
              {range}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* التصنيفات */}
      <FormControl size="small" sx={{ minWidth: 100, maxWidth: 160 }}>
        <InputLabel>{t("categories")}</InputLabel>
        <Select
          multiple
          value={selectedCategory}
          onChange={handleCategoryChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategory.includes(category)} />
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* التقييم */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography fontSize={14}>{t("rating")}:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue ?? 0)}
          precision={0.5}
          sx={{
            color: "var(--brown-100)",
            '& .MuiRating-iconEmpty': { color: "#1e293b" },
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography fontSize={14}>({rating || 0})</Typography>
      </Box>

    </Box>
  );
};

export default FilterHorizontal;
