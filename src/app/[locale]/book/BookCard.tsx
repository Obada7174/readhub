import Image from "next/image";
import { book } from "./books";
import bookImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";
import { FaStar, FaStarHalf } from "react-icons/fa";
import Link from "next/link";

interface Props {
  book: book;
  style?: string;
}

const BookCard = ({ book, style = "" }: Props) => {
  const starsCount = Math.floor(book.rating);
  const stars = new Array(starsCount).fill(0);
  const halfStar = book.rating % 1 >= 0.5;

  return (
    <Link
      href={"/book/" + book.id}
      className={style + " rounded-md overflow-hidden border-2 border-black"}
    >
      <Image className="h-4/5" src={bookImage} alt="Book Image" />
      <div className="py-5 px-2">
        <h1 className="sm:text-lg font-medium">{book.title}</h1>
        <div className="flex justify-between">
          <p className="text-sm sm:text-base">{book.author}</p>
          <div className="flex gap-1 items-center pr-2">
            {stars.map((_, i) => {
              return <FaStar key={i} />;
            })}
            {halfStar && <FaStarHalf />}
            <span className="font-medium">{book.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;
