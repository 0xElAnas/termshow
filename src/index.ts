import { readFileSync } from "fs";
import { parseMarkdown } from "./parser.js";
import { renderSlides } from "./renderer.js";

const filePath = process.argv[2];
if (!filePath) {
  console.error("Please provide a markdown file path");
  process.exit(1);
}

try {
  const content = readFileSync(filePath, "utf-8");
  const slides = parseMarkdown(content);
  renderSlides(slides);
} catch (error) {
  console.error("Error:", error instanceof Error ? error.message : "Unknown error");
  process.exit(1);
} 