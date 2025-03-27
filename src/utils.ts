import chalk from "chalk";

export function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

export function typewriterEffect(text: string, delay: number = 50) {
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(text[i]);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, delay);
}
