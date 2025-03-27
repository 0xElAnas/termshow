import chalk from "chalk";

export function renderSlides(slides: string[]) {
  let index = 0;

  function showSlide() {
    console.clear();
    
    // Add some padding at the top
    console.log("\n");
    
    // Extract the first line (title) and render it with beautiful styling
    const slideContent = slides[index];
    const lines = slideContent.split('\n');
    
    // Find the first non-empty line that's not a horizontal rule
    const titleLine = lines.find(line => line.trim() && !line.includes('─'));
    if (titleLine) {
      // Extract the text content from the styled title
      const titleText = titleLine
        .replace(/\u001b\[\d+m/g, '') // Remove ANSI color codes
        .replace(/^#+\s*/, '') // Remove markdown headings
        .trim();
      
      // Calculate the width for the title box
      const width = Math.max(titleText.length + 4, 50);
      const padding = Math.floor((width - titleText.length) / 2);
      
      // Create a beautiful title box
      console.log(chalk.cyan('┌' + '─'.repeat(width - 2) + '┐'));
      console.log(chalk.cyan('│') + ' '.repeat(padding) + chalk.cyan.bold(titleText) + ' '.repeat(width - padding - titleText.length - 2) + chalk.cyan('│'));
      console.log(chalk.cyan('└' + '─'.repeat(width - 2) + '┘'));
      console.log('\n'); // Add spacing after title
    }
    
    // Render the rest of the content
    const content = lines
      .filter(line => {
        // Skip the title line and empty lines
        return line !== titleLine && line.trim();
      })
      .join('\n');
    
    if (content) {
      console.log(content);
    }
    
    // Add some padding at the bottom
    console.log("\n");
    
    // Progress indicator
    const progress = chalk.dim(`Slide ${index + 1}/${slides.length}`);
    
    // Navigation buttons with ASCII art style
    const prevBtn = index > 0 ? chalk.cyan("◀") : chalk.gray("◀");
    const nextBtn = index < slides.length - 1 ? chalk.cyan("▶") : chalk.gray("▶");
    const quitBtn = chalk.red("✕");
    
    // Navigation bar with progress
    console.log(
      chalk.dim("Navigation: ") +
      `${prevBtn} ${chalk.dim("Previous")}  |  ` +
      `${nextBtn} ${chalk.dim("Next")}  |  ` +
      `${quitBtn} ${chalk.dim("Quit")}  |  ` +
      progress
    );

    // Setup keyboard input
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf-8");
    process.stdin.removeAllListeners("data");
    process.stdin.on("data", handleInput);
  }

  function handleInput(key: string) {
    if (key === "\u0003" || key === "q") process.exit(); // Ctrl+C or q to quit
    if (key === "\u001B[D" && index > 0) index--; // Left arrow
    if (key === "\u001B[C" && index < slides.length - 1) index++; // Right arrow
    showSlide();
  }

  showSlide();
}
