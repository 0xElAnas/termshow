import { execaCommand } from "execa";
import chalk from "chalk";
import { CommandBlock } from "../types/index.js";

export async function executeCommand(command: string): Promise<string> {
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

export async function executeCommands(commands: CommandBlock[]): Promise<void> {
  console.log('\n' + chalk.dim('Executing commands...') + '\n');
  for (const cmd of commands) {
    console.log(chalk.green('$') + ' ' + chalk.yellow(cmd.command));
    const output = await executeCommand(cmd.command);
    console.log(output);
  }
  console.log('\n' + chalk.dim('Press any key to continue...'));
} 