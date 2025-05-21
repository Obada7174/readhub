/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Rate from "../Rate";
import SuggestedBooks from "../SuggestedBooks";
import books from "../books";
import CommentsSection, { Comment } from "../CommentsSection";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";
import { useBookQuery } from "@/hooks/react-query/books/useBooksQuery";
import BookLoadingSkeleton from "../BookLoadingSkeleton";

interface Props {
  params: { id: string };
}

const page = ({ params: { id } }: Props) => {
  const local = useLocale();
  const ar = local === "ar";
  const t = useTranslations("BookPage");
  const { data: book, isLoading, error } = useBookQuery(id);

  if (isLoading) return <BookLoadingSkeleton />;
  if (error) return <div>Error loading book</div>;
  if (!book) return <div>Book not found</div>;

  const discount = +book.discount > 0;
  const starsCount = Math.floor(+book.rating);
  const stars = new Array(starsCount).fill(0);
  const halfStar = +book.rating % 1 >= 0.5;

  return (
    <div className="container mx-auto flex justify-center my-10">
      <div className="w-full md:w-4/5 px-2 sm:px-0 grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-3 pt-2 sm:pt-5">
          <div className="sticky top-28 max-w-2xs mx-auto">
            <div className="w-4/5 mx-auto">
              <Image
                className={`w-full h-auto object-cover ${
                  ar
                    ? "rounded-tl-md rounded-bl-md"
                    : "rounded-tr-md rounded-br-md"
                } max-w-2xs mx-auto`}
                width={500}
                height={500}
                src={book.img}
                alt="Book Image"
              />
            </div>
            <div className="flex flex-col gap-4 my-6">
              <div className="bg-[#101828] dark:bg-white px-5 py-2.5 rounded-full cursor-pointer">
                <button className="text-sm sm:text-base text-center w-full font-bold cursor-pointer text-white dark:text-[#101828]">
                  {t("Want to read")}
                </button>
              </div>
              <div
                className={`border ${
                  discount
                    ? " border-red-500 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#0000000d]"
                } px-5 py-2.5 rounded-full transition-colors`}
              >
                <div
                  className={`flex gap-2 justify-center flex-wrap text-sm sm:text-base text-center w-full font-bold ${
                    discount ? "line-through text-red-500" : "cursor-pointer"
                  }`}
                >
                  <span>{t("Kindle")}</span>
                  <span>${book.price}</span>
                </div>
              </div>
              {discount && (
                <div
                  className={`border cursor-pointer hover:bg-[#0000000d] px-5 py-2.5 rounded-full transition-colors`}
                >
                  <div
                    className={`flex gap-2 justify-center flex-wrap text-sm sm:text-base text-center w-full font-bold cursor-pointer`}
                  >
                    <span>{t("Kindle")}</span>
                    <span>${book.discounted_price}</span>
                  </div>
                </div>
              )}
              <Rate />
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-9 lg:pl-8 pt-2 sm:pt-5">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold">
              {ar ? book.ar_title : book.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between mt-1">
              <h2 className="text-lg sm:text-2xl font-normal ">
                {book.author}
              </h2>
              <div className="flex gap-1 items-center pr-2 text-2xl">
                {stars.map((_, i) => {
                  return (
                    <MdStar
                      key={i}
                      className="text-yellow-500 max-sm:w-5 max-sm:h-5"
                    />
                  );
                })}
                {halfStar ? (
                  <MdStarHalf
                    className={`text-yellow-500 max-sm:w-5 max-sm:h-5 ${
                      ar ? "scale-x-[-1]" : ""
                    }`}
                  />
                ) : (
                  <MdStarBorder className="max-sm:w-5 max-sm:h-5" />
                )}
                <span className="font-medium text-lg sm:text-xl">
                  {book.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm sm:text-base mt-5 mb-8 font-medium w-10/12 max-lg:mb-5">
            <p>{ar ? book.ar_description : book.description}</p>
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <div className="text-base sm:text-lg font-medium">
              {t("Genres")}
            </div>
            {book.categories.map((genre) => {
              return (
                <div
                  key={genre.id}
                  className="cursor-pointer border-b-2 border-green-cool transition-colors text-sm sm:text-base font-medium"
                >
                  {genre.title}
                </div>
              );
            })}
          </div>
          <div className="my-5 flex flex-col gap-1.5 text-xsm sm:text-sm ">
            <span>
              {book.total_pages} {t("Pages")}
            </span>
            <span>
              {t("First published")} {book.created_at}
            </span>
          </div>
          <SuggestedBooks books={books} ar={ar} />
          <CommentsSection comments={comments} />
        </div>
      </div>
    </div>
  );
};
export default page;

const comments: Comment[] = [
  {
    id: 1,
    comment:
      "Rich Dad Poor Dad by Robert Kiyosaki offers a compelling perspective on financial education, contrasting the mindsets of those focused on earning versus those focused on building wealth. It challenges conventional beliefs about money, emphasizing the importance of financial literacy, investing, and entrepreneurial thinking. The book encourages readers to rethink their approach to money and wealth-building, inspiring many to pursue financial independence. It's a thought-provoking read that has motivated countless people to improve their financial literacy and mindset.",
    likes: [],
    replies: [
      {
        id: 101,
        comment:
          "The book really does inspire a shift in how we think about money.",
        likes: [],
        userImage: "",
        userName: "User",
        replies: [
          {
            id: 1,
            comment:
              "I agree! It’s eye-opening and really makes you rethink your financial habits.",
            likes: [],
            replies: [
              {
                id: 101,
                comment:
                  "Love how it emphasizes financial education—so important for building wealth.",
                likes: [],
                userImage: "",
                userName: "User",
                replies: [],
              },
            ],
            userImage: "",
            userName: "User",
          },
        ],
      },
      {
        id: 101,
        comment:
          "Very insightful! It challenges many traditional beliefs about money and success.",
        likes: [],
        userImage: "",
        userName: "User",
        replies: [],
      },
    ],
    userImage: "",
    userName: "User",
  },
  {
    id: 101,
    comment:
      "Rich Dad Poor Dad by Robert Kiyosaki offers a compelling perspective on financial education, contrasting the mindsets of those focused on earning versus those focused on building wealth. It challenges conventional beliefs about money.",
    likes: [],
    userImage: "",
    userName: "User",
    replies: [],
  },
];
