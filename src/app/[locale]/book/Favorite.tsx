"use client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Favorite = () => {
  const [isFavorite, setFavorite] = useState<boolean>(false);
  return (
    <button
      onClick={() => setFavorite(!isFavorite)}
      className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-beige-100 transition-colors font-medium text-sm sm:text-base"
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};
export default Favorite;
