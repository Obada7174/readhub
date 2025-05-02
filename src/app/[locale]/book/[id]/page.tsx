/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslations } from "next-intl";
import Image from "next/image";
import bookImage from "@/assets/Rich_Dad_Poor_Dad.jpg";
import { FaStar, FaStarHalf, FaComment } from "react-icons/fa";
import Rate from "../Rate";
import Favorite from "../Favorite";
import SuggestedBooks from "../SuggestedBooks";
import books from "../books";

const page = () => {
  const t = useTranslations("BookPage");
  const starsCount = Math.floor(book.rating);
  const stars = new Array(starsCount).fill(0);
  const halfStar = book.rating % 1 >= 0.5;

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className="w-full md:w-4/5 pt-2 sm:pt-5 px-2 sm:px-0">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="w-full lg:w-2/5 h-[500px] flex-none">
            <Image
              className="w-full h-5/6 object-cover rounded-md border-2 border-black"
              src={bookImage}
              alt="Book Image"
            />
            <div className="flex gap-1 mt-2">
              <button className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-beige-100 transition-colors font-medium w-full text-sm sm:text-base">
                {t("Want to read")}
              </button>
              <button className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-beige-100 transition-colors font-medium text-sm sm:text-base">
                <FaComment />
              </button>
              <Favorite />
            </div>
          </div>
          <div className="w-full lg:w-3/5 h-full lg:py-5">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold">
                {book.title}
              </h1>
              <div className="w-full flex flex-wrap justify-between items-center my-1">
                <h2 className="text-lg sm:text-2xl font-semibold">
                  {book.author}
                </h2>
                <div className="flex gap-1 items-center pr-2">
                  {stars.map((_, i) => {
                    return <FaStar key={i} />;
                  })}
                  {halfStar && <FaStarHalf />}
                  <span className="font-medium">{book.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-sm sm:text-base mt-5 mb-8 font-medium">
              <p>{book.description}</p>
            </div>
            <div className="flex gap-2 overflow-x-scroll">
              <div className="py-1.5 flex-none text-base sm:text-lg font-medium">
                {t("Genres")} :
              </div>
              <div className="flex gap-2 overflow-x-scroll">
                {book.genres.map((genre, id) => {
                  return (
                    <div
                      key={id}
                      className="flex-none py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-beige-100 transition-colors font-medium text-sm sm:text-base"
                    >
                      {genre}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between font-medium text-sm sm:text-base">
              <span>
                {book.pages} {t("Pages")}
              </span>
              <span>
                {t("First published")} {book.publishTime}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <Rate />
              {book.price > 0 && (
                <button className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-beige-100 transition-colors font-medium text-sm sm:text-base">
                  {t("Buy now for just")} {book.price}$
                </button>
              )}
            </div>
          </div>
        </div>
        <SuggestedBooks books={books} />
      </div>
    </div>
  );
};
export default page;

const book = {
  id: 1,
  title: "Rich Dad Poor Dad",
  author: "Robert T. Kiyosaki",
  publishedYear: 1997,
  description:
    'Rich Dad Poor Dad is Robert\'s story of growing up with two dads — his real father and the father of his best friend, his "rich dad" — and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.',
  genres: [
    "Personal Finance",
    "Self-Help",
    "Business",
    "Investing",
    "Motivational",
  ],
  rating: 4.5,
  pages: 195,
  publishTime: "April 8, 1997",
  price: 10,
};
