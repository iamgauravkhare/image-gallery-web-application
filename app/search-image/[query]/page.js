"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, Suspense } from "react";
import { wait } from "@/utilities/delayHandler";
import { centralisedData } from "@/app/context";
import toast from "react-hot-toast";
import Link from "next/link";

const Page = (props) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(props.params.query);
  const [loading, setLoading] = useState(false);
  const { searchData, setSearchData } = useContext(centralisedData);

  const getSearchedImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&page=${page}&per_page=30&query=${props.params.query}`
      );
      setSearchData(data.results);
    } catch (error) {
      console.error(error);
      toast.error("Error occured while fetching images");
    }
    setLoading(false);
  };

  const showSearchImageData =
    searchData &&
    searchData.map((e, i) => (
      <Link href={`/image-details/${e.id}`} key={i}>
        <div className="mb-3">
          <Suspense fallback={<video src="/video.mp4" loop autoPlay></video>}>
            {wait(1000)}
            <div className="relative group overflow-hidden">
              <img src={e.urls.small} alt="" loading="lazy" />
              <div className="absolute left-0 w-full bottom-0 hidden group-hover:flex transition-all duration-200 text-white font-bold  backdrop-blur-[3px]  flex-col items-start gap-2 p-2">
                <p>Creator - {e.user.name}</p>
                <p>Likes - {e.likes}</p>
              </div>
            </div>
          </Suspense>
        </div>
      </Link>
    ));

  useEffect(() => {
    getSearchedImages();
    scrollTo(0, 0);
  }, [page]);

  return (
    <div className="relative w-full">
      <div className="w-full mt-10 columns-2 md:columns-3 lg:columns-4 gap-3 p-3 relative">
        {showSearchImageData}
      </div>
      {loading !== true
        ? searchData.length !== 0 && (
            <div className="w-full flex items-center justify-between py-5 px-6">
              {page !== 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="bg-black text-white text-2xl font-semibold px-6 py-2"
                >
                  Previous Page
                </button>
              )}
              <button
                onClick={() => setPage(page + 1)}
                className="bg-black text-white text-2xl font-semibold px-6 py-2"
              >
                Next Page
              </button>
            </div>
          )
        : ""}
    </div>
  );
};
export default Page;
