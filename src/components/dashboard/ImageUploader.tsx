import { useRef, useState } from "react";
import { GiCloudUpload } from "react-icons/gi";

export default function ImageUploader({
  sent,
  currentColor,
  handleUploadImages,
  text,
}) {
  const ImagesUploader = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUploadImages({ target: { files } });
    }
  };

  return (
    <>
      <input
        ref={ImagesUploader}
        onChange={handleUploadImages}
        hidden
        multiple
        type="file"
        className={`w-full h-[35px] rounded-md outline-none border-2 border-b-4 dark:border-[#303030] bg-slate-100 dark:border-b-[#9a9a9a] pl-2 pr-2 dark:bg-[#2d2d2d] dark:text-white transition-all duration-300 ease-in-out placeholder-[#9a9a9a] dark:hover:bg-[#313131] dark:focus:bg-[#1e1f20] focus:border-border focus:drop-shadow-lg`}
        style={{ "--current-color": currentColor || "#fcb700" }}
        disabled={!sent}
      />

      <div
        onClick={() => {
          if (sent) ImagesUploader.current.click();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border border-dashed rounded-lg flex flex-col justify-center items-center gap-3 p-6 ${
          dragging ? "bg-gray-200" : ""
        }`}
        style={{
          borderColor: !sent ? "gray" : currentColor,
          color: !sent ? "gray" : currentColor,
          cursor: !sent ? "auto" : "pointer",
        }}
      >
        <GiCloudUpload className="text-[60px]" />
        <p className="font-semibold">{text}</p>
      </div>
    </>
  );
}
