import Image from "next/image";

const BookCardSecond = ({ book }: any) => {
  return (
    <div className="relative w-[190px] shadow hover:shadow-lg cursor-pointer border border-gray-200 bg-white rounded-lg overflow-visible">
      <div className="relative w-full h-[280px] group">
        <Image
          src={book.image}
          alt="book"
          layout="fill"
          objectFit="cover"
        />

        <div
          className="
            hidden
            group-hover:block
            absolute
            top-0
            left-full
            ml-2
            w-72
            max-h-[calc(1.5rem*7)]
            overflow-hidden
            bg-white
            border border-gray-200
            shadow-lg
            rounded-lg
            p-4
            text-sm
            z-10
          "
        >
          <p className="line-clamp-7 text-gray-700">{book.description}</p>
        </div>
      </div>

      <div className="p-3 space-y-1">
        <div className="font-semibold text-sm line-clamp-2 hover:cursor-pointer hover:underline">
          {book.title}
        </div>
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
