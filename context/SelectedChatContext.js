import { createContext } from "react";
import { useState } from "react";
export const SelectedChatContext = createContext();

export const SelectedChatContextProvider = ({ children }) => {
  const [data, setdata] = useState({});
  const [lastMessage, setlastMessage] = useState({})

  return (
    <SelectedChatContext.Provider value={{ data, setdata,lastMessage,setlastMessage }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
