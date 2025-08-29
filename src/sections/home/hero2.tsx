'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LuSearch, LuStar } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Lottie from 'lottie-react';
import BookAnimation from '@/assets/animations/ITTR.json';

export function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('HomePage');
  const router = useRouter();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* النصوص والبحث */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {t('title')}
                <span className="gradient-text block">{t('highlight')}</span>
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {t('description')}
              </motion.p>
            </div>

            {/* البحث */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative flex-1">
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.push(
                        searchTerm.trim()
                          ? `/books?search=${encodeURIComponent(searchTerm)}`
                          : '/books'
                      );
                    }
                  }}
                  className="pl-10 h-12 bg-gray-700 hover:ring-0"
                />
              </div>
              <Button
                onClick={() => {
                  router.push(
                    searchTerm.trim()
                      ? `/books?search=${encodeURIComponent(searchTerm)}`
                      : '/books'
                  );
                }}
                size="lg"
                variant="outline"
                className="h-12 px-6"
              >
                {t('exploreButton')}
              </Button>
            </motion.div>

            {/* قراء وتقييم */}
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gray-900 rounded-full border-2 border-background" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{t('readers')}</span>
              </div>

              <div className="flex items-center gap-1">
                <LuStar className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-sm text-muted-foreground">{t('reviews')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* الانميشن بدل الكارد */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <Lottie
              animationData={BookAnimation}
              loop
              className="w-[350px] lg:w-[450px] h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
