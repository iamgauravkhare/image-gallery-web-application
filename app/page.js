"use client";
import { wait } from "@/utilities/delayHandler";
import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { centralisedData } from "./context";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Home() {
  const { data, setData } = useContext(centralisedData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getRandomImages = async () => {
    const nToast = toast.loading("Loading...");
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&count=30`
      );
      setData([...data, ...response.data]);
      scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      toast.error("Error occured while fetching images");
    }
    setLoading(false);
    toast.dismiss(nToast);
  };

  const images =
    data &&
    data.map((e, i) => (
      <Link href={`/image-details/${e.id}`} key={i}>
        <div className="mb-3">
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
        </div>
      </Link>
    ));

  useEffect(() => {
    if (data.length === 0) {
      getRandomImages();
    }
  }, []);

  return (
    <div className="w-full min-h-screen text-black flex items-center justify-center">
      {loading ? (
        <span className="loader"></span>
      ) : (
        data.length > 1 && (
          <div className="w-full min-h-screen flex flex-col items-center gap-10">
            <p className="font-bold text-gray-600 text-xl text-center px-5">
              Trending! images of the day.
            </p>
            <div>
              <InfiniteScroll
                dataLength={data.length}
                className="w-full columns-2 md:columns-3 lg:columns-4 gap-3 p-3"
                next={getRandomImages}
                hasMore={hasMore}
                loader={
                  <div className="mb-3">
                    <video src="/video.mp4" loop autoPlay></video>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {images}
              </InfiniteScroll>
            </div>
          </div>
        )
      )}
    </div>
  );
}
