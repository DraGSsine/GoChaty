import { createContext } from "react";
import { useState } from "react";
export const SelectedChatContext = createContext();

export const SelectedChatContextProvider = ({ children }) => {
  const [data, setdata] = useState({});
  const [lastMessage, setlastMessage] = useState({})
  const [ShowSideBar, setShowSideBar] = useState(false)
  return (
    <SelectedChatContext.Provider value={{setShowSideBar,ShowSideBar,data, setdata,lastMessage,setlastMessage }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
