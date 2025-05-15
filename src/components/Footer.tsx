import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import logo from '@/assets/images/readhub-darkmode.svg'
export default function Footer() {
    const t = useTranslations('footer');

    return (
        <footer className="bg-gray-900 text-gray-50 border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center">
                            <Image
                                src={logo}
                                alt='logo'
                                width={100}
                            />
                            <h3 className="font-semibold text-lg mb-4 font-funnel-display">readhub</h3>
                        </div>
                        <p className="text-muted-foreground">
                            {t('about.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('quickLinks.title')}</h3>
                        <ul className="space-y-2">
                            <li><Link href="/books" className="text-muted-foreground hover:text-primary">{t('quickLinks.books')}</Link></li>
                            <li><Link href="/ebooks" className="text-muted-foreground hover:text-primary">{t('quickLinks.ebooks')}</Link></li>
                            <li><Link href="/categories" className="text-muted-foreground hover:text-primary">{t('quickLinks.categories')}</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">{t('quickLinks.aboutUs')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('customerService.title')}</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{t('customerService.contactUs')}</Link></li>
                            <li><Link href="/shipping" className="text-muted-foreground hover:text-primary">{t('customerService.shippingInfo')}</Link></li>
                            <li><Link href="/returns" className="text-muted-foreground hover:text-primary">{t('customerService.returns')}</Link></li>
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">{t('customerService.faq')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">{t('newsletter.title')}</h3>
                        <p className="text-muted-foreground mb-4">
                            {t('newsletter.description')}
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder={t('newsletter.emailPlaceholder')}
                                className="w-full px-3 py-2 border rounded-md bg-background"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                                {t('newsletter.subscribeButton')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} readhub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}