'use client';

// import { useRouter, usePathname } from 'next/navigation';
// import { useLocale } from 'next-intl';

// const LanguageSwitcher = () => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const locale = useLocale();

//     const toggleLocale = () => {
//         const newLocale = locale === 'en' ? 'ar' : 'en';
//         const segments = pathname.split('/');
//         segments[1] = newLocale;
//         const newPath = segments.join('/');
//         router.replace(newPath);
//     };

//     return (
//         <button onClick={toggleLocale} className='text-brown-100 font-bold text-lg cursor-pointer hover:text-amber-900'>
//             {locale === 'en' ? 'العربية' : 'English'}
//         </button>
//     );
// };

// export default LanguageSwitcher;

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
