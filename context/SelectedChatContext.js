import { createContext, useContext } from "react";
import { useState } from "react";
export const SelectedChatContext = createContext();

export const SelectedChatContextProvider = ({ children }) => {
  const [data, setdata] = useState({});
  return (
    <SelectedChatContext.Provider value={{ data, setdata }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
