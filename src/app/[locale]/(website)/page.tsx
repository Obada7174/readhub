import Hero from '@/sections/home/Hero';
import TopRatedBooks from '@/sections/home/TopRatedBooks';
import FaqSection from '@/sections/faq/FAQSection';
import ContactSection from '@/sections/home/ContactSection'
export default function HomePage() {
    return (
        <div>
            <Hero />
            <div className='container mx-auto px-4'>
                <TopRatedBooks />
                <ContactSection/>
                <FaqSection faqPath='HomePage.faqSection' />
            </div>
        </div>
    );
}