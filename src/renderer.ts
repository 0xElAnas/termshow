import chalk from "chalk";
import { execaCommand } from "execa";
import { Slide, CommandBlock } from "./parser.js";

export function renderSlides(slides: Slide[]) {
  let index = 0;
  let currentProcess: any = null;

  async function executeCommand(command: string): Promise<string> {
    try {
      const { stdout } = await execaCommand(command);
      return stdout;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return `Error: Unknown error occurred`;
    }
  }

  async function showSlide() {
    console.clear();
    
    // Add some padding at the top
    console.log("\n");
    
    const slide = slides[index];
    
    // Extract the title and render it with beautiful styling
    if (slide.title) {
      // Extract the text content from the styled title
      const titleText = slide.title
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
    
    // Render the content
    console.log(slide.content);
    
    // Display commands if any
    const executableCommands = slide.commands.filter(cmd => !cmd.inline);
    if (executableCommands.length > 0) {
      console.log('\n' + chalk.dim('┌──────────────────────────────────────────┐'));
      console.log(chalk.dim('│') + chalk.cyan(` ${executableCommands.length} command${executableCommands.length > 1 ? 's' : ''} available `) + chalk.dim('│'));
      console.log(chalk.dim('└──────────────────────────────────────────┘\n'));
      
      executableCommands.forEach((cmd, i) => {
        console.log(chalk.dim(`[${i + 1}] `) + chalk.green('$') + ' ' + chalk.yellow(cmd.command));
      });
      
      // Different instructions based on number of commands
      if (executableCommands.length === 1) {
        console.log(chalk.dim('\nPress [Enter] to execute command'));
      } else {
        console.log(chalk.dim('\nPress [Enter] to execute all commands'));
        console.log(chalk.dim('Or press [1-9] to execute a specific command'));
      }
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

  async function handleInput(key: string) {
    if (key === "\u0003" || key === "q") process.exit(); // Ctrl+C or q to quit
    if (key === "\u001B[D" && index > 0) index--; // Left arrow
    if (key === "\u001B[C" && index < slides.length - 1) index++; // Right arrow
    
    const slide = slides[index];
    const executableCommands = slide.commands.filter(cmd => !cmd.inline);
    
    if (key === "\r" || key === "\n") { // Enter key
      // Execute all non-inline commands
      if (executableCommands.length > 0) {
        console.log('\n' + chalk.dim('Executing commands...') + '\n');
        for (const cmd of executableCommands) {
          console.log(chalk.green('$') + ' ' + chalk.yellow(cmd.command));
          const output = await executeCommand(cmd.command);
          console.log(output);
        }
        console.log('\n' + chalk.dim('Press any key to continue...'));
        return; // Wait for key press before showing slide
      }
    } else if (executableCommands.length > 1 && /^[1-9]$/.test(key)) { // Number keys 1-9 only if multiple commands
      const commandIndex = parseInt(key) - 1;
      if (commandIndex < executableCommands.length) {
        const cmd = executableCommands[commandIndex];
        console.log('\n' + chalk.dim(`Executing command ${commandIndex + 1}...`) + '\n');
        console.log(chalk.green('$') + ' ' + chalk.yellow(cmd.command));
        const output = await executeCommand(cmd.command);
        console.log(output);
        console.log('\n' + chalk.dim('Press any key to continue...'));
        return; // Wait for key press before showing slide
      }
    }
    
    showSlide();
  }

  showSlide();
}
