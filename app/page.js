"use client";
import { wait } from "@/utilities/delayHandler";
import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { centralisedData } from "./context";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

export default function Home() {
  const [datas, setData] = useContext(centralisedData);
  const [imageData, setImageData] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [dataLength, setDataLength] = useState(30);

  const getRandomImages = async () => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&count=${dataLength}`
      );
      console.log(data);
      setData([...datas, ...data]);
      // setImageData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const images =
    datas &&
    datas.map((e, i) => (
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
          {/* {wait(2000)} */}
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
    if (datas.length === 0) getRandomImages();
  }, []);

  return (
    <div className="w-full">
      <h2 className="font-bold text-3xl text-center">Images of the day!</h2>
      <div>
        {datas ? (
          <InfiniteScroll
            dataLength={datas.length}
            className="w-full mt-10 columns-2 md:columns-3 lg:columns-4 gap-3 p-3"
            next={getRandomImages}
            hasMore={hasMore}
            loader={<div>Loading..</div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {images}
          </InfiniteScroll>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
