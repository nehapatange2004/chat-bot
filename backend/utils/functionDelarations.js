import { Type } from "@google/genai"
import os from "os"
export const functionDeclarations = [
    {
        name: "get_weather_forecast",
        description:
            "Gets the current weather temperature for a given location with the date. Ask if the location not provided.",
        parameters: {
            type: Type.OBJECT,
            properties: {
                region: {
                    type: Type.STRING,
                },
            },
            required: ["region"],
        }
    },
    {

        name: "runCommand",
        description:
            `Runs a single command on the terminal. If a project folder has to be created then calling this fucntion by passing the command you generated which is valid and compatible for ${os.platform}`,
        parameters: {
            type: Type.OBJECT,
            properties: {
                command: {
                    type: Type.STRING,
                    description: `This will be a single command which can be executed of the terminal/ shell`
                },
                filePath: {
                    type: Type.STRING,
                    description: `This is the directory in which the command runs`
                },
                content: {
                    type:Type.STRING,
                    description: `This the content which has to be written in the "filePath"`
                }
            },
            required: ["command"],
        }
    }
]