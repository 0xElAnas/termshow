import { execaCommand } from "execa";
import chalk from "chalk";
import { CommandBlock } from "../types/index.js";
import { executeCommandLive } from "./live-executor.js";

export async function executeCommand(command: string): Promise<string> {
  return new Promise((resolve) => {
    let output = '';
    executeCommandLive(command, (line) => {
      output += line + '\n';
      console.log(line);
    }).then(() => {
      resolve(output);
    }).catch(() => {
      resolve(output);
    });
  });
}

export async function executeCommands(commands: CommandBlock[]): Promise<void> {
  console.log('\n' + chalk.dim('Executing commands...') + '\n');
  for (const cmd of commands) {
    console.log(chalk.green('$') + ' ' + chalk.yellow(cmd.command));
    await executeCommand(cmd.command);
  }
  console.log('\n' + chalk.dim('Press any key to continue...'));
} 