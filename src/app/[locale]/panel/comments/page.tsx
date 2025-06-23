'use client';

import { useLocale } from 'next-intl';
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

interface Comment {
  id: number;
  text: string;
  title: string;
  created_at: string;
  updated_at: string;
  likesCount: number;
  repliesCount: number;
  book: {
    title: string;
    ar_title?: string;
  };
}

export default function UserComments() {
  const locale = useLocale();

  const comments: Comment[] = [
    {
      id: 29,
      text: "Captures teenage angst perfectly",
      title: "Coming-of-age classic",
      created_at: "2023-06-04T06:35:00.000Z",
      updated_at: "2025-05-26T09:01:14.359Z",
      likesCount: 1,
      repliesCount: 0,
      book: {
        title: "The Catcher in the Rye",
        ar_title: "الحارس في حقل الشوفان",
      },
    },
    {
      id: 49,
      text: "Hemingway at his best",
      title: "Literary gem",
      created_at: "2023-06-24T05:35:00.000Z",
      updated_at: "2025-05-26T09:01:14.359Z",
      likesCount: 1,
      repliesCount: 0,
      book: {
        title: "The Old Man and the Sea",
        ar_title: "العجوز والبحر",
      },
    },
    {
      id: 69,
      text: "Death as narrator is brilliant",
      title: "Unique perspective",
      created_at: "2023-07-14T06:35:00.000Z",
      updated_at: "2025-05-26T09:01:14.359Z",
      likesCount: 1,
      repliesCount: 0,
      book: {
        title: "The Book Thief",
        ar_title: "سارقة الكتب",
      },
    },
    {
      id: 89,
      text: "How little things make big differences",
      title: "Social epidemics",
      created_at: "2023-08-03T05:35:00.000Z",
      updated_at: "2025-05-26T09:01:14.359Z",
      likesCount: 1,
      repliesCount: 0,
      book: {
        title: "The Tipping Point",
        ar_title: "نقطة التحول",
      },
    },
  ];

  if (comments.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        No comments yet.
      </div>
    );
  }

  return (
    <section className={`max-w-5xl mx-auto p-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        My Book Comments
      </h2>

      <ul className="space-y-6">
        {comments.map(({ id, title, text, created_at, likesCount, repliesCount, book }) => (
          <li
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1 line-clamp-1">
              {title}
            </h3>

            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              On book:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                {locale === 'ar' && book.ar_title ? book.ar_title : book.title}
              </span>
            </p>

            <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed line-clamp-3">
              {text}
            </p>

            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-3">
              <span>
                Commented on: {new Date(created_at).toLocaleDateString(locale)}
              </span>
              <div className="flex gap-5 items-center">
                <span className="flex items-center gap-1">
                  <AiOutlineLike className="text-blue-500" size={18} />
                  {likesCount}
                </span>
                <span className="flex items-center gap-1">
                  <BiSolidCommentDetail className="text-slate-500" size={18} />
                  {repliesCount}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
