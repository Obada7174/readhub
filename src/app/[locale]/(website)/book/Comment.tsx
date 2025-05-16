"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Like from "./Like";

import UserImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";
import Image from "next/image";

const Comment = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  return (
    <>
      <div className="flex gap-5 items-center mt-2 mb-6">
        <Like />
        <div
          onClick={() => setAdd(!add)}
          className="flex items-center gap-0.5 cursor-pointer"
        >
          <FaRegComment size={18} />
          <span>Comment</span>
        </div>
      </div>
      {add && (
        <div className="mb-6">
          <div className="flex gap-3">
            <Image
              className="w-10 h-10 rounded-full shrink-0"
              src={UserImage}
              alt="User Image"
            />
            <textarea
              className="outline-0 border-2 rounded-md w-full p-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
          {comment.trim().length ? (
            <button
              onClick={() => {
                setAdd(false);
                setComment("");
              }}
              className="block ml-auto mt-3 px-5 py-2 bg-black rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Post
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};
export default Comment;
