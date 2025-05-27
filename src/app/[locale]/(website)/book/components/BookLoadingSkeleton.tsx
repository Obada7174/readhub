import { Skeleton } from "@mui/material";

const BookLoadingSkeleton = () => (
  <div className="container mx-auto flex justify-center my-10">
    <div className="w-full md:w-4/5 px-2 sm:px-0 grid grid-cols-12 gap-6">
      <div className="col-span-full lg:col-span-3 pt-2 sm:pt-5">
        <div className="sticky top-28 max-w-2xs mx-auto">
          <div className="w-4/5 mx-auto">
            <Skeleton
              variant="rounded"
              width={190}
              height={290}
              sx={{
                borderRadius: "0.375rem 0.375rem 0 0",
                bgcolor: "grey.300",
              }}
            />
          </div>

          <div className="flex flex-col gap-4 my-6">
            <Skeleton
              variant="rounded"
              height={44}
              sx={{ bgcolor: "grey.300" }}
            />
            <Skeleton
              variant="rounded"
              height={44}
              sx={{ bgcolor: "grey.300" }}
            />

            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ bgcolor: "grey.300" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full lg:col-span-9 lg:pl-8 pt-2 sm:pt-5 space-y-6">
        <div>
          <Skeleton
            variant="text"
            width="70%"
            height={48}
            sx={{ bgcolor: "grey.300", fontSize: "2.5rem" }}
          />
          <div className="flex flex-wrap justify-between mt-2">
            <Skeleton
              variant="text"
              width="40%"
              height={32}
              sx={{ bgcolor: "grey.300" }}
            />
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={20}
                  height={20}
                  sx={{ bgcolor: "grey.300" }}
                />
              ))}
              <Skeleton
                variant="text"
                width={30}
                sx={{ bgcolor: "grey.300" }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 w-10/12">
          <Skeleton variant="text" sx={{ bgcolor: "grey.300" }} />
          <Skeleton variant="text" width="95%" sx={{ bgcolor: "grey.300" }} />
          <Skeleton variant="text" width="90%" sx={{ bgcolor: "grey.300" }} />
          <Skeleton variant="text" width="85%" sx={{ bgcolor: "grey.300" }} />
          <Skeleton variant="text" width="80%" sx={{ bgcolor: "grey.300" }} />
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <Skeleton variant="text" width={60} sx={{ bgcolor: "grey.300" }} />
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={80}
              height={24}
              sx={{ bgcolor: "grey.300" }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton variant="text" width="30%" sx={{ bgcolor: "grey.300" }} />
          <Skeleton variant="text" width="40%" sx={{ bgcolor: "grey.300" }} />
        </div>

        <div className="mt-8">
          <Skeleton
            variant="text"
            width="30%"
            height={32}
            sx={{ bgcolor: "grey.300", mb: 2 }}
          />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={190}
                height={290}
                sx={{ bgcolor: "grey.300" }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Skeleton
            variant="text"
            width="25%"
            height={32}
            sx={{ bgcolor: "grey.300", mb: 2 }}
          />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton
                  variant="rounded"
                  height={100}
                  sx={{ bgcolor: "grey.300" }}
                />
                <div className="flex justify-end">
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={30}
                    sx={{ bgcolor: "grey.300" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BookLoadingSkeleton;
