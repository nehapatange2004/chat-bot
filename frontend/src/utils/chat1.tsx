import React from "react";
// import axios from "axios";
// import { cleanStreamedMarkdown } from "./fixUnclosedMarkdown";
export const askbot = async (
  asked: string,
  setAllMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setLoadingResponse: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // try {
  //   const eventSource = new EventSource(`${import.meta.env.VITE_BACKEND_API_KEY}/api/askbot`);

  //   eventSource.onmessage = function (event) {
  //     const chunk = event.data;
  //     console.log("Received:", chunk);
  //   };

  //   eventSource.onerror = function (err) {
  //     console.error("Stream error:", err);
  //   };
  //   const response = await axios.post(
  //     `${import.meta.env.VITE_BACKEND_API_KEY}/api/askbot`,
  //     {
  //       asked: asked,
  //     }
  //   );
  //   console.log("respose: ", response.data);
  //   setAllMessages((prev) => [...prev, response.data]);
  //   return;
  // } 
   try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_KEY}/api/askbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ asked }),
    });

    if (!response.body) {
      throw new Error("Readable stream not supported.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let finalMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      console.log("Received chunk:", chunk);
      finalMessage+=chunk;
      setLoadingResponse(false);
      console.log("finalMessage: ", finalMessage)

      // Optionally update UI as it streams
      setAllMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "model", parts: [{text: finalMessage}] },
      ]);
    }

    // Final message set
    setAllMessages((prev) => [
      ...prev.slice(0, -1),
      { role: "model", parts: [{text: finalMessage}] },
    ]);
  }
  catch (err) {
    console.log("An error occured while getting reponse!");
    return;
  }
};
