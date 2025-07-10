import { BiSolidCommentDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { useLocale, useTranslations } from "next-intl";

interface CommentCardProps {
  id: number;
  title: string;
  text: string;
  created_at: string;
  likesCount: number;
  repliesCount: number;
  book: {
    title: string;
    ar_title?: string;
  };
}

export default function CommentCard({
  title,
  text,
  created_at,
  likesCount,
  repliesCount,
  book,
}: CommentCardProps) {
  const locale = useLocale();
  const t = useTranslations("Panel.userComments");

  const bookTitle = locale === "ar" && book.ar_title ? book.ar_title : book.title;

  return (
    <div className="p-4 rounded-2xl border border-gray-200 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-all max-w-xl w-full mx-auto">
      {/* العنوان */}
      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
        {title}
      </h3>

      {/* اسم الكتاب */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {t("onBook")}{" "}
        <span className="font-medium text-[#36419B] hover:underline cursor-pointer">
          {bookTitle}
        </span>
      </p>

      {/* نص التعليق */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
        {text}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <div>
          {t("commentedOn")}:{" "}
          <span className="font-medium">
            {new Date(created_at).toLocaleDateString(locale)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <AiOutlineLike className="text-[#36419B]" size={16} />
            {likesCount}
          </span>
          <span className="flex items-center gap-1">
            <BiSolidCommentDetail className="text-gray-500" size={16} />
            {repliesCount}
          </span>
        </div>
      </div>
    </div>
  );
}
