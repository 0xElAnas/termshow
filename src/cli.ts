#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import { parseMarkdown } from "./parser";
import { renderSlides } from "./renderer";

const filePath = process.argv[2];

if (!filePath) {
  console.error(chalk.red("❌ Error: Please provide a Markdown file."));
  process.exit(1);
}

const fullPath = path.resolve(filePath);
const mdContent = fs.readFileSync(fullPath, "utf-8");

const slides = parseMarkdown(mdContent);
renderSlides(slides);
