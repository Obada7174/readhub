// import type { NextConfig } from "next";
// // import nextConfigI18n from './next-i18next.config';
// const nextConfig: NextConfig = {
//   experimental: {
//     serverActions: {},
//   },
//   // i18n: {
//   //   locales: ['en', 'ar'],
//   //   defaultLocale: 'en'
//   // }
// };

// export default nextConfig;
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);