import {  useState, type ReactNode } from "react";
import { createContext, useContext } from "react";

const myContext = createContext<any>(null);
const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark");
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [asked, setAsked] = useState<string>("");
 



 
  const [allMessages, setAllMessages] = useState<any[]>(
    [
    { role: "model", parts: [{ text:  ""}] },

  ]
);
  //  const [isFull, setIsFull] = useState<boolean>(false);

  // var history = [
  //   {
  //     role: "model",
  //     parts: [
  //       {
  //         text: "You are a dsa buddy. You answer dsa related queries. You don't say much words but you explain in a very short like just three to four words or sentences which is very very easy and shortest possible. You explain in very easy language no fancy words just main lines and that's it.",
  //       },
  //     ],
  //   },
  // ];
  return (
    <myContext.Provider
      value={{
        theme,
        setTheme,
        allMessages,
        setAllMessages,
        loadingResponse,
        setLoadingResponse,
        asked,
        setAsked,
        
      }}
    >
      {children}
    </myContext.Provider>
  );
};
export const useMyContext = () => useContext(myContext);
export default MyContextProvider;
