import {useTranslations}  from 'next-intl';
// import BookCarousel from '@/components/Carousel';
// import { getBooks } from '@/services/books.service';

const TopRatedBooks = () => {
    const t = useTranslations("HomePage.topRatedSection");
    // const books = getBooks();
    // console.log(books);
    return (
        <section className="px-6 md:px-16 py-16 transition-colors duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t("topRatedBooks")}
            </h2>
            {/* <BookCarousel books={books}/> */}
        </section>
    );
};

export default TopRatedBooks;
