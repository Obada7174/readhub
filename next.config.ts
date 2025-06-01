import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["images-na.ssl-images-amazon.com", "randomuser.me"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
