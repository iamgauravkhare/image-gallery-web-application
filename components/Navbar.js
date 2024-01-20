"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { ImHome } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { centralisedData } from "@/app/context";

const Navbar = () => {
  const { setCurrentPage } = useContext(centralisedData);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    if (query.trim() !== "") {
      router.push(`/search-image/${query.trim()}`);
    } else {
      toast.error("Invalid Search Input");
    }
    setQuery("");
  };
  return (
    <div className="w-full shadow-md">
      <nav className="max-w-[1260px] w-full md:11/12 lg:w-11/12 mx-auto flex items-center gap-2 justify-between p-3">
        <Link href={"/"}>
          <div>
            <img src="/logo.png" alt="logo" width={"45px"} height={"45px"} />
          </div>
        </Link>
        <form
          className="w-full md:w-[50%] lg:w-[65%] flex gap-2"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <input
            name="query"
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 rounded-md bg-gray-100 outline-none text-gray-600"
          />
          <input
            className="px-6 py-2 bg-black font-bold hidden md:flex lg:flex text-white rounded-md border-none"
            type="submit"
            value="Search"
          />
          <button
            className="px-6 py-2 flex md:hidden lg:hidden bg-black text-white
            rounded-md border-none text-2xl"
            type="submit"
          >
            <FaSearch />
          </button>
        </form>
        <Link href="/">
          <button className="px-6 py-2 hidden md:flex lg:flex font-bold bg-black text-white rounded-md border-none">
            Home
          </button>
        </Link>
        <Link href={"/"}>
          <button className="px-6 py-2 flex md:hidden lg:hidden bg-black text-2xl text-white rounded-md border-none">
            <ImHome />
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
