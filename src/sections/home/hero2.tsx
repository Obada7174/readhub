'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LuBookOpen, LuSearch, LuStar, LuUsers, LuDownload } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export function Hero() {
  const [searchTerm, setSearchTerm] = useState('');

  const t = useTranslations('HomePage');
  const router = useRouter();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                      if (searchTerm.trim()) {
                        router.push(`/books?search=${encodeURIComponent(searchTerm)}`);
                      } else {
                        router.push('/books');
                      }
                    }
                  }}
                  className="pl-10 h-12 bg-gray-700 hover:ring-0"
                />
              </div>
              <Button onClick={() => {
                if (searchTerm.trim()) {
                  router.push(`/books?search=${encodeURIComponent(searchTerm)}`);
                } else {
                  router.push('/books');
                }
              }} size="lg" variant='outline' className="h-12 px-6">
                {t('exploreButton')}
              </Button>
            </motion.div>

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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1, 1.02, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-80 h-96 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl shadow-2xl mx-auto relative overflow-hidden"
              >
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <LuBookOpen className="h-6 w-6 text-primary" />
                    <span className="font-semibold">{t('currentReading')}</span>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg" />
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{t('bookTitle')}</h3>
                      <p className="text-sm text-muted-foreground">{t('bookAuthor')}</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-3/4" />
                      </div>
                      <p className="text-xs text-muted-foreground">{t('chapterProgress')}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <LuUsers className="h-4 w-4" />
                      <span className="text-sm">{t('comments')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LuDownload className="h-4 w-4" />
                      <span className="text-sm">{t('offline')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <LuStar className="h-8 w-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <LuBookOpen className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
