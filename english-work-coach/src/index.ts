import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { askEnglishCoach } from "./llm.js";
import { buildCorrectPrompt, buildExpressPrompt } from "./prompt.js";
import { savePracticeRecord } from "./tools/savePracticeRecord.js";
import type { ParsedCommand } from "./model/interface.js";

function parseCommand(input: string): ParsedCommand {
  const trimmedInput = input.trim();

  if (!trimmedInput.startsWith("/")) {
    return {
      content: trimmedInput,
    };
  }

  const firstSpaceIndex = trimmedInput.indexOf(" ");

  if (firstSpaceIndex === -1) {
    return {
      command: trimmedInput,
      content: "",
    };
  }

  return {
    command: trimmedInput.slice(0, firstSpaceIndex),
    content: trimmedInput.slice(firstSpaceIndex + 1).trim(),
  };
}

function getHelpText(): string {
  return `
Available commands:
/express 中文内容 - Convert Chinese into natural workplace English.
/correct English sentence - Correct English and explain improvements.
/help - Show available commands.
`;
}

async function main() {
  const rl = readline.createInterface({ input, output });

  console.log("EnglishWorkCoach started.");
  console.log("输入你想练习的内容，输入 exit 退出。");
  console.log("");

  while (true) {
    const userInput = await rl.question("> ");

    if (userInput.trim() === "exit") {
      break;
    }

    if (!userInput.trim()) {
      continue;
    }

    try {
      const parsed = parseCommand(userInput);

      if (parsed.command === "/help") {
        console.log(getHelpText());
        continue;
      }

      let coachInput = userInput;

      switch (parsed.command) {
        case "/express":
          coachInput = buildExpressPrompt(parsed.content);
          break;
        case "/correct":
          coachInput = buildCorrectPrompt(parsed.content);
          break;
      }

      const answer = await askEnglishCoach(coachInput);
      console.log("\n" + answer + "\n");

      savePracticeRecord(userInput, answer);
      console.log("已保存本次练习记录。\n");
    } catch (error) {
      console.error("请求失败：", error);
    }
  }

  rl.close();
}

main();
