import { Link } from "@/i18n/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import readhub from '@/assets/images/readhub-logo.svg';
import readhubdarkmode from "@/assets/images/readhub-darkmode.svg";
import { useEffect, useState } from "react";

const Logo = () => {
    const {theme} = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (mounted &&
        <Link href='/' className="flex gap-1.5 items-center min-h-16 min-w-40">

            <Image
                src={theme === 'dark' ? readhubdarkmode : readhub}
                alt="readhub logo"
                width={40}
                className='min-w-16'
            />

            <h1 className="font-funnel-display text-2xl text-gray-800 dark:text-white">
                <span className='font-light'>read</span><strong>hub</strong>
            </h1>
        </Link>
  )
}

export default Logo;
