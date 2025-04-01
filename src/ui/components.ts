import chalk from "chalk";

export function renderTitle(title: string): string {
  // Extract the text content from the styled title
  const titleText = title
    .replace(/\u001b\[\d+m/g, '') // Remove ANSI color codes
    .replace(/^#+\s*/, '') // Remove markdown headings
    .trim();
  
  // Calculate the width for the title box
  const width = Math.max(titleText.length + 4, 50);
  const padding = Math.floor((width - titleText.length) / 2);
  
  // Create a beautiful title box
  return [
    chalk.cyan('┌' + '─'.repeat(width - 2) + '┐'),
    chalk.cyan('│') + ' '.repeat(padding) + chalk.cyan.bold(titleText) + ' '.repeat(width - padding - titleText.length - 2) + chalk.cyan('│'),
    chalk.cyan('└' + '─'.repeat(width - 2) + '┘'),
    '\n' // Add spacing after title
  ].join('\n');
}

export function renderNavigationBar(currentIndex: number, totalSlides: number): string {
  // Progress indicator
  const progress = chalk.dim(`Slide ${currentIndex + 1}/${totalSlides}`);
  
  // Navigation buttons with ASCII art style
  const prevBtn = currentIndex > 0 ? chalk.cyan("◀") : chalk.gray("◀");
  const nextBtn = currentIndex < totalSlides - 1 ? chalk.cyan("▶") : chalk.gray("▶");
  const quitBtn = chalk.red("✕");
  
  // Navigation bar with progress
  return [
    chalk.dim("Navigation: "),
    `${prevBtn} ${chalk.dim("Previous")}  |  `,
    `${nextBtn} ${chalk.dim("Next")}  |  `,
    `${quitBtn} ${chalk.dim("Quit")}  |  `,
    progress
  ].join('');
}

export function renderCommandsInfo(commandCount: number): string {
  return [
    chalk.dim('┌──────────────────────────────────────────┐'),
    chalk.dim('│') + chalk.cyan(` ${commandCount} command${commandCount > 1 ? 's' : ''} available `) + chalk.dim('│'),
    chalk.dim('└──────────────────────────────────────────┘\n')
  ].join('\n');
}

export function renderCommandInstructions(commandCount: number): string {
  if (commandCount === 1) {
    return chalk.dim('\nPress [Enter] to execute command');
  }
  return [
    chalk.dim('\nPress [Enter] to execute all commands'),
    chalk.dim('Or press [1-9] to execute a specific command')
  ].join('\n');
} 