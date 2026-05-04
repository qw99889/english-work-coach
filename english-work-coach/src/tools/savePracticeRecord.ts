import fs from "fs";
import path from "path";

export function savePracticeRecord(input: string, output: string) {
  const date = new Date().toISOString().slice(0, 10);

  const dir = path.resolve("data", "records");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${date}.md`);

  const content = `
## ${new Date().toLocaleString()}

### Input

${input}

### Coach Response

${output}

---
`;

  fs.appendFileSync(filePath, content, "utf-8");
}