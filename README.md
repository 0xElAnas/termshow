# TermShow

[![CI](https://github.com/0xElAnas/termshow/actions/workflows/ci.yml/badge.svg)](https://github.com/0xElAnas/termshow/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/termshow.svg)](https://www.npmjs.com/package/termshow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/0xElAnas/termshow/graphs/commit-activity)

TermShow is a powerful CLI tool for creating terminal-based presentations with live coding support. It allows you to create interactive presentations using Markdown, execute commands live, and demonstrate coding concepts in real-time.

## Features

- 📝 Markdown-based slides with syntax highlighting
- 🚀 Live command execution within slides
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
# Command blocks
$ echo "Hello World"
```

```bash
# Multiple commands
$ sleep 5
$ echo "Done"
```

> Note: Commands starting with `$` will be executable. Press Enter to execute commands or use number keys for specific commands.

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
   git clone https://github.com/0xElAnas/termshow.git
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

```
termshow/
├── src/                    # Source code
│   ├── cli.ts             # CLI entry point
│   ├── parser.ts          # Markdown parsing and command extraction
│   └── renderer.ts        # Terminal rendering and command execution
├── examples/              # Example presentations
│   ├── presentation.md    # Basic presentation example
│   ├── commands.md        # Command execution examples
│   ├── nodejs.md          # Node.js tutorial example
│   └── system.md          # System commands demonstration
├── bin/                   # Binary scripts
│   └── termshow.js        # CLI executable
├── dist/                  # Compiled JavaScript
├── .github/              # GitHub specific files
│   ├── workflows/        # GitHub Actions workflows
│   │   ├── ci.yml       # Continuous Integration
│   │   └── publish.yml  # Automated publishing
│   └── ISSUE_TEMPLATE/  # Issue templates
│       ├── bug_report.md
│       └── feature_request.md
├── tests/                # Test files
├── .gitignore           # Git ignore rules
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── jest.config.js      # Jest configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project configuration and dependencies
├── package-lock.json   # Dependency lock file
├── README.md           # Project documentation
├── CHANGELOG.md        # Version history
├── CONTRIBUTING.md     # Contribution guidelines
├── CODE_OF_CONDUCT.md  # Code of conduct
└── LICENSE             # MIT License
```

## License

MIT License - see LICENSE file for details
