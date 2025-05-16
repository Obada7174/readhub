"use client";
import { FormEvent, useEffect, useState } from "react";
import { FaStar, FaStarHalf, FaX } from "react-icons/fa6";

const Rate = () => {
  const [showRate, setShowRate] = useState<boolean>(false);
  const [rate, setRate] = useState<string | null>(null);
  const [rateError, setRateError] = useState<string | null>(null);
  const [review, setReview] = useState<string | null>(null);

  const starsCount = Math.floor(rate ? +rate : 0);
  const stars = new Array(starsCount).fill(0);
  const halfStar = rate ? +rate % 1 >= 0.5 : false;

  const clear = () => {
    setRate("");
    setReview("");
    setRateError("");
  };

  useEffect(() => {
    if (showRate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      clear();
    }
  }, [showRate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!rate) {
      setRateError("Rate field is required");
    } else {
      setShowRate(false);
    }
  };

  return (
    <>
      <button
        className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-[#f8e7d0] transition-colors font-medium text-sm sm:text-base"
        onClick={() => setShowRate(true)}
      >
        Share Your Rate
      </button>
      {showRate && (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-[#0000004d] p-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5 bg-white p-2.5 rounded-md w-full max-w-[500px] border-2 border-black"
          >
            <div className="flex justify-end">
              <FaX
                onClick={() => setShowRate(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:base" htmlFor="rate">
                Rate
              </label>
              <div className="flex gap-1.5">
                <input
                  className="p-1 outline-none border-2 border-black rounded-sm text-sm sm:base w-full"
                  type="number"
                  id="rate"
                  value={rate || ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!v) {
                      setRate("");
                    }
                    if (+v <= 5 && +v >= 1) {
                      setRate(e.target.value);
                    }
                  }}
                  placeholder="between 1 and 5"
                />
                <div className="flex gap-1 items-center pr-2">
                  {stars.map((_, i) => {
                    return <FaStar key={i} />;
                  })}
                  {halfStar && <FaStarHalf />}
                </div>
              </div>
              {rateError && (
                <p className="text-sm text-red-500 font-medium">{rateError}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm sm:base" htmlFor="review">
                Review (optional)
              </label>
              <textarea
                rows={6}
                className="p-1 outline-none border-2 border-black rounded-sm text-sm sm:base"
                id="review"
                value={review || ""}
                onChange={(e) => setReview(e.target.value)}
                placeholder="We'd love to hear your review"
              />
            </div>
            <button className="py-1.5 px-1.5 cursor-pointer rounded-md border-2 border-black hover:bg-black hover:text-[#f8e7d0] transition-colors font-medium text-sm sm:text-base">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default Rate;
