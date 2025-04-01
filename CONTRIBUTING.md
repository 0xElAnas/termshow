# Contributing to TermShow

Thank you for your interest in contributing to TermShow! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/termshow.git
   cd termshow
   ```
3. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

## Project Structure

```
termshow/
├── src/                    # Source code
│   ├── cli.ts             # CLI entry point
│   ├── parser.ts          # Markdown parsing
│   └── renderer.ts        # Terminal rendering
├── examples/              # Example presentations
├── bin/                   # Binary scripts
├── dist/                  # Compiled JavaScript
└── tests/                 # Test files
```

## Making Changes

1. **Feature Development**
   - Create a new branch for your feature
   - Make your changes following the coding standards
   - Add tests for new functionality
   - Update documentation as needed

2. **Bug Fixes**
   - Create a branch named `fix/description-of-fix`
   - Include a test that demonstrates the bug
   - Ensure all tests pass after your fix

3. **Documentation**
   - Update relevant documentation files
   - Add JSDoc comments for new functions
   - Update CHANGELOG.md for significant changes

## Submitting Changes

1. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Maintain strict type checking
- Use interfaces for object shapes
- Prefer `const` over `let`

### Code Style
- Follow the existing code style
- Use meaningful variable and function names
- Keep functions focused and small
- Add comments for complex logic

### Git Commit Messages
Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code changes
- `test:` for adding tests
- `chore:` for maintenance

Example:
```
feat: add process termination indicator

- Add visual indicator for stopping processes
- Implement key press detection
- Update documentation
```

## Testing

1. Write tests for new features
2. Ensure all tests pass:
   ```bash
   npm test
   ```
3. Maintain or improve test coverage

## Documentation

1. Update relevant documentation:
   - README.md
   - CHANGELOG.md
   - API documentation
   - Example presentations

2. Documentation Guidelines:
   - Use clear, concise language
   - Include code examples
   - Keep documentation up to date
   - Add screenshots for UI changes

## Getting Help

- Open an issue for bugs or feature requests
- Join our discussions for questions
- Check existing issues before creating new ones

## Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Keep PRs focused and manageable
4. Update PR based on feedback

## Release Process

1. Version bumping follows semantic versioning
2. Update CHANGELOG.md
3. Create a release tag
4. Update documentation

Thank you for contributing to TermShow!