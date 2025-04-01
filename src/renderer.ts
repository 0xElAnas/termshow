import chalk from "chalk";
import { Slide } from "./types/index.js";
import { executeCommand, executeCommands } from "./commands/executor.js";
import { renderTitle, renderNavigationBar, renderCommandsInfo, renderCommandInstructions } from "./ui/components.js";

export function renderSlides(slides: Slide[]) {
  let index = 0;

  async function showSlide() {
    console.clear();
    console.log("\n"); // Add some padding at the top
    
    const slide = slides[index];
    
    // Render title if exists
    if (slide.title) {
      console.log(renderTitle(slide.title));
    }
    
    // Render the content
    console.log(slide.content);
    
    // Display commands if any
    const executableCommands = slide.commands.filter(cmd => !cmd.inline);
    if (executableCommands.length > 0) {
      console.log(renderCommandsInfo(executableCommands.length));
      
      executableCommands.forEach((cmd) => {
        console.log(chalk.dim(`[${cmd.number}]`) + ' ' + chalk.green('$') + ' ' + chalk.yellow(cmd.command));
      });
      
      console.log(renderCommandInstructions(executableCommands.length));
    }
    
    // Add some padding at the bottom
    console.log("\n");
    
    // Navigation bar with progress
    console.log(renderNavigationBar(index, slides.length));

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
        await executeCommands(executableCommands);
        return; // Wait for key press before showing slide
      }
    } else if (executableCommands.length > 1 && /^[1-9]$/.test(key)) { // Number keys 1-9
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
