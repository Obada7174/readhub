"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Rating,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

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

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ selected, theme }) => ({
  fontSize: 14,
  borderRadius: 6,
  marginBottom: 4,
  transition: "all 0.3s ease",
  backgroundColor: selected ? theme.palette.action.selected : "transparent",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": { display: "none" },
  marginBottom: 6,
}));

const StyledSummary = styled(AccordionSummary)({
  padding: 0,
  minHeight: "40px",
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    display: "none",
  },
});

const StyledDetails = styled(AccordionDetails)({
  padding: "8px 0",
});

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey[800],
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

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
  const theme = useTheme();

  const categories = [
    "all", "Novel", "Science", "Children", "Philosophy",
    "History", "Biography", "Religion", "Fantasy", "Education"
  ];

  const priceRanges = ["Free", "$0 - $10", "$10 - $20", "$20+"];

  const handleCategoryChange = (category: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  return (
    <div className="w-full sm:w-[180px] px-2 pt-4">

      {/* اللغة */}
      <StyledAccordion>
        <StyledSummary>
          <Typography fontWeight={600} fontSize={14}   color="#1e293b">
            {t("language")}
          </Typography>
        </StyledSummary>
        <StyledDetails>
          {["en", "ar"].map((lang) => (
            <StyledMenuItem
              key={lang}
              selected={selectedLanguage === lang}
              onClick={() => setSelectedLanguage(lang)}
            >
              {lang === "en" ? "English" : "العربية"}
            </StyledMenuItem>
          ))}
        </StyledDetails>
      </StyledAccordion>

      {/* السعر */}
      <StyledAccordion>
        <StyledSummary>
          <Typography fontWeight={600} fontSize={14}  color="#1e293b">
            {t("price")}
          </Typography>
        </StyledSummary>
        <StyledDetails>
          {priceRanges.map((range) => (
            <StyledMenuItem
              key={range}
              selected={priceRange === range}
              onClick={() => setPriceRange(range)}
            >
              {range}
            </StyledMenuItem>
          ))}
        </StyledDetails>
      </StyledAccordion>

      {/* التصنيفات */}
      <StyledAccordion>
        <StyledSummary>
          <Typography fontWeight={600} fontSize={14}  color="#1e293b">
            {t("categories")}
          </Typography>
        </StyledSummary>
        <StyledDetails>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <CustomCheckbox
                  checked={selectedCategory.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={<Typography fontSize={14}>{category}</Typography>}
            />
          ))}
        </StyledDetails>
      </StyledAccordion>

      {/* التقييم */}
      <StyledAccordion>
        <StyledSummary>
          <Typography fontWeight={600} fontSize={14}  color="#1e293b">
            {t("rating")}
          </Typography>
        </StyledSummary>
        <StyledDetails>
          <Box display="flex" alignItems="center">
            <Rating
              name="rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue ?? 0)}
              precision={0.5}
              sx={{
                color: "var(--brown-100)",
                '& .MuiRating-iconEmpty': {  color:"#1e293b" },
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2, fontSize: 14 }}>{rating || 0}</Box>
          </Box>
        </StyledDetails>
      </StyledAccordion>

    </div>
  );
};

export default FilterSidebar;
