"use client";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import BookCard from "./BookCard";
import { book } from "./books";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface Props {
  books: book[];
}

const SuggestedBooks = ({ books }: Props) => {
  const t = useTranslations("BookPage");
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[500px] border-t border-[#cfccc9] py-5">
      <div className="flex justify-between items-center mt-5 lg:mt-0">
        <h2 className="text-lg sm:text-xl text-black font-semibold">
          {t("You may also like")}
        </h2>
        <div className="flex text-lg font-medium text-black rounded-sm border-2 border-[#3f8363] overflow-hidden">
          <button
            onClick={() =>
              (scrollerRef.current!.scrollLeft -=
                scrollerRef.current!.clientWidth)
            }
            className="p-1 border-r-2 border-[#3f8363] hover:bg-[#0000000d] transition-colors duration-200"
          >
            <MdKeyboardArrowLeft className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() =>
              (scrollerRef.current!.scrollLeft +=
                scrollerRef.current!.clientWidth)
            }
            className="p-1 hover:bg-[#0000000d] transition-colors duration-200"
          >
            <MdKeyboardArrowRight className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex overflow-x-scroll scroll-smooth py-5 h-full"
      >
        {books.map((book) => {
          return (
            <BookCard
              key={book.id + Math.random()}
              book={book}
              style="flex-none w-full max-w-[230px]"
            />
          );
        })}
      </div>
    </div>
  );
};
export default SuggestedBooks;
