import Image from "next/image";
import { LuStar, LuShoppingCart } from "react-icons/lu";
import { PiBookOpenTextLight } from "react-icons/pi"; // أيقونة صفحات

const BookCardSecond = ({ book }: any) => {
  return (
    <div className="relative w-[220px] rounded-xl border border-gray-200 bg-gray-100 dark:bg-gray-300 text-black dark:text-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      
      {/* صورة الغلاف */}
      <div className="relative w-full h-[280px] rounded-t-xl overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4 space-y-2">
        
        {/* عنوان الكتاب */}
        <h3 className="font-semibold text-sm line-clamp-2 hover:underline">
          {book.title}
        </h3>

        {/* اسم المؤلف */}
        <p className="text-gray-700 text-xs font-medium">{book.author}</p>

        {/* وصف مختصر - سطرين */}
        <p className="text-gray-600 text-xs line-clamp-2">
          {book.description}
        </p>

        {/* السعر والتقييم */}
        <div className="flex justify-between items-center text-sm font-semibold text-gray-900 mt-1">
          <span>{book.price}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            {book.rating}
            <LuStar size={16} />
          </span>
        </div>

        {/* عدد الصفحات وأيقونة السلة */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-gray-600 text-xs font-medium">
            <span>{book.pages} (pages)</span>
          </div>

          <button
            className="text-gray-900 hover:text-gray-700 dark:hover:text-white"
            aria-label="Add to cart"
            onClick={() => alert(`تمت إضافة ${book.title} إلى السلة`)}
          >
            <LuShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCardSecond;
