import Image from "next/image";
import { Comment } from "./CommentsSection";
import UserImage from "@/assets/Rich_Dad_Poor_Dad.jpg";
import Reply from "./Reply";
import CommentFunc from "./Comment";

interface Props {
  comment: Comment;
  first: boolean;
}

const CommentCard = ({ comment, first }: Props) => {
  return (
    <>
      <div className={`my-5 ${first ? "mt-0" : ""} flex gap-8 p-2`}>
        <div className="shrink-0 mt-3">
          <Image
            className="w-12 h-12 rounded-full"
            src={UserImage}
            alt="User Image"
          />
          <h3 className="text-sm sm:text-base mt-1">
            {comment.userName} {comment.id}
          </h3>
          <h4 className="text-xs sm:text-sm">25 days ago</h4>
        </div>
        <div className={`${first ? "" : "border-t border-[#cfccc9]"} pt-5`}>
          <p>{comment.comment}</p>
          <div className="my-3 flex gap-5 text-gray-two">
            <span>100 likes</span>
            <span>76 comments</span>
          </div>
          <CommentFunc />
          <div
            className={
              comment.replies.length ? "pt-5 border-t border-[#cfccc9]" : ""
            }
          >
            {comment.replies.map((reply) => {
              return <Reply key={reply.id + Math.random()} reply={reply} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default CommentCard;
