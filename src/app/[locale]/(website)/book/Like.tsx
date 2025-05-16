"use client";
import { useState } from "react";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

const Like = () => {
  const [like, setLike] = useState(false);

  return (
    <div onClick={() => setLike(!like)} className="flex gap-0.5 cursor-pointer">
      {like ? (
        <HiThumbUp size={20} className="cursor-pointer" />
      ) : (
        <HiOutlineThumbUp size={20} className="cursor-pointer" />
      )}
      <span>Like</span>
    </div>
  );
};
export default Like;
