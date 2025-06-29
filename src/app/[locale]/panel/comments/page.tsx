'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import axios from 'axios';
import { useUser } from "@/hooks/userContext";

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
  const t = useTranslations("Panel.userComments");
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/comments/user/${user.id}`);
        setComments(res.data.data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [user]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        {t("loading")}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        {t("noComments")}
      </div>
    );
  }

  return (
    <section className={`max-w-5xl mx-auto p-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
      <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
        {t("title")}
      </h2>

      <ul className="space-y-6">
        {comments.map(({ id, title, text, created_at, likesCount, repliesCount, book }) => (
          <li
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-[#36419B] dark:text-[#36419B] mb-1 line-clamp-1">
              {title}
            </h3>

            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("onBook")}{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                {locale === 'ar' && book.ar_title ? book.ar_title : book.title}
              </span>
            </p>

            <p className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed line-clamp-3">
              {text}
            </p>

            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-3">
              <span>
                {t("commentedOn")}: {new Date(created_at).toLocaleDateString(locale)}
              </span>
              <div className="flex gap-5 items-center">
                <span className="flex items-center gap-1">
                  <AiOutlineLike className="text-[#36419B]" size={18} />
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
