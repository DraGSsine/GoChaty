import { createContext, useContext } from "react";
import { useState } from "react";
export const SelectedChatContext = createContext();

export const SelectedChatContextProvider = ({ children }) => {
  const [data, setdata] = useState({});
  const [lastMessage, setlastMessage] = useState({});
  console.log('s===>',data.uuid)
  return (
    <SelectedChatContext.Provider value={{ data, setdata,lastMessage,setlastMessage }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
