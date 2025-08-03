import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMyContext } from "../wrapper/ThemeContext";
const chats = (props: {
  scrollBottom: React.RefObject<HTMLDivElement | null>;
  messageDiv: React.RefObject<HTMLDivElement | null>;
}) => {
  const {
    allMessages,

    loadingResponse,
  } = useMyContext();
  return (
    <>
      {" "}
      <div className="transition-all custom-div-scrollbar ease-in-out delay-100 flex-1 flex-wrap wrap-anywhere overflow-y-auto px-4 py-2 space-y-2 max-[769px]:h-[calc(70dvh)] ">
        {allMessages?.map((ele: any, index: number) => (
          <div
            className={`chat ${
              ele.role !== "user" ? "chat-start mb-20" : "chat-end"
            }`}
            key={index}
          >
            {/* <div className="chat-image avatar"></div> */}
            <div className="chat-header">
              {/* {ele.senderId ===userDetails?._id? "": selectedUser.name } */}
              {/* {ele.role==="model"? "Bot": ""} */}
              <time className="text-xs opacity-50">
                {/* {formatedTime(`${ele.updatedAt }`)} */}
              </time>
            </div>
            <div
              className={`relative flex flex-wrap wrap-anywhere chat-bubble max-w-[90%] text-left  ${
                ele.role === "model"
                  ? "bg-transparent"
                  : "rounded-2xl bg-base-300 border-r-2 border-current/50 "
              }`}
            >
              {ele.image && (
                <div>
                  {" "}
                  <img src={`${ele.image}`} className="h-40" /> <br />
                </div>
              )}

              <div
                ref={props.messageDiv}
                className={`prose model-text flex flex-col custom-div-scrollbar hide-scrollbar overflow-scroll gap-6 max-w-[100%]`}
              >
                {ele.role === "model" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {ele.parts[0].text}
                  </ReactMarkdown>
                ) : (
                  ele.parts[0].text
                )}
              </div>
            </div>
          </div>
        ))}
        {loadingResponse && (
          <div className="loader chat-start chat-bubble rounded-full">
            {/* Loading.... */}
          </div>
        )}
      {allMessages.length === 0? <div>Ask me anything....</div>: null}
        <div ref={props.scrollBottom} />
      </div>
      
    </>
  );
};

export default chats;
