import Image from "next/image";
import { book } from "./books";
import bookImage from "@/assets/Rich_Dad_Poor_Dad.jpg";
import { MdStar } from "react-icons/md";
import Link from "next/link";

interface Props {
  book: book;
  style?: string;
}

const BookCard = ({ book, style = "" }: Props) => {
  return (
    <Link href={"/book/" + book.id} className={style}>
      <Image
        className="w-full h-auto rounded-tr-md rounded-br-md"
        src={bookImage}
        alt="Book Image"
      />
      <div className="py-5 px-2">
        <h1 className="sm:text-lg font-medium">{book.title}</h1>
        <h2 className="max-sm:text-sm font-normal text-gray-two">
          {book.author}
        </h2>
        <div className="flex gap-1 items-center pr-2">
          <MdStar className="text-lg text-yellow-500" />
          <span className="font-medium">{book.rating}</span>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;
