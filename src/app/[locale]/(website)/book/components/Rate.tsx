"use client";
import { Rating } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  fn: (val: number) => void;
}

const Rate = ({ fn }: Props) => {
  const t = useTranslations("BookPage");
  const [rating, setRating] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <Rating
        name="rating"
        value={rating}
        onChange={(_, val) => {
          if (val) {
            setRating(val);
            fn(val);
          }
        }}
        precision={0.5}
        emptyIcon={<StarIcon />}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "primary.main", // Uses theme's primary color
          },
          "& .MuiRating-iconHover": {
            color: "primary.dark", // Darker shade on hover (if not readOnly)
          },
          scale: 1.4,
          gap: 0.25,
        }}
      />
      <button className="font-bold text-sm sm:text-base">
        {t("Share Your Rate")}
      </button>
    </div>
  );
};
export default Rate;
