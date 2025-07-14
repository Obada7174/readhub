'use client';

import { motion } from 'framer-motion';
import Button  from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { LuBookOpen, LuBrain, LuHeart, LuZap, LuGlobe, LuTrophy } from 'react-icons/lu';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Categories() {
  const t = useTranslations('Categories');

  const categories = [
    {
      id: 'fiction',
      icon: LuBookOpen,
      color: 'bg-blue-500',
      count: '12,450',
    },
    {
      id: 'science',
      icon: LuBrain,
      color: 'bg-purple-500',
      count: '8,230',
    },
    {
      id: 'romance',
      icon: LuHeart,
      color: 'bg-pink-500',
      count: '6,780',
    },
    {
      id: 'thriller',
      icon: LuZap,
      color: 'bg-red-500',
      count: '5,920',
    },
    {
      id: 'biography',
      icon: LuGlobe,
      color: 'bg-green-500',
      count: '4,560',
    },
    {
      id: 'self-help',
      icon: LuTrophy,
      color: 'bg-orange-500',
      count: '7,340',
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
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/books?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {t(`${category.id}.name`)}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {category.count} {t('booksLabel')}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {t(`${category.id}.description`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            <Link href="/books">
              {t('viewAll')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
