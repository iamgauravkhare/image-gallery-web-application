import toast from "react-hot-toast";

const { default: axios } = require("axios");

export const getSearchedImages = async (
  setLoading,
  setSearchData,
  page,
  query,
) => {
  const nToast = toast.loading("Loading...");
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=i-HHB4ZRQCCy3kbKsj-5p1saUoKORIyf3vDszuupUYI&page=${page}&per_page=30&query=${query}`
    );
    setSearchData(data.results);
  } catch (error) {
    console.error(error);
    toast.error("Error occured while fetching images");
  }
  toast.dismiss(nToast);
  setLoading(false);
};
