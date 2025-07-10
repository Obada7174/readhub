'use client';

import CommentCard from '@/components/panel/commentcard';
import CommentCardSkeleton from '@/components/panel/commentkeltoncard';
import { useUserComments } from '@/hooks/commentpanel/usecommentpanel';
import { useLocale, useTranslations } from 'next-intl';

export default function UserComments() {
  const locale = useLocale();
  const t = useTranslations("Panel.userComments");
  const { comments, loading } = useUserComments();

  return (
    <section
      className={`max-w-7xl mx-auto p-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
    >
      <h2 className="text-3xl font-bold mb-10 text-slate-800 dark:text-white text-center">
        {t("title")}
      </h2>

      {loading ? (
        <ul className="flex flex-col items-center gap-6">
          {[...Array(3)].map((_, idx) => (
            <CommentCardSkeleton key={idx} />
          ))}
        </ul>
      ) : comments.length === 0 ? (
        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
          {t("noComments")}
        </div>
      ) : (
        <ul className="flex flex-col items-center gap-6">
          {comments.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </ul>
      )}
    </section>
  );
}
