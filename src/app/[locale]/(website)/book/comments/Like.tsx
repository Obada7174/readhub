"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

interface Props {
  commentId: number;
}

const Like = ({ commentId }: Props) => {
  const t = useTranslations("Comments");
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = async () => {
    try {
      console.log("Toggling like for comment:", commentId);
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Failed to like comment", error);
    }
  };

  return (
    <div
      onClick={handleLikeToggle}
      className="flex items-end gap-0.5 cursor-pointer"
    >
      {liked ? (
        <HiThumbUp size={20} className="text-blue-600" />
      ) : (
        <HiOutlineThumbUp size={20} />
      )}
      <span>{t("Like")}</span>
    </div>
  );
};

export default Like;
