// import { GoogleGenAI } from "@google/genai";
import React, { useEffect, useRef, useState } from "react";
import Chats from "./chats";
// import { cleanStreamedMarkdown } from "../utils/fixUnclosedMarkdown";
// import "../App.css"
import { useMyContext } from "../wrapper/ThemeContext";

import { askbot } from "../utils/chat1";

const ChatArea = () => {
  const {
    allMessages,
    setAllMessages,
    // loadingResponse,
    setLoadingResponse,
    asked,
    // history,
    setAsked,
  } = useMyContext();
  const [modelsMessage] = useState<any>({
    role: "model",
    parts: [{ text: "Loading..." }],
  });
  const messageDiv = useRef<HTMLDivElement | null>(null);
  // const [isMessageOverflowing, setIsMessageOverflowing] =
  //   useState<boolean>(false);
  const inputMesssage = useRef<HTMLTextAreaElement | null>(null);

  const scrollBottom = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollBottom.current) {
      scrollBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

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

  // const askBot = async () => {
  //   try {
  //     setLoading(true);
  //     const API_KEY = import.meta.env.VITE_API_KEY;
  //     const ai = new GoogleGenAI({ apiKey: `${API_KEY}` });

  //     history.push({
  //       role: "user",
  //       parts: [{ text: `${asked}` }],
  //     });
  //     console.log("History: ", history);
  //     setAllMessages((prev:any) => [
  //       ...prev,
  //       {
  //         role: "user",
  //         parts: [{ text: `${asked}` }],
  //       },
  //     ]);
  //     const response = await ai.models.generateContent({
  //       model: "gemini-2.5-flash",
  //       // contents: "You are a smart keywords mapper you can make different categories baced on which you can map the keywords in the chat messages i sent you so that the searching will become easy. ",
  //       // contents: "what is an array?",
  //       contents: [
  //         ...allMessages,
  //         {
  //           role: "user",
  //           parts: [{ text: `${asked}` }],
  //         },
  //       ],
  //     });

  //     history.push({
  //       role: "model",
  //       parts: [{ text: `${response.text}` }],
  //     });
  //     setAllMessages((prev: any) => [
  //       ...prev,
  //       {
  //         role: "model",
  //         parts: [{ text: `${response.text}` }],
  //       },
  //     ]);
  //     console.log("Response of genai: ", response)
  //   } catch (err) {
  //     console.log("error: ", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const element = messageDiv.current;
  //   if (element) {
  //     setIsMessageOverflowing(
  //       element.scrollHeight > element.clientWidth
  //     );
  //   }
  // }, [allMessages]);

  // useEffect(() => {
  //   if (!asked) return;
  //   setLoading(true);
  //   console.log(asked);

  //   askbot(asked, history, allMessages, setAllMessages);

  //   setLoading(false);
  // }, [asked]);

  // const handleSend = ()=>{
  //   console.log("asked: ", asked);
  //   askbot(asked, history, allMessages, setAllMessages);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAsked(e.target.value);
  };
  const handleSubmit = async () => {
    if (!asked && asked === "") return;
    setAllMessages((prev: any) => [
      ...prev,
      {
        role: "user",
        parts: [{ text: asked }],
      },
      modelsMessage,
    ]);
    setLoadingResponse(true);

    setAsked("");
    await askbot(asked, setAllMessages, setLoadingResponse);
    // setLoadingResponse(false);
  };
  return (
    <div
      className={`relative flex item-center justify-center h-screen w-[100vw] backdrop-invert-10 max-[769px]:w-screen`}
    >
      {/* <button className="absolute right-[40px]">b3</button> */}

      <div
        className={`flex flex-col flex-wrap wrap-anywher mx-40 w-full max-w-[calc(85vw)] justify-between h-[calc(100dvh)] border border-base-300 shadow-2xl rounded-3xl max-[769px]:mx-0 max-[769px]:max-w-[100dvw] max-[769px]:px-0`}
      >
        {/* actual chat messages! */}

        {allMessages && allMessages.length > 1 ? (
          <Chats scrollBottom={scrollBottom} messageDiv={messageDiv} />
        ) : (
          <div className="transition-all custom-div-scrollbar ease-in-out delay-100 flex-1 flex-wrap wrap-anywhere overflow-y-auto px-4 py-2 space-y-2 max-[769px]:h-[calc(70dvh)] text-[3rem] text-current/50 place-content-center font-bold">
            Ask me anything...
          </div>
        )}

        <div className="relative h-[60px] flex items-center justify-center gap-2 pl-30 pr-30 w-full mb-2 max-[769px]:px-8">
          {/* attach / image button */}
          {/* 
          <button
                type="button"
                onClick={() => {
                  // inputImageRef.current?.click();
                }}
                className="rounded-full active:bg-white/20 active:scale-90 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button> */}

          <textarea
            // type="text"
            ref={inputMesssage}
            autoFocus
            value={`${asked}`}
            onFocus={() => {
              // inputRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            onChange={handleChange}
            placeholder="Ask Something"
            className="shadow-2xl shadow-current/20 p-2 border placeholder-base-content/70 border-current/50 rounded-2xl w-full focus:outline focus:outline-accent-content/50 focus:border focus:border-accent-content max-[769px]:"
          ></textarea>
          {/*direct send button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            className={`
                  
                active:scale-85 active:bg-white/30 rounded-full hover:scale-95 cursor-pointer`}
          >
            {/* send button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
