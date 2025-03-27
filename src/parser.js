"use strict";
exports.__esModule = true;
exports.parseMarkdown = void 0;
var marked_1 = require("marked");
function parseMarkdown(mdContent) {
    // Split slides by delimiter (three dashes on their own line)
    return mdContent.split("\n---\n").map(function (slide) { return (0, marked_1["default"])(slide); });
}
exports.parseMarkdown = parseMarkdown;
