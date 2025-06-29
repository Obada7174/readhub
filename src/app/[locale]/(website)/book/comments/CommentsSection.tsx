"use client";

import { useState } from "react";
import CommentCard from "./CommentCard";
import Image from "next/image";
import UserImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";
import { useCreateComment } from "@/hooks/react-query/comments/useCommentsQuery";
import { useBookCommentsQuery } from "@/hooks/react-query/comments/useCommentsQuery";
import { useUser } from "@/hooks/userContext";

interface Props {
  id: string;
}

const CommentsSection = ({ id }: Props) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const { data, isLoading } = useBookCommentsQuery(id);
  const { mutateAsync: addComment } = useCreateComment();

  const comments = data?.comments || [];

  const handleAddComment = async () => {
    if (!user || !comment.trim()) return;
    try {
      await addComment({
        text: comment,
        bookId: parseInt(id),
        userId: user.id,
      });
      setComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div className="border-t border-[#cfccc9] pt-2 pb-5">
      <div className="my-6">
        <div className="flex gap-3">
          <Image
            className="w-10 h-10 rounded-full shrink-0"
            src={user?.img || UserImage}
            alt="User Image"
            width={40}
            height={40}
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
            onClick={handleAddComment}
            className="bg-[#101828] dark:bg-white block ml-auto mt-3 px-5 py-2 rounded-full transition-colors cursor-pointer text-white dark:text-[#101828]"
          >
            Post
          </button>
        ) : null}
      </div>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <h3 className="py-1.5 font-medium text-sm sm:text-base">
          Be the first one to share your comment
        </h3>
      ) : (
        comments
          .slice()
          .reverse()
          .map((comment) => (
            <CommentCard key={comment.id} BookId={id} comment={comment} />
          ))
      )}
    </div>
  );
};

export default CommentsSection;
