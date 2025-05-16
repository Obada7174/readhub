"use client";
import { useRef } from "react";
import BookCard from "./BookCard";
import { book } from "./books";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface Props {
  books: book[];
}

const SuggestedBooks = ({ books }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[500px]">
      <div className="flex justify-between items-center mt-5 lg:mt-0">
        <h2 className="text-lg sm:text-2xl text-black font-medium">
          You may also like
        </h2>
        <div className="flex text-lg font-medium text-black rounded-sm border-2 border-black overflow-hidden">
          <button
            onClick={() =>
              (scrollerRef.current!.scrollLeft -=
                scrollerRef.current!.clientWidth)
            }
            className="p-1 hover:text-[#f8e7d0] hover:bg-black border-r-2 border-black transition-colors duration-200"
          >
            <MdKeyboardArrowLeft className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() =>
              (scrollerRef.current!.scrollLeft +=
                scrollerRef.current!.clientWidth)
            }
            className="p-1 hover:text-[#f8e7d0] hover:bg-black transition-colors duration-200"
          >
            <MdKeyboardArrowRight className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-8 overflow-x-scroll mt-3 scroll-smooth py-5 h-full"
      >
        {books.map((book) => {
          return (
            <BookCard
              key={book.id}
              book={book}
              style="flex-none w-full max-w-[300px]"
            />
          );
        })}
      </div>
    </div>
  );
};
export default SuggestedBooks;
