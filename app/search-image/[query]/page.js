"use client";
import axios from "axios";
import { useEffect, useState, useContext, Suspense, useRef } from "react";
import { wait } from "@/utilities/delayHandler";
import { centralisedData } from "@/app/context";
import toast from "react-hot-toast";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { getSearchedImages } from "@/app/apis";

const Page = (props) => {
  // const [page, setPage] = useState(1);
  const {
    searchData,
    setSearchData,
    page,
    setPage,
    loading,
    setLoading,
    preLoader,
    setPreLoader,
    currentPage,
    setCurrentPage,
  } = useContext(centralisedData);

  const nextPageHandler = () => {
    setPage(page + 1);
    setPreLoader(true);
    scrollTo(0, 0);
  };
  const previousPageHandler = () => {
    setPage(page - 1);
    setPreLoader(true);
    scrollTo(0, 0);
  };

  // const getSearchedImages = async () => {
  //   const nToast = toast.loading("Loading...");
  //   try {
  //     console.log("Ye call hua api")
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `https://api.unsplash.com/search/photos?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&page=${page}&per_page=30&query=${props.params.query}`
  //     );
  //     setSearchData(data.results);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error occured while fetching images");
  //   }
  //   toast.dismiss(nToast);
  //   setLoading(false);
  // };

  const showSearchImageData =
    searchData &&
    searchData.map((e, i) => (
      <Link href={`/image-details/${e.id}`} key={i}>
        <div className="mb-3">
          {preLoader ? (
            <Suspense fallback={<video src="/video.mp4" loop autoPlay></video>}>
              {wait(1000)}
              <div className="relative group overflow-hidden">
                <img src={e.urls.small} alt="" />

                <div className="absolute  left-0 w-full h-full bottom-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-white font-bold  backdrop-blur-sm hidden md:flex lg:flex items-center justify-center gap-2 p-2">
                  <div className="flex items-center flex-col gap-3">
                    <div className="bg-white p-1 rounded-full h-[60px] w-[60px]">
                      <img
                        src={e?.user?.profile_image?.large}
                        alt=""
                        height={"100%"}
                        width={"100%"}
                        className="rounded-full object-cover object-top"
                      />
                    </div>
                    <div className="font-mono font-bold text-center flex flex-col items-center justify-center">
                      <p>{e?.user?.name}</p>
                      <p className="font-bold italic">{e?.user?.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          ) : (
            <div className="relative group overflow-hidden">
              <img src={e.urls.small} alt="" />
              <div className="absolute  left-0 w-full h-full bottom-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-white font-bold  backdrop-blur-sm hidden md:flex lg:flex items-center justify-center gap-2 p-2">
                <div className="flex items-center flex-col gap-3">
                  <div className="bg-white p-1 rounded-full h-[60px] w-[60px]">
                    <img
                      src={e?.user?.profile_image?.large}
                      alt=""
                      height={"100%"}
                      width={"100%"}
                      className="rounded-full object-cover object-top"
                    />
                  </div>
                  <div className="font-mono font-bold text-center flex flex-col items-center justify-center">
                    <p>{e?.user?.name}</p>
                    <p className="font-bold italic">{e?.user?.username}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    ));

  useEffect(() => {
    if (page !== currentPage) {
      getSearchedImages(setLoading, setSearchData, page, props.params.query);
    }
  }, [page]);

  useEffect(() => {
    if (preLoader) {
      // Set preLoader to false after a certain delay (e.g., 1000 milliseconds)
      const timeoutId = setTimeout(() => {
        setPreLoader(false);
        setCurrentPage(page);
      }, 3000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(page);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full min-h-screen text-black flex items-center justify-center">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="w-full min-h-screen flex flex-col items-center gap-10">
          <p className="font-bold text-gray-600 text-xl text-center px-5">
            Showing search results for "
            {props.params.query.replace(/%20/g, " ")}".
          </p>
          <div>
            <div className="w-full columns-2 md:columns-3 lg:columns-4 gap-3 p-3 relative">
              {showSearchImageData}
            </div>
          </div>
          {loading !== true
            ? searchData.length !== 0 && (
                <div className="w-full flex items-center my-14 justify-between px-10">
                  <button
                    onClick={previousPageHandler}
                    className={`bg-black hidden md:flex lg:flex text-white font-bold px-6 py-2 rounded-md ${
                      page > 1
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-25 pointer-events-none"
                    }`}
                  >
                    Previous Page
                  </button>
                  <button
                    onClick={previousPageHandler}
                    className={`bg-black flex md:hidden lg:hidden text-white font-bold text-2xl px-6 py-2 rounded-md ${
                      page > 1
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-25 pointer-events-none"
                    }`}
                  >
                    <IoMdArrowDropleft />
                  </button>

                  <p className="bg-black text-white font-bold px-6 py-2 rounded-md">
                    {page}
                  </p>
                  <button
                    type="button"
                    onClick={nextPageHandler}
                    className="bg-black text-white flex md:hidden lg:hidden font-bold text-2xl px-6 py-2 rounded-md"
                  >
                    <IoMdArrowDropright />
                  </button>
                  <button
                    type="button"
                    onClick={nextPageHandler}
                    className="bg-black text-white hidden md:flex lg:flex font-bold px-6 py-2 rounded-md"
                  >
                    Next Page
                  </button>
                </div>
              )
            : ""}
        </div>
      )}
    </div>
  );
};

export default Page;
