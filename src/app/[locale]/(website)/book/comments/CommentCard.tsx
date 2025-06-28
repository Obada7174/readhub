import Image from "next/image";
import Reply from "./Reply";
import CommentFunc from "./Comment";
import Like from "./Like";
import { useTranslations } from "next-intl";
import { BookComment } from "@/types/comment";
import { timeAgo } from "@/helpers/timeago";

interface Props {
  BookId: string;
  comment: BookComment;
}

const CommentCard = ({
  comment: { id, user, text, replies, likes, created_at },
  BookId,
}: Props) => {
  const t = useTranslations("Comments");

  return (
    <div className="my-5 max-lg:border-t max-lg:border-[#cfccc9] flex max-lg:flex-col lg:gap-8 p-2">
      {/* user info */}
      <div className="flex max-lg:gap-3 lg:flex-col shrink-0 mt-3 lg:w-[120px]">
        <Image
          width={100}
          height={100}
          className="w-12 h-12 rounded-full object-cover"
          src={user.img}
          alt="User Image"
        />
        <div>
          <h3 className="text-sm sm:text-base mt-1">
            {user.first_name + " " + user.last_name}
          </h3>
          <h4 className="text-xs sm:text-sm text-gray-500">{timeAgo(created_at)}</h4>
        </div>
      </div>

      {/* comment content */}
      <div className="lg:border-t border-[#cfccc9] pt-5 w-full">
        <p>{text}</p>

        <div className="my-3 flex gap-5 text-sm text-gray-600">
          {likes.length > 0 && (
            <span>
              {likes.length} {t("likes")}
            </span>
          )}
          {replies.length > 0 && (
            <span>
              {replies.length} {t("comments")}
            </span>
          )}
        </div>

        {/* Like + Comment Actions */}
        <CommentFunc id={BookId} commentId={id} />
        <Like commentId={id} />

        {/* replies */}
        {replies.length > 0 && (
          <div className="pt-5 border-t border-[#cfccc9]">
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
