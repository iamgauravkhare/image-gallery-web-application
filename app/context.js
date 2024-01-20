"use client";
import { createContext, useState } from "react";

export const centralisedData = createContext(null);

const CentralisedData = (props) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [preLoader, setPreLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const value = {
    data,
    setData,
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
  };
  return (
    <>
      <centralisedData.Provider value={value}>
        {props.children}
      </centralisedData.Provider>
    </>
  );
};

export default CentralisedData;
