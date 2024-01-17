const Navbar = () => {
  return (
    <div className="w-full shadow-md">
      <nav className="max-w-[1260px] w-full mx-auto flex items-center gap-2 justify-between p-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" width={"45px"} height={"45px"} />
          <div className="text-3xl font-extrabold text-black hidden md:inline lg:inline ">
            Image Pulse
          </div>
        </div>
        <div className="w-full md:w-[50%] lg:w-[65%] flex gap-2">
          <input
            type="search"
            placeholder="Search....."
            className="w-full p-2 rounded-md bg-gray-100 outline-none"
          />
          <button className="px-6 py-2 bg-black text-white rounded-md border-none">
            Search
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
