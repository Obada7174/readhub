import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import React from 'react';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: ((isActive: boolean) => string) | string;
    style?: ((isActive: boolean) => React.CSSProperties) | React.CSSProperties;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, style }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const computedClassName = typeof className === 'function' ? className(isActive) : className || '';
    const computedStyle = typeof style === 'function' ? style(isActive) : style;

    return (
        <Link href={href} className={computedClassName} style={computedStyle}>
            {children}
        </Link>
    );
};

export default NavLink;