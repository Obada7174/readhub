import Image from 'next/image';
const page = () => {
   return (
    <div>
        
    <div className="top-15 w-full h-[350px] relative">
  <Image
    src="/assets/landing.png"
    alt="landing"
    fill
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
    <h1 className="text-white text-3xl font-bold"></h1>
  </div>
</div>

    </div>
  )
}

export default page
