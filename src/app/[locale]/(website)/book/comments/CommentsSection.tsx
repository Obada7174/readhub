import { useState } from "react";
import CommentCard from "./CommentCard";
import Image from "next/image";
import UserImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";

export interface Comment {
  id: number;
  userName: string;
  userImage: string;
  comment: string;
  likes: { userName: string }[];
  replies: Comment[];
}

interface Props {
  comments: Comment[];
}

const CommentsSection = ({ comments }: Props) => {
  const [comment, setComment] = useState("");
  return (
    <div className="border-t border-[#cfccc9] pt-2 pb-5">
      <div className="my-6">
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
              // setAdd(false);
              setComment("");
            }}
            className="bg-[#101828] dark:bg-white block ml-auto mt-3 px-5 py-2 rounded-full transition-colors cursor-pointer text-white dark:text-[#101828]"
          >
            Post
          </button>
        ) : null}
      </div>
      {comments.length ? (
        comments.map((comment) => {
          return (
            <CommentCard key={comment.id + Math.random()} comment={comment} />
          );
        })
      ) : (
        <h3 className="py-1.5 font-medium text-sm sm:text-base">
          Be the first one to share your comment
        </h3>
      )}
    </div>
  );
};
export default CommentsSection;
