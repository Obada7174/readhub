import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images-na.ssl-images-amazon.com", "randomuser.me",'images.unsplash.com'],
  },
};

const withNextIntl = createNextIntlPlugin();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default withPWA(withNextIntl(nextConfig));
