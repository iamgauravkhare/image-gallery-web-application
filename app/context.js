"use client";

import { createContext, useState } from "react";
export const centralisedData = createContext(null);
const CentralisedData = (props) => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  return (
    <>
      <centralisedData.Provider
        value={[data, setData, searchData, setSearchData]}
      >
        {props.children}
      </centralisedData.Provider>
    </>
  );
};

export default CentralisedData;
