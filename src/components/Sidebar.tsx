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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image"
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
const StyledMenuItem = styled(MenuItem)<{ selected?: boolean }>(({ selected }) => ({
  fontSize: 14,
  borderRadius: 6,
  marginBottom: 4,
  transition: "all 0.3s ease",
  backgroundColor: selected ? "var(--beige-200)" : "transparent",
  color: "#000",
  "&:hover": {
    backgroundColor: "var(--beige-200)",
    color: "#000",
  },
}));

const StyledAccordion = styled(Accordion)({
  boxShadow: "none",
  backgroundColor: "transparent",
  borderBottom: "1px solid #BDBDBD", 
  "&:before": { display: "none" },
  marginBottom: 6,
  width: "90%",
  display: "block",
});

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

const CustomCheckbox = styled(Checkbox)({
  color: "var(--brown-100)",
  '&.Mui-checked': {
    color: "var(--brown-100)",
  },
});

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
      
      {/* Image above filters */}
      <Box sx={{ mb: 4 }}>
  <Image 
    src="/assets/logo.png" 
    alt="Filter Image" 
    width={150} 
    height={100} 
    style={{ borderRadius: "8px" }}
  />
</Box>

      {/* Language Selection */}
      <StyledAccordion>
        <StyledSummary>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{t("language")}</Typography>
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

      {/* Price Range Selection */}
      <StyledAccordion>
        <StyledSummary>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{t("price")}</Typography>
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

      {/* Categories Filtering */}
      <StyledAccordion>
        <StyledSummary>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{t("categories")}</Typography>
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
          label={<Typography sx={{ fontSize: 14 }}>{category}</Typography>}
        />
        
          ))}
        </StyledDetails>
      </StyledAccordion>

      {/* Rating Filtering */}
      <StyledAccordion>
        <StyledSummary>
          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "var(--foreground)" }}>{t("rating")}</Typography>
        </StyledSummary>
        <StyledDetails>
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
            <Box sx={{ ml: 2, fontSize: 14 }}>{rating || 0}</Box>
          </Box>
        </StyledDetails>
      </StyledAccordion>

    </div>
  );
};

export default FilterSidebar;
