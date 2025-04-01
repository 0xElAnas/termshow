import { parseMarkdown } from '../src/parser';

describe('Markdown Parser', () => {
  test('should parse basic markdown content', () => {
    const markdown = '# Title\n\nSome content';
    const slides = parseMarkdown(markdown);
    expect(slides).toBeDefined();
    expect(slides).toHaveLength(1);
    expect(slides[0].title).toContain('Title');
    expect(slides[0].content).toContain('Some content');
  });

  test('should parse multiple slides', () => {
    const markdown = '# Slide 1\n\nContent 1\n\n---\n\n# Slide 2\n\nContent 2';
    const slides = parseMarkdown(markdown);
    expect(slides).toHaveLength(2);
    expect(slides[0].title).toContain('Slide 1');
    expect(slides[0].content).toContain('Content 1');
    expect(slides[1].title).toContain('Slide 2');
    expect(slides[1].content).toContain('Content 2');
  });

  test('should parse code blocks', () => {
    const markdown = '# Code Block\n\n```bash\n$ echo "Hello"\n```';
    const slides = parseMarkdown(markdown);
    expect(slides[0].title).toContain('Code Block');
    expect(slides[0].content).toContain('$ echo "Hello"');
  });

  test('should identify executable commands', () => {
    const markdown = '# Commands\n\n```bash\n$ echo "Hello"\n```';
    const slides = parseMarkdown(markdown);
    expect(slides[0].title).toContain('Commands');
    expect(slides[0].commands).toHaveLength(1);
    expect(slides[0].commands[0].command).toBe('$ echo "Hello"');
  });
}); 