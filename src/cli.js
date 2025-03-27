#!/usr/bin/env ts-node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var chalk_1 = require("chalk");
var parser_1 = require("./parser");
var renderer_1 = require("./renderer");
var filePath = process.argv[2];
if (!filePath) {
    console.error(chalk_1["default"].red("❌ Error: Please provide a Markdown file."));
    process.exit(1);
}
var fullPath = path_1["default"].resolve(filePath);
var mdContent = fs_1["default"].readFileSync(fullPath, "utf-8");
var slides = (0, parser_1.parseMarkdown)(mdContent);
(0, renderer_1.renderSlides)(slides);
