"use client";

import { useRef, useState } from "react";
import { GiCloudUpload } from "react-icons/gi";

interface PdfUploaderProps {
  sent: boolean;
  currentColor?: string;
  text: string;
  onUpload: (files: FileList) => void;
}

export default function PdfUploader({
  sent,
  currentColor = "#fcb700",
  text,
  onUpload,
}: PdfUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleChange}
        hidden
        type="file"
        accept="application/pdf"
        disabled={!sent}
      />

      <div
        onClick={() => {
          if (sent) inputRef.current?.click();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border border-dashed rounded-lg flex flex-col justify-center items-center gap-3 p-6 transition-colors duration-200 ${
          dragging ? "bg-gray-200" : "bg-transparent"
        }`}
        style={{
          borderColor: !sent ? "gray" : currentColor,
          color: !sent ? "gray" : currentColor,
          cursor: !sent ? "not-allowed" : "pointer",
        }}
      >
        <GiCloudUpload className="text-[60px]" />
        <p className="font-semibold">{text}</p>
      </div>
    </>
  );
}
