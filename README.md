# TermShow

TermShow is a powerful CLI tool for creating terminal-based presentations with live coding support. It allows you to create interactive presentations using Markdown, execute commands live, and demonstrate coding concepts in real-time.

## Features

- 📝 Markdown-based slides with syntax highlighting
- 🚀 Live command execution within slides
- ⚡ Auto-execution support for commands
- 🛑 Process termination with any key press
- 📊 Visual indicators for running commands
- ⌨️ Simple keyboard navigation
- 🎨 Beautiful terminal UI with chalk styling

## Installation

```bash
npm install -g termshow
```

## Usage Guide

### Basic Usage

```bash
termshow presentation.md
```

### Navigation Controls

- `→` or `Space`: Next slide
- `←`: Previous slide
- `q`: Quit presentation
- `Enter`: Execute commands (if any)
- `1-9`: Execute specific command (when multiple commands are available)
- `Any key`: Stop running process

### Markdown Syntax

```markdown
# Slide Title

Regular markdown content...

```bash
# Command blocks with auto-execution
$ echo "Hello World"
```

```bash
# Command blocks with manual execution
$ sleep 5
```

> Note: Commands starting with `$` will be executable. Use `$` for auto-executing commands and `$` for manual execution.

## Examples

Check out the `examples/` directory for sample presentations:

- `presentation.md`: Basic presentation example
- `commands.md`: Command execution examples
- `nodejs.md`: Node.js tutorial example
- `system.md`: System commands demonstration

## Development

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/termshow.git
   cd termshow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Project Structure

- `src/`: Source code
  - `cli.ts`: CLI entry point
  - `parser.ts`: Markdown parsing and command extraction
  - `renderer.ts`: Terminal rendering and command execution
- `examples/`: Sample presentations
- `bin/`: Binary scripts

## License

MIT License - see LICENSE file for details
