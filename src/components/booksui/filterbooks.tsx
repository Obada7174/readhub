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
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

// تعريف النوع الجديد للتصنيفات
interface CategoryOption {
  id: number;
  title: string;
}

type FilterProps = {
  categories: CategoryOption[];
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  priceRange: string | null;
  setPriceRange: (range: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  rating: number | null;
  setRating: (value: number | null) => void;
};

const FilterHorizontal: React.FC<FilterProps> = ({
  categories,
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
  const theme = useTheme();

  const priceRanges = ["Free", "$0 - $10", "$10 - $20", "$20+"];

  // ضبط ألوان حسب الوضع (dark/light)
  const inputBgColor = theme.palette.mode === "dark" ? "#333" : "#f5f5f5";
  const textColor = theme.palette.mode === "dark" ? "#eee" : "#222";
  const borderColor = theme.palette.mode === "dark" ? "#555" : "#ccc";

  const handleCatChange = (e: SelectChangeEvent<string[]>) => {
    const val = typeof e.target.value === "string"
      ? e.target.value.split(",")
      : e.target.value;

    setSelectedCategory(val);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" p={2} sx={{ color: textColor }}>
      {/* لغة */}
      <FormControl
        size="small"
        sx={{
          minWidth: 130,
          maxWidth: 160,
          bgcolor: inputBgColor,
          color: textColor,
          borderRadius: 1,
          "& .MuiInputBase-root": { color: textColor },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: borderColor },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .MuiSvgIcon-root": { color: textColor },
          "& .MuiSelect-icon": { color: textColor },
          "& .MuiInputLabel-root": { color: textColor },
          "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.primary.main },
        }}
      >
        <InputLabel>{t("language")}</InputLabel>
        <Select
          value={selectedLanguage}
          label={t("language")}
          onChange={e => setSelectedLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">العربية</MenuItem>
        </Select>
      </FormControl>

      {/* سعر */}
      <FormControl
        size="small"
        sx={{
          minWidth: 100,
          maxWidth: 130,
          bgcolor: inputBgColor,
          color: textColor,
          borderRadius: 1,
          "& .MuiInputBase-root": { color: textColor },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: borderColor },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .MuiSvgIcon-root": { color: textColor },
          "& .MuiSelect-icon": { color: textColor },
          "& .MuiInputLabel-root": { color: textColor },
          "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.primary.main },
        }}
      >
        <InputLabel>{t("price")}</InputLabel>
        <Select
          value={priceRange || ""}
          label={t("price")}
          onChange={e => setPriceRange(e.target.value)}
        >
          {priceRanges.map(r => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* تصنيفات */}
      <FormControl
        size="small"
        sx={{
          minWidth: 160,
          bgcolor: inputBgColor,
          color: textColor,
          borderRadius: 1,
          "& .MuiInputBase-root": { color: textColor },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: borderColor },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
          "& .MuiSvgIcon-root": { color: textColor },
          "& .MuiSelect-icon": { color: textColor },
          "& .MuiInputLabel-root": { color: textColor },
          "& .MuiInputLabel-root.Mui-focused": { color: theme.palette.primary.main },
          "& .MuiCheckbox-root": { color: textColor },
          "& .Mui-checked": { color: theme.palette.primary.main },
        }}
      >
        <InputLabel>{t("categories")}</InputLabel>
        <Select
          multiple
          value={selectedCategory}
          onChange={handleCatChange}
          renderValue={sel => {
            return sel
              .map(id => {
                const cat = categories.find(c => c.id.toString() === id);
                return cat ? cat.title : "";
              })
              .filter(Boolean)
              .join(", ");
          }}
        >
          {categories.map(cat => (
            <MenuItem key={cat.id} value={cat.id.toString()}>
              <Checkbox checked={selectedCategory.includes(cat.id.toString())} />
              {cat.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* تقييم */}
      <Box display="flex" alignItems="center" gap={1} sx={{ color: textColor }}>
        <Typography fontSize={14}>{t("rating")}:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, val) => setRating(val)}
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{
            color: theme.palette.mode === "dark" ? "#ffc107" : "#f59e0b",
          }}
        />
        <Typography fontSize={14}>({rating || 0})</Typography>
      </Box>
    </Box>
  );
};

export default FilterHorizontal;