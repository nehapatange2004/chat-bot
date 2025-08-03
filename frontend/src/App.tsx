// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatArea from "./components/ChatArea";
import { useMyContext } from "./wrapper/ThemeContext";

function App() {
  
  const { theme, setTheme } = useMyContext();
  return (
    <>
      <div
        data-theme={theme}
        className={` relative h-screen w-screen flex justify-between items-center text-[0.85rem] transition-all ease-in-out delay-75`}
      >
        <div
          title={`${theme === "dark" ? "light mode" : "dark mode"}`}
          className="absolute right-5 top-2 z-5 flex justify-center-safe items-center border rounded-full"
        >
          <button
            type="button"
            className="active:bg-red rounded-full hover:cursor-pointer"
            onClick={() =>
              setTheme((prev: string) => (prev === "dark" ? "light" : "dark"))
            }
          >
            {/* dark icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`size-5 p-1 rounded-full ${
                theme === "dark" ? "bg-base-content stroke-base-300" : ""
              }`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="active:bg-red rounded-full hover:cursor-pointer"
            onClick={() =>
              setTheme((prev: string) => (prev === "dark" ? "light" : "dark"))
            }
          >
            {/* light */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`size-5 p-0.5 rounded-full ${
                theme === "light" ? "bg-black stroke-white" : ""
              }`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
        </div>
        

        <Routes>
          <Route path="/" element={<ChatArea />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
