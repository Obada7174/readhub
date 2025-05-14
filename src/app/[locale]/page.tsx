// import {useTranslations} from 'next-intl';
import Hero from '@/sections/home/Hero'; 
import TopRatedBooks from '@/sections/home/TopRatedBooks'; 
export default function HomePage() {
  // const t = useTranslations('HomePage');
  return (
    <div>
      <Hero/>
      <TopRatedBooks/>
    </div>
  );
}