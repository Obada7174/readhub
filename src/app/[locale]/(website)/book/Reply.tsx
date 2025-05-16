import Image from "next/image";
import { Comment } from "./CommentsSection";
import UserImage from "@/assets/Rich_Dad_Poor_Dad.jpg";

interface Props {
  reply: Comment;
}

const Reply = ({ reply }: Props) => {
  return (
    <>
      <div className="flex gap-3 my-5 max-lg:ml-3">
        <Image
          className="w-10 h-10 rounded-full shrink-0"
          src={UserImage}
          alt="User Image"
        />
        <div>
          <div className="flex gap-2">
            <h2>{reply.userName}</h2>
            <h3>20 day ago</h3>
          </div>
          <p>{reply.comment}</p>
        </div>
      </div>
      {reply.replies.map((reply) => {
        return <Reply key={reply.id + Math.random()} reply={reply} />;
      })}
    </>
  );
};
export default Reply;
