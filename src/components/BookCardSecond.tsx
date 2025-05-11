import Image from "next/image";

const BookCardSecond = ({ book }: any) => {
  return (
    <div className="w-[190px] shadow hover:shadow-lg border border-gray-200 bg-white rounded-lg overflow-hidden">
      {/* صورة الكتاب */}
      <div className="relative w-full h-[280px]">
        <Image
          src={book.image}
          alt="book"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* محتوى البطاقة */}
      <div className="p-3 space-y-1">
        <div  className="font-semibold text-sm line-clamp-2 hover:cursor-pointer hover:underline">{book.title}</div>
        <div className="text-gray-700 text-xs">
          <div className="flex items-center justify-between">
            <span>{book.author}</span>
            <span>{book.rating} ⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardSecond;
