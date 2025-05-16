"use client";
import { useState } from "react";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

const Like = () => {
  const [like, setLike] = useState(false);
  return like ? (
    <HiThumbUp
      size={20}
      onClick={() => setLike(false)}
      className="cursor-pointer"
    />
  ) : (
    <HiOutlineThumbUp
      size={20}
      onClick={() => setLike(true)}
      className="cursor-pointer"
    />
  );
};
export default Like;
