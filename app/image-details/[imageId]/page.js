"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrView } from "react-icons/gr";
import { LuHardDriveDownload } from "react-icons/lu";
import { BiLike } from "react-icons/bi";
import Link from "next/link";
import { wait } from "@/utilities/delayHandler";

const page = (props) => {
  const router = useRouter();
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setloading] = useState(null);
  const backButtonHandlder = () => {
    router.back();
  };

  const getImageDetails = async () => {
    const nToast = toast.loading("Loading...");
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/${props.params.imageId}?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI`
      );
      setImageDetails(data);
      console.log({ data });
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching image details!");
    }
    toast.dismiss(nToast);
    setloading(null);
  };

  useEffect(() => {
    getImageDetails();
    scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen text-black flex items-center justify-center">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="w-11/12 min-h-screen flex max-w-[1260px] items-center justify-between flex-col-reverse md:flex-col lg:flex-col overflow-hidden box-shadow p-5 gap-5">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-5">
              <div className="bg-gray-100 p-1 rounded-full h-[50px] w-[50px]">
                <img
                  src={imageDetails?.user?.profile_image?.large}
                  alt=""
                  height={"100%"}
                  width={"100%"}
                  className="rounded-full object-cover object-top"
                />
              </div>
              <div className="font-mono font-bold">
                <p>{imageDetails?.user?.name}</p>
                <p className="font-bold text-gray-600 italic">
                  {imageDetails?.user?.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row gap-5 items-center">
              <div>
                <p className="flex gap-2 items-center bg-gray-100 text-gray-600 font-bold rounded-md px-6 py-2">
                  <BiLike className="text-2xl" />
                  {imageDetails?.likes}
                </p>
              </div>
              <div>
                <p className="flex gap-2 items-center bg-gray-100 text-gray-600 font-bold rounded-md px-6 py-2">
                  <GrView className="text-2xl" /> {imageDetails?.views}
                </p>
              </div>
              <div>
                <p className="flex gap-2 items-center bg-gray-100 text-gray-600 font-bold rounded-md px-6 py-2">
                  <LuHardDriveDownload className="text-2xl" />
                  {imageDetails?.downloads}
                </p>
              </div>
              <Link
                href={`https://unsplash.com/photos/${props.params.imageId}/download`}
              >
                <button className="bg-black rounded-md px-6 py-2 font-bold text-white">
                  Download
                </button>
              </Link>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="h-[500px] overflow-hidden flex items-center justify-center">
                <video
                  src="/video.mp4"
                  className="h-full"
                  loop
                  autoPlay
                ></video>
              </div>
            }
          >
            {wait(1000)}
            <img
              src={imageDetails && imageDetails.urls.small}
              alt=""
              className="object-cover object-center"
            />
          </Suspense>

          <button
            className="bg-black px-6 py-2 text-white font-bold rounded-md"
            onClick={() => backButtonHandlder()}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
