"use client";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-10 bg-blue-100 text-center p-5 text-black">
      <img src="./logo.png" alt="logo" className="h-[150px] w-[150px] logo" />
      <h1 className="text-4xl font-extrabold">Image Pulse</h1>
      <h3 className="text-3xl font-semibold">
        Currently this web application is under development! Please come back
        later 🥲.....
      </h3>
    </div>
  );
}
