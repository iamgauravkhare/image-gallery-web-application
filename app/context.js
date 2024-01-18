"use client";
import { createContext, useState } from "react";

export const centralisedData = createContext(null);

const CentralisedData = (props) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const value = { data, setData, searchData, setSearchData };
  return (
    <>
      <centralisedData.Provider value={value}>
        {props.children}
      </centralisedData.Provider>
    </>
  );
};

export default CentralisedData;
