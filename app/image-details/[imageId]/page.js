"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrView } from "react-icons/gr";
import { LuHardDriveDownload } from "react-icons/lu";
import { FcLike } from "react-icons/fc";
import Link from "next/link";

const page = (props) => {
  const router = useRouter();
  const [imageDetails, setImageDetails] = useState(null);
  const backButtonHandlder = () => {
    router.back();
  };

  const getImageDetails = async () => {
    try {
      const loading = toast("Fetching Details");
      const { data } = await axios.get(
        `https://api.unsplash.com/photos/${props.params.imageId}?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI`
      );
      toast.dismiss(loading);
      setImageDetails(data);
      console.log({ data });
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching image details!");
    }
  };

  useEffect(() => {
    getImageDetails();
  }, []);

  return (
    <div className="w-full min-h-screen max-w-[1260px] text-black flex flex-col items-center">
      <div className="w-11/12 flex items-center flex-col-reverse md:flex-col g:flex-col overflow-hidden box-shadow p-5 gap-10">
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
              <p className="font-semibold italic">
                {imageDetails?.user?.username}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row gap-10 items-center">
            <div>
              <p className="flex gap-2 items-center bg-gray-100 rounded-md px-6 py-2">
                <FcLike />
                {imageDetails?.likes}
              </p>
            </div>
            <div>
              <p className="flex gap-2 items-center bg-gray-100 rounded-md px-6 py-2">
                <GrView /> {imageDetails?.views}
              </p>
            </div>
            <div>
              <p className="flex gap-2 items-center bg-gray-100 rounded-md px-6 py-2">
                <LuHardDriveDownload />
                {imageDetails?.downloads}
              </p>
            </div>
            <Link
              href={`https://unsplash.com/photos/${props.params.imageId}/download`}
            >
              <button className="bg-black rounded-md px-6 py-2 text-white">
                Download
              </button>
            </Link>
          </div>
        </div>
        <img
          src={imageDetails && imageDetails.urls.small}
          alt=""
          className="object-cover object-center"
          loading="lazy"
        />
        <button
          className="bg-black px-6 py-2 text-white rounded-md"
          onClick={() => backButtonHandlder()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default page;
