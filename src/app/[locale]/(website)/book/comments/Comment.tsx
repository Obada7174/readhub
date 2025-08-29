"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import Like from "./Like";

import UserImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCreateReply } from "@/hooks/react-query/replies/useRepliesQuery";

interface Props {
  id: string;
  commentId: number;
}

const Comment = ({ id, commentId }: Props) => {
  const t = useTranslations("Comments");
  const [add, setAdd] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { mutateAsync: addReply } = useCreateReply(id);

  return (
    <>
      <div className="flex gap-5 items-center mt-2 mb-6">
        <Like commentId={commentId} />
        <div
          onClick={() => setAdd(!add)}
          className="flex items-end gap-1 cursor-pointer"
        >
          <FaRegComment size={18} />
          <span>{t("Comment")}</span>
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
                addReply({
                  text: comment,
                  userId: 1,
                  comment: commentId,
                });
                setAdd(false);
                setComment("");
              }}
              className="bg-[#101828] dark:bg-white block ml-auto mt-3 px-5 py-2 rounded-full transition-colors cursor-pointer text-white dark:text-[#101828]"
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
