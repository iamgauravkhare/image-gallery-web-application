"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, Suspense } from "react";

import Image from "next/image";
import { centralisedData } from "@/app/context";
import { wait } from "@/utilities/delayHandler";

const Page = (props) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(props.params.query);
  const [loading, setLoading] = useState(false);
  const [data, setData, searchData, setSearchData] =
    useContext(centralisedData);

  console.log(searchQuery);

  const getSearchedImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&page=${page}&per_page=30&query=${props.params.query}`
      );

      console.log(data.results);
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const getImageDetail = (e) => {
  //   router.push(`/image-detail/search/${e}`);
  // };

  const showSearchImageData =
    searchData &&
    searchData.map((e, i) => (
      <div key={i} className="mb-3">
        <Suspense
          fallback={
            <video
              src="/video.mp4"
              className="mb-3 rounded-md"
              loop
              autoPlay
            ></video>
          }
        >
          {wait(2000)}
          <div className="relative group overflow-hidden">
            <img
              src={e.urls.small}
              alt=""
              // loading="lazy"
            />
            <div className="absolute left-0 w-full bottom-0 hidden group-hover:flex transition-all duration-200 text-white font-bold  backdrop-blur-[3px]  flex-col items-start gap-2 p-2">
              <p>Creator - {e.user.name}</p>
              <p>Likes - {e.likes}</p>
            </div>
          </div>
        </Suspense>
      </div>
    ));

  useEffect(() => {
    getSearchedImages();
    scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <div className="w-full mt-10 columns-2 md:columns-3 lg:columns-4 gap-3 p-3">
      {/* <div className="w-full mt-10  gap-3 p-3"> */}
        {showSearchImageData}
      </div>
      {loading !== true
        ? searchData.length !== 0 && (
            <div className="page-navigation-ctn">
              {page !== 1 && (
                <button onClick={() => setPage(page - 1)} className="btn">
                  Previous Page
                </button>
              )}
              <button onClick={() => setPage(page + 1)} className="btn">
                Next Page
              </button>
            </div>
          )
        : ""}
    </>
  );
};
export default Page;
