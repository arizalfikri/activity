import React, { createContext, useState } from "react";

export const GlobalContext = createContext({
  data: undefined,
});

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState({});

  const handleSetData = (newData) => {
    setData(newData);
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        handleSetData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
