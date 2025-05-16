import CommentCard from "./CommentCard";

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
  return (
    <div className="border-t border-[#cfccc9] pt-2 pb-5">
      {comments.length ? (
        comments.map((comment, i) => {
          return (
            <CommentCard
              first={i === 0}
              key={comment.id + Math.random()}
              comment={comment}
            />
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
