"use strict";
exports.__esModule = true;
exports.renderSlides = void 0;
var chalk_1 = require("chalk");
function renderSlides(slides) {
    var index = 0;
    function showSlide() {
        console.clear();
        // Render the current slide (for now, just output the parsed Markdown)
        console.log(chalk_1["default"].green(slides[index]));
        console.log(chalk_1["default"].dim("\n[←] Previous  |  [→] Next  |  [q] Quit"));
        // Setup keyboard input
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        process.stdin.removeAllListeners("data");
        process.stdin.on("data", handleInput);
    }
    function handleInput(key) {
        if (key === "\u0003" || key === "q")
            process.exit(); // Ctrl+C or q to quit
        if (key === "\u001B[D" && index > 0)
            index--; // Left arrow
        if (key === "\u001B[C" && index < slides.length - 1)
            index++; // Right arrow
        showSlide();
    }
    showSlide();
}
exports.renderSlides = renderSlides;
