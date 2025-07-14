// import Hero from '@/sections/home/Hero';
import TopRatedBooks from '@/sections/home/TopRatedBooks';
import {Hero} from '@/sections/home/hero2';
import {Features} from '@/sections/home/features';
import {Categories} from '@/sections/home/categories';
import {Stats} from '@/sections/home/stats';
import FaqSection from '@/sections/faq/FAQSection';
import ContactSection from '@/sections/home/ContactSection'
export default function HomePage() {
    return (
        <div>
            <Hero />
            <div className='container mx-auto px-4'>
                <Stats />
                <TopRatedBooks />
                <Features/>
                <ContactSection/>
                <Categories/>
                <FaqSection faqPath='HomePage.faqSection' />
            </div>
        </div>
    );
}