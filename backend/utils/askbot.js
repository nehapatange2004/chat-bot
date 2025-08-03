
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config()

import { get_weather_forecast } from "./weather.js";
import { functionDeclarations } from "./functionDelarations.js";
var history = [{
  role: "model",
  parts: [{
    text: `You're a helpful and smart AI that talks like a chill, witty friend — not too formal, not robotic.

Keep your replies short, clear, and conversational — like you're texting. Mostly you will be answering tech questions/ some general day to day questions.

Use emojis, markdown (like bullet points, tables, or code blocks, or even tables of differences,most of the time use lines to differentiate sections of answer[greetings, main answer and the conclusion]), and fun language to keep things engaging.

Format answers neatly and shorten it smartly. Explain things simply, but don’t oversimplify — you’re smart and cool.

If something technical comes up, break it down like you're explaining it to a friend who's curious, not clueless.

Be helpful, a little playful, and always easy to talk to` }]
},
]
export const askbot = async (req, res) => {

  console.log("body: ", req.body)
  if (!req.body?.asked) {
    return res.send({ "message": "No question recived at server end!" })
  }
  history.push({
    "role": "user",
    "parts": [
      {
        "text": `${req.body.asked}`
      }
    ]
  })
  try {
    const API_KEY = process.env.GENAI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // const model = ai.getGenerativModel({ model: "gemini-2.5-flash" })
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const tools = [
      { functionDeclarations: functionDeclarations }
    ]
    const toolFunctions = {
      get_weather_forecast: get_weather_forecast
    }

    while (1) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: history,
        config: { tools },
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0];
        const { name, args } = functionCall;

        if (!toolFunctions[name]) {
          throw new Error(`Unknown function call: ${name}`);
        }
        console.log("A function call has to be executed! ");
        const toolResult = await toolFunctions[name](args);
        const functionResponsePart = {
          name: functionCall.name,
          response: {
            result: toolResult,
          },
        };
        console.log("weather fucn used: ", toolResult)
        history.push({
          role: "model",
          parts: [
            {
              functionCall: functionCall,
            },
          ],
        });
        history.push({
          role: "user",
          parts: [
            {
              functionResponse: functionResponsePart,
            },
          ],
        });
        // res.send(functionResponsePart)

      } else {
        console.log("reponse.text:", response.text)

        const fullText = response.text;
        history.push({
          role: "model",
          parts: [
            {
              text: fullText,
            },
          ],
        });
        const words = fullText.split(" ");
        for (let i = 0; i < words.length; i++) {
          res.write(` ${words[i]}`);
          await new Promise((resolve) => setTimeout(resolve, 20)); // simulate delay


        }
        break;
      }
    }


    // res.flushHeaders();
    // const fullText = response.text;
    return res.end()
    // for await (const chunk of response) {
    //   const textChunk=chunk.text();
    //   // const newData = { role: "user", parts: [{ text: textChunk }] }
    //   // setTimeout(()=>{

    //   // }, 2000)
    //   fullText += textChunk;
    //   console.log("fulltext: ", fullText)
    //   res.write(`${textChunk}`);
    //   // res.flush();
    // }


    history.push(
      {
        role: "model",
        parts: [{ text: `${fullText}` }],
      }
    )
    console.log("history: ", history)
    // return res.send({
    //     role: "model",
    //     parts: [{ text: `${response.text}` }],
    //   });

  } catch (err) {
    console.log("Error: ", err);
    return res.send({ "message": "internal Server Error" })
  }
}

