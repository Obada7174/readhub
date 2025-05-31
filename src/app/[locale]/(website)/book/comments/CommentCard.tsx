import Image from "next/image";
import Reply from "./Reply";
import CommentFunc from "./Comment";
import { useTranslations } from "next-intl";
import { Comment } from "@/types/comment";

interface Props {
  BookId: string;
  comment: Comment;
}

const CommentCard = ({
  comment: { id, user, text, replies, likes },
  BookId,
}: Props) => {
  const t = useTranslations("Comments");

  return (
    <>
      <div
        className={`my-5 max-lg:border-t max-lg:border-[#cfccc9]
         flex max-lg:flex-col lg:gap-8 p-2`}
      >
        <div className="flex max-lg:gap-3 lg:flex-col shrink-0 mt-3 lg:w-[120px]">
          <Image
            width={100}
            height={100}
            className="w-12 h-12 rounded-full"
            src={user.img}
            alt="User Image"
          />
          <div>
            <h3 className="text-sm sm:text-base mt-1">
              {user.first_name + " " + user.last_name}
            </h3>
            <h4 className="text-xs sm:text-sm">25 {t("days ago")}</h4>
          </div>
        </div>
        <div className={`lg:border-t border-[#cfccc9] pt-5 w-full`}>
          <p>{text}</p>
          <div className="my-3 flex gap-5 ">
            {likes.length ? (
              <span>
                {likes.length} {t("likes")}
              </span>
            ) : null}
            {replies.length ? (
              <span>
                {replies.length} {t("comments")}
              </span>
            ) : null}
          </div>
          <CommentFunc id={BookId} commentId={id} />
          <div
            className={replies.length ? "pt-5 border-t border-[#cfccc9]" : ""}
          >
            {replies.map((reply) => {
              return <Reply key={reply.id + Math.random()} reply={reply} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentCard;
