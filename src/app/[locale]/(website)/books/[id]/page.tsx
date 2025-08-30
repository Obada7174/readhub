/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUser } from '@/context/userContext';
import { showErrorToast, showSuccessToast } from '@/helpers/Toast';
import { useBookData } from '@/hooks/react-query/books/useBooksData';
import { useBookQuery } from '@/hooks/react-query/books/useBooksQuery';
import { useCreateCart, useCreateCartItem } from '@/hooks/react-query/carts/useCartsQuery';
import { useBookCommentsQuery, useCreateComment } from '@/hooks/react-query/comments/useCommentsQuery';
import { useToggleFavorite } from '@/hooks/react-query/favorites/useFavoritesQuery';
import { useCreateReply } from '@/hooks/react-query/replies/useRepliesQuery';
import { useRouter } from '@/i18n/navigation';
import { Category } from '@/types/category';
import { BookComment } from '@/types/comment';
import { User } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuStar, LuHeart, LuMessageCircle, LuSend, LuShoppingCart, LuBookOpen, LuThumbsUp } from 'react-icons/lu';

const mockCommentsAPI = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async toggleLike(commentId: number, isReply = false) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

// === Components ===
interface RatingStarsProps {
  rating: number;
  size?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = "w-4 h-4" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const t = useTranslations();

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <LuStar
          key={i}
          title={t('rating.stars', { count: i + 1 })}
          className={`${size} ${i < fullStars
            ? 'text-yellow-400 fill-current'
            : i === fullStars && hasHalfStar
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-gray-400 dark:text-gray-600'
            }`}
        />
      ))}
    </div>
  );
};

export interface CommentReply {
  id: number;
  user: User;
  text: string;
  created_at: string;
  likes: number[];
  isLiked: boolean;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  created_at: string;
  likes: number[];
  isLiked: boolean;
  replies: CommentReply[];
}

