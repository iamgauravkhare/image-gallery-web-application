"use client";
import { wait } from "@/utilities/delayHandler";
import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { centralisedData } from "./context";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";

export default function Home() {
  const { data, setData } = useContext(centralisedData);
  const [hasMore, setHasMore] = useState(true);

  const getRandomImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&count=30`
      );
      setData([...data, ...response.data]);
    } catch (error) {
      console.error(error);
      toast.error("Error occured while fetching images");
    }
  };

  const images =
    data &&
    data.map((e, i) => (
      <div key={i} className="mb-3">
        <Suspense fallback={<video src="/video.mp4" loop autoPlay></video>}>
          {wait(2000)}
          <div className="relative group overflow-hidden">
            <img src={e.urls.small} alt="" loading="lazy" />
            <div className="absolute left-0 w-full bottom-0 hidden group-hover:flex transition-all duration-200 text-white font-bold  backdrop-blur-[3px]  flex-col items-start gap-2 p-2">
              <p>Creator - {e.user.name}</p>
              <p>Likes - {e.likes}</p>
            </div>
          </div>
        </Suspense>
      </div>
    ));

  useEffect(() => {
    if (data.length === 0) getRandomImages();
  }, []);

  return (
    <div className="w-full">
      <h2 className="font-bold text-3xl text-center">Images of the day!</h2>
      <div>
        {data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            className="w-full mt-10 columns-2 md:columns-3 lg:columns-4 gap-3 p-3"
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
        ) : (
          <div className="font-semibold text-3xl text-center mt-32">
            Loading.....
          </div>
        )}
      </div>
    </div>
  );
}
