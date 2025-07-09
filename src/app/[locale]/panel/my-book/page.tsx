'use client';

import MyBookCard from '@/components/panel/mybookcard';
import MyBookCardSkeleton from '@/components/panel/mybookskelton';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface PurchasedBook {
  id: number;
  purchased_at: string;
  book: {
    id: number;
    title: string;
    ar_title?: string;
    img: string;
    author: string;
    rating: string;
    total_pages: number;
    file_url: string;
    description?: string;
    price: string;
    discounted_price?: string;
    categories?: { id: number; title: string }[];
  };
}

export default function PurchasedBooks() {
  const locale = useLocale();
  const t = useTranslations('Panel.MyBooks');
  const isRTL = locale === 'ar';
  const [purchasedBooks, setPurchasedBooks] = useState<PurchasedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPurchasedBooks([
        {
          id: 1,
          purchased_at: '2024-12-10T12:00:00Z',
          book: {
            id: 101,
            title: 'The Alchemist',
            ar_title: 'الخيميائي',
            img: 'https://images-na.ssl-images-amazon.com/images/I/81lZy6H9xDL.jpg',
            author: 'Paulo Coelho',
            rating: '4.7',
            total_pages: 208,
            file_url: '/pdfs/the-alchemist.pdf',
            description: 'رواية تحفيزية عن البحث عن الذات.',
            price: '15.00$',
            discounted_price: '10.00$',
            categories: [{ id: 1, title: 'تنمية ذاتية' }],
          },
        },
        {
          id: 2,
          purchased_at: '2025-01-04T08:30:00Z',
          book: {
            id: 102,
            title: 'Atomic Habits',
            ar_title: 'العادات الذرية',
            img: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
            author: 'James Clear',
            rating: '4.8',
            total_pages: 320,
            file_url: '/pdfs/atomic-habits.pdf',
            description: 'كتاب يشرح كيفية بناء العادات الجيدة وتغيير السيئة.',
            price: '20.00$',
            discounted_price: '14.00$',
            categories: [{ id: 2, title: 'تطوير الذات' }],
          },
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <section className={`py-10 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, idx) => (
            <MyBookCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }
  

  return (
    <section className={`py-10 px-4 sm:px-8 md:px-12 max-w-5xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
      {purchasedBooks.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          {t('noBooks')}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {purchasedBooks.map(({ id, book }) => (
            <MyBookCard key={id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
