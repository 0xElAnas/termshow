"use strict";
exports.__esModule = true;
exports.typewriterEffect = exports.clearScreen = void 0;
function clearScreen() {
    process.stdout.write("\x1B[2J\x1B[0f");
}
exports.clearScreen = clearScreen;
function typewriterEffect(text, delay) {
    if (delay === void 0) { delay = 50; }
    var i = 0;
    var interval = setInterval(function () {
        process.stdout.write(text[i]);
        i++;
        if (i >= text.length)
            clearInterval(interval);
    }, delay);
}
exports.typewriterEffect = typewriterEffect;
