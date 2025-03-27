import { execaCommand } from "execa";

export async function runCommand(command: string) {
  console.log(`\n$ ${command}`);
  try {
    const { stdout } = await execaCommand(command);
    console.log(stdout);
  } catch (error) {
    console.error("Error executing command:", error);
  }
}
