import { spawn, ChildProcess } from 'child_process';
import chalk from 'chalk';

let activeProcess: ChildProcess | null = null;

/**
 * Executes a shell command and streams its output in real-time
 * @param command - The shell command to execute
 * @param updateOutput - Callback function to handle output updates
 * @returns Promise that resolves when the command completes
 */
export async function executeCommandLive(
  command: string,
  updateOutput: (output: string) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Split command into program and arguments
    const [program, ...args] = command.split(' ');
    
    // Spawn the process
    activeProcess = spawn(program, args, {
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Handle stdout stream
    activeProcess.stdout?.on('data', (data: Buffer) => {
      const output = data.toString().trim();
      if (output) {
        updateOutput(chalk.green(output));
      }
    });

    // Handle stderr stream
    activeProcess.stderr?.on('data', (data: Buffer) => {
      const error = data.toString().trim();
      if (error) {
        updateOutput(chalk.red(error));
      }
    });

    // Handle process exit
    activeProcess.on('close', (code: number | null) => {
      if (code === null) {
        updateOutput(chalk.yellow('\nProcess terminated without exit code'));
      } else {
        updateOutput(chalk.blue(`\nProcess exited with code ${code}`));
      }
      activeProcess = null;
      resolve();
    });

    // Handle process errors
    activeProcess.on('error', (error: Error) => {
      updateOutput(chalk.red(`\nFailed to start process: ${error.message}`));
      activeProcess = null;
      reject(error);
    });
  });
}

/**
 * Terminates the currently running process if any
 */
export function terminateActiveProcess(): void {
  if (activeProcess) {
    activeProcess.kill();
    activeProcess = null;
  }
}

/**
 * Returns whether there is currently an active process running
 */
export function hasActiveProcess(): boolean {
  return activeProcess !== null;
}

/**
 * Example usage:
 * 
 * executeCommandLive('ping -c 3 google.com', (output) => {
 *   console.log(output);
 * });
 */ 