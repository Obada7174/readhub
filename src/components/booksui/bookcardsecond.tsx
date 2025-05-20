import Image from "next/image";
import { LuStar, LuShoppingCart } from "react-icons/lu";

const BookCardSecond = ({ book }: any) => {
  return (
    <div className="relative w-[220px] rounded-[10px] border border-gray-300 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      
      {/* صورة الغلاف */}
      <div className="relative w-full h-[330px] rounded-t-[10px] overflow-hidden">
        <img
          src={book.img}
          alt={book.title}
        />
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4 space-y-2">
        
        {/* عنوان الكتاب */}
        <h3 className="font-semibold text-sm line-clamp-2 hover:underline">
          {book.title}
        </h3>

        {/* اسم المؤلف */}
        <p className="text-gray-700 dark:text-gray-300 text-xs font-medium">{book.author}</p>

        {/* وصف مختصر - سطرين */}
        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
          {book.description}
        </p>

        {/* السعر والتقييم */}
        <div className="flex justify-between items-center text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
          <span>{book.price}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            {book.rating}
            <LuStar size={16} />
          </span>
        </div>

        {/* عدد الصفحات وأيقونة السلة */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs font-medium">
            <span>{book.total_pages} (pages)</span>
          </div>

          <button
            className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
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