interface CommentProps {
  comment: BookComment;
  onReply: (commentId: number, content: string) => void;
  onLike: (id: number, isReply: boolean) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, onLike }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Failed to reply', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0">
      <div className="flex gap-3">
        <img
          src={comment.user.img}
          alt={comment.user.first_name + ' ' + comment.user.last_name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-2">
            <h4 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
              {comment.user.first_name} {comment.user.last_name}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.text}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{new Date(comment.created_at).toLocaleDateString('ar')}</span>
            <button
              onClick={() => onLike(comment.id, false)}
              className={`flex items-center gap-1 hover:text-blue-600 transition-colors //{comment.isLiked ? 'text-blue-600' : ''}`}
            >
              <LuThumbsUp className="w-3 h-3" />
              <span>{comment?.likes?.length}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="hover:text-blue-600 transition-colors"
            >
              {t('comments.reply')}
            </button>
          </div>

          {showReplyForm && (
            <form onSubmit={handleReply} className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={t('comments.write_reply')}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={!replyContent.trim() || isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LuSend className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {comment.replies && comment?.replies?.length > 0 && (
            <div className="mt-4 mr-8 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <img
                    src={reply.user.img}
                    alt={reply.user.first_name + ' ' + reply.user.last_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-2">
                      <h5 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">
                        {reply.user.first_name} {reply.user.last_name}
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.text}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{new Date(reply.created_at).toLocaleDateString('ar')}</span>
                      <button
                        onClick={() => onLike(reply.id, true)}
                        className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${reply.isLiked ? 'text-blue-600' : ''}`}
                      >
                        <LuThumbsUp className="w-3 h-3" />
                        <span>{reply?.likes?.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// === Props قسم التعليقات ===
interface CommentsSectionProps {
  bookId: string;
}

// === مكوّن CommentsSection ===
const CommentsSection: React.FC<CommentsSectionProps> = ({ bookId }) => {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();
  const t = useTranslations();

  const { user } = useUser();
  const { data, isLoading } = useBookCommentsQuery(bookId);
  const { mutateAsync: addComment } = useCreateComment();
  const { mutateAsync: addReply } = useCreateReply(bookId);

  const comments = data?.comments || [];

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const newCommentData = await addComment({
        text: newComment,
        bookId: parseInt(bookId, 10),
        userId: user.id,
      });

      queryClient.setQueryData(['book-comments', bookId], (old: any) => ({
        ...old,
        comments: [newCommentData, ...(old?.comments || [])],
      }));

      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  const handleReply = async (commentId: number, content: string) => {
    if (!user) return;

    try {
      const reply = await addReply({
        comment: commentId,
        text: content,
        userId: user.id,
      });

      queryClient.setQueryData(['book-comments', bookId], (old: any) => ({
        ...old,
        comments: old?.comments?.map((c: Comment) =>
          c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
        ),
      }));
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLike = async (id: number, isReply: boolean) => {
    try {
      await mockCommentsAPI.toggleLike(id, isReply);

      queryClient.setQueryData(['bookComments', bookId], (old: any) => ({
        ...old,
        comments: old?.comments?.map((c: Comment) => {
          if (!isReply && c.id === id) {
            return {
              ...c,
              isLiked: !c.isLiked,
              likes: c.isLiked
                ? c.likes.filter(like => like !== user?.id)?.length
                : [...c.likes, user?.id]?.length,
            };
          }

          if (c.replies) {
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === id
                  ? {
                    ...r,
                    isLiked: !r.isLiked,
                    likes: r.isLiked
                      ? r.likes.filter(like => like !== user?.id)?.length
                      : [...r.likes, user?.id]?.length,
                  }
                  : r
              ),
            };
          }

          return c;
        }),
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">{t('comments.title')}</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-gray-100">
        <LuMessageCircle className="w-5 h-5" />
        {t('comments.title')} ({comments?.length})
      </h3>

      <form onSubmit={handleAddComment} className="mb-6">
        <div className="flex gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
            alt={t('comments.current_user')}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('comments.share_your_opinion')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <LuSend className="w-4 h-4" />
                {t('comments.send')}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

interface SuggestedBooksProps {
  categories: Category[];
  isArabic: boolean;
}

const SuggestedBooks: React.FC<SuggestedBooksProps> = ({ categories, isArabic }) => {
  const { books, setSelectedCategory } = useBookData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerView = 5;
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    setSelectedCategory(categories.map((cat) => String(cat.id)));
  }, [categories, setSelectedCategory]);

  const nextBooks = () => {
    setCurrentIndex((prev) =>
      prev + booksPerView >= books?.length ? 0 : prev + booksPerView
    );
  };

  const prevBooks = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, books?.length - booksPerView) : Math.max(0, prev - booksPerView)
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-gray-100">
        <LuBookOpen className="w-5 h-5" />
        {t('books.suggested')}
      </h3>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentIndex * (100 / booksPerView)}%)` }}
          >
            {books.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-0"
              >
                <div
                  onClick={() => router.replace(`/books/${book.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-full min-h-[275px] object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-sm mb-1 line-clamp-2 dark:text-gray-100">
                    {isArabic ? book.ar_title : book.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <RatingStars rating={parseFloat(book.rating)} size="w-3 h-3" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{book.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">${book.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevBooks}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextBooks}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const BookDetailsPage: React.FC = () => {
  const { id } = useParams();
  const bookId = String(id);
  const [rating, setRating] = useState(0);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const { data: book, isLoading } = useBookQuery(bookId);
  const { mutate } = useToggleFavorite();
  const t = useTranslations();
  const { mutate: cartMutate } = useCreateCart({
    onSuccess: (data) => {
      cartItemMutate({ id: data.id, bookId: parseInt(bookId) });
      localStorage.setItem("cart", JSON.stringify(data));
    },
  }); const { mutate: cartItemMutate } = useCreateCartItem();
  const cartJson = localStorage.getItem('cart');
  const cart = cartJson ? JSON.parse(cartJson) : null;
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const handleAddToCart = () => {
    if (user == null) {
      showErrorToast('auth.login_required')
      return
    }
    if (cart) {
      cartItemMutate({ id: cart.id, bookId: parseInt(bookId) })
    } else {
      cartMutate(user.id);
    }
    showSuccessToast(t('books.added_to_cart'));
  };

  const handleRating = (newRating: number) => {
    setRating(newRating);
  };

  const handleFavorite = () => {
    if (user?.id) {
      mutate(
        { userId: user.id, bookId: parseInt(bookId) },
        {
          onSuccess: () => {
            if (book != undefined)
              book.isFavorite = !book.isFavorite;
          },
        }
      );
    } else {
      showErrorToast(t('auth.login_required'));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('books.not_found')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('books.not_found_desc')}</p>
      </div>
    );
  }

  const discount = book.discount && Number(book.discount) > 0 ? +book.discount : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-8">
                <div className="text-center mb-6">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleFavorite}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {book.isFavorite ? (
                      <LuHeart className="w-4 h-4 text-red-500 fill-red-500" /> // قلب ممتلئ
                    ) : (
                      <LuHeart className="w-4 h-4" /> // قلب فارغ
                    )}
                    {t("books.want_to_read")}
                  </button>


                  {discount > 0 ? (
                    <>
                      <div className="w-full border border-red-500 text-red-500 py-3 px-4 rounded-lg text-center line-through">
                        Kindle - ${book.price}
                      </div>
                      {book.discounted_price && (
                        <button
                          onClick={handleAddToCart}
                          className="w-full bg-white border border-gray-900 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <LuShoppingCart className="w-4 h-4" />
                          Kindle - ${book.discounted_price}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <LuShoppingCart className="w-4 h-4" />
                      Kindle - ${book.price}
                    </button>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium mb-2">{t('books.rate_this_book')}:</h4>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className="hover:scale-110 transition-transform"
                          aria-label={t('rating.stars', { count: star })}
                        >
                          <LuStar
                            className={`w-6 h-6 ${star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400 hover:text-yellow-400 dark:text-gray-600'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-9">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {isArabic ? book.ar_title : book.title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl text-gray-700 dark:text-gray-300">{book.author}</h2>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={parseFloat(book.rating)} />
                      <span className="font-medium text-lg">{book.rating}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {isArabic ? book.ar_description : book.description}
                  </p>
                </div>

                {book.categories.length > 0 && <div>
                  <h3 className="text-lg font-medium mb-3 dark:text-gray-100">{t('books.categories')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer transition-colors"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>}

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>{book.total_pages} {t('books.pages')}</p>
                  <p>
                    {t('books.first_published')} {new Date(book.created_at).getFullYear()}
                  </p>
                </div>

                <SuggestedBooks categories={book.categories} isArabic={isArabic} />
                <CommentsSection bookId={bookId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;