import { marked } from "./renderer/markdown-renderer.js";
import { Slide, CommandBlock } from "./types/index.js";

// Initialize command counter
let globalCommandIndex = 1;

export function parseMarkdown(md: string): Slide[] {
  // Reset the counter when starting a new presentation
  globalCommandIndex = 1;

  // Split slides by delimiter (three dashes on their own line)
  return md
    .split("\n---\n")
    .map((slide) => {
      // First, convert markdown to HTML with styling
      const html = marked(slide);
      
      // Then, extract the title and content
      const lines = html.split('\n');
      const titleLine = lines.find((line: string) => line.trim() && !line.includes('─'));
      
      // Extract command blocks
      const commands: CommandBlock[] = [];
      
      // Extract code blocks
      const codeBlocks = slide.match(/```(?:sh|bash)\n([\s\S]*?)```/g) || [];
      codeBlocks.forEach(block => {
        const command = block.replace(/```(?:sh|bash)\n/, '').replace(/```$/, '').trim();
        commands.push({
          command,
          autoExecute: false,
          number: globalCommandIndex++
        });
      });
      
      // Extract inline commands
      const inlineCommands = slide.match(/`\$ [^`]+`/g) || [];
      inlineCommands.forEach(cmd => {
        const command = cmd.replace(/`\$ /, '').replace(/`$/, '').trim();
        commands.push({
          command,
          autoExecute: false,
          inline: true,
          number: globalCommandIndex++
        });
      });
      
      if (titleLine) {
        // Keep the styled title as is
        const content = lines
          .filter((line: string) => line !== titleLine && line.trim())
          .join('\n');
        return {
          title: titleLine,
          content,
          commands
        };
      }
      
      return {
        title: '',
        content: html,
        commands
      };
    })
    .map(slide => ({
      ...slide,
      title: slide.title.trim(),
      content: slide.content.trim()
    }))
    .filter(slide => slide.title || slide.content);
}
