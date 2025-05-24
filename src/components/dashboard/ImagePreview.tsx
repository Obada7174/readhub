import { MdDelete } from "react-icons/md";
import { LinearBuffer } from "../export";
import { forwardRef } from "react";

const ImagePreview = forwardRef(
  (
    { image, index, deleteImage, completeUpload, currentColor, progress },
    ref,
  ) => {
    return (
      <div
        key={index}
        className="flex gap-4 dark:bg-secondary-dark-bg p-4 rounded-md"
      >
        <div>
          <img
            className="rounded"
            src={URL.createObjectURL(image)}
            alt="product img"
            width="200px"
          />
        </div>
        <div className="dark:text-gray-200 font-semibold flex-grow flex flex-col justify-between p-3">
          <div className="flex justify-between">
            <div>
              <p>{image.name}</p>
              <p>
                {(image.size / 1024).toFixed(2) < 1024
                  ? (image.size / 1024).toFixed(2) + " KB"
                  : (image.size / 1024 / 1024).toFixed(2) + " MB"}
              </p>
            </div>
            <MdDelete
              onClick={() => deleteImage(image, index)}
              className={
                completeUpload
                  ? `text-2xl text-red-600 hover:text-red-700 cursor-pointer`
                  : `text-2xl text-gray-600`
              }
            />
          </div>
          <LinearBuffer
            ref={ref}
            currentColor={currentColor}
            progress={progress}
          />
        </div>
      </div>
    );
  },
);

export default ImagePreview;
