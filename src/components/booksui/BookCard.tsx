"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Tooltip, Box, Typography, Rating } from "@mui/material";

const BookCardSecond = ({ book }: any) => {
  return (
    <div className="relative w-[150px] cursor-pointer">
      <Tooltip
        placement="right"
        enterDelay={300}
        leaveDelay={200}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              maxWidth: 300,
              p: 2,
            },
          },
        }}
        title={
          <Box>
            <Typography variant="h6" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Rating
                value={book.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  color: "#1e293b",
                  "& .MuiRating-iconEmpty": {
                    color: "#1e293b",
                    opacity: 0.55,
                  },
                }}
                emptyIcon={<FaStar fontSize="inherit" />}
                icon={<FaStar fontSize="inherit" />}
              />
              <Typography variant="body2" ml={1} color="#1e293b">
                {book.rating}
              </Typography>
            </Box>
            <Typography variant="body2" paragraph>
              {book.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Published: {book.publishedDate}
            </Typography>
          </Box>
        }
      >
        {/* خلي الـ Box بحجم الصورة فقط وبدون أي padding/margin */}
        <Box className="relative w-[150px] h-[200px]">
          <Image
            src={book.image}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="150px"
          />
        </Box>
      </Tooltip>
    </div>
  );
};

export default BookCardSecond;
