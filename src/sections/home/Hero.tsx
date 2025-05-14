'use client';

import heroAnimation from "@/assets/animations/animation.json"
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-20 bg-white -translate-y-24">
      {/* Text content */}
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-funnel-display text-gray-900 leading-tight">
          <span className="font-light">read</span>
          <strong>hub</strong>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
          Discover and explore the world of knowledge with ease. Dive into articles, books, and curated content tailored just for you.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="cursor-pointer rounded-full bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-gray-700 transition">
            Download App
          </button>
          <button className="cursor-pointer rounded-full border-2 border-gray-900 text-gray-900 px-6 py-3 font-semibold hover:bg-gray-900 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="">
        <DynamicLottie animationData={heroAnimation} className="" loop={false} />
      </div>
    </section>
  )
}

export default Hero;
