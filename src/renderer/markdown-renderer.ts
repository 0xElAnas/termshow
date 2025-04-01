import { marked, Renderer } from "marked";
import chalk from "chalk";

// Define custom renderer interface
interface CustomRenderer extends Renderer {
  b: (text: string) => string;
  i: (text: string) => string;
  a: (text: string, href: string) => string;
  s: (text: string) => string;
  small: (text: string) => string;
  mark: (text: string) => string;
  sub: (text: string) => string;
  sup: (text: string) => string;
  dl: (text: string) => string;
  dt: (text: string) => string;
  dd: (text: string) => string;
}

// Custom renderer for terminal output
const renderer = new Renderer() as CustomRenderer;

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
renderer.paragraph = (text: string) => `${text}\n\n`;

// Style bold text
renderer.strong = (text: string) => chalk.bold(text);
renderer.b = (text: string) => chalk.bold(text);

// Style italic text
renderer.em = (text: string) => chalk.italic(text);
renderer.i = (text: string) => chalk.italic(text);

// Style code blocks
renderer.code = (code: string, language?: string) => {
  if (language === 'sh' || language === 'bash') {
    return `\n${chalk.green('$')} ${chalk.yellow(code)}\n`;
  }
  return chalk.gray(`\n${code}\n`);
};

// Style inline code
renderer.codespan = (code: string) => {
  if (code.startsWith('$ ')) {
    const command = code.slice(2);
    return chalk.green('$') + ' ' + chalk.yellow(command);
  }
  return chalk.gray(`\`${code}\``);
};

// Style lists and list items
renderer.list = (body: string, _ordered: boolean) => {
  const lines = body.split('\n').filter(Boolean);
  return lines.map(line => {
    const indentLevel = (line.match(/^\s*/)?.[0]?.length || 0) / 2;
    return '  '.repeat(indentLevel) + line.trim();
  }).join('\n');
};

renderer.listitem = (text: string) => {
  text = text.replace(/^[•\-\d.]+\s*/, '');
  return `• ${text}\n`;
};

// Style links
renderer.link = (text: string, _href: string) => chalk.blue.underline(text);
renderer.a = (text: string, _href: string) => chalk.blue.underline(text);

// Style blockquotes
renderer.blockquote = (quote: string) => {
  const lines = quote.split('\n').filter(Boolean);
  return chalk.gray(lines.map(line => `  ${line.trim()}`).join('\n')) + '\n\n';
};

// Style horizontal rules
renderer.hr = () => chalk.gray('\n' + '─'.repeat(process.stdout.columns || 50) + '\n\n');

// Style text decorations
renderer.del = (text: string) => chalk.strikethrough(text);
renderer.s = (text: string) => chalk.strikethrough(text);
renderer.small = (text: string) => chalk.dim(text);
renderer.mark = (text: string) => chalk.bgYellow.black(text);
renderer.sub = (text: string) => chalk.dim(text);
renderer.sup = (text: string) => chalk.dim(text);

// Style definition lists
renderer.dl = (text: string) => text.split('\n').map(line => `  ${line}`).join('\n');
renderer.dt = (text: string) => chalk.bold(text) + '\n';
renderer.dd = (text: string) => `  ${text}\n`;

// Configure marked
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
  mangle: false,
  headerIds: false,
  sanitize: false,
  smartypants: true,
});

export { marked }; 