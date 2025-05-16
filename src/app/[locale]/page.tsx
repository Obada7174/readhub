import Hero from '@/sections/home/Hero'; 
import TopRatedBooks from '@/sections/home/TopRatedBooks'; 
import FaqSection from '@/sections/faq/FAQSection';
export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <div>
      <Hero/>
      <div className='container mx-auto px-4'>
      <TopRatedBooks/>
        <FaqSection faqPath='HomePage.faqSection'/>
      </div>
    </div>
  );
}