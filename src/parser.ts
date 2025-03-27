import { marked, Renderer } from "marked";
import chalk from "chalk";

// Custom renderer for terminal output
const renderer = new Renderer();

// Style headers
renderer.heading = (text: string, level: number) => {
  const colors = {
    1: chalk.cyan.bold,
    2: chalk.blue.bold,
    3: chalk.magenta.bold,
  };
  const color = colors[level as keyof typeof colors] || chalk.white.bold;
  return `\n${color(text)}\n`;
};

// Style paragraphs
renderer.paragraph = (text: string) => {
  return `${text}\n\n`;
};

// Style bold text (both markdown ** and HTML <b>)
renderer.strong = (text: string) => chalk.bold(text);
(renderer as any).b = (text: string) => chalk.bold(text);

// Style italic text (both markdown * and HTML <i>)
renderer.em = (text: string) => chalk.italic(text);
(renderer as any).i = (text: string) => chalk.italic(text);

// Style code blocks
renderer.code = (code: string, language?: string) => {
  if (language) {
    return chalk.gray(`\n${code}\n`);
  }
  return chalk.gray(`\`${code}\``);
};

// Style inline code
renderer.codespan = (code: string) => {
  return chalk.gray(`\`${code}\``);
};

// Style lists
renderer.list = (body: string, ordered: boolean) => {
  // Split the body into lines and process each line
  const lines = body.split('\n').filter(Boolean);
  return lines.map(line => {
    // Count the number of spaces at the start to determine nesting level
    const indentLevel = (line.match(/^\s*/)?.[0]?.length || 0) / 2;
    return '  '.repeat(indentLevel) + line.trim();
  }).join('\n');
};

// Style list items
renderer.listitem = (text: string) => {
  // Remove any existing bullet points or numbers
  text = text.replace(/^[•\-\d.]+\s*/, '');
  return `• ${text}\n`;
};

// Style links
renderer.link = (href: string, title: string, text: string) => {
  return chalk.blue.underline(text);
};
(renderer as any).a = (text: string, href: string) => {
  return chalk.blue.underline(text);
};

// Style blockquotes
renderer.blockquote = (quote: string) => {
  // Split into lines and indent each line
  const lines = quote.split('\n').filter(Boolean);
  return chalk.gray(lines.map(line => `  ${line.trim()}`).join('\n')) + '\n\n';
};

// Style horizontal rules
renderer.hr = () => {
  return chalk.gray('\n' + '─'.repeat(process.stdout.columns || 50) + '\n\n');
};

// Style emphasis (both markdown _ and HTML <em>)
renderer.em = (text: string) => chalk.italic(text);

// Style strikethrough (both markdown ~~ and HTML <s>)
renderer.del = (text: string) => chalk.strikethrough(text);
(renderer as any).s = (text: string) => chalk.strikethrough(text);

// Style small text
(renderer as any).small = (text: string) => chalk.dim(text);

// Style mark/highlighted text
(renderer as any).mark = (text: string) => chalk.bgYellow.black(text);

// Style subscript and superscript
(renderer as any).sub = (text: string) => chalk.dim(text);
(renderer as any).sup = (text: string) => chalk.dim(text);

// Style preformatted text
(renderer as any).pre = (text: string) => {
  const lines = text.split('\n').filter(Boolean);
  return chalk.gray(lines.map(line => `  ${line.trim()}`).join('\n')) + '\n\n';
};

// Style definition lists
(renderer as any).dl = (text: string) => {
  return text.split('\n').map(line => `  ${line}`).join('\n');
};

(renderer as any).dt = (text: string) => {
  return chalk.bold(text) + '\n';
};

(renderer as any).dd = (text: string) => {
  return `  ${text}\n`;
};

// Configure marked to handle HTML tags
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
  mangle: false,
  headerIds: false,
  sanitize: false,
  smartypants: true,
});

export function parseMarkdown(md: string): string[] {
  // Split slides by delimiter (three dashes on their own line)
  return md
    .split("\n---\n")
    .map((slide) => {
      // First, convert markdown to HTML with styling
      const html = marked(slide);
      
      // Then, extract the title and content
      const lines = html.split('\n');
      const titleLine = lines.find(line => line.trim() && !line.includes('─'));
      
      if (titleLine) {
        // Keep the styled title as is
        const content = lines
          .filter(line => line !== titleLine && line.trim())
          .join('\n');
        return `${titleLine}\n${content}`;
      }
      
      return html;
    })
    .map((slide) => slide.trim())
    .filter(Boolean);
}
