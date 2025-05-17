/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslations } from "next-intl";
import Image from "next/image";
import bookImage from "@/assets/images/Rich_Dad_Poor_Dad.jpg";
import Rate from "../Rate";
import SuggestedBooks from "../SuggestedBooks";
import books from "../books";
import CommentsSection, { Comment } from "../CommentsSection";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

const page = () => {
  const t = useTranslations("BookPage");
  const starsCount = Math.floor(book.rating);
  const stars = new Array(starsCount).fill(0);
  const halfStar = book.rating % 1 >= 0.5;

  return (
    <div className="container mx-auto flex justify-center my-10">
      <div className="w-full md:w-4/5 px-2 sm:px-0 grid grid-cols-12 gap-6">
        <div className="col-span-full lg:col-span-3 pt-2 sm:pt-5">
          <div className="sticky top-28 max-w-2xs mx-auto">
            <div className="w-4/5 mx-auto">
              <Image
                className="w-full h-auto object-cover rounded-tr-md rounded-br-md max-w-2xs mx-auto"
                src={bookImage}
                alt="Book Image"
              />
            </div>
            <div className="flex flex-col gap-4 my-6">
              <div className="bg-[#101828] dark:bg-white px-5 py-2.5 rounded-full cursor-pointer">
                <button className="text-sm sm:text-base text-center w-full font-bold cursor-pointer text-white dark:text-[#101828]">
                  {t("Want to read")}
                </button>
              </div>
              <div className="border hover:bg-[#0000000d] px-5 py-2.5 rounded-full transition-colors cursor-pointer">
                <button className="text-sm sm:text-base text-center w-full font-bold cursor-pointer">
                  {/* {t("Want to read")} */}
                  {t("Kindle")} $5.99
                </button>
              </div>
              <Rate />
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-9 lg:pl-8 pt-2 sm:pt-5">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold">{book.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-1">
              <h2 className="text-lg sm:text-2xl font-normal ">
                {book.author}
              </h2>
              <div className="flex gap-1 items-center pr-2 text-2xl">
                {stars.map((_, i) => {
                  return <MdStar key={i} className="text-yellow-500" />;
                })}
                {halfStar ? (
                  <MdStarHalf className="text-yellow-500" />
                ) : (
                  <MdStarBorder className="" />
                )}
                <span className="font-medium  text-xl">{book.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-sm sm:text-base mt-5 mb-8 font-medium w-10/12 max-lg:mb-5">
            <p>{book.description}</p>
          </div>
          <div className="flex gap-3 items-center flex-wrap">
            <div className="text-base sm:text-lg font-medium">
              {t("Genres")}
            </div>
            {book.genres.map((genre, id) => {
              return (
                <div
                  key={id}
                  className="cursor-pointer border-b-2 border-green-cool transition-colors text-sm sm:text-base font-medium"
                >
                  {genre}
                </div>
              );
            })}
          </div>
          <div className="my-5 flex flex-col gap-1.5 text-xsm sm:text-sm ">
            <span>
              {book.pages} {t("Pages")}
            </span>
            <span>
              {t("First published")} {book.publishTime}
            </span>
          </div>
          {/* <div className="mt-5 flex items-center gap-2 flex-wrap">
            {/* {book.price > 0 && ( */}
          {/* <button className="py-1.5 px-1.5 cursor-pointer rounded-md border-2  hover:bg-black hover:text-beige-100 transition-colors font-medium text-sm sm:text-base"> */}
          {/* {t("Buy now for just")} {book.price}$ */}
          {/* </button> */}
          {/* )} */}
          {/* </div>  */}
          <SuggestedBooks books={books} />
          <CommentsSection comments={comments} />
        </div>
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
  rating: 4.3,
  pages: 195,
  publishTime: "April 8, 1997",
  price: 10,
};

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
