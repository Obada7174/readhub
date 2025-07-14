'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  LuBookOpen,
  LuMessageCircle,
  LuTrophy,
  LuHeadphones,
  LuUsers,
  LuZap,
  LuHeart,
  LuDownload,
  LuSearch
} from 'react-icons/lu';
import { useTranslations } from 'next-intl';

export function Features() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: LuBookOpen,
      key: 'reading',
      color: 'bg-blue-500',
    },
    {
      icon: LuMessageCircle,
      key: 'social',
      color: 'bg-green-500',
    },
    {
      icon: LuTrophy,
      key: 'quizzes',
      color: 'bg-yellow-500',
    },
    {
      icon: LuHeadphones,
      key: 'audiobooks',
      color: 'bg-purple-500',
    },
    {
      icon: LuUsers,
      key: 'chat',
      color: 'bg-pink-500',
    },
    {
      icon: LuZap,
      key: 'notifications',
      color: 'bg-orange-500',
    },
    {
      icon: LuHeart,
      key: 'library',
      color: 'bg-red-500',
    },
    {
      icon: LuDownload,
      key: 'offline',
      color: 'bg-indigo-500',
    },
    {
      icon: LuSearch,
      key: 'search',
      color: 'bg-teal-500',
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {t(`${feature.key}.title`)}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {t(`${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-200 dark:from-gray-900 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('cta.title')}</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('cta.start')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                {t('cta.learn')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
