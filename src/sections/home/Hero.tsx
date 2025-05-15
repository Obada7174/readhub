import Image from "next/image"
import { Link } from "@/i18n/navigation"
import logo from "@/assets/images/readhub-darkmode.svg"
const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white ">
          <div className="flex items-center gap-4 max-w-4xl">

          <Image
            src={logo}
            alt="readhub logo"
            width={150}
            height={logo.height}
            className=""
          />
          <h1 className="text-5xl md:text-7xl font-funnel-display leading-tight mb-4">
            <span className="font-light">read</span>
            <strong>hub</strong>
          </h1>
            </div>
          <p className="text-xl mb-8">
            Discover and explore the world of knowledge with ease. Dive into articles,
            books, and curated content tailored just for you.
          </p>
          <div className="flex gap-4">
            <Link href='' className='cursor-pointer py-2 px-6 bg-gray-950 text-gray-50 text-lg rounded hover:bg-gray-800 duration-200 border border-gray-400'>Browse Books</Link>
            <Link href='' className='cursor-pointer py-2 px-6 text-gray-800 bg-gray-100 text-lg rounded hover:bg-gray-950 hover:text-gray-50 border border-gray-950 duration-200'>Learn More</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
