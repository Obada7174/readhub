// import {useTranslations} from 'next-intl';
import Hero from '@/sections/home/Hero'; 
import TopRatedBooks from '@/sections/home/TopRatedBooks'; 
export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <div>
      <Hero/>
      <div className='container mx-auto px-4'>
      <TopRatedBooks/>
      </div>
    </div>
  );
}