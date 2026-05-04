import OpenAI from "openai";
import "dotenv/config";
import { systemPrompt } from "./prompt.js";

const apiKey = process.env.DEEPSEEK_API_KEY;
console.log("has deepseek key:", !!process.env.DEEPSEEK_API_KEY);
if (!apiKey) {
  throw new Error("Missing DEEPSEEK_API_KEY in .env");
}

const client = new OpenAI({
  apiKey,
  baseURL: "https://api.deepseek.com",
});

const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

export async function askEnglishCoach(userInput: string): Promise<string> {
  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? "";
}